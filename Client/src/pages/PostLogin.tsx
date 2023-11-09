import {useAuth0} from '@auth0/auth0-react'
import {useEffect, useCallback} from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/querys';
import Loading from '../components/ui/Loading';


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
            return <div className="flex items-center justify-center w-full overflow-hidden"><Loading messagge=""/></div>
        }

        return null
}

export default PostLogin