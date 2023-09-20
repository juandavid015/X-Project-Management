import { useAuth0 } from '@auth0/auth0-react';
import { LogoutIcon } from '../../assets/icons/Icons';
import { useApolloClient } from '@apollo/client';

interface LogoutButtonProps {
    expanded?: boolean,
    [key:string]: unknown
}
export const LogoutButton = ({expanded}: LogoutButtonProps) => {
    const { logout } = useAuth0();
    const client = useApolloClient()
    const handleLogout = () => {
        localStorage.removeItem('token');
        client.resetStore()
        logout({logoutParams: {returnTo: 'http://127.0.0.1:5173'}});

    }

    return (
        <button onClick={()=> handleLogout()} title='Log out'
        className={`border-none w-fit text-red-warning ${expanded ? 'px-4': 'px-4'} py-2 rounded-md
        flex items-center gap-2 fill-red-warning whitespace-nowrap
        transition-all duration-700`}>
            <LogoutIcon className='h-[20px] w-fit'/>
            {
                expanded &&
                <span>Log out</span>
                
            }
        </button>
    )
}