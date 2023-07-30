
import { prisma } from "../db";
import { User } from "@prisma/client";
import { CreateUserArgs, GetAllUsersArgs } from "../types/types";


type CreateUser = (parent?: unknown, args?: CreateUserArgs)=> Promise<User>
type GetAllUsers = (parent: unknown, args: GetAllUsersArgs)=> Promise<User[]>

export interface UserDataSource {
    createUser: CreateUser,
    getAllUsers: GetAllUsers
}
export const generateUserModel = ({userIsAuthenticated}): UserDataSource => ({
    createUser: async (_, args) => {
        if(!userIsAuthenticated) {
            return null
        } else {
            return await prisma.user.create({data: {email: args.email, name: args.name, image: args.image}})
        }
        
    },
    getAllUsers: async () => await prisma.user.findMany(),
})