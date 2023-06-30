import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { prisma } from './db.js';
import { GraphQLError } from 'graphql';
import {validateToken} from './utils/validateToken.js';
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
  input UserInput {
    id: String!,
    email: String!,
    name: String!,
    image: String
  }
  type User {
    id: String!,
    email: String!,
    name: String!,
    image: String
  }

  type Project {
    id: String!,
    userIds: [String]
    title: String!,
    tasks: [Task],
    members: [User],
  }

  input LabelInput {
    name: String!,
    color: String
  }
  type Label {
    name: String!,
    color: String
  }
  type Task {
    id: String!
    title: String!,
    description: String,
    status: AllowedStatus,
    labels: [Label],
    priority: Priority,
    timeline: String
    members: [User]
    userIds: [String]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each.

  type Query {
    getAllUsers: [User]
    getAllProjects: [Project]
    getProjectTasks(projectId: String!): [Task]
    getProject(projectId: String!): Project
  }

  type Mutation {
    createUser(
      email: String!,
      name: String!,
      image: String
    ): User

    createProject(
      title: String
    ): Project

    createTask(
      id: String
      title: String,
      description: String,
      status: AllowedStatus,
      labels: [LabelInput],
      priority: Priority,
      timeline: String,
      projectId: String,
      userIds: [String]
    ): Task

    updateTask (
      id: String!,
      userIds: [String],
      title: String,
      description: String,
      status: AllowedStatus,
      labels: [LabelInput],
      priority: Priority,
      timeline: String,
      projectId: String,
    ): Task

    removeTask (
      id: String!
    ): Task


    updateProject(
      userIds: [String]!
      projectId: String!
    ): Project

    assignMemberToProject(
      projectId: String!
      userEmail: String!
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
    name: string,
    image?: string
}

const resolvers = {
    Query: {
      getAllUsers: async () => await prisma.user.findMany(),
      getAllProjects: async (withMembers: Boolean) => await prisma.project.findMany({include: {members: true}}),
      getProjectTasks: async (root: any, args: any, context) => {
        // throw new GraphQLError('Invalid user credentials', {
        //   extensions: {code: 'UNAUTHENTICATED', }
        // })
         return await prisma.task.findMany({
          where: {
            projectId: args.projectId
           },
           include: {
            members: true
           }
          })
      },
      getProject: async (root: any, args: any, context) => {
        return await prisma.project.findUnique({
          where: {
            id: args.projectId
          },
          include: {
            members: true
          }
        })
      }
    },

    Mutation: {
        createUser: async (root: any, args: createUser) => await prisma.user.create({data: {email: args.email, name: args.name, image: args.image}}),
        createProject: async(root: any, args: any) => await prisma.project.create({data: {...args}}),
        createTask: async (root: any, args: any) => {
        let { projectId, userIds, id, ...taskData } = args

     
          return await prisma.task.create({data: {
            ...taskData,
            project: {
              connect: {id: projectId}
            },
            members: {
              connect: userIds.map((id: number) => ({id}))
            },
            
          }, 
          include: {
            members: true
          }
        })

        },
        updateTask: async (root: any, args: any) => {
          const { id, userIds, ...taskData } = args;
          const data = { ...taskData };
        
          if (userIds) {
            const task = await prisma.task.findUnique({
              where: {
                id: id,
              },
              include: {
                members: true,
              },
            });
        
            const existingMembers = task.members.map((member) => member.id);
        
            const membersToAdd = userIds.filter((userId: string) => !existingMembers.includes(userId));
            const membersToRemove = existingMembers.filter((memberId) => !userIds.includes(memberId));
        
            data.members = {
              connect: membersToAdd.map((userId: string) => ({ id: userId })),
              disconnect: membersToRemove.map((userId) => ({ id: userId })),
            };
          }
        
          const updatedTask = await prisma.task.update({
            where: {
              id: id,
            },
            data: data,
            include: {
              members: true,
            },
          });
        
          return updatedTask;
        },

        removeTask: async(root: any, args: any) => {
          const {id} = args;
          const deletedTask = await prisma.task.delete({
            where: {
              id: id
            }
          })

          return deletedTask;
        },
 
        updateProject: async (root: any, args: any) => {
          let { projectId, userIds, ...projectData} = args

          if(userIds){
            const project = await prisma.project.findUnique({
              where: {
                id: projectId
              }, 
              include: {
                members: true
              }
            });

            const existingMembers = project.members.map((member) => member.id);
        
            const membersToAdd = userIds.filter((userId: string) => !existingMembers.includes(userId));
            const membersToRemove = existingMembers.filter((memberId) => !userIds.includes(memberId));
        
            projectData.members = {
              connect: membersToAdd.map((userId: string) => ({ id: userId })),
              disconnect: membersToRemove.map((userId) => ({ id: userId })),
          };
          }
          
          
          const updatedProject = await prisma.project.update({
            where: {
              id: projectId,
            },
            data: projectData,
            include: {
              members: true,
            },
          });
        
          return updatedProject;
        },

        assignMemberToProject: async (root: any, args: any) => {

          let {projectId, userEmail} = args
          let updatedProject;
          const userToAssign = await prisma.user.findUnique({
            where: {
              email: userEmail
            }
          })
          if (userToAssign) {
            updatedProject = await prisma.project.update({
              where: {
                id: projectId,
              },
              data: {
                members: {
                  connect: {email: userEmail}
                },
              },
              
              include: {
                members: true,
              },
            });


          } 

          return updatedProject
  
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
    // formatError: (error) => {
    //   if (error.extensions.code === 'UNAUTHENTICATED') {
    //     // Return a 401 status code for UNAUTHENTICATED errors
    //     return new GraphQLError('Invalid user credentials', null, null, null, null, null, {
    //       code: 'UNAUTHENTICATED',
    //       statusCode: 401,
    //     });
    //   }
    //   // For other errors, return the default formatted error
    //   return error;
    // },
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
        console.log('is', userIsAuthenticated)

        if (!userIsAuthenticated && !userHasProjectCode) {
          throw new GraphQLError('Invalid user credentials', {
            extensions: {code: 'UNAUTHENTICATED', http: { status: 401 },}
          })
        } else {
          return {
            userIsLoggedIn: userIsAuthenticated,
            "project code": userHasProjectCode
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
