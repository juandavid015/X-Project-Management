import { Project } from "@prisma/client";
import { prisma } from "../db";
import { AssignMemberToProjectArgs, CreateProjectArgs, DeleteProjectArgs, GetAllProjectArgs, GetProjectArgs, UpdateProjectArgs } from "../types/types";
import { MemberConnectDisconnect } from "../types/types"
import { createPublicToken } from "../utils/validateToken";
import { generateRandomUsername } from "../utils/randomNames";
import { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";

export type PublicProject = {
  project: Project,
  token: string
}
export interface ProjectDataSource {
    getProjectById: (parent: unknown, args: GetProjectArgs) => Promise<Project>
    getAllProjects: (parent: unknown, args: GetAllProjectArgs) => Promise<Project[]>
    createProject: (parent: unknown, args: CreateProjectArgs) => Promise<Project>
    createPublicProject: (parent: unknown, args: CreateProjectArgs) => Promise<PublicProject>
    updateProject: (parent: unknown, args: UpdateProjectArgs) => Promise<Project>
    assignMemberToProject: (parent: unknown, args: AssignMemberToProjectArgs) => Promise<Project>
    deleteProject: (parent: unknown, args: DeleteProjectArgs) => Promise<Project>
}

export const generateProjectModel = ({userIsAuthenticated, userHasPartialAccess, userAuthenticated, userWithPartialAccess}):ProjectDataSource => ({
  
    getProjectById: async (_, args) => {
        return await prisma.project.findUnique({
        where: {
            id: args.projectId
        },
        include: {
            members: true,
            owner: true
        }
        })
    },
    getAllProjects: async (_, args) => {
        let userId = (userHasPartialAccess && userWithPartialAccess.id)  ||  args.userId
      
        let projects = await prisma.project.findMany({
          where: {
            members: {
              some: {
                id: {
                  equals: userId
                }
              }
            }
          },
            include: {
                members: true,
                owner: true
            }
        }, )

        return projects
    },

    createPublicProject: async (_, args) => {

      if(!userHasPartialAccess && !userIsAuthenticated) {
        let userId = new ObjectId();
        let newPublicUser = await prisma.user.create({
          data: {
              id: userId.toString(),
              name: generateRandomUsername(),
              email: '',
              image: 'https://res.cloudinary.com/dut4cwhtd/image/upload/v1690849436/LOGO_puijrn.png'
          }
          })
        let token = createPublicToken(newPublicUser)
        let project = await prisma.project.create({
          data: {
              title: 'New public project',
              description: 'This is a public project. Stored partially on your browser',
              label: 'sample project',
              token: token,
              members: {
                connect: {id: newPublicUser.id}
              }, 
              owner: {
                connect: {id: newPublicUser.id}
              }
          },
        })
  
        return {project, token}

      }
  },

    createProject: async (_, args) => {
        let {userId, ...projectData} = args;
        userId = (userHasPartialAccess && userWithPartialAccess.id)  ||  args.userId;

        return await prisma.project.create({
            data: {
                ...projectData,
                members: {
                    connect: {id: userId}
                },
                owner: {
                  connect: {id: userId}
                },
               
            },
            include: {
                members: true,
                owner: true
            }
        }, )
        
    },
    updateProject: async (_, args) => {
      
        let { id, userIds, ...projectData}: {
            members?: MemberConnectDisconnect; // Explicitly include members property in the data type
            [key: string]: any; // Allow any other properties (dynamic)
          } = args
        let userAuthenticatedId = (userHasPartialAccess && userWithPartialAccess.id) || userAuthenticated.id

        const project = await prisma.project.findUnique({
          where: {
              id: id
          }, 
          include: {
            members: true,
            owner: true
          }
        });

        if(project.ownerId !== userAuthenticatedId) {

          throw new GraphQLError('You are not authorized to perform this action', {
            extensions: {
              code: 'FORBIDDEN',
              http: { status: 403 }
            }
          })
        }
        if(userIds){
         

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
            id: id,
          },
          data: projectData,
          include: {
            members: true,
            owner: true
          },
        });
      
        return updatedProject;
      },

      assignMemberToProject: async (_, args) => {

        let {projectId, userEmail} = args
        let updatedProject: Project;
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
              owner: true
            },
          });


        } 

        return updatedProject

      },
    deleteProject: async (_, args) => {

        let { id } = args;
        let userAuthenticatedId = (userHasPartialAccess && userWithPartialAccess.id) || userAuthenticated.id

        const project = await prisma.project.findUnique({
          where: {
            id: id
          },
          include: {
            owner: true
          }
        })
        if(project.ownerId !== userAuthenticatedId) {

          throw new GraphQLError('You are not authorized to perform this action', {
            extensions: {
              code: 'FORBIDDEN',
              http: { status: 403 }
            }
          })
        }

        let deletedProject = await prisma.project.delete({
            where: {
                id: id
            }
        })

        return deletedProject;
    }
})