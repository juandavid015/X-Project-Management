
import { useApolloClient, useMutation, useQuery} from "@apollo/client";
import { useState, useEffect } from "react";
import { Status, Task } from "../../types/types";
import { GET_PROJECT_MEMBERS, GET_PROJECT_TASKS } from "../../graphql/querys";
import { AddIcon } from "../../assets/icons/Icons";
import { MOVE_TASK } from "../../graphql/mutations";
import { useDragTask } from "../../hooks/useDragTask";
import { useParams } from "react-router-dom";
import { handleErrorResponse } from "../../helpers/errorHelpers";
import { KanbanHeader } from "./KanbanHeader";
import { KanbanCard } from "./KanbanCard";
import { KanbanCardEditable } from "./KanbanCardEditable";
import SkeletonKanbanList from "../ui/skeletons/SkeletonKanbanList";
import { TASK_UPDATED } from "../../graphql/subscriptions";
import { useLoadSubscriptionTask } from "../../hooks/useLoadSubscriptionTask";


export type TaskColumn = {
    [key: string]: Task[]
}
export type TaskColumns = TaskColumn[] | []
export type ProjectStatus = {
    name: Status,
    color: string
}[]


const Kanban = () => {
    // labels must be a propertie from the project instance
  
    const [dragginIsOcurring, setDragginIsOcurring] = useState(false)
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
    
    const [moveTask] = useMutation(MOVE_TASK)
    const [taskColumns, setTaskColumns] = useState<TaskColumns>([]);
    const [projectStatus, setProjectStatus] = useState<ProjectStatus>()
    
    const { dragOverHandler, dragStartHandler, dropHandler, taskDragged, skeletonStyles, dragEnterHandler } = useDragTask({
        reOrdering: moveTask,
        mockedData: taskColumns,
        setMockedData: setTaskColumns
    });
    const loadedTask = useLoadSubscriptionTask(subscribeToMore, TASK_UPDATED, projectId);
    
    useEffect(()=> {
        // console.log('fired')
        const projectStatus:ProjectStatus = [
            {
                name: 'PENDING',
                color: 'rgba(66, 0, 255, 0.2)'
            },
            {
                name: 'IN_PROGRESS',
                color: 'rgba(66, 0, 255, 0.6)'
            },
            {
                name: 'REVIEW',
                color: 'rgba(66, 0, 255, 0.7)'
            },
            {
                name: 'COMPLETED',
                color: 'rgba(66, 0, 255, 1)'
            },
        ];
        const tasks = data?.getProjectTasks
        const tasksOrganizedInColumns: TaskColumns = projectStatus.map(status => {
            const result: TaskColumn = {};
            result[status.name] = tasks?.filter((task: Task) => task.status === status.name)
            .sort((a:Task, b: Task) => (a.indexPosition - b.indexPosition)); 
            return result
            
        })
      
        // console.log('TASK', data, 'dragging', dragginIsOcurring)
        // Correct the problem of too many isDragging due to useDragTask over is setting to true each time
        if(taskDragged && taskDragged.isDragging) {
           setDragginIsOcurring(true)
        } else {
            setDragginIsOcurring(false)
        }
        if(!dragginIsOcurring) {
            setTaskColumns(tasksOrganizedInColumns)

        }
            setProjectStatus(projectStatus)
    }, [data, taskDragged, dragginIsOcurring])

    if (isLoadingTasks) {
        return <SkeletonKanbanList />
    }
    if (error ) {    
        handleErrorResponse(error);
    }

    return (
        <div className={`max-w-[1048px] grid 
         gap-x-8 gap-y-4 `} style={{gridTemplateColumns: `repeat(${projectStatus?.length},minmax(238px, auto))`}} 
         > 
            {
                projectStatus?.map((status, indexStatus) => {
                    return(
                        <div className="flex flex-col gap-y-2  group/add w-full" key={indexStatus}  
                        >
                            
                            <KanbanHeader 
                            status={status.name} 
                            color={status.color}
                            createNewTask={()=> setCreatingNewCard({creating: true, creatingOn: status.name, editingOnCard: ''})}/>
                            <div className="dropzone flex flex-col gap-y-2 pb-[100px]" 
                            onDrop={(e: React.DragEvent) => dropHandler(e, status.name, indexStatus)} 
                            onDragOver={(e:React.DragEvent)=> dragOverHandler(e, indexStatus, status.name)}
                            onDragEnter={dragEnterHandler}
                            >
                            {
                                taskColumns[indexStatus][status.name]?.map((task, index: number) => {
                                    
                                        return creatingNewCard.editingOnCard !== task.id ? (
                                            <KanbanCard
                                            {...task}
                                            create={false}
                                            key={task.id}
                                            onEdit= {()=> setCreatingNewCard({creating: !creatingNewCard.creating, creatingOn: '', editingOnCard: task.id})}
                                            onDragStart={(e: React.DragEvent)=> dragStartHandler(e, task.id, task.indexPosition, task, index, indexStatus, status.name )}
                                            skeletonStyles={skeletonStyles}
                                            taskDragged={taskDragged}
                                          
                                            />
                                        ) :
                                        (
                                            <KanbanCardEditable
                                            isLoadedBySubscription={loadedTask.isLoadedBySubscription}
                                            projectMembers={projectMembers}
                                            projectId={projectId ||  ''}
                                            task={task}
                                            key={index}
                                            status={status.name}
                                            create={false}
                                            onEdit= {()=> setCreatingNewCard({creating: true, creatingOn: '', editingOnCard: ''})}
                                             />
                                        )
                                })
                            }
                            {
                                creatingNewCard.creating && creatingNewCard.creatingOn === status.name && (
                                    <KanbanCardEditable
                                    isLoadedBySubscription={loadedTask.isLoadedBySubscription}
                                    projectId={projectId || ''}
                                    projectMembers={projectMembers}
                                    key={indexStatus}
                                    status={status.name}
                                    create
                                    onEdit= {()=> setCreatingNewCard({creating: false, creatingOn: '', editingOnCard:''})}
                                    />
                                )
                            }

                                <button onClick={()=> setCreatingNewCard({creating: true, creatingOn: status.name, editingOnCard: ''})} title="Add new task"
                                className="border border-gray rounded-full p-[5px] mx-auto my-2 hidden
                                group-hover/add:block hover:fill-dark-med fill-gray hover:border-dark-med">
                                    <AddIcon className="h-[10px] "/>
                        
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