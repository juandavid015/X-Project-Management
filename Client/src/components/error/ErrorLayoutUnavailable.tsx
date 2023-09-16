import { ReloadIcon } from "../../assets/icons/Icons"
import { generateUnavailableServiceIcon } from "../../helpers/errorHelpers"
import ButtonNavigation from "./../ui/ButtonNavigation"
import { useNavigate } from "react-router-dom"

interface ErrorLayoutUnavailableProps {
    statusTitle: string
    message: string
    extraInfo: string,
    featureName: string,
    isServerError?:boolean
}

const ErrorLayoutUnavailable = ({statusTitle, message, extraInfo, featureName, isServerError}:ErrorLayoutUnavailableProps) => {
    const navigate = useNavigate();
    const reloadPage = () => {
        navigate(0)
    }
    return (
        <>
            <h1 className="font-heading text-4xl text-center">
                {statusTitle}
            </h1>
            {
                generateUnavailableServiceIcon(featureName)
            }
            {
                
                <p>
                    <strong className={`${isServerError && 'text-dark-med'} "text-blue-bright"`}> { featureName } </strong>
                    { message }
                </p>
            }
            <p>
                {extraInfo}
            </p>
            {
                isServerError 
                ?
                <button onClick={reloadPage}
                    className="bg-blue-bright px-8 py-2 rounded-full flex gap-2 items-center w-fit self-center
                    text-base text-white fill-blue-bright shadow
                    hover:scale-[1.01]">
                        <ReloadIcon className="h-[20px] fill-white" />
                        <span>Reload</span>
                </button>
                :
                <ButtonNavigation text="Take me to projects" link="/projects"/>
            }
        </>
    )
}
export default ErrorLayoutUnavailable