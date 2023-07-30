export const projectTypeDefs = {
    type: `
        type Project {
            id: String!,
            userIds: [String]
            title: String!,
            tasks: [Task],
            members: [User],
        }
    `, 
    query: `
        getAllProjects: [Project]
        getProject(projectId: String!): Project
    `,
    mutation: `
        createProject(
            title: String
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