import { useContext } from "react";
import { handleErrorResponse } from "../../helpers/errorHelpers";
import ListColumn from "./ListColumn";
import { TasksContext } from "../../providers/TasksProvider";
import SkeletonList from "../ui/skeletons/SkeletonList";


const List = () => {
    const {
        projectStatus,
        error,
        isLoadingTasks,
    } = useContext(TasksContext);

    if (isLoadingTasks) {
        return <SkeletonList />
    }
    if (error ) {    
        handleErrorResponse(error);
    }
    
    return (
        <div className="max-w-[1048px] flex flex-col gap-4 text-dark-med"
        >
            {
                projectStatus?.map((status, indexStatus) => {
                    return (
                        <ListColumn
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
export default List;