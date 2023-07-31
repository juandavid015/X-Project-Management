import { Project, Task, User } from "@prisma/client";

export interface MemberConnectDisconnect {
    connect?: { id: string }[];
    disconnect?: { id: string }[];
  }
// USER RESOLVER TYPES
export type CreateUserArgs = Pick<User, 'email' | 'image' |'name'>

export type CreateUser = (parent: unknown, args: CreateUserArgs, context: any)=> Promise<User>

export type LoginUserArgs = undefined
export type GetAllUsersArgs = null

// TASK RESOLVER TYPES
export type GetProjectTasksArgs = {
    projectId: string
}
export type TaskExt = Task & {
    members: User[]
}
export type CreateTaskArgs = Task 

export type UpdateTaskArgs = Task 

export type RemoveTaskArgs = Pick<Task, 'id' >

export type MoveTaskArgs = Pick<Task, 'id' |  'status' > & {
    actualTaskId: Task['id']
    newStatus: Task['status']
    previousTaskPosition: number
    actualTaskPosition: number
    nextTaskPosition: number
}
export type AssignMemberToTaskArgs = Task & Pick<User ,'id'> & {
    taskId: Task['id']
    userId: User['id']
}

// PROJECT RESOLVER TYPES
export type GetProjectArgs = Pick<Project, 'id'> & {
    projectId: Project['id']
}
export type GetAllProjectArgs = {
    userId: User['id']
}

export type CreateProjectArgs = Project & {
    userId: User['id']
}

export type UpdateProjectArgs = Project & {
    projectId: Project['id']
}

export type AssignMemberToProjectArgs = Pick<Project, 'id'> & Pick<User, 'email'> & {
    projectId: Project['id']
    userEmail: User['email']
}
