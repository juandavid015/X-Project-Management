import { MyContext } from "../index.js"
import { ChatArgs } from "../types/types.js"

export const chatResolvers = { 
    Query: {
        // TASKS QUERY
    },
    Mutation: {
        // TASK MUTATIONS
        createChat: async (parent: unknown, args: ChatArgs, context: MyContext) => {
            // await taskSchema.create.validate(args, { abortEarly: true })
            return context.models.Chat.createChat(parent, args)
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