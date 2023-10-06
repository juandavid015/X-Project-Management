export const projectTypeDefs = {
    type: `
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
        ): Project

        deleteMemberFromProject(
            projectId: String!
            userEmail: String!
        ): Project

        deleteProject(
            id: String!
        ): Project
    `
}