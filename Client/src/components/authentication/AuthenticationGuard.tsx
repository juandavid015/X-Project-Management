import { WithAuthenticationRequiredOptions, withAuthenticationRequired } from "@auth0/auth0-react";
interface AuthenticationGuardProps {
    component:  React.ComponentType<object>, options?: WithAuthenticationRequiredOptions | undefined
}
const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        Loading...
      </div>
    ),
  });

  return <Component />;
};

export default AuthenticationGuard;