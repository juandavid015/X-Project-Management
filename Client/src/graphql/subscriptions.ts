import { gql } from "@apollo/client";

export const TASK_UPDATED = gql`
    subscription TaskUpdated ($projectId: String!){
        taskUpdated(projectId: $projectId) {
            task {
                id
                title
                description
                timeline
                userIds
                projectId
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
            action
        }
    }
`