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
        }
    `, 
    query: `
        getAllProjects(userId: String!): [Project]
        getProject(projectId: String!): Project
    `,
    mutation: `
        createProject(
            userId: String!
            title: String!
            description: String
            label: String
        ): Project

        updateProject(
            userIds: [String]!
            projectId: String!
        ): Project

        assignMemberToProject(
            projectId: String!
            userEmail: String!
        ): Project
    `
}