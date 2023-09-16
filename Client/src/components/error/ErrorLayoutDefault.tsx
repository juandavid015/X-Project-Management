import { useNavigate } from "react-router-dom";
import { ErrorPageIcon, ReloadIcon } from "../../assets/icons/Icons";

const ErrorLayoutDefault = () => {
    const navigate = useNavigate();
    const reloadPage = () => {
        navigate(0)
    }
    
    return (
        <>
            <h1 className="font-heading text-4xl text-center text-dark-med">
                Ooops!
            </h1>
            <ErrorPageIcon className={'h-[60px] inline fill-dark-med'}/>
         
            <p>
                Sorry, an unexpected     
                <strong className="text-red-warning"> error </strong>
                has occurred. Try reloading the page.
            </p>
            <button onClick={reloadPage}
            className="bg-white px-8 py-2 rounded-full flex gap-2 items-center w-fit self-center
            text-base text-dark-med font-bold fill-blue-bright shadow
            hover:scale-[1.01]">
                <ReloadIcon className="h-[20px] fill-dark-med" />
                <span>Reload</span>
            </button>   
        </>

    )
}

export default ErrorLayoutDefault;
