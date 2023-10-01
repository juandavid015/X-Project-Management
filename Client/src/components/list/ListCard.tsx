import { useState, useContext } from "react";
import { Members } from "../ui/Members";
import { CheckCircleIcon, EditIcon, EqualIcon, LabelIcon, LowLeftIcon } from "../../assets/icons/Icons";
import { Label, Task } from "../../types/types";
import { TasksContext } from "../../providers/TasksProvider";

interface ListCardProps {
    task: Task
    toggleEdit: () => void
    onDragStart: (e: React.DragEvent) => void,
}
const ListCard = ({task, toggleEdit, onDragStart, }:ListCardProps) => {
    
    const {taskDragged, skeletonStyles} = useContext(TasksContext)
    const { 
        title,
        timeline, 
        description, 
        labels, 
        priority, 
        members, 
        imageUrl, 
        id 
    } = task

    const [taskCompleted, setTaskCompleted] = useState(false);

    const markTaskAsCompleted = () => {
        setTaskCompleted(!taskCompleted)
    }
    const taskIsBeingDragged = taskDragged && taskDragged.isDragging && taskDragged.id === id;
    return (
        taskIsBeingDragged ? 
        <div style={{height:skeletonStyles.height, width: skeletonStyles.width}}
        className={`task bg-dark-med opacity-10 shadow-md2 rounded-md `}>
            
        </div>:

        <div className="task relative bg-white rounded-md shadow-white-gray shadow-md2 
        px-4 py-3 flex items-center gap-4 group" onDragStart={onDragStart} draggable>
            <button onClick={toggleEdit}
            className="absolute right-0 pr-4 group-hover:block hidden w-fit">
                <EditIcon className="fill-white-gray h-[20px] cursor-pointer"/>
            </button>
            <button onClick={markTaskAsCompleted}
            className="border border-dotted h-[20px] w-[20px] rounded-full
            flex box-border fill-dark mr-4">
                {
                    taskCompleted &&
                    <CheckCircleIcon className="h-full"/>
                }
            </button>
            <div
            className="flex flex-wrap gap-2 ">
                {
                    labels.map((label: Label, index: number) => {
                        return (
                            <p key={index}
                            className="flex items-center gap-1 font-bold">
                                <LabelIcon className="h-[20px] fill-dark" />
                                <span style={{color: label.color}}>{label.name}</span>
                            </p>
                        )
                    } )
                }
            </div>
            <h3 className="font-bold ">
                {title}
            </h3>
            <p className="font-medium">
                {timeline}
            </p>
            <p className="max-w-[200px] truncate">
                {description}
            </p>
            <Members
            height="h-[20px]"
            width="w-[20px]"
            members={members} />
                {
                priority && 
                <p title={priority === "LOW" ? 'Low priority': priority === 'HIGH' ? 'High Priority': priority === 'MODERATE' ? 'Moderate priority': ''}
                className="inline w-fit">
                {
                        priority === 'LOW' ?     
                        <LowLeftIcon className={`h-[20px] w-[20px] fill-yellow-gold`} />:
                        priority === 'HIGH' ? 
                        <LowLeftIcon className="h-[20px] w-[20px] fill-red-warning rotate-180" />:
                        priority === 'MODERATE' ?
                        <EqualIcon className="h-[20px] w-[20px] "/>:
                        ''
                }
                </p>
            }
            {
                imageUrl &&
                <div className={`pointer-events-none
                rounded-sm overflow-hidden max-h-[20px] w-[50px]`}>
                    <img src={imageUrl} alt={'task nested image'} className="object-cover h-full w-full"/>
                </div>
            }
        </div>
    )
}
export default ListCard;