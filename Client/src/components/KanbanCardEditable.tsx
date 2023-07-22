
import React, {  useEffect, useRef, useState } from 'react';
import { CREATE_TASK, UPDATE_TASK } from "../graphql/mutations";
import {  Status, Task, TaskCreate, User } from "../types/types";
import { useClickOutside } from "../hooks/useClickOutside";
import { useSaveEntity } from "../hooks/useSaveEntity";
import { GET_PROJECT_TASKS } from "../graphql/querys";
import { useForm } from "../hooks/useForm";
import { PriorityField } from "./PriorityField";
import { MembersField } from "./MembersField";
import { LabelsField } from "./LabelsField";
import { TitleField } from "./TitleField";
import { TimelineField } from "./TimelineField";
import { DescriptionField } from "./DescriptionField";
import { SubmitButton } from "./SubmitButton";

interface Props {
    create: boolean, // not goes here
    onEdit?: () => void
    status: Status
    task?: Task | TaskCreate
    projectMembers?: User[]
}
export interface InputEditable  {
    inputName: string,
    inputIsEditable: boolean
}
export type SetInputEditable = React.Dispatch<React.SetStateAction<InputEditable>>

export const KanbanCardEditable = ({create, status, onEdit, projectMembers, task}:Props) => {
    // const cleanedLabels = labels.map(({ __typename, ...rest }) => rest);
    const {id, title, description, labels, timeline, priority, projectId, members, userIds} = task || {};
    const containerRef = useRef<HTMLDivElement>(null);

    const initialState: TaskCreate = {
        id: id || 'temp-id',
        title: title || '',
        description: description || '',
        timeline: timeline || '',
        priority: priority || null,
        labels: labels || [],
        status: status,
        indexPosition: parseFloat(Date.now().toString()),
        projectId: projectId || '64776d5011f6af1e77f4e984',
        members: members || [],
        userIds: userIds || []
      };
    
    const [inputEditable, setInputEditable] = useState({
        inputName: 'title',
        inputIsEditable: false
    })

    const { formData: taskData, setFormData: setTaskData, handleInputChange } = useForm(initialState);

    const mutationSchemaStatus = create ? CREATE_TASK : UPDATE_TASK;
    const projectTaskSchema = GET_PROJECT_TASKS;
    const saveEntity = useSaveEntity(mutationSchemaStatus, projectTaskSchema);
    
    const updateInformation = (taskData: Task | TaskCreate) => {
        // before a validations must be passed sucessfully
        const optimisticResponse = {...taskData, __typename: "Task"}
        onEdit && onEdit()
        saveEntity(taskData, optimisticResponse).finally(()=> onEdit && onEdit())
  
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

            <LabelsField
            taskData={taskData}
            setTaskData={setTaskData}
            inputEditable={inputEditable}
            setInputEditable={setInputEditable}
            handleInputChange={handleInputChange}
            updateInformation={updateInformation} />
            
            <TitleField
            taskData={taskData}
            inputEditable={inputEditable}
            handleInputChange={handleInputChange}
            changeEditingInput={changeEditingInput} />

            <DescriptionField
            taskData={taskData}
            inputEditable={inputEditable}
            handleInputChange={handleInputChange}
            changeEditingInput={changeEditingInput}
            />

            <TimelineField
            taskData={taskData}
            inputEditable={inputEditable}
            handleInputChange={handleInputChange}
            changeEditingInput={changeEditingInput}
            />

            <PriorityField
            handleInputChange={ handleInputChange }
            valueSelected={ taskData.priority }
            />

            <MembersField
             members={taskData.members}
             projectMembers = {projectMembers}
             handleInputChange={handleInputChange}
             setFormData={ setTaskData }
            />
    
            <SubmitButton
            onSubmit={()=> updateInformation(taskData)} />

        </div>
    )
}