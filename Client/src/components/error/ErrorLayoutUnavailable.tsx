import { generateUnavailableServiceIcon } from "../../helpers/errorHelpers"
import ButtonNavigation from "./../ui/ButtonNavigation"
interface ErrorLayoutUnavailableProps {
    statusTitle: string
    message: string
    extraInfo: string,
    featureName: string,

}

const ErrorLayoutUnavailable = ({statusTitle, message, extraInfo, featureName}:ErrorLayoutUnavailableProps) => {

    return (
        <>
            <h1 className="font-heading text-4xl text-center">
                {statusTitle}
            </h1>
            {generateUnavailableServiceIcon(featureName)}
            {
                
                <p>
                    <strong className="text-blue-bright"> { featureName } </strong>
                    { message }
                </p>
            }
            <p>
                {extraInfo}
            </p>

            <ButtonNavigation text="Take me to projects" link="/projects"/>
        </>
    )
}
export default ErrorLayoutUnavailable