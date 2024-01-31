export const discussionTypeDefs = {
    type: `
        type Discussion {
            id: String!
            userId: String!
            createdBy: User
            title: String!
            description: String
            subjects: [String]
            chatId: String
            chat: Chat
            userIds: [String]
            members: [User]
            createdAt: String

        }
    `, 
    query: `
        getDiscussion(discussionId: String!): Discussion
        getDiscussions(projectId: String!): [Discussion]
    `,
    mutation: `
        createDiscussion(
            projectId: String!
            userId: String!
            title: String!
            description: String
            subjects: [String]
            userIds: [String]
        ): Discussion
        
    `
}