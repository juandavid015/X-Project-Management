import { gql } from "@apollo/client";

export const GET_PROJECT_TASKS = gql`
    query GetProjectTasks($projectId: String!) {
        getProjectTasks(projectId: $projectId) {
            id
            title
            description
            timeline
            userIds
            indexPosition
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