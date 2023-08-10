import { ErrorPageIcon } from "../../assets/icons/Icons";

const ErrorLayoutDefault = () => {
    return (
        <>
            <h1 className="font-heading text-4xl text-center">
                Ooops!
            </h1>
            <ErrorPageIcon className={'h-[60px] inline fill-dark-med'}/>
         
            <p>
                Sorry, an unexpected     
                <strong className="text-red-warning"> error </strong>
                has occurred.
            </p>
            <p>
                Try reloading the page.
            </p>

            
        </>

    )
}

export default ErrorLayoutDefault;
