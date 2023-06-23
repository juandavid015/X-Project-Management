export enum Status {
    PENDING = 'PENDING',
    IN_PROGRESS = 'IN_PROGRESS',
    REVIEW = 'REVIEW',
    COMPLETED = 'COMPLETED'
}


export  interface Label {
    name: string,
    color: string
}

export interface Task {
    id: string,
    title: string,
    description: string,
    labels?: any, //change to [Label]
    status: string
    timeline: string,
    priority: string,
    projectId?: string,

}

export interface TaskCreate extends Task {
    id?: string
}

