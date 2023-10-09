import { Project, ProjectPermissions } from "@prisma/client";
import { prisma } from "../db.js";
import { AssignMemberToProjectArgs, CreateProjectArgs, DeleteProjectArgs, GetAllProjectArgs, GetProjectArgs, UpdateProjectArgs } from "../types/types.js";
import { MemberConnectDisconnect } from "../types/types.js"
import { createPublicToken } from "../utils/validateToken.js";
import { generateRandomUsername } from "../utils/randomNames.js";
import { ObjectId } from "mongodb";
import { GraphQLError } from "graphql";

export type PublicProject = {
    project: Project,
    token: string
}
export type AllowedPermissions =Array<ProjectPermissions>
const authorizeUserToProject = (
    allowedPermissions: AllowedPermissions, 
    projectUserRole: ProjectPermissions, 
    projectOwnerId: string,
    userId: string
    ) => {

    if(projectOwnerId === userId) {
        return 
    } else if (allowedPermissions.includes(projectUserRole)) {
        return 
    } else {
        throw new GraphQLError('You are not authorized to perform this action', {
            extensions: {
              code: 'FORBIDDEN',
              http: { status: 403 },
            },
        });
    }
}
export interface ProjectDataSource {
    getProjectById: (parent: unknown, args: GetProjectArgs) => Promise<Project>
    getAllProjects: (parent: unknown, args: GetAllProjectArgs) => Promise<Project[]>
    createProject: (parent: unknown, args: CreateProjectArgs) => Promise<Project>
    createPublicProject: (parent: unknown, args: CreateProjectArgs) => Promise<PublicProject>
    updateProject: (parent: unknown, args: UpdateProjectArgs) => Promise<Project>
    assignMemberToProject: (parent: unknown, args: AssignMemberToProjectArgs) => Promise<Project>
    deleteMemberFromProject: (parent: unknown, args: AssignMemberToProjectArgs) => Promise<Project>
    deleteProject: (parent: unknown, args: DeleteProjectArgs) => Promise<Project>
}

