import { ColorPaletteIcon, LabelIcon, RemoveCircleIcon } from "../../assets/icons/Icons"
import { TaskSetter, addNewLabel, removeLabel } from "../../helpers/taskHelpers"
import { HandleInputChange, SetFormData } from "../../hooks/useForm"
import { Label, Task, TaskCreate } from "../../types/types"
import { InputEditable, SetInputEditable } from "../kanban/KanbanCardEditable"

import { KanbanCardOptions } from "../kanban/KanbanCardOptions"

interface LabelsFieldProps {
    taskData: TaskCreate
    inputEditable: InputEditable
    setInputEditable: SetInputEditable
    handleInputChange: HandleInputChange<HTMLInputElement>
    setTaskData: SetFormData<TaskCreate>
    updateInformation: (taskData: Task | TaskCreate) => void
}

export const FieldLabels = ({taskData, inputEditable, handleInputChange, setTaskData, setInputEditable, }:LabelsFieldProps) => {

    const addNewLabelHandler = () => {
        addNewLabel(setTaskData as TaskSetter, setInputEditable);
    }

    const removeLabelHandler = (index: number) => {
        removeLabel(index, setTaskData as TaskSetter)
    }

    return (
        <div className="flex flex-wrap gap-1 relative w-full">
                {
                    taskData.labels?.map((label: Label, index: number) => {
                        return (
                            <div  className="flex max-w-full w-fit items-center block group/remove break-words"
                            key={index}>
                                <label className="flex max-w-full w-auto" htmlFor={label.name} >
                                    <LabelIcon className="h-[20px] fill-dark" />
                                    <input type="text" name="name" value={label.name} id={label.name} onChange={(e) => handleInputChange(e, index, 'labels')}
                                    className={`font-bold`} style={{color: label.color, width: label.name.length ? label.name.length + 1 + 'ch': '50px'}}
                                    autoFocus={inputEditable.inputName === 'labels'}/>
                                </label>
                                <label className="flex" htmlFor={label.color}>
                                    <input type="color" name="color" value={label.color} id={label.color} onChange={(e) => handleInputChange(e, index, 'labels')}
                                    className="rounded-full appearance-none w-[0px] h-[0px] invisible" />
                                    <ColorPaletteIcon className="h-[15px] hidden group-hover/remove:block"/>  
                                </label>
                                <button onClick={()=> removeLabelHandler(index)}
                                className="hidden group-hover/remove:block ">
                                    <RemoveCircleIcon className="fill-dark-med h-[20px]" />
                                </button>
                            </div>
                        )
                    } )
                }
                <button className="flex items-center" onClick={addNewLabelHandler}>
                    <LabelIcon className="h-[20px] fill-dark"/>
                    <span>+Add label</span>
                </button>
            
                
                <KanbanCardOptions
                task={taskData}
                // duplicate={(taskData: Task)=> updateInformation(taskData)}
                className={'absolute left-[calc(100%-1rem)] z-10'}/>
            </div>
    )
}