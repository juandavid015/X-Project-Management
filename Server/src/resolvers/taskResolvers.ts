import { MyContext } from ".."
import { SUBSCRIPTION_TASK_EVENTS } from "../Subscriptions"
import { AssignMemberToTaskArgs, CreateTaskArgs, GetProjectTasksArgs, MoveTaskArgs, RemoveTaskArgs, UpdateTaskArgs } from "../types/types"
import { pubsub } from ".."
import { withFilter } from "graphql-subscriptions"
import { taskSchema } from "../validations/taskSchema"

export const taskResolvers = { 
    Query: {
        // TASKS QUERY
        getProjectTasks: async (parent: unknown, args: GetProjectTasksArgs, context: MyContext) => {
            await taskSchema.getAll.validate(args, { abortEarly: true })
            return context.models.Task.getTasksByProjectId(parent, args)
        }
    },
    Mutation: {
        // TASK MUTATIONS
        createTask: async (parent: unknown, args: CreateTaskArgs, context: MyContext) => {
            await taskSchema.create.validate(args, { abortEarly: true })
            return context.models.Task.createTask(parent, args)
        },
        updateTask: async (parent: unknown, args: UpdateTaskArgs, context: MyContext) => {
            await taskSchema.create.validate(args, { abortEarly: true })
            return context.models.Task.updateTask(parent, args)
        },
        removeTask: (parent: unknown, args: RemoveTaskArgs, context: MyContext) => 
        context.models.Task.deleteTaskById(parent, args), 
        
        moveTask: (parent: unknown, args: MoveTaskArgs, context: MyContext) => 
        context.models.Task.updateTaskByPosition(parent, args), 
 
        assignMemberToTask: (parent: unknown, args: AssignMemberToTaskArgs, context: MyContext) => 
        context.models.Task.updateTaskMembers(parent, args) 
        
    },
    Subscription: {
        taskUpdated: { 
            // listen for events with the related labels and adds them to a queue for processing
            subscribe: withFilter(
                () => pubsub.asyncIterator([SUBSCRIPTION_TASK_EVENTS.TASK_UPDATED]),
                (payload, variables) => {
                    return (
                        payload.taskUpdated.task.projectId === variables.projectId
                    );

                }
            )
        }
    }
}