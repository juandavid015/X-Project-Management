import { gql } from "@apollo/client";

export const GET_PROJECT_TASKS = gql`
    query GetProjectTasks($projectId: String!) {
        getProjectTasks(projectId: $projectId) {
            id
            title
            description
            labels {
                name
                color
            }
            status
        }
    }
`