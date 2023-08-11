import {useAuth0} from '@auth0/auth0-react';

export const LoginButton = ({...rest}) => {
  
    const { loginWithRedirect } = useAuth0();
    const handleLogin = async () => {
      
        await loginWithRedirect({
            appState: {returnTo: '/',}
           
        })

    }
    return (
        <button onClick={() => handleLogin()} {...rest}>Log In</button>
    )
}