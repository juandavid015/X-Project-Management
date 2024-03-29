
import { DocumentIcon, EditIcon, EqualIcon, LabelIcon, LowLeftIcon, MessageIcon } from "../../assets/icons/Icons"
import { TasksContext } from "../../providers/TasksProvider"
import { Label, Task } from "../../types/types"
import { Members } from "../ui/Members"
import { useContext } from 'react';

interface KanbanCardProps {
    task: Task
    toggleEdit: () => void
    onDragStart: (e: React.DragEvent) => void,
}

export const KanbanCard = ({toggleEdit, onDragStart, task}: KanbanCardProps) => {
    const {skeletonStyles, taskDragged} = useContext(TasksContext)
    const {title, description, labels, priority, timeline, members, id, imageUrl} = task
    const timelineString = new Date(timeline || '');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedTimeline = timeline && timelineString.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
    const taskIsBeingDragged = taskDragged && taskDragged.isDragging && taskDragged.id === id;

    return (
        taskIsBeingDragged ? 
            <div style={{height:skeletonStyles.height, width: skeletonStyles.width}}
            className={`task bg-dark-med opacity-10 shadow-md2 rounded-md `}>
                
            
            </div>:

            <div className={`task bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px] 
            flex flex-col gap-2 relative group break-words ${taskIsBeingDragged && 'pointer-events-none'} pointer-events-auto`} 
            onDragStart={onDragStart}  
            draggable='true'  >

                <button onClick={toggleEdit}
                className="absolute right-0 pr-4 group-hover:block hidden w-fit">
                    <EditIcon className="fill-white-gray h-[20px] cursor-pointer"/>
                </button>
                <div
                className="flex flex-wrap gap-2">
                    {
                        labels?.map((label: Label, index: number) => {
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
            
                <h2 className={`text-md font-bold ${taskIsBeingDragged ? 'pointer-events-none': 'pointer-events-auto'}`}>
                    {title}
                </h2>
                
                <p className={`${taskIsBeingDragged ? 'pointer-events-none': 'pointer-events-auto'}`}>
                    {description}
                </p>
                <p className={`text-gray ${taskIsBeingDragged ? 'pointer-events-none': 'pointer-events-auto'}`}>
                    { formattedTimeline }
                </p>
                {
                    imageUrl &&
                    <div className={`pointer-events-none
                    rounded-md overflow-hidden max-h-[200px]`}>
                        <img src={imageUrl} alt={'task nested image'} className="object-cover h-full w-full"/>
                    </div>
                }
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
                {/* <span className={`${taskIsBeingDragged ? 'pointer-events-none': 'pointer-events-auto'}`}>{indexPosition}</span> */}
                <div className={`border-t border-white-gray pt-2 w-full flex items-center justify-evenly 
                group-hover:flex ${taskIsBeingDragged && 'hidden'} hidden`}>
                    <button className="w-fit fill-dark-med hover:fill-dark">
                        <MessageIcon className="h-[20px] w-[20px]" />
                    </button>
                    <button className="w-fit fill-dark-med hover:fill-dark">
                        <DocumentIcon className="h-[18px] w-[20px]" />
                    </button>

                </div>
            
            </div>
     
    )
}