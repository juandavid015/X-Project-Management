import { TitleIcon } from "../assets/icons/Icons"
import { HandleInputChange } from "../hooks/useForm"
import { TaskCreate } from "../types/types"
import { InputEditable } from "./KanbanCardEditable"

interface TitleFieldProps {
    inputEditable: InputEditable
    taskData: TaskCreate
    handleInputChange: HandleInputChange<HTMLInputElement>
    changeEditingInput: (inputName: string) => void
}

export const TitleField = ({inputEditable, taskData, handleInputChange, changeEditingInput}: TitleFieldProps) => {
    return (
        
        inputEditable.inputName === 'title' || taskData.title?.length ?
        <input type="text" value={taskData.title} name={'title'} onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} 
        placeholder="Your task title here..." autoFocus={inputEditable.inputName === 'title'}
        className="text-md font-bold focus:outline-none"
        />: 
        <button className="flex items-center gap-1 fill-dark-med font-medium hover:fill-dark hover:font-bold hover:scale-y-[1.03]" 
        onClick={()=> changeEditingInput('title')}>
            <TitleIcon className="h-[20px]"/>
            <span>
                +Add Title
            </span>
        </button>
        
    )
}