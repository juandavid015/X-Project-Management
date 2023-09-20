import { ApolloServerPlugin } from "@apollo/server"
import { GraphQLError } from "graphql"
import { MyContext } from "../index.js"
import {ValidationError} from 'yup'
import { ApolloServerErrorCode } from '@apollo/server/errors';

export const authenticationAndAccessGuard: ApolloServerPlugin<MyContext> = {

    async requestDidStart({request, contextValue}) {
        // console.log('HE', contextValue.userHasPartialAccess, request.operationName, request.extensions)
        const allowedPublicRequests = [
            'CreateProject', 'GetProjects', 'GetProjectTasks',
            'CreateTask', 'MoveTask', 'UpdateTask', 'GetProject',
            'UpdateProject', 'DeleteProject', 'RemoveTask',
            'AssignProjectMember'
        ]

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
    throw new GraphQLError(error.message, {
        originalError: error
    })
    }
}


export const inputValidateError: ApolloServerPlugin<MyContext> = {

    async requestDidStart({request}) {
        return {
            async willSendResponse({errors}) {
                if(errors) {
                 
                    const validationErrors = errors.filter(error => error.originalError instanceof ValidationError);

                    if(validationErrors.length) {

                        let error = validationErrors[0].originalError
                        if(request.operationName === 'GetProjectTasks') {
                            throw new GraphQLError(error.message,  {
                                extensions: {
                                    code: 'NOT_FOUND',
                                    http: {
                                        status: 404
                                    },
                                    errors: (error as ValidationError).errors
                                },
                                originalError: error,
                                
                            });

                        } else {

                            throw new GraphQLError(error.message,  {
                                extensions: {
                                    code: ApolloServerErrorCode.BAD_USER_INPUT,
                                    http: {
                                        status: 400
                                    },
                                    errors: (error as ValidationError).errors
                                },
                                originalError: error,
                                
                            });
                        }
                    }
                }
            }
        }
    }
}