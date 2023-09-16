
import { ErrorPageIcon } from "../../assets/icons/Icons";
import ButtonNavigation from "../ui/ButtonNavigation";
interface ErrorLayoutCustomProps {
    title: string,
    message: string,
    extraInfo?: string,
}
const ErrorLayoutCustom = ({title, message, extraInfo}: ErrorLayoutCustomProps) => {
    return (
        <>
            
            <h1 className="font-heading text-4xl text-center">
                {title}
            </h1>
            <ErrorPageIcon className="h-[60px] fill-dark-med"/>

            <p>
                {message}
            </p>
            
            <p>
                {extraInfo}
            </p>

            <ButtonNavigation text="Take me to projects" link="projects"/>
        </>
    )
}
export default ErrorLayoutCustom;