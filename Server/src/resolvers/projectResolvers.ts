import { MyContext } from "../index.js"
import { AssignMemberToProjectArgs, CreateProjectArgs, DeleteProjectArgs, GetAllProjectArgs, GetProjectArgs, UpdateProjectArgs } from "../types/types.js"
import { projectSchema } from "../validations/projectSchema.js"

export const projectResolvers = {
    Query: {
        // PROJECT
        getProject: (parent: unknown, args: GetProjectArgs, context: MyContext) =>
        context.models.Project.getProjectById(parent, args),

        getAllProjects: async (parent: unknown, args: GetAllProjectArgs, context: MyContext) => {
            await projectSchema.getAll.validate(args)
            return context.models.Project.getAllProjects(parent, args);
        }
    },
    Mutation: {
        // PROJECT
        createPublicProject: (parent: unknown, args: CreateProjectArgs, context: MyContext) => 
        context.models.Project.createPublicProject(parent, args),

        createProject: async (parent: unknown, args: CreateProjectArgs, context: MyContext) => {
            await projectSchema.create.validate(args, { abortEarly: true })    
            return context.models.Project.createProject(parent, args)
        },
        
        updateProject: async (parent: unknown, args: UpdateProjectArgs, contex: MyContext) => {
            await projectSchema.create.validate(args, { abortEarly: true })    
            return contex.models.Project.updateProject(parent, args)
        },
        
        assignMemberToProject: (parent: unknown, args: AssignMemberToProjectArgs, context: MyContext) =>
        context.models.Project.assignMemberToProject(parent, args),

        deleteMemberFromProject: (parent: unknown, args: AssignMemberToProjectArgs, context: MyContext) =>
        context.models.Project.deleteMemberFromProject(parent, args),

        deleteProject: (parent: unknown, args: DeleteProjectArgs, context: MyContext) => 
        context.models.Project.deleteProject(parent, args)
    }
}