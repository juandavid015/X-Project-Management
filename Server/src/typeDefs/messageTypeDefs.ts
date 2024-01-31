export const messageTypeDefs = {
    type: `
        type Message {
            id: String!,
            userId: String!,
            content: String!,
            replyingToId: String
            attachment: String
            chatId: String
            createdBy: User
            createdAt: String
            replyingTo: Message
            replies: [Message]
            likes: Int
        }
    `, 
    query: `
        
    `,
    mutation: `
        createMessage(
            userId: String!,
            replyingToId: String
            chatId: String
            content: String!,
            attachment: String
            likes: Int!
        ): Message
        
    `
}