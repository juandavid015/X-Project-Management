import { useEffect, useRef, useState, useContext } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { FieldLabels } from "../form/FieldLabels";
import { FieldTitle } from "../form/FieldTitle";
import { FieldDescription } from "../form/FieldDescription";
import { FieldTimeline } from "../form/FieldTimeline";
import { FieldPriority } from "../form/FieldPriority";
import { FieldMembers } from "../form/FieldMembers";
import FieldImageUrl from "../form/FieldImageUrl";
import { SubmitButton } from "../form/SubmitButton";
import { Status, Task, TaskCreate } from "../../types/types";
import { CREATE_TASK, UPDATE_TASK } from "../../graphql/mutations";
import { useForm } from "../../hooks/useForm";
import { useMutation } from "@apollo/client";
import { KanbanCardOptions } from "../kanban/KanbanCardOptions";
import { TasksContext } from "../../providers/TasksProvider";

interface ListCardEditableProps {
    toggleEdit: () => void
    status: Status
    task?: Task | TaskCreate
}
const ListCardEditable = ({task, status, toggleEdit }: ListCardEditableProps) => {

    const {
        projectId,
        projectMembers,
        loadedTask,
        create,
    } = useContext(TasksContext);

    const {
        id, 
        title, 
        description, 
        labels, 
        timeline, 
        priority, 
        members, userIds, 
        imageUrl
    } = task || {};

    const containerRef = useRef(null);
    const initialState: TaskCreate = {
        id: id || 'temp-id',
        title: title || '',
        description: description || '',
        timeline: timeline || '',
        priority: priority || undefined,
        labels: labels || [],
        status: status || 'PENDING',
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
    
    const mutationSchemaStatus = create.isActive ?  CREATE_TASK : UPDATE_TASK;
    // const projectTaskSchema = GET_PROJECT_TASKS;
    // const {saveEntity, loading}= useSaveEntity(mutationSchemaStatus, projectTaskSchema);
    const [createOrUpdateTask, { loading }] = useMutation(mutationSchemaStatus)
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
    useEffect(() => {
        loadedTask.isLoadedBySubscription && (toggleEdit && toggleEdit());
        return () => {
            setInputEditable({inputName: 'title', inputIsEditable: false});
            
        }
        
    },[loadedTask.isLoadedBySubscription, toggleEdit]);

    useClickOutside({elementRef: containerRef, onClickOutside: toggleEdit})
    return (
        <div className="relative bg-white rounded-md shadow-white-gray shadow-md2 
        px-4 py-3 flex items-center gap-4 min-h-[44px]" ref={containerRef}>
            <KanbanCardOptions
            task={taskData}
            // duplicate={(taskData: Task)=> updateInformation(taskData)}
            className={'absolute top-[10px] left-[calc(100%-3rem)] z-10'}/>
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
             projectMembers = {projectMembers}
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
export default ListCardEditable;