import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router-dom";

// interface Auth0ProviderWithNavigateProps {
//     children: React.ReactNode
// }
const Auth0ProviderWithNavigate = () => {
    const navigate = useNavigate();

    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    const reedirect_uri = import.meta.env.VITE_AUTH0_REEDIRECT_URI
    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider 
            domain={domain}
            clientId={clientId}
            authorizationParams={{redirect_uri: reedirect_uri, audience: audience, scope: 'profile email'}}
            onRedirectCallback={onRedirectCallback}
            >
            <Outlet />
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate;