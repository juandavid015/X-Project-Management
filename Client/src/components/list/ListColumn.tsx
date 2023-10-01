import { useContext, useState } from "react";
import ListCard from "./ListCard";
import ListColumnHeader from "./ListColumnHeader";
import ListCardEditable from "./ListCardEditable";
import { Status } from "../../types/types";
import { TasksContext } from "../../providers/TasksProvider";

interface ListColumnProps {
    indexStatus: number
    status: {
        name: Status
        color: string
    }
}

const ListColumn = ({status, indexStatus}: ListColumnProps) => {

    const {
        taskColumns,
        dragEnterHandler,
        dragStartHandler,
        dragOverHandler,
        dropHandler,
        create,
        setCreate, 
        edit,
        toggleEdit
        
    } = useContext(TasksContext);

    const [expandedColumn, setExpandedColumn] = useState(true);
    const expandColumn = () => {
        setExpandedColumn(!expandedColumn)
    }

    return (
        <div className="flex flex-col gap-4 border-b border-white-gray pb-2">

            <ListColumnHeader
            status={status}
            expandedColumn={expandedColumn}
            expandColumn={expandColumn}
            createNewTask={()=> setCreate({isActive: true, columnTarget: status.name})}
            />

            <div className="dropzone flex flex-col gap-2 pb-[44px]"
            onDrop={(e: React.DragEvent) => dropHandler(e, status.name, indexStatus)} 
            onDragOver={(e:React.DragEvent)=> dragOverHandler(e, indexStatus, status.name)}
            onDragEnter={dragEnterHandler}>
            {
                expandedColumn && taskColumns[indexStatus][status.name]?.map((task, taskIndex) => {
                    return edit.isActive && task.id === edit.item
                    ? (
                        <ListCardEditable
                        key={task.id || taskIndex}
                        task={task}
                        toggleEdit={()=> toggleEdit('', '')}
                        status={status.name}
                        />
                    ):
                    (
                        <ListCard
                        key={task.id}
                        task={task} 
                        toggleEdit={()=> toggleEdit(task.id, '')}
                        onDragStart={(e: React.DragEvent) => 
                            dragStartHandler(
                                e, 
                                task.id, 
                                task.indexPosition, 
                                task, taskIndex, 
                                indexStatus, 
                                status.name 
                            )
                        }
                        />
                    )
                    })
            }
            {
                create.isActive && create.columnTarget === status.name && 
                <ListCardEditable
                status={status.name}
                toggleEdit={()=> setCreate({isActive: false, columnTarget: ''})}
                />
            }
            </div>
                            
        </div>
    )
}
export default ListColumn;