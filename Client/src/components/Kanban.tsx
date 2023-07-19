
import { useApolloClient, useQuery} from "@apollo/client";
import { KanbanHeader } from "./KanbanHeader";
import { KanbanCardEditable} from "./KanbanCardEditable";
import { useState, useEffect } from "react";
import { Status, Task } from "../types/types";
import { GET_PROJECT_MEMBERS, GET_PROJECT_TASKS } from "../graphql/querys";
import { KanbanCard } from "./KanbanCard";
import { AddIcon } from "../assets/icons/Icons";
import { useSaveEntity } from "../hooks/useSaveEntity";
import { MOVE_TASK } from "../graphql/mutations";
import { useDragTask } from "../hooks/useDragTask";

export type TaskSkeleton = {
    status: 'dragging'
    indexPosition: number
}
export type TaskColumn = {
    [key: string]: Task[]
}

export type TaskColumns = TaskColumn[]

export type ProjectStatus = Status[]
export const Kanban = () => {
    // labels must be a propertie from the project instance

  
    const projectStatus: ProjectStatus = ['PENDING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];
    
    const {loading, error, data} = useQuery(GET_PROJECT_TASKS, {
        variables: {projectId: '64776d5011f6af1e77f4e984'},
        errorPolicy: 'none'
        // onError: error => console.log(error.networkError.result.errors),
    })

    const client = useApolloClient();

    // Manually read the data from the cache
    let projectMembers = client.readQuery({
      query: GET_PROJECT_MEMBERS,
      variables: { projectId: '64776d5011f6af1e77f4e984' },
    });
    projectMembers = projectMembers?.getProject?.members;
    const [creatingNewCard, setCreatingNewCard] = useState({
        creating: false,
        creatingOn: '',
        editingOnCard: ''
    });
    
    const saveEntity = useSaveEntity(MOVE_TASK, GET_PROJECT_TASKS)
    let tasks = data?.getProjectTasks
    
    tasks = tasks?.filter((task: Task) => task.projectId !== null)
    let taskCols: TaskColumns = projectStatus.map(status => {
        let result: TaskColumn = {};
        result[status] = tasks?.filter((task: Task) => task.status === status)
        .sort((a:Task, b: Task) => (a.indexPosition - b.indexPosition)); 
        return result
        
    })
    const [taskColumns, setTaskColumns] = useState(taskCols);

    const { dragOverHandler, dragStartHandler, dropHandler, taskDragged, skeletonStyles} = useDragTask({
        reOrdering: saveEntity,
        mockedData: taskColumns,
        setMockedData: setTaskColumns
    });

    useEffect(()=> {
        setTaskColumns(taskCols)
    }, [data])
    
    

    if (loading) return <p>Loading...</p>;
    if (error) {    
        // Handle other errors
        return <p>Error: {error.message}</p>;
      }
    
   
    return (
        <div className={`grid 
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