export const chatTypeDefs = {
    type: `
        type Chat {
            id: String!,
            userId: String!,
            createdBy: User
            messages: [Message]
            userIds: String
            members: [User]
            messagePinned: String
            discussionId: String
            createdAt: String
        }
    `, 
    query: `
        
    `,
    mutation: `
        createChat(
            userId: String!
            discussionId: String
        ): Chat
        
    `
}