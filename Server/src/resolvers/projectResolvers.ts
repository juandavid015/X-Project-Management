import { MyContext } from ".."
import { AssignMemberToProjectArgs, CreateProjectArgs, GetAllProjectArgs, GetProjectArgs, UpdateProjectArgs } from "../types/types"
import { projectSchema } from "../validations/projectSchema"

export const projectResolvers = {
    Query: {
        // PROJECT
        getProject: (parent: unknown, args: GetProjectArgs, context: MyContext) =>
        context.models.Project.getProjectById(parent, args),

        getAllProjects: (parent: unknown, args: GetAllProjectArgs, context: MyContext) => 
        context.models.Project.getAllProjects(parent, args),
    },
    Mutation: {
        // PROJECT
        createPublicProject: (parent: unknown, args: CreateProjectArgs, context: MyContext) => 
        context.models.Project.createPublicProject(parent, args),

        createProject: async (parent: unknown, args: CreateProjectArgs, context: MyContext) => {
            await projectSchema.validate(args, { abortEarly: true })    
            return context.models.Project.createProject(parent, args)
        },
        
        updateProject: (parent: unknown, args: UpdateProjectArgs, contex: MyContext) => {
            return contex.models.Project.updateProject(parent, args)
        },
        
        assignMemberToProject: (parent: unknown, args: AssignMemberToProjectArgs, context: MyContext) =>
        context.models.Project.assignMemberToProject(parent, args),
    }
}