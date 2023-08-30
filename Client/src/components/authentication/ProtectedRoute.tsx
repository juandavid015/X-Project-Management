import { useAuth0 } from "@auth0/auth0-react";
import ErrorLayoutUnauthenticated from "../error/ErrorLayoutUnauthenticated";
import Loading from "../ui/Loading";
interface ProtectedRouteProps {
    children: React.ReactNode
}
// Protect individual Components/children
// Needed for only protect certain route components and not all.
const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {isLoading, isAuthenticated} = useAuth0();

    if(isLoading) {
        return <div className=" flex items-center justify-center w-full overflow-hidden"><Loading messagge=""/></div>
        
    } else if (!isAuthenticated) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full m-auto">
                <div className="max-w-[400px] flex flex-col gap-3 text-justify">
                    <ErrorLayoutUnauthenticated title={'UNAUTHENTICATED'}/>
                </div>
            </div>
        )
    } else {
        return children
        // replace with <Outlet /> for nestring protected routes.
        // That will make all the childrens of ProtectedRoute need to be authenticated to render de the view.
        // Good approach is the app is full private for verified users.
    }
}
export default ProtectedRoute;