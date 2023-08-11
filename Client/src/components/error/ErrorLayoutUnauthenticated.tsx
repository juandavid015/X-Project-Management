import { AuthenticationIcon } from "../../assets/icons/Icons";
import { LoginButton } from "../ui/LoginButton";

interface ErrorLayoutUnauthenticated {
    title: string,
    message?: string,
    extraInfo?: string,
}
const ErrorLayoutUnauthenticated = ({title, extraInfo}: ErrorLayoutUnauthenticated) => {
    return (
        <>
            <h1 className="font-heading text-4xl text-center">
                {title}
            </h1>
            <AuthenticationIcon className="h-[60px] fill-dark-med" />
            <p>
                Invalid user credentials. This action requires you must be 
                <span className="text-purple"> logged in </span> 
                first before continuing to explore the app.
            </p>
            
            <p>
                {extraInfo}
            </p>

            <LoginButton
            className={`bg-purple text-white rounded-full w-full px-8 py-4 m-auto
            shadow-md hover:scale-[1.01] font-bold`} />
        </>
    )
}
export default ErrorLayoutUnauthenticated;