export const projectTypeDefs = {
    type: `
        enum ProjectPermissions {
            VIEW
            EDIT
            ADMIN
        }
        type ProjectPermission {
            id: String!
            projectId: String!
            userId: String!
            role: ProjectPermissions
        }
        type Project {
            id: String!,
            userIds: [String]
            description: String
            label: String
            title: String!
            tasks: [Task]
            members: [User]
            token: String
            owner: User
            ownerId: String
            userPermissions: [ProjectPermission]
        }
        type PublicProject {
            project: Project
            token: String
        }
    `, 
    query: `
        getAllProjects(userId: String!): [Project]
        getProject(projectId: String!): Project
    `,
    mutation: `
        createPublicProject: PublicProject
        createProject(
            userId: String!
            title: String!
            description: String
            label: String
        ): Project

        updateProject(
            id: String!
            userIds: [String]
            title: String!
            description: String
            label: String
        ): Project

        assignMemberToProject(
            projectId: String!
            userEmail: String!
            userId: String
            role: ProjectPermissions!
        ): Project

        deleteMemberFromProject(
            projectId: String!
            userEmail: String!
            userId: String!
        ): Project

        deleteProject(
            id: String!
        ): Project
    `
}