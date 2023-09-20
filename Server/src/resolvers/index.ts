import { projectResolvers } from "./projectResolvers.js";
import { taskResolvers } from "./taskResolvers.js";
import { userResolvers } from "./userResolvers.js";

// Resolvers define how to fetch the types defined in your schema.
export const resolvers = {
    Query: {
        ...userResolvers.Query, 
        ...projectResolvers.Query, 
        ...taskResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, 
        ... projectResolvers.Mutation, 
        ...taskResolvers.Mutation
    },
    Subscription: {
        ...taskResolvers.Subscription
    }
}