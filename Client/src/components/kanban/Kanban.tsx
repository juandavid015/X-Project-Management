
import {  useContext } from "react";
import { handleErrorResponse } from "../../helpers/errorHelpers";
import SkeletonKanbanList from "../ui/skeletons/SkeletonKanbanList";
import { TasksContext } from "../../providers/TasksProvider";
import KanbanColumn from "./KanbanColumn";

const Kanban = () => {
    // labels must be a propertie from the project instance
    const {
        isLoadingTasks,
        projectStatus,
        error,
    } = useContext(TasksContext)

    if (isLoadingTasks) {
        return <SkeletonKanbanList />
    }
    if (error) {    
        handleErrorResponse(error);
    }

    return (
        <div className={`max-w-[1048px] grid 
         gap-x-8 gap-y-4 `} style={{gridTemplateColumns: `repeat(${projectStatus?.length},minmax(238px, auto))`}} 
         > 
            {
                projectStatus?.map((status, indexStatus) => {
                    return(
                        <KanbanColumn
                        key={indexStatus}
                        status={status}
                        indexStatus={indexStatus}
                        />
                    )
                })
            }

        </div>
    )
}

export default Kanban;