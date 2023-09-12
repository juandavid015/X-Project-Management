import { ObjectSchema, array, object, string } from "yup";
import { Project,  } from "@prisma/client";
import { ObjectId } from "mongodb";

export const projectSchema: ObjectSchema<Project> = object({
    id: string(),
    title: string().max(50).required(),
    description: string().max(250),
    label: string().max(20),
    userIds: array().of(string().test({
        name: 'objectId',
        message: 'userIds must be in a valid "ObjectId" format',
        test: (value => ObjectId.isValid(value))
    })),
    token: string()
})