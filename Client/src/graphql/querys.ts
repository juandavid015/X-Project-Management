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

export const GET_PROJECT_DISCUSSION = gql`
    query GetProjectDiscussion($discussionId: String!) {
        getDiscussion(discussionId: $discussionId) {
            id,
            title,
            description,
            createdAt,
            subjects
            members {
                id
                email
                name
                image
            }
            createdBy {
                id
                email
                name
                image
            }
            chat {
              id
              messages {      
                content
                likes
                attachment
                createdBy {
                    id
                    email
                    name
                    image
                }
              },
              members {
                id
                email
                name
                image
              }
            }
        }
    }
`
export const GET_PROJECT_DISCUSSIONS = gql`
    query GetProjectDiscussions($projectId: String!) {
        getDiscussions(projectId: $projectId) {
            id
            title
            description
            members {
                id
                email
                name
                image
            }
            subjects
        }
    }
`