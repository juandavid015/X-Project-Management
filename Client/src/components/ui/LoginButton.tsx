import {useAuth0} from '@auth0/auth0-react';
import { LoginIcon } from '../../assets/icons/Icons';

interface LoginButtonProps {
    expanded?: boolean,
    [key:string]: unknown
}
export const LoginButton = ({expanded, ...rest}: LoginButtonProps) => {
  
    const { loginWithRedirect } = useAuth0();
    const handleLogin = async () => {
      
        await loginWithRedirect({
            appState: {returnTo: '/',}
           
        })

    }
    return (
        <button onClick={() => handleLogin()} title={'Log in'}
        className={`bg-purple w-fit text-white ${expanded ? 'px-4': 'px-1'} py-2 rounded-md
        flex items-center gap-2 fill-white whitespace-nowrap
        transition-all duration-700 `}
        {...rest}>
            <LoginIcon className='h-[20px] w-fit'/>
            {
                expanded &&
                <span>Log in</span>
                
            }
          
       
        </button>
    )
}