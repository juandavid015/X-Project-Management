import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "../../graphql/mutations";
import { useForm } from "../../hooks/useForm";
import { TasksContext } from "../../providers/TasksProvider";
import { Status } from "../../types/types";
import { useContext, useRef} from 'react';
import { useClickOutside } from "../../hooks/useClickOutside";
import LoadingItem from "../ui/LoadingItem";

interface CalendarTaskCardEditableProps {
    status: Status
    toggleEdit: () => void
    timeline?: string
}

type Task = {
    id: string
    title: string,
    projectId: string | undefined,
    status: Status
    timeline: string
}

const CalendarTaskCardEditable = ({ timeline,  toggleEdit }: CalendarTaskCardEditableProps) => {
    
    const {
        projectId,
        // projectMembers,
        // loadedTask,
        // create,
    } = useContext(TasksContext);

    const initialState: Task = {
        projectId: projectId,
        id: 'temp-id',
        title: '',
        status: 'PENDING',
        timeline: timeline || ''
    };
    
    const elementRef = useRef(null)
    const { formData: taskData, handleInputChange } = useForm(initialState);

    const mutationSchemaStatus = CREATE_TASK;
    // const projectTaskSchema = GET_PROJECT_TASKS;
    // const {saveEntity, loading}= useSaveEntity(mutationSchemaStatus, projectTaskSchema);
    const [createOrUpdateTask, { loading }] = useMutation(mutationSchemaStatus)
    const updateInformation = async (taskData: Task) => {
        // before a validations must be passed sucessfully
        if(taskData.title.length) {
            const optimisticResponse = { ...taskData, __typename: "Task" }
            await createOrUpdateTask({
                variables: taskData,
                optimisticResponse: {
                    ['createTask']: optimisticResponse
                }
            })
      
        } 
        toggleEdit()
    }

    useClickOutside({elementRef: elementRef, onClickOutside: ()=> updateInformation(taskData)})

    return (
        <div ref={elementRef} >
            {
                loading 
                ?
                <LoadingItem
                height="h-[15px]"
                />:
                <label className="box-border w-full overflow-hidden" htmlFor="title" >
                    <input type="text" onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                    value={taskData.title} name="title" 
                    className="w-full p-1 bg-white-purple rounded-md text-xs font-medium 
                    outline outline-1 outline-electric-blue focus:outline-2 text-dark-med"
                    autoFocus placeholder="New task title..." />
                </label>
            }
           
        </div>
    )
}
export default CalendarTaskCardEditable;