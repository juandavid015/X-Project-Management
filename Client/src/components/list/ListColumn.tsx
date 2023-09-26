import { Dispatch, SetStateAction, useState } from "react";
import { TaskColumns } from "../kanban/Kanban";
import ListCard from "./ListCard";
import ListColumnHeader from "./ListColumnHeader";
import ListCardEditable from "./ListCardEditable";
import { useParams } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { GET_PROJECT_MEMBERS } from "../../graphql/querys";
import { TaskDragged, TaskSkeletonStyles } from "../../hooks/useDragTask";
import { Status, Task } from "../../types/types";

interface ListColumnProps {
    taskColumns: TaskColumns,
    setTaskColumns: Dispatch<SetStateAction<TaskColumns>>
    indexStatus: number
    status: {
        name: Status
        color: string
    }
    isLoadedBySubscription: boolean | undefined
    dragOverHandler: (e: React.DragEvent<Element>, colIndex: number, colName: Status) => void
    dragStartHandler: (e: React.DragEvent<Element>, currentTaskId: string, initialTaskPosition: number, task: Task, index: number, colIndex: number, colName: string) => void
    dropHandler: (e: React.DragEvent<Element>, colName: string, colIndex: number) => Promise<void>
    dragEnterHandler: (e: React.DragEvent<Element>) => void
    skeletonStyles: TaskSkeletonStyles
    taskDragged?: TaskDragged

}

const ListColumn = ({ taskColumns, indexStatus, status, isLoadedBySubscription, dragStartHandler, dragOverHandler, dropHandler, dragEnterHandler, skeletonStyles, taskDragged }: ListColumnProps) => {

    const { projectId } = useParams();
    const [expandedColumn, setExpandedColumn] = useState(true);
    const expandColumn = () => {
        setExpandedColumn(!expandedColumn)
    }
    const [edit, setEdit] = useState({
        isActive: false,
        item: '',
        input: ''
    })
    const [isCreatingNewCard, setIsCreatingNewCard] = useState(false);
    const toggleEdit = (itemToBeEdited: string, inputToBeEdited: string) =>{
        setEdit((prevEditValues) => ({
            ...prevEditValues, 
            isActive: prevEditValues.item !== itemToBeEdited,
            item: itemToBeEdited,
            input: inputToBeEdited
        }))
    }
    const client = useApolloClient();
    let projectMembers = client.readQuery({
        query: GET_PROJECT_MEMBERS,
        variables: { projectId: projectId },
  
      });
  
    projectMembers = projectMembers?.getProject?.members;
  

    return (
        <div className="flex flex-col gap-4 border-b border-white-gray pb-2">

            <ListColumnHeader
            status={status}
            expandedColumn={expandedColumn}
            expandColumn={expandColumn}
            createNewTask={()=> setIsCreatingNewCard(true)}
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
                        create={isCreatingNewCard}
                        task={task}
                        projectId={projectId || ''}
                        toggleEdit={()=> toggleEdit('', '')}
                        projectMembers={projectMembers}
                        isLoadedBySubscription={isLoadedBySubscription}
                        status={status.name}
                        />
                    ):
                    (
                        <ListCard
                        key={task.id}
                        task={task} 
                        toggleEdit={()=> toggleEdit(task.id, '')}
                        onDragStart={(e: React.DragEvent)=> dragStartHandler(e, task.id, task.indexPosition, task, taskIndex, indexStatus, status.name )}
                        skeletonStyles={skeletonStyles}
                        taskDragged={taskDragged}
                        />
                    )
                    })
            }
            {
                isCreatingNewCard && 
                <ListCardEditable
                status={status.name}
                create={isCreatingNewCard}
                projectId={projectId || ''}
                projectMembers={projectMembers}
                toggleEdit={()=> setIsCreatingNewCard(false)}
                isLoadedBySubscription={isLoadedBySubscription}
                />
            }
            </div>
                            
        </div>
    )
}
export default ListColumn;