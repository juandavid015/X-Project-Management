import { DateIcon } from "../../assets/icons/Icons"
import { HandleInputChange } from "../../hooks/useForm"
import { TaskCreate } from "../../types/types"
import { InputEditable } from "../kanban/KanbanCardEditable"

interface TimelineFieldProps {
    inputEditable: InputEditable
    taskData: TaskCreate
    handleInputChange: HandleInputChange<HTMLInputElement>
    changeEditingInput: (inputName: string) => void
}

export const FieldTimeline = ({inputEditable, taskData, changeEditingInput, handleInputChange}:TimelineFieldProps) => {
    return (
    
        inputEditable.inputName === 'timeline' || taskData.timeline?.length ?
        <input type="date" name="timeline" value={taskData.timeline}
        onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
        autoFocus={inputEditable.inputName === 'timeline'}
        className="resize-none focus:outline-none"
            />:
        <button className="flex items-center gap-1 fill-gray text-gray font-medium hover:fill-dark hover:font-bold hover:text-dark hover:scale-y-[1.03] " 
        onClick={()=> changeEditingInput('timeline')} > 
            <DateIcon className="h-[20px]"/>
            <span>
                + Set Date
            </span>
        </button>
    
    )
}