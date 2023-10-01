
import React, {  useEffect, useRef, useState, useContext } from 'react';
import { CREATE_TASK, UPDATE_TASK } from "../../graphql/mutations";
import {  Status, Task, TaskCreate } from "../../types/types";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useForm } from "../../hooks/useForm";
import { FieldPriority } from "../form/FieldPriority";
import { FieldMembers } from "../form/FieldMembers";
import { FieldLabels } from "../form/FieldLabels";
import { FieldTitle } from "../form/FieldTitle";
import { FieldTimeline } from "../form/FieldTimeline";
import { FieldDescription } from "../form/FieldDescription";
import { SubmitButton } from "../form/SubmitButton";
import { useMutation } from '@apollo/client';
import FieldImageUrl from '../form/FieldImageUrl';
import { KanbanCardOptions } from './KanbanCardOptions';
import { TasksContext } from '../../providers/TasksProvider';

interface KanbanCardEditableProps {
    toggleEdit?: () => void
    status: Status
    task?: Task | TaskCreate
}

export interface InputEditable  {
    inputName: string,
    inputIsEditable: boolean
}

export type SetInputEditable = React.Dispatch<React.SetStateAction<InputEditable>>

export const KanbanCardEditable = ({status, toggleEdit, task }:KanbanCardEditableProps) => {

    const { 
        projectMembers, 
        projectId, 
        create, 
        loadedTask 
    } = useContext(TasksContext);

    const {
        id, 
        title, 
        description, 
        labels, 
        timeline, 
        priority, 
        members, 
        userIds, 
        imageUrl
    } = task || {};

    const containerRef = useRef<HTMLDivElement>(null);

    const initialState: TaskCreate = {
        id: id || 'temp-id',
        title: title || '',
        description: description || '',
        timeline: timeline || '',
        priority: priority || undefined,
        labels: labels || [],
        status: status,
        indexPosition: parseFloat(Date.now().toString()),
        projectId: projectId || '',
        members: members || [],
        userIds: userIds || [],
        imageUrl: imageUrl || ''
      };
    
    const [inputEditable, setInputEditable] = useState({
        inputName: 'title',
        inputIsEditable: false
    })

    const { formData: taskData, setFormData: setTaskData, handleInputChange } = useForm(initialState);

    const mutationSchemaStatus = create.isActive ? CREATE_TASK : UPDATE_TASK;
    // const projectTaskSchema = GET_PROJECT_TASKS;
    // const {saveEntity, loading}= useSaveEntity(mutationSchemaStatus, projectTaskSchema);
    const [createOrUpdateTask, { loading }] = useMutation(mutationSchemaStatus);

    const updateInformation = async(taskData: Task | TaskCreate) => {
        // before a validations must be passed sucessfully

        !create.isActive && toggleEdit && toggleEdit()
        const optimisticResponse = {...taskData, __typename: "Task"}

        await createOrUpdateTask({
            variables: taskData,
            optimisticResponse: {
                [create.isActive ? 'createTask': 'updateTask']: optimisticResponse
            }
        })
    }

    const changeEditingInput = (inputName: string) => {
        setInputEditable({inputName: inputName, inputIsEditable: false});
    }

    useClickOutside({elementRef: containerRef, onClickOutside: toggleEdit});

    useEffect(() => {
        loadedTask.isLoadedBySubscription && (toggleEdit && toggleEdit());
        return () => {
            setInputEditable({inputName: 'title', inputIsEditable: false});
            
        }
        
    },[loadedTask.isLoadedBySubscription, toggleEdit]);


    return (
        <div className="w-full bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px]
        flex flex-col gap-2 relative" ref={containerRef} >
            <KanbanCardOptions
            task={taskData}
            // duplicate={(taskData: Task)=> updateInformation(taskData)}
            className={'absolute left-[calc(100%-2rem)] z-10'}/>

            <FieldLabels
            taskData={taskData}
            setTaskData={setTaskData}
            inputEditable={inputEditable}
            setInputEditable={setInputEditable}
            handleInputChange={handleInputChange}
            updateInformation={updateInformation} />
            
            <FieldTitle
            taskData={taskData}
            inputEditable={inputEditable}
            handleInputChange={handleInputChange}
            changeEditingInput={changeEditingInput} />

            <FieldDescription
            taskData={taskData}
            inputEditable={inputEditable}
            handleInputChange={handleInputChange}
            changeEditingInput={changeEditingInput}
            />

            <FieldTimeline
            taskData={taskData}
            inputEditable={inputEditable}
            handleInputChange={handleInputChange}
            changeEditingInput={changeEditingInput}
            />

            <FieldPriority
            handleInputChange={ handleInputChange }
            valueSelected={ taskData.priority }
            />

            <FieldMembers
             members={taskData.members}
             projectMembers={projectMembers}
             handleInputChange={handleInputChange}
             setFormData={ setTaskData }
            />

            <FieldImageUrl
            taskData={taskData}
            handleInputChange={handleInputChange}
            inputEditable={inputEditable}
            changeEditingInput={changeEditingInput}
            />
    
            <SubmitButton
            isLoading={loadedTask.isLoadedBySubscription === true ? false : loading}
            onSubmit={()=> updateInformation(taskData)} />

        </div>
    )
}