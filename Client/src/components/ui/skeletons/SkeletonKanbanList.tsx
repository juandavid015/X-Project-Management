import { KanbanHeader } from "../../kanban/KanbanHeader";
import SkeletonKanbanCard from "./SkeletonKanbanCard";

const SkeletonKanbanList = () => {
    const columns = ['Pending', 'In_progress', 'Review', 'Completed']
    return (
        <div className={`max-w-[1048px] grid grid-cols-4 gap-x-8 gap-y-4 `}>
            
            <div className="flex flex-col gap-y-2 w-full" >
                <KanbanHeader status={columns[0]} createNewTask={()=> false}/>
                <SkeletonKanbanCard withParagraph withUser/>
                <SkeletonKanbanCard />
                <SkeletonKanbanCard withImage withUser/>
            </div>
                    
            <div className="flex flex-col gap-y-2 w-full" >
                <KanbanHeader status={columns[1]} createNewTask={()=> false}/>
                <SkeletonKanbanCard withParagraph withUser/>
                <SkeletonKanbanCard />
            </div>

            <div className="flex flex-col gap-y-2 w-full" >
                <KanbanHeader status={columns[2]} createNewTask={()=> false}/>
                <SkeletonKanbanCard />
                <SkeletonKanbanCard withImage withUser/>
            </div>

            <div className="flex flex-col gap-y-2 w-full" >
                <KanbanHeader status={columns[3]} createNewTask={()=> false}/>
                <SkeletonKanbanCard />
            </div>
                
            
        </div>
    )
}
export default SkeletonKanbanList;