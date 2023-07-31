export const userTypeDefs = {
    type: `
        type User {
            id: String!,
            email: String!,
            name: String!,
            image: String
        }
    `, 
    query: `
        getAllUsers: [User]
    `,
    mutation: `
        createUser(
            email: String!,
            name: String!,
            image: String
        ): User
        
        loginUser: User
    `
}