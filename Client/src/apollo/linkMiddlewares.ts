import { ApolloLink, HttpLink, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import toast from "react-hot-toast";
import ToastErrorNotfication from '../components/error/ToastError'
// http connection for normal requests
const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const WS_URL = import.meta.env.VITE_WS_SERVER_URL;
export const httpLink = new HttpLink({ uri: SERVER_URL })

// websocket connection for subscriptions
export const wsLink = new GraphQLWsLink(createClient({
	url: WS_URL,
	connectionParams: {
		authentication: (() => {
			let token = localStorage.getItem('token');
			let publicIdentifier = localStorage.getItem('public')
			token = token?.length ? `bearer ${token}` : "";
			publicIdentifier = publicIdentifier?.length ? `publicIdentifier ${publicIdentifier}` : "";

			return token || publicIdentifier
		})()
	}
}));

// Combine http and ws Links to operate over one 
// according to the type of operation being executed (ws or http).
export const splitLink = split(
	// The split function takes three parameters:
	// * A function that's called for each operation to execute
	// * The Link to use for an operation if the function returns a "truthy" value
	// * The Link to use for an operation if the function returns a "falsy" value
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === 'OperationDefinition' &&
			definition.operation === 'subscription'
		);
	},
	wsLink,
	httpLink,
);


export const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	let token = localStorage.getItem('token');
	let publicIdentifier = localStorage.getItem('public')
	token = token?.length ? `bearer ${token}` : "";
	publicIdentifier = publicIdentifier?.length ? `publicIdentifier ${publicIdentifier}` : "";

	operation.setContext({
		headers: {
		authorization: token || publicIdentifier,
		},
	});
	return forward(operation);
});

  
export const errorLink = onError(({ graphQLErrors, networkError, operation}) => {
    if (graphQLErrors) {
	
		// console.log('operation', operation.operationName)
		graphQLErrors.forEach(({ message, locations, path }) => {
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
			)
		});
	}
        
    if (networkError) {
		console.log(`[Network error]: ${networkError}`);
		const errorRequestsHandledLocally = ['UpdateTask', 'CreateTask', 'UpdateProject', 'DeleteProject', 'RemoveTask', 'AssignProjectMember', 'DeleteMemberFromProject']
		// Throw a toast error notification on a level component (for the desired component).
		if(errorRequestsHandledLocally.includes(operation.operationName)) {
			if ('result' in networkError ) {
                const result = networkError.result as Record<string, any> 
				const message = result.errors[0].message
				toast.custom((t)=> ToastErrorNotfication ({t, message}), {
					duration: 2000
				});
            } 
		}
	}
});

export const typeNameParseMiddleware = new ApolloLink((operation, forward) => {
    // idea taked from https://github.com/apollographql/apollo-client/issues/1913
    if (operation.variables) {
        const removeTypenameFromVariables = (variables: Record<string, string>) => {
			return JSON.parse(JSON.stringify(variables), (key, value) => {
				return key === '__typename' ? undefined : value;
			});
        };
        // eslint-disable-next-line no-param-reassign
        operation.variables = removeTypenameFromVariables(operation.variables);
    }
    return forward(operation);
});