import { User } from "@prisma/client"
import { MyContext } from "..";
import { CreateUser, CreateUserArgs, GetAllUsersArgs } from "../types/types";


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
        createUser: (parent: unknown, args: CreateUserArgs, context: MyContext) => 
        context.models.User.createUser(parent, args),
    }
}