import { MyContext } from "../index.js";
import { MessageArgs } from "../types/types.js";


export const messageResolvers = { 
    Query: {
        // TASKS QUERY
    },
    Mutation: {
        // TASK MUTATIONS
        createMessage: async (parent: unknown, args: MessageArgs, context: MyContext) => {
            // await taskSchema.create.validate(args, { abortEarly: true })
            return context.models.Message.createMessage(parent, args)
        },
    },
    // Subscription: {
    //     taskUpdated: { 
    //         // listen for events with the related labels and adds them to a queue for processing
    //         subscribe: withFilter(
    //             () => pubsub.asyncIterator([SUBSCRIPTION_TASK_EVENTS.TASK_UPDATED]),
    //             (payload, variables) => {
    //                 return (
    //                     payload.taskUpdated.task.projectId === variables.projectId
    //                 );

    //             }
    //         )
    //     }
    // }
}