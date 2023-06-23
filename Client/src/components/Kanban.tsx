
import { useQuery} from "@apollo/client";
import { KanbanHeader } from "./KanbanHeader";
import { KanbanCardEditable} from "./KanbanCardEditable";
import { useState } from "react";
import { Task } from "../types/types";
import { GET_PROJECT_TASKS } from "../graphql/querys";
import { KanbanCard } from "./KanbanCard";
import { AddIcon } from "../assets/icons/Icons";


export const Kanban = () => {
    // labels must be a propertie from the project instance
    const projectStatus = ['PENDING', 'IN_PROGRESS', 'REVIEW', 'COMPLETED'];

    const {loading, error, data} = useQuery(GET_PROJECT_TASKS, {
        variables: {projectId: '64776d5011f6af1e77f4e984'},
        errorPolicy: 'none'
        // onError: error => console.log(error.networkError.result.errors),
    })

    const [creatingNewCard, setCreatingNewCard] = useState({
        creating: false,
        creatingOn: '',
        editingOnCard: ''
    });

    if (loading) return <p>Loading...</p>;
    if (error) {    
        // Handle other errors
        return <p>Error: {error.message}</p>;
      }

    const tasks = data.getProjectTasks
    // console.log('tasks', tasks)
    
    return (
        <div className={`grid 
         gap-x-8 gap-y-4 `} style={{gridTemplateColumns: `repeat(${projectStatus.length},minmax(238px, auto))`}}>
            {
                projectStatus.map((status, index) => {
                    return(
                        <div className="flex flex-col gap-y-2 pb-6 group/add w-full" key={index}>
                            <KanbanHeader status={status} createNewTask={()=> setCreatingNewCard({creating: true, creatingOn: status, editingOnCard: ''})}/>
                            {
                                tasks.map((task: Task, index: number) => {
                                    if (task.status === status) {
                                        return creatingNewCard.editingOnCard !== task.id ? (
                                            <KanbanCard
                                            {...task}
                                            create={false}
                                            key={index}
                                            onEdit= {()=> setCreatingNewCard({creating: !creatingNewCard.creating, creatingOn: '', editingOnCard: task.id})}
                                            />
                                        ) :
                                        (
                                            <KanbanCardEditable
                                            task={task}
                                            key={index}
                                            status={status}
                                            create={false}
                                            onEdit= {()=> setCreatingNewCard({creating: true, creatingOn: '', editingOnCard: ''})}
                                             />
                                        )
                                    } return
                                   
                                })
                            }
                            {
                                creatingNewCard.creating && creatingNewCard.creatingOn === status && (
                                    <KanbanCardEditable
                                    key={index}
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
                    )
                })
            }

        </div>
    )
}