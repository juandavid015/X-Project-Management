import { MyContext } from "..";
import { CreateUserArgs, GetAllUsersArgs, LoginUserArgs } from "../types/types";


// export type UserResolvers = {
//     Query: {
//         getAllUsers: (parent: unknown, args: CreateUserArgs, context: any) => Promise<User[]>;
//     },
//     Mutation: {
//         createUser: CreateUser 
//     }
// }
export const userResolvers = {
    Query: {
        // USER
        getAllUsers: (parent: unknown, args: GetAllUsersArgs, context: MyContext) => 
        context.models.User.getAllUsers(parent, args),
  
    }, 
    Mutation: {
        // USER
        loginUser: (parent: unknown, args: LoginUserArgs, context: MyContext) => 
        context.models.User.loginUser(parent, args),

        createUser: (parent: unknown, args: CreateUserArgs, context: MyContext) => 
        context.models.User.createUser(parent, args),
    }
}