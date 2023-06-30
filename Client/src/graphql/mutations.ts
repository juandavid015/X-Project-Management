import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
    mutation UpdateTask(
        $id: String!,
        $title: String!,
        $description: String, 
        $timeline: String,
        $priority: Priority,
        $labels: [LabelInput],
        $userIds: [String]
    ) {
        updateTask(
            id: $id,
            title: $title,
            description: $description,
            timeline: $timeline,
            priority: $priority,
            labels: $labels,
            userIds: $userIds
        ) {
            id,
            title, 
            description,
            timeline,
            priority,
            userIds,
            labels {
                name,
                color
            },
            members {
                id
                name
                email
                image
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
        $status: AllowedStatus,
        $userIds: [String]
    ) {
        createTask(
            title: $title,
            description: $description,
            timeline: $timeline,
            priority: $priority,
            labels: $labels,
            status: $status
            projectId: $projectId,
            userIds: $userIds
        ) {
            id,
            title, 
            description,
            timeline,
            priority,
            status,
            userIds,
            labels {
                name,
                color
            },
            members {
                id
                name
                email
                image
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

export const UPDATE_PROJECT_MEMBER = gql`
mutation UpdateProject($projectId: String!, $userIds: [String]!) {
    updateProject(projectId: $projectId, userIds: $userIds) {
        id,
        userIds
        members {
            id
            email,
            name,
            image
        }
    }
} `

export const ASSIGN_PROJECT_MEMBER = gql`
mutation AssignProjectMember($projectId: String!, $userEmail: String!) {
    assignMemberToProject(projectId: $projectId, userEmail: $userEmail) {
        id,
        userIds
        members {
            id
            email,
            name,
            image
        }
    }
} `