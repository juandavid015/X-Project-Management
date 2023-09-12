import { GraphQLError } from "graphql";
import { MyContext } from "..";
import { CreateUserArgs, GetAllUsersArgs, LoginUserArgs } from "../types/types";
import { userSchema } from "../validations/userSchema";
import { ApolloServerErrorCode } from '@apollo/server/errors';
import {ValidationError} from 'yup'

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

        createUser: async (parent: unknown, args: CreateUserArgs, context: MyContext) => {

            await userSchema.validate(args, { abortEarly: false })
            return context.models.User.createUser(parent, args)
        }
        
    }
}