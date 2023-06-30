import { DescriptionIcon } from "../assets/icons/Icons"
import { HandleInputChange } from "../hooks/useForm"
import { TaskCreate } from "../types/types"
import { InputEditable } from "./KanbanCardEditable"

interface DescriptionFieldProps {
    inputEditable: InputEditable
    taskData: TaskCreate
    handleInputChange: HandleInputChange<HTMLTextAreaElement>
    changeEditingInput: (inputName: string) => void
}
export const DescriptionField = ({taskData, handleInputChange, inputEditable, changeEditingInput}:DescriptionFieldProps) => {
    return (
        inputEditable.inputName === 'description' || taskData.description?.length ? 
        <textarea value={taskData.description} rows={3} name={'description'} onChange={handleInputChange as React.ChangeEventHandler<HTMLTextAreaElement>}
        autoFocus={inputEditable.inputName === 'description'}
        className="p-1 w-full resize-none  outline outline-1 outline-white-gray rounded-md" placeholder="Description of your task..." 
        />:
        <button className="flex items-center gap-1 fill-gray text-gray font-medium hover:fill-dark hover:font-bold hover:text-dark hover:scale-y-[1.03]" 
        onClick={()=> changeEditingInput('description')}>
            <DescriptionIcon className="h-[20px]"/>
            <span>
                + Add Description
            </span>
        </button>
    )
}