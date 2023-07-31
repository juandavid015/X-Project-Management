import { Project } from "@prisma/client";
import { prisma } from "../db";
import { AssignMemberToProjectArgs, CreateProjectArgs, GetAllProjectArgs, GetProjectArgs, UpdateProjectArgs } from "../types/types";
import { MemberConnectDisconnect } from "../types/types"
;
export interface ProjectDataSource {
    getProjectById: (parent: unknown, args: GetProjectArgs) => Promise<Project>
    getAllProjects: (parent: unknown, args: GetAllProjectArgs) => Promise<Project[]>
    createProject: (parent: unknown, args: CreateProjectArgs) => Promise<Project>
    updateProject: (parent: unknown, args: UpdateProjectArgs) => Promise<Project>
    assignMemberToProject: (parent: unknown, args: AssignMemberToProjectArgs) => Promise<Project>
}

export const generateProjectModel = ({userIsAuthenticated}):ProjectDataSource => ({
  
    getProjectById: async (_, args) => {
        return await prisma.project.findUnique({
        where: {
            id: args.projectId
        },
        include: {
            members: true
        }
        })
    },
    getAllProjects: async (_, args) => {
      const {userId} = args;
        return await prisma.project.findMany({
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
                tasks: true
            }
        })
    },
    createProject: async (_, args) => {
        const {userId, ...projectData} = args

        return await prisma.project.create({
            data: {
                ...projectData,
                members: {
                    connect: {id: userId}
                }
            },
            include: {
                members: true
            }
        }, )
        
    },
    updateProject: async (_, args) => {
        let { projectId, userIds, ...projectData}: {
            members?: MemberConnectDisconnect; // Explicitly include members property in the data type
            [key: string]: any; // Allow any other properties (dynamic)
          } = args

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
            },
          });


        } 

        return updatedProject

      },
})