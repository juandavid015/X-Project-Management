import { EqualIcon, LowLeftIcon } from "../../assets/icons/Icons";
import { Task } from "../../types/types";

interface CalendarTaskCardProps {
    task: Task
    onDragStart?: (e: React.DragEvent) => void,
}

const CalendarTaskCard = ({task, onDragStart}: CalendarTaskCardProps) => {
    const { title, priority } = task;
    // const {taskDragged, skeletonStyles} = useContext(TasksContext);
    // const taskIsBeingDragged = taskDragged && taskDragged.isDragging && taskDragged.id === id;
    // console.log(taskIsBeingDragged)
    return ( 
        // taskIsBeingDragged ? 
        // <div style={{height:skeletonStyles.height, width: skeletonStyles.width}}
        // className={`task bg-dark opacity-10 shadow-md2 rounded-md `}>
            
        // </div>:
        <div className="bg-dark-med/10 p-1 rounded-md text-xs cursor-pointer
        flex gap-1 items-center" draggable onDragStart={onDragStart}>
            <p>
                {title}
            </p>
            {
                priority && 
                <p title={priority === "LOW" ? 'Low priority': priority === 'HIGH' ? 'High Priority': priority === 'MODERATE' ? 'Moderate priority': ''}
                className="inline w-fit">
                {
                        priority === 'LOW' ?     
                        <LowLeftIcon className={`h-[15px] w-[15px] fill-yellow-gold`} />:
                        priority === 'HIGH' ? 
                        <LowLeftIcon className="h-[15px] w-[15px] fill-red-warning rotate-180" />:
                        priority === 'MODERATE' ?
                        <EqualIcon className="h-[15px] w-[15px] "/>:
                        ''
                }
                </p>
            }
        </div>
    )
}
export default CalendarTaskCard;