import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
    mutation UpdateTask(
        $id: String!
        $title: String!,
        $description: String, 
        $timeline: String,
        $priority: Priority,
        $labels: [LabelInput]
    ) {
        updateTask(
            id: $id
            title: $title,
            description: $description,
            timeline: $timeline,
            priority: $priority,
            labels: $labels
        ) {
            id,
            title, 
            description,
            timeline,
            priority,
            labels {
                name,
                color
            }
        }
    }
`
export const CREATE_TASK = gql`
    mutation CreateTask(
        $title: String!,
        $description: String, 
        $timeline: String,
        $priority: Priority,
        $labels: [LabelInput],
        $projectId: String!,
        $status: AllowedStatus
    ) {
        createTask(
            title: $title,
            description: $description,
            timeline: $timeline,
            priority: $priority,
            labels: $labels,
            status: $status
            projectId: $projectId,
        ) {
            id,
            title, 
            description,
            timeline,
            priority,
            status,
            labels {
                name,
                color
            }
        }
    }
`

export const DELETE_TASK = gql`
    mutation RemoveTask ($id: String!) {
        removeTask(id: $id) {
            id
        }
    }
`