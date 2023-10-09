import { ImageIcon } from "../../assets/icons/Icons"
import { HandleInputChange } from "../../hooks/useForm"
import { TaskCreate } from "../../types/types"
import { InputEditable } from "../kanban/KanbanCardEditable"

interface ImageUrlFieldProps {
    inputEditable: InputEditable
    taskData: TaskCreate
    handleInputChange: HandleInputChange<HTMLInputElement>
    changeEditingInput: (inputName: string) => void
}

const FieldImageUrl = ({taskData, inputEditable, handleInputChange, changeEditingInput}: ImageUrlFieldProps) => {
    return (
        inputEditable.inputName === 'imageUrl' || taskData.imageUrl?.length ? 
        <input type="url" value={taskData.imageUrl} onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} 
        name="imageUrl" id="imageUrl" autoFocus={inputEditable.inputName === 'imageUrl'}
        placeholder="https://sampleurl/image/..."
        className="px-2 py-1 outline-purple/20"/>:
        <button className="flex items-center gap-1 fill-gray text-gray font-medium 
        hover:fill-dark hover:text-dark hover:scale-y-[1.03]" 
        onClick={()=> changeEditingInput('imageUrl')}>
            <ImageIcon className="h-[20px]"/>
            <span>
                + Add Image url
            </span>
        </button>
    )
}
export default FieldImageUrl;