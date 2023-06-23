
import { ColorPaletteIcon, DateIcon, DescriptionIcon, LabelIcon, RemoveCircleIcon, TitleIcon } from "../assets/icons/Icons"
import React, {  useEffect, useRef, useState } from 'react';
import { CREATE_TASK, UPDATE_TASK } from "../graphql/mutations";
import { Label, Task, TaskCreate } from "../types/types";
import { KanbanCardOptions } from "./KanbanCardOptions";
import { useClickOutside } from "../hooks/useClickOutside";
import { TaskSetter, addNewLabel, removeLabel } from "../helpers/taskHelpers";
import { useSaveEntity } from "../hooks/useSaveEntity";
import { GET_PROJECT_TASKS } from "../graphql/querys";
import { useForm } from "../hooks/useForm";


interface Props {
    create: boolean, // not goes here
    onEdit?: () => void
    status: string
    task?: Task 
}

export const KanbanCardEditable = ({create, status, onEdit, task}:Props) => {
    // const cleanedLabels = labels.map(({ __typename, ...rest }) => rest);
    const {id, title, description, labels, timeline, priority, projectId} = task || {};
    const containerRef = useRef<HTMLDivElement>(null);

    const initialState = {
        id: id || '',
        title: title || '',
        description: description || '',
        timeline: timeline || '',
        priority: priority || 'LOW',
        labels: labels || [],
        status: status,
        projectId: projectId || '64776d5011f6af1e77f4e984',
      };
    
      const { formData: taskData, setFormData: setTaskData, handleInputChange } = useForm(initialState);
    const [inputEditable, setInputEditable] = useState({
        inputName: 'title',
        inputIsEditable: false
    })

    const mutationSchemaStatus = create ? CREATE_TASK : UPDATE_TASK;
    const projectTaskSchema = GET_PROJECT_TASKS;
    const saveEntity = useSaveEntity(mutationSchemaStatus, projectTaskSchema);

    const updateInformation = (taskData: Task | TaskCreate) => {
        // before a validations must be passed sucessfully
        saveEntity(taskData).finally(()=> onEdit && onEdit())
    }

    const addNewLabelHandler = () => {
        addNewLabel(setTaskData as TaskSetter, setInputEditable);
    }

    const removeLabelHandler = (index: number) => {
        removeLabel(index, setTaskData as TaskSetter)
    }

    const changeEditingInput = (inputName: string) => {
        setInputEditable({inputName: inputName, inputIsEditable: false});
    }

    useClickOutside({elementRef: containerRef, onClickOutside: onEdit});

    
    useEffect(() => {
        return () => {
            setInputEditable({inputName: 'title', inputIsEditable: false});
        }
        
    },[]);

    return (
        <div className="w-full bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px]
        flex flex-col gap-2 relative" ref={containerRef} >
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
                duplicate={(taskData: Task)=> updateInformation(taskData)}
                className={'absolute left-[calc(100%-1rem)] z-10'}/>
            </div>
                {
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
                }
                {
                    inputEditable.inputName === 'description' || taskData.description?.length ? 
                    <textarea value={taskData.description} rows={3} name={'description'} onChange={handleInputChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                    autoFocus={inputEditable.inputName === 'description'}
                    className="w-full resize-none focus:outline-none" placeholder="Description of your task..." 
                    />:
                    <button className="flex items-center gap-1 fill-dark-med font-medium hover:fill-dark hover:font-bold hover:scale-y-[1.03]" 
                    onClick={()=> changeEditingInput('description')}>
                        <DescriptionIcon className="h-[20px]"/>
                        <span>
                            +Add Description
                        </span>
                    </button>
                    
                }
                {
                    inputEditable.inputName === 'timeline' || taskData.timeline?.length ?
                    <input type="date" 
                    autoFocus={inputEditable.inputName === 'timeline'}
                    className="resize-none focus:outline-none"
                     />:
                     <button className="flex items-center gap-1 fill-dark-med font-medium hover:fill-dark hover:font-bold hover:scale-y-[1.03]" 
                     onClick={()=> changeEditingInput('timeline')} > 
                        <DateIcon className="h-[20px]"/>
                        <span>
                            +Set Date
                        </span>
                    </button>
                }
                
        
            <button onClick={()=> updateInformation(taskData)}>
                Save
            </button>

      
        </div>
    )
}