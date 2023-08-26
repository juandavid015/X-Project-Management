import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {validatePublicToken, validateToken} from './utils/validateToken.js';
import { UserDataSource, generateUserModel } from './models/User.js';
import { TaskDataSource, generateTaskModel } from './models/Task.js';
import { ProjectDataSource, generateProjectModel } from './models/Project.js';
import { projectResolvers } from './resolvers/projectResolvers.js';
import { taskResolvers } from './resolvers/taskResolvers.js';
import { userResolvers } from './resolvers/userResolvers.js';
import { userTypeDefs } from './typeDefs/userTypeDefs.js';
import { projectTypeDefs } from './typeDefs/projectTypeDefs.js';
import { taskTypeDefs } from './typeDefs/taskTypeDefs.js';
import { authenticationAndAccessGuard } from './plugins/plugins.js';
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
export type UserAuthenticated = {
    id?: string,
    name: string,
    email: string,
    image: string, 
    emailIsVerified: boolean
}
export type UserWithPartialAccess = & UserAuthenticated 
export interface MyContext {
    userIsLoggedIn: boolean,
    userAuthenticated: UserAuthenticated
    userHasPartialAccess: boolean
    userWithPartialAccess: UserWithPartialAccess
    models: {
        User: UserDataSource,
        Project: ProjectDataSource,
        Task: TaskDataSource
    }
}
const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [
        authenticationAndAccessGuard
    ]
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
 
    context: async ({req})=> {
    // The user authentication will be handled by AUth0 Google, which says if the user has valid credentials
        let authorization = req.headers.authorization || null;
        let token = authorization && authorization.startsWith('bearer') && authorization.split(' ')[1] ;
        let identifier = authorization && authorization.startsWith('publicIdentifier') && authorization.split(' ')[1];
        let projectCode = '';
        let decodedAccesToken: unknown;
        let userIsAuthenticated: boolean;
        let userAuthenticated:UserAuthenticated;
        let userWithPartialAccess: UserWithPartialAccess;
        let userHasPartialAccess: boolean;
        let decodedPublicAccessToken: unknown;

        // console.log(req.headers.authorization)
        // console.log('REQ MIDLWR', identifier)
        try {
        
            projectCode = '';
            decodedPublicAccessToken = identifier && await validatePublicToken(identifier)
            decodedAccesToken = token && await validateToken(token);
            // const userIsAuthenticated = await validateToken(token).then(success =>  true).catch(fail => false)
            userIsAuthenticated = decodedAccesToken ? true : false
            userHasPartialAccess = decodedPublicAccessToken ? true : false
            

            const {id, name, email, image, emailIsVerified} = 
            decodedAccesToken ? decodedAccesToken as UserAuthenticated:
            decodedPublicAccessToken as UserWithPartialAccess

            userAuthenticated = {id, name, email, image, emailIsVerified} 
            userWithPartialAccess = {id, name, email, image, emailIsVerified} 
            // console.log('is', userIsAuthenticated,  userHasPartialAccess, userWithPartialAccess )
        } catch (error) {
            console.error('Error on validating token',  error.message)
        }

        return {
            userIsLoggedIn: userIsAuthenticated,
            userAuthenticated: userAuthenticated,
            userHasPartialAccess: userHasPartialAccess,
            userWithPartialAccess: userWithPartialAccess,
            models: {
                User: generateUserModel(userAuthenticated),
                Task: generateTaskModel({userIsAuthenticated}),
                Project: generateProjectModel({userIsAuthenticated, userHasPartialAccess, userAuthenticated, userWithPartialAccess})
            }
        
        }
    },
    
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
