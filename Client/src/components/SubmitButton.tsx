import { CheckIcon } from "../assets/icons/Icons"

interface SubmitButtonProps {
    onSubmit: ()=> void
}

export const SubmitButton = ({onSubmit}:SubmitButtonProps) => {
    return (
        <button onClick={onSubmit}
        className="mt-1 border border-dark text-dark bg-white font-bold rounded-md py-1 px-4 
        opacity-50 hover:opacity-80 fill-dark
        flex gap-2 items-center justify-center w-fit ml-auto">
            <span>Save</span>
            <CheckIcon className="h-[20px] w-[fit]"/>
        </button>
)
}