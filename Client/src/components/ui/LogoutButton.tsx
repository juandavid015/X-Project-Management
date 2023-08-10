import { useAuth0 } from '@auth0/auth0-react';

export const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout({logoutParams: {returnTo: 'http://127.0.0.1:5173'}});

    }

    return (
        <button onClick={()=> handleLogout()}>
            Log out
        </button>
    )
}