export const generateProjectModel = ({ userIsAuthenticated, userHasPartialAccess, userAuthenticated, userWithPartialAccess }): ProjectDataSource => ({

    // GET THE PROJECT 
    getProjectById: async (_, args) => {
        let userAuthenticatedId = userAuthenticated.id || (userHasPartialAccess && userWithPartialAccess.id)
        return await prisma.project.findFirst({
            where: {
                id: args.projectId,
                members: {
                    some: {
                        id: {
                            equals: userAuthenticatedId
                        }
                    }
                }
            },
            include: {
                members: true,
                owner: true,
                userPermissions: true
            }
        })
    },

    // GET ALL THE PROJECTS
    getAllProjects: async (_, args) => {

        let userId = args.userId || (userHasPartialAccess && userWithPartialAccess.id)

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
                owner: true,
                userPermissions: true
            }
        },)
        return projects
    },

    // GET PROJECT BUT FOR PUBLIC ACCESS
    createPublicProject: async (_, args) => {

        if (!userHasPartialAccess && !userIsAuthenticated) {
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
                        connect: { id: newPublicUser.id }
                    },
                    owner: {
                        connect: { id: newPublicUser.id }
                    }
                },
            })

            return { project, token }

        }
    },

    // CREATE A PROJECT
    createProject: async (_, args) => {

        let { userId, ...projectData } = args;
        userId = (userHasPartialAccess && userWithPartialAccess.id) || args.userId;

        return await prisma.project.create({
            data: {
                ...projectData,
                members: {
                    connect: { id: userId }
                },
                owner: {
                    connect: { id: userId }
                },

            },
            include: {
                members: true,
                owner: true
            }
        },)

    },

    // UPDATE A PROJECT
    updateProject: async (_, args) => {

        let { id, userIds, ...projectData }: {
            members?: MemberConnectDisconnect; // Explicitly include members property in the data type
            [key: string]: any; // Allow any other properties (dynamic)
        } = args
        let userAuthenticatedId = userAuthenticated.id || (userHasPartialAccess && userWithPartialAccess.id)

        const project = await prisma.project.findUnique({
            where: {
                id: id
            },
            include: {
                members: true,
                owner: true,
                userPermissions: {
                    where: { userId: userAuthenticatedId }
                }
            }
        });

        // verify if the user has the needed permissions to continue 
        const allowedPermissions: AllowedPermissions = ['ADMIN', 'EDIT'];
        console.log(project.ownerId, userAuthenticatedId)
        authorizeUserToProject(
            allowedPermissions,
            project?.userPermissions[0]?.role,
            project?.ownerId,
            userAuthenticatedId
        );
           
        if (userIds) {

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

    // ASSIGN MEMBER/ROLE TO A PROJECT
    assignMemberToProject: async (_, args) => {

        let { projectId, userEmail, role, userId } = args
        let userAuthenticatedId = userAuthenticated.id || (userHasPartialAccess && userWithPartialAccess.id)
        let updatedProject: Project;
        const allowedPermissions: AllowedPermissions = ['ADMIN'];

        // Find if the user already exists
        const userToBeAdded = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            include: {
                projectPermissions: {
                    where: {
                        projectId: projectId
                    }
                }
            }
        })
    
        if (userToBeAdded) {    
            const userProjectPermission = await prisma.projectPermission.findFirst({
                where: {
                    projectId: projectId,
                    userId: userAuthenticatedId
                },
                include: {
                    project: true
                }
            })
  
            // Verify if the user is allowed to continue
            authorizeUserToProject (
                allowedPermissions, 
                userProjectPermission?.role, 
                userProjectPermission?.project?.ownerId, 
                userAuthenticatedId
            );

            if (userToBeAdded?.projectPermissions[0]?.role) {
                // As the project permission existe, it must be update with the new role
                const userToModifyPermissionIsAdmin = (userProjectPermission.project.ownerId === userToBeAdded.id) 
                || ((userProjectPermission.project.ownerId !== userAuthenticatedId) && (userToBeAdded.projectPermissions[0].role === 'ADMIN'))
                // Only allow to change role if the user target is not already an admin or the owner of the project
                if(userToModifyPermissionIsAdmin) {
                    throw new GraphQLError('You are not authorized to perform this action', {
                        extensions: {
                            code: 'FORBIDDEN',
                            http: { status: 403 },
                        },
                    });

                } else {
                    await prisma.projectPermission.update({
                        where: { id: userToBeAdded.projectPermissions[0].id},
                        data: { role }
                    })
                }
               
            } else {
                // Create a permission for the project with the role to be setted
                await prisma.projectPermission.create({
                    data: {
                        role,
                        project: {
                            connect: { id: projectId }
                        },
                        user: {
                            connect: { id: userId }
                        }
                    },
                    include: {
                        project: true
                    }
                })

            }
            // Apply all the changes to the project
            updatedProject = await prisma.project.update({
                where: {
                    id: projectId,
                },
                data: {
                    members: {
                        connect: { email: userEmail }
                    }
                },

                include: {
                    members: true,
                    owner: true,
                    userPermissions: true
                },
            });
        }

        return updatedProject

    },

    // DELETE A MEMBER FROM PROJECT
    deleteMemberFromProject: async (_, args) => {

        const allowedPermissions: AllowedPermissions = ['ADMIN'];
        let userAuthenticatedId = userAuthenticated.id || (userHasPartialAccess && userWithPartialAccess.id)
        let { projectId, userEmail, userId } = args
        let updatedProject: Project;

        const userToBeRemoved = await prisma.user.findUnique({
            where: {
                email: userEmail
            },
            include: {
                projectPermissions: {
                    where: {
                        userId: userId,
                        projectId: projectId
                    }
                },
                ownedProjects: {
                    select: {
                        ownerId: true
                    },
                }
            }
        })
        if (userToBeRemoved) {
            // Verify if the user making the request (authorized user) is allowed to continue
            const userProjectPermission = await prisma.projectPermission.findFirst({
                where: {
                    projectId: projectId,
                    userId: userAuthenticatedId
                }, 
                include: {
                    project: true
                }
            })
            
            authorizeUserToProject(
                allowedPermissions, 
                userProjectPermission?.role,
                userProjectPermission?.project?.ownerId,
                userAuthenticatedId
            );

            updatedProject = await prisma.project.update({
                where: {
                    id: projectId,
                },
                data: {
                    members: {
                        disconnect: { email: userEmail }
                    },
                },

                include: {
                    members: true,
                    owner: true,
                    userPermissions: true
                },
            });
        }

        return updatedProject

    },

    // DELETE PROJECT
    deleteProject: async (_, args) => {
        const allowedPermissions: AllowedPermissions = ['ADMIN'];
        let { id } = args;
        let userAuthenticatedId = (userHasPartialAccess && userWithPartialAccess.id) || userAuthenticated.id

        const project = await prisma.project.findUnique({
            where: {
                id: id
            },
            include: {
                owner: true,
                userPermissions: {
                    where: {
                        userId: userAuthenticatedId
                    }
                }
            }
        })
        // Verify if the user is allowed to continue
        authorizeUserToProject(
            allowedPermissions, 
            project?.userPermissions[0]?.role,
            project.ownerId,
            userAuthenticatedId
        );

        let deletedProject = await prisma.project.delete({
            where: {
                id: id
            }
        })

        return deletedProject;
    }
})