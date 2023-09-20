import {useAuth0} from '@auth0/auth0-react'
import {useEffect, useCallback} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/querys';


const PostLogin = () => {
    const [loginUser] = useMutation(LOGIN_USER);
    const {  getAccessTokenSilently, isLoading} = useAuth0();
    const getToken = useCallback(async() => {
    const token = await getAccessTokenSilently();
    
        return token
    }, [getAccessTokenSilently])
  
    useEffect(()=> {
      

        getToken().then(token => {
        window.localStorage.setItem('token', token)
        loginUser()
        });
        return 
            
           
        }, [getToken,  loginUser])
        if (isLoading) {
            return(<div>Loading...</div>)
        }

        return (
            <div>
                Login page
            </div>
        )
}

export default PostLogin