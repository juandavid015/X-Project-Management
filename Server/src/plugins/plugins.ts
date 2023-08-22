import { ApolloServerPlugin } from "@apollo/server"
import { GraphQLError } from "graphql"
import { MyContext } from ".."

export const authenticationAndAccessGuard: ApolloServerPlugin<MyContext> = {
    async requestDidStart({request, contextValue, errors}) {
        console.log('HE', contextValue.userHasPartialAccess, request.operationName, request.extensions)
        const allowedPublicRequests = ['CreateProject', 'GetProjects', 'GetProjectTasks', 'CreateTask', 'MoveTask', 'UpdateTask', 'GetProject']
        if(request.operationName === 'CreatePublicProject') {
            return
        } else if (contextValue['userHasPartialAccess'] && allowedPublicRequests.includes(request.operationName)) {
            return
        }
        else if(contextValue['userIsLoggedIn']) {
            return
        } else {
            //throwing the error here will generate an internal server error, due to it is treated
            // as an unexpected error during request processing, because the expected is the request to continue.
            throw new GraphQLError('Invalid user credentials', {
            extensions: {code: 'UNAUTHENTICATED', http: { status: 401 }}
            })
        }
            
    },
    // the unexpected error is catched here and customized to be more gracefully to the client.
    async unexpectedErrorProcessingRequest({ error, }) {
    console.log( 'Error response', error.message )
    throw new GraphQLError('Invalid user credentials', {
        extensions: {code: 'UNAUTHENTICATED', http: { status: 401 }}
    })
    }
}