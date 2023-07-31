
import { prisma } from "../db";
import { User } from "@prisma/client";
import { CreateUserArgs, GetAllUsersArgs, LoginUserArgs } from "../types/types";
import { UserAuthenticated } from "..";


type CreateUser = (parent?: unknown, args?: CreateUserArgs)=> Promise<User>
type GetAllUsers = (parent: unknown, args: GetAllUsersArgs)=> Promise<User[]>
type LoginUser = (parent: unknown, args: LoginUserArgs) => Promise<User>

export interface UserDataSource {
    createUser: CreateUser,
    getAllUsers: GetAllUsers,
    loginUser: LoginUser
}

export const generateUserModel = (userAuthenticated: UserAuthenticated): UserDataSource => ({
    createUser: async (_, args) => {
        const createdUser = await prisma.user.create({
            data: {email: args.email, name: args.name, image: args.image}
        });

        return createdUser
        
    },
    getAllUsers: async () => {
        const users = await prisma.user.findMany()
        return users
    },

    loginUser: async() => {

        const {email, name, image} = userAuthenticated

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })  

        if(user) {
            return user

        } else {
            let userCreated = await prisma.user.create({
                data: {
                    email: email,
                    name: name,
                    image: image
                }
            })
            return userCreated
        }

    }
})