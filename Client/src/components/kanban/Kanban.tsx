
import { useApolloClient, useQuery} from "@apollo/client";


import { useState, useEffect } from "react";
import { Status, Task } from "../../types/types";
import { GET_PROJECT_MEMBERS, GET_PROJECT_TASKS } from "../../graphql/querys";

import { AddIcon } from "../../assets/icons/Icons";
import { useSaveEntity } from "../../hooks/useSaveEntity";
import { MOVE_TASK } from "../../graphql/mutations";
import { useDragTask } from "../../hooks/useDragTask";
import { useParams } from "react-router-dom";
import { handleErrorResponse } from "../../helpers/errorHelpers";
import { KanbanHeader } from "./KanbanHeader";
import { KanbanCard } from "./KanbanCard";
import { KanbanCardEditable } from "./KanbanCardEditable";
import SkeletonKanbanList from "../ui/skeletons/SkeletonKanbanList";
import { TASK_UPDATED } from "../../graphql/subscriptions";

export type TaskColumn = {
    [key: string]: Task[]
}
export type TaskColumns = TaskColumn[]
export type ProjectStatus = Status[]


const Kanban = () => {
    // labels must be a propertie from the project instance
    const projectStatus: ProjectStatus = ['PENDING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];
    const { projectId } = useParams();
    const {loading: isLoadingTasks, error, data, subscribeToMore} = useQuery(GET_PROJECT_TASKS, {
        variables: {projectId: projectId},
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        // onError: error => console.log(error.networkError.result.errors),
    })

    const client = useApolloClient();
    // Manually read the data from the cache
    let projectMembers = client.readQuery({
      query: GET_PROJECT_MEMBERS,
      variables: { projectId: projectId },
    });

    projectMembers = projectMembers?.getProject?.members;
    const [creatingNewCard, setCreatingNewCard] = useState({
        creating: false,
        creatingOn: '',
        editingOnCard: ''
    });
    
    const saveEntity = useSaveEntity(MOVE_TASK, GET_PROJECT_TASKS)
    const tasks = data?.getProjectTasks
    
 
    const tasksOrganizedInColumns: TaskColumns = projectStatus.map(status => {
        const result: TaskColumn = {};
        result[status] = tasks?.filter((task: Task) => task.status === status)
        .sort((a:Task, b: Task) => (a.indexPosition - b.indexPosition)); 
        return result
        
    })
    const [taskColumns, setTaskColumns] = useState(tasksOrganizedInColumns);
    
    const { dragOverHandler, dragStartHandler, dropHandler, taskDragged, skeletonStyles, dragEnterHandler } = useDragTask({
        reOrdering: saveEntity,
        mockedData: taskColumns,
        setMockedData: setTaskColumns
    });

    useEffect(()=> {
        return subscribeToMore({
            document: TASK_UPDATED,
            variables: {
                projectId: projectId
            },
            updateQuery: (prevData, { subscriptionData }) => {
     
                if(!subscriptionData.data) return prevData
                const taskUpdated = subscriptionData.data.taskUpdated.task;
                const action = subscriptionData.data.taskUpdated.action; // Get the action type (add, edit, or delete)
                const taskIsAlreadyPresent = prevData.getProjectTasks.some((task: Task) => task.id ===  taskUpdated.id)
               
                if(action === 'CREATE' && !taskIsAlreadyPresent) {
                    return {
                        ...prevData,
                        // Add the new task to the appropriate field
                        getProjectTasks: [...prevData.getProjectTasks, taskUpdated],
                    };
                } else if (action === 'EDIT') {
                    return {
                        ...prevData,
                        // Update the existing task in the array
                        getProjectTasks: prevData.getProjectTasks.map((task: Task) => 
                            task.id === taskUpdated.id ? taskUpdated : task
                        ),
                    };
                } else if (action === 'DELETE') {
                    return {
                        ...prevData,
                        // Remove the deleted task from the array
                        getProjectTasks: prevData.getProjectTasks.filter((task: Task) => task.id !== taskUpdated.id),
                    };
                } else {
                    return prevData
                }
               
            }
        })
    }, [subscribeToMore, projectId])
    useEffect(()=> {
        setTaskColumns(tasksOrganizedInColumns)
    }, [data])
    
    if (isLoadingTasks) {
        return <SkeletonKanbanList />
    }
    if (error ) {    
        handleErrorResponse(error);
    }

    return (
        <div className={`max-w-[1048px] grid 
         gap-x-8 gap-y-4 `} style={{gridTemplateColumns: `repeat(${projectStatus.length},minmax(238px, auto))`}} 
         > 
            {
                projectStatus.map((status, indexStatus) => {
                    return(
                        <div className="flex flex-col gap-y-2  group/add w-full" key={indexStatus}  
                        >
                            
                            <KanbanHeader status={status} createNewTask={()=> setCreatingNewCard({creating: true, creatingOn: status, editingOnCard: ''})}/>
                            <div className="dropzone flex flex-col gap-y-2 pb-[100px]" 
                            onDrop={(e: React.DragEvent) => dropHandler(e, status, indexStatus)} 
                            onDragOver={(e:React.DragEvent)=> dragOverHandler(e, indexStatus, status)}
                            onDragEnter={dragEnterHandler}
                            >
                            {
                                taskColumns[indexStatus][status]?.map((task, index: number) => {
                                    
                                        return creatingNewCard.editingOnCard !== task.id ? (
                                            <KanbanCard
                                            {...task}
                                            create={false}
                                            key={task.id}
                                            onEdit= {()=> setCreatingNewCard({creating: !creatingNewCard.creating, creatingOn: '', editingOnCard: task.id})}
                                            onDragStart={(e: React.DragEvent)=> dragStartHandler(e, task.id, task.indexPosition, task, index, indexStatus, status )}
                                            skeletonStyles={skeletonStyles}
                                            taskDragged={taskDragged}
                                          
                                            />
                                        ) :
                                        (
                                            <KanbanCardEditable
                                            projectMembers={projectMembers}
                                            projectId={projectId ||  ''}
                                            task={task}
                                            key={index}
                                            status={status}
                                            create={false}
                                            onEdit= {()=> setCreatingNewCard({creating: true, creatingOn: '', editingOnCard: ''})}
                                             />
                                        )
                                })
                            }
                            {
                                creatingNewCard.creating && creatingNewCard.creatingOn === status && (
                                    <KanbanCardEditable
                                    projectId={projectId || ''}
                                    projectMembers={projectMembers}
                                    key={indexStatus}
                                    status={status}
                                    create
                                    onEdit= {()=> setCreatingNewCard({creating: false, creatingOn: '', editingOnCard:''})}
                                    />
                                )
                            }

                                <button onClick={()=> setCreatingNewCard({creating: true, creatingOn: status, editingOnCard: ''})} title="Add new task"
                                className="border border-gray rounded-full p-[5px] mx-auto my-2 hidden
                                group-hover/add:block ">
                                    <AddIcon className="h-[10px] fill-gray"/>
                        
                                </button>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Kanban;