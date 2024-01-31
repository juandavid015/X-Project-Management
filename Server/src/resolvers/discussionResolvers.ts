import { MyContext } from "../index.js"
import { DiscussionArgs, GetDiscussionArgs } from "../types/types.js"

export const discussionResolvers = { 
    Query: {
        // DISCUSSION QUERY
        getDiscussion: async (parent: unknown, args: GetDiscussionArgs, context: MyContext) => {
            return context.models.Discussion.getDiscussionById(parent, args)
        },

        getDiscussions: async (parent: unknown, args: GetDiscussionArgs, context: MyContext) => {
            return context.models.Discussion.getDiscussions(parent, args)
        },
    },
    Mutation: {
        // DISCUSSION MUTATIONS
        createDiscussion: async (parent: unknown, args: DiscussionArgs, context: MyContext) => {
            // await taskSchema.create.validate(args, { abortEarly: true })
            return context.models.Discussion.createDiscussion(parent, args)
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