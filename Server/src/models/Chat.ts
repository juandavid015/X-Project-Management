import { Chat } from "@prisma/client";
import { prisma } from "../db.js";
import { ChatArgs } from "../types/types.js";

export interface ChatDataSource {
    createChat: (parent: unknown, args: ChatArgs) => Promise<Chat>
}

export const generateChatModel = ({ userIsAuthenticated, pubsub }): ChatDataSource => ({
    createChat: async (_, args) => {
        const { userIds, userId, discussionId, ...chatData } = args;

        const chatCreated = await prisma.chat.create({
            data: {
                ...chatData,
                createdBy: {
                    connect: { id: userId }
                },
                members: {
                    connect: userIds?.map((id: string) => ({id}))
                },
                discussion: discussionId 
                    ? { connect: { id: discussionId }}
                    : undefined
            }, 
            include: {
                messages: true,
                createdBy: true,
            }
        });

        return chatCreated;
    },
});