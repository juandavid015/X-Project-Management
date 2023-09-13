import { gql } from "@apollo/client";

export const UPDATE_TASK = gql`
    mutation UpdateTask(
        $id: String!,
        $title: String!,
        $description: String, 
        $timeline: String,
        $status: AllowedStatus,
        $priority: Priority,
        $labels: [LabelInput],
        $userIds: [String]
        $projectId: String
    ) {
        updateTask(
            id: $id,
            title: $title,
            description: $description,
            timeline: $timeline,
            priority: $priority,
            labels: $labels,
            userIds: $userIds
            status: $status
            projectId: $projectId
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
            },
            indexPosition
        }
    }
`

export const CREATE_PUBLIC_PROJECT = gql`
    mutation CreatePublicProject {
        createPublicProject {
            project {
                id
                title
                description
                label
                userIds
                members {
                    id
                    email,
                    name,
                    image
                }
            }
            token
        }
    }
`
export const CREATE_PROJECT = gql`
    mutation CreateProject($userId: String!, $title: String!, $description: String, $label: String) {
        createProject(
            userId: $userId
            title: $title
            description: $description
            label: $label
        ) {
            id
            title
            description
            label
            userIds
            members {
                id
                email,
                name,
                image
            }
        }
    }
`
export const DELETE_PROJECT = gql`
    mutation DeleteProject($id: String!) {
        deleteProject(
            id: $id
        ) {
            id
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
export const UPDATE_PROJECT = gql`
    mutation UpdateProject($id: String!, $userIds: [String]!, $title: String!, 
    $description: String, $label: String) {
        updateProject(id: $id, userIds: $userIds, title: $title, description: $description,
        label: $label) {
            id
            userIds
            title
            description
            label
            members {
                id
                email
                name
                image
            }
        }
    }
`
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


export const MOVE_TASK = gql`
    mutation MoveTask($actualTaskId: String!, $previousTaskPosition: Float, $nextTaskPosition: Float, $actualTaskPosition: Float $newStatus: AllowedStatus) {
        moveTask(actualTaskId: $actualTaskId, previousTaskPosition: $previousTaskPosition, nextTaskPosition: $nextTaskPosition, actualTaskPosition: $actualTaskPosition, newStatus: $newStatus) {
            id,
            status,
            indexPosition,
        }
    }
`