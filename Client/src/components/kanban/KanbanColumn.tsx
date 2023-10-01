import { AddIcon } from "../../assets/icons/Icons";
import { TasksContext } from "../../providers/TasksProvider";
import { Status } from "../../types/types";
import { KanbanCard } from "./KanbanCard";
import { KanbanCardEditable } from "./KanbanCardEditable";
import { KanbanHeader } from "./KanbanHeader";
import { useContext } from 'react';

interface KanbanColumnProps {
    indexStatus: number
    status: {
        name: Status
        color: string
    }
}
const KanbanColumn = ({status, indexStatus}: KanbanColumnProps) => {

    const {
        taskColumns,
        dragEnterHandler,
        dragStartHandler,
        dragOverHandler,
        dropHandler,
        edit,
        toggleEdit,
        create,
        setCreate
        
    } = useContext(TasksContext);
    return (
        <div className="flex flex-col gap-y-2  group/add w-full" key={indexStatus} >
            
            <KanbanHeader
            status={status.name} 
            color={status.color}
            createNewTask={()=> setCreate({isActive: true, columnTarget: status.name})}
            />

            <div className="dropzone flex flex-col gap-y-2 pb-[100px]" 
            onDrop={(e: React.DragEvent) => dropHandler(e, status.name, indexStatus)} 
            onDragOver={(e:React.DragEvent)=> dragOverHandler(e, indexStatus, status.name)}
            onDragEnter={dragEnterHandler}
            >
            {
                taskColumns[indexStatus][status.name]?.map((task, index: number) => {
                    
                    return edit.isActive && task.id === edit.item
                    ? (
                        <KanbanCardEditable
                        key={task.id || index}
                        task={task}
                        toggleEdit={()=> toggleEdit('', '')}
                        status={status.name}
                            />
                    ) :
                    (
                        <KanbanCard
                        task={task}
                        key={task.id}
                        toggleEdit={()=> toggleEdit(task.id, '')}
                        onDragStart = {(e: React.DragEvent)=> 
                            dragStartHandler(
                                e, 
                                task.id, 
                                task.indexPosition, 
                                task, 
                                index, 
                                indexStatus, 
                                status.name 
                            )
                        }
                        />
                    )
                })
            }

            {
                create.isActive && create.columnTarget === status.name && (
                    <KanbanCardEditable
                    status={status.name}
                    toggleEdit={()=> setCreate({isActive: false, columnTarget: ''})}
                    />
                )
            }

                <button onClick={()=> setCreate({isActive: true, columnTarget: status.name})} title="Add new task"
                className="border border-gray rounded-full p-[5px] mx-auto my-2 hidden
                group-hover/add:block hover:fill-dark-med fill-gray hover:border-dark-med">
                    <AddIcon className="h-[10px] "/>
        
                </button>
            </div>
        </div>
    )
}
export default KanbanColumn;