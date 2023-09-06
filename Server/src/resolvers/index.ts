import { projectResolvers } from "./projectResolvers";
import { taskResolvers } from "./taskResolvers";
import { userResolvers } from "./userResolvers";

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