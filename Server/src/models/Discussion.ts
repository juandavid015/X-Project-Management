import { Discussion } from "@prisma/client";
import { DiscussionArgs, GetDiscussionArgs } from "../types/types.js";
import { prisma } from "../db.js";

export interface DiscussionDataSource {
    createDiscussion: (parent: unknown, args: DiscussionArgs) => Promise<Discussion>,
    getDiscussionById: (parent: unknown, args: GetDiscussionArgs) => Promise<Discussion>,
    getDiscussions: (parent: unknown, args: GetDiscussionArgs) => Promise<Discussion[]>,
}

export const generatediscussionModel = ({ userIsAuthenticated, pubsub }): DiscussionDataSource => ({

    createDiscussion: async (_, args) => {
        const { userId, userIds, chatId, chat, projectId, ...discussionData } = args;
        // const { discussionId, ...chatData } = chat;

        const discussionCreated = await prisma.discussion.create({
            data: {
                ...discussionData,
                createdBy: {
                    connect: { id: userId }
                },
                members: {
                    connect: userIds?.map((id: string) => ({id}))
                }, 
                chat: {
                    create: {
                        // ...chatData,
                        createdBy: {
                            connect: { id: userId }
                        },
                        members: {
                            connect: userIds?.map((id: string) => ({id}))
                        },
                        
                    }, 
                    
                },
                project: {
                    connect: { id: projectId }
                }
            }, 

            include: {
                chat: {
                    include: { messages: true, members: true}
                },
                createdBy: true,
                members: true,
            }
        });

        return discussionCreated;
    },

    getDiscussionById : async (_, args) => {
        const { discussionId, projectId } = args;

        const discussion  = await prisma.discussion.findUnique({
            where: {
                id: discussionId
            },
            include: {
                chat: {
                    include: {
                        members: true,
                        createdBy: true,
                        messages: {
                            include: {
                                createdBy: true
                            }
                        }
                    }
                },
                members: true,
                createdBy: true
            }
        })

        return discussion
    },

    getDiscussions : async (_, args) => {
        const { projectId } = args;
        
        const discussions = await prisma.discussion.findMany({
            where: {
                projectId: projectId,
            },
            include: {
                chat: true,
                members: true,
                createdBy: true
            }
        })

        return discussions
    }
});