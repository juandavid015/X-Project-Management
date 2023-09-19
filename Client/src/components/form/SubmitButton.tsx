import { CheckIcon } from "../../assets/icons/Icons"
import LoadingItem from "../ui/LoadingItem"

interface SubmitButtonProps {
    onSubmit: ()=> void
    isLoading: boolean
}

export const SubmitButton = ({onSubmit, isLoading}:SubmitButtonProps) => {
    return (
        <button onClick={onSubmit}
        className={`mt-1 ${!isLoading && 'border'}  text-white bg-purple font-bold rounded-md py-1 px-4 
         hover:opacity-80 fill-dark
        flex gap-2 items-center justify-center w-fit ml-auto`}>
            {
                isLoading ?
                <LoadingItem
                height={'h-[15px] fill-white'} />:
                <>
                    <span>Save</span>
                    <CheckIcon className="h-[20px] w-[fit] fill-white"/>
                </>
            }
          
        </button>
)
}