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
            members {
                id
                email
                name
                image
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
            members {
                id
                email
                name
                image
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