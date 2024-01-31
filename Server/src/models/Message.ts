import { Message } from "@prisma/client";
import { MessageArgs } from "../types/types.js";
import { prisma } from "../db.js";

export interface MessageDataSource {
    createMessage: (parent: unknown, args: MessageArgs) => Promise<Message>
}

export const generateMessageModel = ({ userIsAuthenticated, pubsub }): MessageDataSource => ({
    createMessage: async (_, args) => {
        const { userId, replyingToId, chatId, ...messageData } = args;

        const messageCreated = await prisma.message.create({
            data: {
                ...messageData,
                createdBy: {
                    connect: { id: userId }
                },
                chat: {
                    connect: { id: chatId }
                },
                // If replyingToId is provided, connect it to the replied message
                replyingTo: replyingToId
                    ? { connect: { id: replyingToId } }
                    : undefined, // If it's null or undefined, don't connect it
            },
            include: {
                replies: true,
                replyingTo: true,
                createdBy: true,
            }
        });

        return messageCreated;
    },
});

// if(replyingToId) {
//     messageCreated = await prisma.message.create({
//         data: {
            
//             createdBy: {
//                 connect: {id: userId}
//             },
//             chat: {
//                 connect: {id: chatId}
//             },
//             replies: {
//                 connect: {id: replyingToId}
//             }
//         },
//     })

// }