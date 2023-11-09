import {useAuth0} from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

interface LoginButtonProps {
    [key:string]: unknown
}
export const LoginLink = ({ ...rest}: LoginButtonProps) => {
  
    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const handleLogin = async () => {
        if (!isAuthenticated) {
            await loginWithRedirect({
                appState: { returnTo: '/projects', }

            })
        } else {
            navigate('/projects')
        }


    }
    return (
        <button onClick={() => handleLogin()} title={'Log in'}
        className={` `}
        {...rest}>
          Log in
        </button>
    )
}