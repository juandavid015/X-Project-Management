import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { prisma } from './db.js';
import { GraphQLError } from 'graphql';
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # Type defines the queryable fields for every book in our data source.

  enum AllowedStatus {
    PENDING
    IN_PROGRESS 
    REVIEW 
    COMPLETED 
  }
  enum Priority {
    LOW 
    MODERATE
    HIGH
  }

  type User {
    id: String!,
    email: String!,
    name: String!
  }

  type Project {
    id: String!,
    title: String!,
    tasks: [Task],
    members: [User],
  }


  type Task {
    id: String!
    title: String!,
    description: String,
    status: [AllowedStatus],
    labels: [String],
    priority: Priority,
    timeline: String
    members: [User]

  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.

  type Query {
    getAllUsers: [User]
    getAllProjects: [Project]
    getProjectTasks(projectId: String!): [Task]
  }

  type Mutation {
    createUser(
      email: String,
      name: String
    ): User

    createProject(
      title: String
    ): Project

    createTask(
      title: String,
      description: String,
      status: [AllowedStatus],
      labels: [String],
      priority: Priority,
      timeline: String,
      projectId: String
    ): Task

    addMemberToProject(
      userId: String
      projectId: String
    ): Project

    assignMemberToTask(
      taskId: String
      userId: String
    ): Task
  }
`;
// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.
interface createUser {
    email: string,
    name: string
}

const resolvers = {
    Query: {
      getAllUsers: async () => await prisma.user.findMany(),
      getAllProjects: async (withMembers: Boolean) => await prisma.project.findMany({include: {members: true}}),
      getProjectTasks: async (root: any, args: any) => await prisma.task.findMany({where: {
        projectId: args.projectId
      }})
    },

    Mutation: {
        createUser: async (root: any, args: createUser) => await prisma.user.create({data: {email: args.email, name: args.name}}),
        createProject: async(root: any, args: any) => await prisma.project.create({data: {...args}}),
        createTask: async (root: any, args: any) => {
        let { projectId, ...taskData } = args

          return await prisma.task.create({data: {
            ...taskData,
            project: {
              connect: {id: projectId}
            }
          }, })

        },
        addMemberToProject: async (root: any, args: any) => {
          let { projectId, userId, ...projectData} = args
  
          let memberAdded = await prisma.project.update({
            where: {
              id: projectId
            },
            data: {
              ...projectData,
              members: {
                connect: {id: userId}
              }
            },
            include: {
              members: true
            }
          })

          return memberAdded
        },
        assignMemberToTask: async (root: any, args: any) => {
          let {taskId, userId, ...taskData} = args

          let memberAssigned = await prisma.task.update({
            where: {
              id: taskId
            }, 
            data: {
              ...taskData,
              members: {
                connect: {id: userId}
              }
            },
            include: {
              members: true
            }
          })

          return memberAssigned
        }
        
    },

  };

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
interface MyContext {
  userIsLoggedIn: boolean,
  "project code": boolean
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
 
    context: async ()=> {
      // The user authentication will be handled by AUth0 Google, which says if the user has valid credentials
      const token = 'TOKEN_ULTRA_SECRET_AND_SIGNED_XASQXD';
      const userIsAuthenticated = token.length > 0;
   

      const projectCode = 'PROJECT_CODE';
      const userHasProjectCode = projectCode.length > 0;

      if (!userIsAuthenticated && !userHasProjectCode) {
        throw new GraphQLError('Invalid user credentials', {
          extensions: {code: 'UNAUTHENTICATED'}
        })
      } else {
        return {
          userIsLoggedIn: userIsAuthenticated,
          "project code": userHasProjectCode
         }
      }

      },
    
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);
