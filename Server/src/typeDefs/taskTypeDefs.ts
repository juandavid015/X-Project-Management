export const taskTypeDefs = {
    type: `
        type Label {
            name: String!,
            color: String
        }
        enum AllowedStatus {
            PENDING
            IN_PROGRESS 
            REVIEW 
            COMPLETED 
        }
        enum Priority {
            LOW 
            MODERATE
            HIGH
        }
        input UserInput {
            id: String!,
            email: String!,
            name: String!,
            image: String
        }
         
        input LabelInput {
            name: String!,
            color: String
        }
        
        type Task {
            id: String!
            title: String!,
            description: String,
            status: AllowedStatus,
            labels: [Label],
            priority: Priority,
            timeline: String
            members: [User]
            userIds: [String]
            projectId: String
            indexPosition: Float!
            imageUrl: String
        }

        type TaskSubscriptionPayload {
            task: Task!
            action: String
        }
    `, 
    query: `
        getProjectTasks(projectId: String!): [Task]
    `,
    mutation: `
        createTask(
            id: String
            title: String,
            description: String,
            status: AllowedStatus,
            labels: [LabelInput],
            priority: Priority,
            timeline: String,
            projectId: String,
            userIds: [String]
            imageUrl: String
        ): Task

        updateTask (
            id: String!,
            userIds: [String],
            title: String,
            description: String,
            status: AllowedStatus,
            labels: [LabelInput],
            priority: Priority,
            timeline: String,
            projectId: String,
            imageUrl: String
        ): Task

        removeTask (
            id: String!
        ): Task

        moveTask (
            actualTaskId: String!
            previousTaskPosition: Float
            actualTaskPosition: Float
            nextTaskPosition: Float
            newStatus: AllowedStatus
        ): Task

        assignMemberToTask(
            taskId: String
            userId: String
        ): Task
    `,
    subscription: `
        taskUpdated(projectId: String!): TaskSubscriptionPayload
    `
}