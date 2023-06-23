import { useQuery } from '@apollo/client';
import {useAuth0} from '@auth0/auth0-react';
import { GET_PROJECT_TASKS } from '../graphql/querys';


export const LoginButton = () => {
    const {client} = useQuery(GET_PROJECT_TASKS, {
        variables: {projectId: '64776d5011f6af1e77f4e984'},
    })
    const { loginWithRedirect } = useAuth0();
    const handleLogin = () => {
        client.clearStore()
        loginWithRedirect({
            appState: {returnTo: 'http://127.0.0.1:5173/'}
        })
   
    }
    return (
        <button onClick={() => handleLogin()}>Log In</button>
    )
}