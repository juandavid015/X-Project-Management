
import { prisma } from "../db";
import { User } from "@prisma/client";
import { CreateUserArgs, GetAllUsersArgs, LoginUserArgs } from "../types/types";

import {ObjectId} from 'mongodb'
import { UserAuthenticated } from "../authentication/authenticateUser";

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
        let userId = args.id;
        if(!ObjectId.isValid(args.id)) {
            userId = new ObjectId().toString();
        }

        const createdUser = await prisma.user.create({
            data: {id: userId, email: args.email, name: args.name, image: args.image}
        });

        return createdUser
        
    },
    getAllUsers: async () => {
        const users = await prisma.user.findMany()
        return users
    },

    loginUser: async() => {

        const { id, email, name, image } = userAuthenticated

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })  

        if(user) {
            // This is not the best way to handle the next situation, but:
            // if the the user in the auth0 for some reason is unnattached from the actual db
            // (as were not registered anymore, but actually the user exist on the db)
            // the user is removed and created again with the credential and data of the auth0 (google log in)
            if(user.id !== userAuthenticated.id) {
                await prisma.user.delete({
                    where: {
                        email: email
                    }
                })

                await prisma.user.create({
                    data: {
                        id,
                        email,
                        name,
                        image
                    }
                })
            }
            return user

        } else {
            let userCreated = await prisma.user.create({
                data: {
                    id: id,
                    email: email,
                    name: name,
                    image: image
                }
            })

            return userCreated
        }

    }
})