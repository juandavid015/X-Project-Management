import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { GraphQLError } from 'graphql';
import {validateToken} from './utils/validateToken.js';
import { UserDataSource, generateUserModel } from './models/User.js';
import { TaskDataSource, generateTaskModel } from './models/Task.js';
import { ProjectDataSource, generateProjectModel } from './models/Project.js';
import { projectResolvers } from './resolvers/projectResolvers.js';
import { taskResolvers } from './resolvers/taskResolvers.js';
import { userResolvers } from './resolvers/userResolvers.js';
import { userTypeDefs } from './typeDefs/userTypeDefs.js';
import { projectTypeDefs } from './typeDefs/projectTypeDefs.js';
import { taskTypeDefs } from './typeDefs/taskTypeDefs.js';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
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
`;

// Resolvers define how to fetch the types defined in your schema.
const resolvers = {
    Query: {
        ...userResolvers.Query, 
        ...projectResolvers.Query, 
        ...taskResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation, 
        ... projectResolvers.Mutation, 
        ...taskResolvers.Mutation
    }
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
export interface MyContext {
  userIsLoggedIn: boolean,
  "project code": boolean
  models: {
    User: UserDataSource,
    Project: ProjectDataSource,
    Task: TaskDataSource
  }
}
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
 
    context: async ({req})=> {
      // The user authentication will be handled by AUth0 Google, which says if the user has valid credentials
      try {
        const token = req.headers.authorization || '';
    
        console.log(req.headers.authorization)

        const projectCode = '';
        const userHasProjectCode = projectCode.length > 0;
    
        const decodedAccesToken = await validateToken(token);
        // const userIsAuthenticated = await validateToken(token).then(success =>  true).catch(fail => false)
        const userIsAuthenticated = decodedAccesToken ? true : false
        console.log('is', userIsAuthenticated, decodedAccesToken)

        if (!userIsAuthenticated && !userHasProjectCode) {
          throw new GraphQLError('Invalid user credentials', {
            extensions: {code: 'UNAUTHENTICATED', http: { status: 401 },}
          })
        } else {
          return {
            userIsLoggedIn: userIsAuthenticated,
            "project code": userHasProjectCode,
            models: {
              User: generateUserModel({userIsAuthenticated}),
              Task: generateTaskModel({userIsAuthenticated}),
              Project: generateProjectModel({userIsAuthenticated})
            }
           }
        }
      } catch (error) {
        console.log('error is', error.message)
        throw new GraphQLError('Invalid user credentials', {
          extensions: {code: 'UNAUTHENTICATED', http: { status: 401 }}
        })
      }

    },
    
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
