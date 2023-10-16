import { ApolloError, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useLoadSubscriptionTask } from "../hooks/useLoadSubscriptionTask";
import { GET_PROJECT_MEMBERS, GET_PROJECT_TASKS } from "../graphql/querys";
import { Status, Task, User } from "../types/types";
import { MOVE_TASK } from "../graphql/mutations";
import { DragEnterType, DragOverType, DragStartType, DropType, TaskDragged, TaskSkeletonStyles, useDragTask } from "../hooks/useDragTask";
import { TASK_UPDATED } from "../graphql/subscriptions";
import { useTaskManagement } from "../hooks/useTaskManagement";
import { useOrganizeTasks } from "../hooks/useOrganizeTasks";

export type TaskColumn = {
    [key: string]: Task[]
}
export type TaskColumns = TaskColumn[] | []
export type ProjectStatus = {
    name: Status,
    color: string
}[]
type LoadedTask = {
    id: string
    isLoadedBySubscription: boolean
}

interface TasksContextType {
    projectMembers: User[]
    dragEnterHandler: DragEnterType
    dragStartHandler: DragStartType
    dragOverHandler: DragOverType
    dropHandler: DropType
    taskDragged: TaskDragged | undefined
    skeletonStyles: TaskSkeletonStyles
    loadedTask: LoadedTask
    projectStatus: ProjectStatus | undefined
    error: ApolloError | undefined
    isLoadingTasks: boolean
    taskColumns: TaskColumns
    projectId: string | undefined
    edit: {
        isActive: boolean;
        item: string;
        input: string;
    }
    toggleEdit: (itemToBeEdited: string, inputToBeEdited: string) => void
    create:  {
        isActive: boolean
        columnTarget: string
        itemTargetId?: string
     }
    setCreate: React.Dispatch<React.SetStateAction<{
        isActive: boolean;
        columnTarget: string;
        itemTargetId?: string
    }>>
}

const defaultTasksContext: TasksContextType = {
    projectMembers: [],
    dragEnterHandler: ()=> null,
    dragStartHandler: ()=> null,
    dragOverHandler: ()=> null,
    dropHandler: async ()=> {return},
    taskDragged: undefined,
    skeletonStyles: {
        height: '0px',
        width: '0px'
    },
    loadedTask: {
        id: '',
        isLoadedBySubscription: false
    },
    projectStatus: undefined,
    error: undefined,
    isLoadingTasks: false,
    taskColumns: [],
    projectId: undefined,
    edit: {
        isActive: false,
        item: '',
        input: '',
    },
    toggleEdit: ()=> null,
    create: {
        isActive: false, columnTarget: '' ,  itemTargetId: ''
    },
    setCreate: () => null
}
export const TasksContext = createContext<TasksContextType>(defaultTasksContext);

interface TasksProviderProps {
    children: React.ReactNode
}
const TasksProvider = ({children}: TasksProviderProps) => {

    // Basic state of tasks in columns and project statuses to the related project
    const [taskColumns, setTaskColumns] = useState<TaskColumns>([]);
    const [projectStatuses, setProjectStatuses] = useState<ProjectStatus>()
    const { projectId } = useParams();

    // Fetch/load the tasks
    const {loading: isLoadingTasks, error, data, subscribeToMore} = useQuery(GET_PROJECT_TASKS, {
        variables: {projectId: projectId},
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        // onError: error => console.log(error.networkError.result.errors),
    })

    // Manually read the members from the cache
    const client = useApolloClient();
    let projectMembers = client.readQuery({
    query: GET_PROJECT_MEMBERS,
    variables: { projectId: projectId },

    });
    projectMembers = projectMembers?.getProject?.members;

    // Basic task management operations
    const { edit, toggleEdit, create, setCreate } = useTaskManagement();
    const [ moveTask ] = useMutation(MOVE_TASK)

    // Drag operations
    const { dragOverHandler, dragStartHandler, dropHandler, taskDragged, skeletonStyles, dragEnterHandler } = useDragTask({
        reOrdering: moveTask,
        mockedData: taskColumns,
        setMockedData: setTaskColumns
    });

    // Organize the tasks
    const tasks = data?.getProjectTasks
    useOrganizeTasks({tasks, taskDragged, setProjectStatuses, setTaskColumns})  
    
    // Subscribe to task being updated/enable realtime modifications
    const loadedTask = useLoadSubscriptionTask(subscribeToMore, TASK_UPDATED, projectId);
    const taskStatus = {
        projectMembers,
        dragEnterHandler,
        dragStartHandler,
        dragOverHandler,
        dropHandler,
        skeletonStyles,
        loadedTask,
        projectStatus: projectStatuses,
        error,
        isLoadingTasks,
        taskColumns,
        taskDragged,
        projectId,
        edit,
        toggleEdit,
        create,
        setCreate
    }

    return (
        <TasksContext.Provider value={taskStatus}>
            {children}
        </TasksContext.Provider>
    )
}

export default TasksProvider;