import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient();

export async function getNextId() {
    // const sequence = await prisma.sequence.update({
    //     where : {id: "taskId"},
    //     data: { sequence_value: { increment: 1} },
    //     select: { sequence_value: true },
    // })
    // return sequence.sequence_value;
    const timestamp = Date.now();
    const uniqueFloat = parseFloat(timestamp.toString());
    return uniqueFloat;
}