import { projectTypeDefs } from "./projectTypeDefs";
import { taskTypeDefs } from "./taskTypeDefs";
import { userTypeDefs } from "./userTypeDefs";

export const typeDefs = `#graphql
# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

# Type defines the queryable fields for every book in our data source.
    ${userTypeDefs.type}
    ${projectTypeDefs.type}
    ${taskTypeDefs.type}


# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each.

type Query {
    ${userTypeDefs.query}
    ${projectTypeDefs.query}
    ${taskTypeDefs.query}
}

type Mutation {
    ${userTypeDefs.mutation}
    ${projectTypeDefs.mutation}
    ${taskTypeDefs.mutation}
}

type Subscription {
    ${taskTypeDefs.subscription}
}
`;