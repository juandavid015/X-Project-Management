import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
    mutation LoginUser {
        loginUser {
            id
            name
            email
            image
        }
    }
`
export const GET_PROJECT_TASKS = gql`
    query GetProjectTasks($projectId: String!) {
        getProjectTasks(projectId: $projectId) {
            id
            title
            description
            timeline
            userIds
            indexPosition
            imageUrl
            labels {
                name
                color
            }
            members {
                id
                email
                name
                image
            }
            status
            priority
        }
    }
`
export const GET_PROJECTS = gql`
    query GetProjects($userId: String!) {
        getAllProjects(userId: $userId) {
            id
            title
            description
            label
            userIds
            ownerId
            owner {
                name
                image
            }
            members {
                id
                email
                name
                image
            }
            userPermissions {
                id
                userId
                role
            }
        }
    }
`
export const GET_PROJECT = gql`
    query GetProject($projectId: String!) {
        getProject(projectId:$projectId) {
            id
            userIds
            title
            description
            label
            ownerId
            owner {
                image
                name
            }
            members {
                id
                email
                name
                image
            }
            userPermissions {
                id
                userId
                role
            }
        }
    }
`
export const GET_PROJECT_MEMBERS = gql`
    query GetProjectMembers($projectId: String!) {
        getProject(projectId: $projectId) {
            id
            userIds
            members {
                id
                email
                name
                image
            }
        }
    }
`