import { array, number, object, string } from "yup";
import { userSchema } from "./userSchema.js";

import { ObjectId } from "mongodb";

export const taskSchema = {
    create: object({
        id: string(),
        title: string().required().max(20),
        description: string().max(200),
        status: string().oneOf(['PENDING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED']).required(),
        labels: array().of(object({
            color: string(),
            name: string().required()
        })),
        priority: string().oneOf(['HIGH', 'MODERATE', 'LOW', undefined]),
        timeline: string(),
        projectId: string().test({
            name: 'objectId',
            message: 'projectId must be in a valid "ObjectId" format',
            test: (value => ObjectId.isValid(value))
        }),
        userIds: array().of(string().test({
            name: 'objectId',
            message: 'userIds must be in a valid "ObjectId" format',
            test: (value => ObjectId.isValid(value))
        })),
        members: array().of(userSchema),
        indexPosition: number(),
        imageUrl: string().url('The url provided is invalid.')
    }),

    getAll: object({
        projectId: string().test({
            name: 'objectId',
            message: 'projectId must be in a valid "ObjectId" format',
            test: (value => ObjectId.isValid(value))
        }),
    })
}

