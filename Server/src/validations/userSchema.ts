import { object, string } from "yup";

export const userSchema = object({
    name: string().required().max(100),
    email: string().email(),
    image: string().url()
    
})