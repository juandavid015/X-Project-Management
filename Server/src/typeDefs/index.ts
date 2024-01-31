import { chatTypeDefs } from "./chatTypeDefs.js";
import { discussionTypeDefs } from "./discussionTypeDefs.js";
import { messageTypeDefs } from "./messageTypeDefs.js";
import { projectTypeDefs } from "./projectTypeDefs.js";
import { taskTypeDefs } from "./taskTypeDefs.js";
import { userTypeDefs } from "./userTypeDefs.js";

export const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# Type defines the queryable fields for every book in our data source.
    ${userTypeDefs.type}
    ${projectTypeDefs.type}
    ${taskTypeDefs.type}
    ${messageTypeDefs.type}
    ${chatTypeDefs.type}
    ${discussionTypeDefs.type}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each.

type Query {
    ${userTypeDefs.query}
    ${projectTypeDefs.query}
    ${taskTypeDefs.query}
    ${discussionTypeDefs.query}
}

type Mutation {
    ${userTypeDefs.mutation}
    ${projectTypeDefs.mutation}
    ${taskTypeDefs.mutation}
    ${chatTypeDefs.mutation}
    ${messageTypeDefs.mutation}
    ${discussionTypeDefs.mutation}
}

type Subscription {
    ${taskTypeDefs.subscription}
}
`;