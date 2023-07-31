import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { Outlet, useNavigate } from "react-router-dom";

// interface Auth0ProviderWithNavigateProps {
//     children: React.ReactNode
// }
const Auth0ProviderWithNavigate = () => {
    const navigate = useNavigate();

    const domain = 'dev-lmxqx7b47rlxp7f7.us.auth0.com';
    const clientId = 'D7ua33bZSRVkRI0GSoPRfqZoFWOz8Tau';
    const audience = 'https://xmanagement.com';

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname)
    }

    return (
        <Auth0Provider 
            domain={domain}
            clientId={clientId}
            authorizationParams={{redirect_uri: "http://127.0.0.1:5173/login", audience: audience, scope: 'profile email'}}
            onRedirectCallback={onRedirectCallback}
            >
            <Outlet />
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate;