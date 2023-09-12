import { object, ObjectSchema, string, array } from 'yup';
import { ProjectCreate, User } from '../types/types';
export const userSchema: ObjectSchema<User> = object({
    id: string().required(),
    email: string().email().required(),
    name: string().max(100, 'Name can not be longer than 100 characters.').required(),
    image: string().url('Image must be a valid url. E.g. "https://validimagelink.com/image/..."')
})
export const projectSchema: ObjectSchema<ProjectCreate> = object({
    id: string(),
    title: string().max(50, 'Title is too long! limit your title to 50 characters.').required(),
    description: string().max(250, 'Description is limited to 250 characters maximum.'),
    members: array().of(userSchema), // change this to userIds, so can add users on the creation.
    label: string().max(20, 'Label can not be longer than 20 characters.')

})