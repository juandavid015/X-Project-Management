import { projectResolvers } from "./projectResolvers.js";
import { taskResolvers } from "./taskResolvers.js";
import { userResolvers } from "./userResolvers.js";
import { messageResolvers } from "./messageResolvers.js";
import { chatResolvers } from "./chatResolvers.js";
import { discussionResolvers } from "./discussionResolvers.js";
// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
    Query: {
        ...userResolvers.Query, 
        ...projectResolvers.Query, 
        ...taskResolvers.Query,
        ...discussionResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, 
        ... projectResolvers.Mutation, 
        ...taskResolvers.Mutation,
        ...messageResolvers.Mutation,
        ...chatResolvers.Mutation,
        ...discussionResolvers.Mutation
    },
    Subscription: {
        ...taskResolvers.Subscription,
    }
}