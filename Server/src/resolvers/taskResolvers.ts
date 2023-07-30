import { MyContext } from ".."
import { AssignMemberToTaskArgs, CreateTaskArgs, GetProjectTasksArgs, MoveTaskArgs, RemoveTaskArgs, UpdateTaskArgs } from "../types/types"

export const taskResolvers = { 
    Query: {
        // TASKS QUERY
        getProjectTasks: (parent: unknown, args: GetProjectTasksArgs, context: MyContext) =>
        context.models.Task.getTasksByProjectId(parent, args),
    },
    Mutation: {
        // TASK MUTATIONS
        createTask: (parent: unknown, args: CreateTaskArgs, context: MyContext) => 
        context.models.Task.createTask(parent, args), 

        updateTask: (parent: unknown, args: UpdateTaskArgs, context: MyContext) => 
        context.models.Task.updateTask(parent, args), 

        removeTask: (parent: unknown, args: RemoveTaskArgs, context: MyContext) => 
        context.models.Task.deleteTaskById(parent, args), 
        
        moveTask: (parent: unknown, args: MoveTaskArgs, context: MyContext) => 
        context.models.Task.updateTaskByPosition(parent, args), 
 
        assignMemberToTask: (parent: unknown, args: AssignMemberToTaskArgs, context: MyContext) => 
        context.models.Task.updateTaskMembers(parent, args) 
        
    }
}