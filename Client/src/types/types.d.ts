export type Status = 'PENDING' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED';

export type Priority = "HIGH" | "MODERATE" | "LOW" | null;

export  interface Label {
    name: string,
    color: string
}
export interface User {
    id: string!,
    email: string!
    name: string!,
    image: string
}

export interface Task {
    id: string,
    title: string,
    description: string,
    labels: Label[]
    status: Status
    timeline: string,
    priority: Priority,
    projectId?: string,
    members: User[] | [],
    userIds: string[] | [],
    indexPosition: number
}

export interface TaskCreate extends Task {
    id?: string
    projectId: string | undefined //undefined must be removed
}

