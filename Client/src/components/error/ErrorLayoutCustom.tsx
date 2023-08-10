
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