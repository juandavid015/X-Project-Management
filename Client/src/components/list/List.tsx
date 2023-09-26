import { useEffect, useState } from "react";
import { ProjectStatus, TaskColumn, TaskColumns } from "../kanban/Kanban";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT_TASKS } from "../../graphql/querys";
import { useParams } from "react-router-dom";
import { handleErrorResponse } from "../../helpers/errorHelpers";
import { Task } from "../../types/types";

import ListColumn from "./ListColumn";
import { useLoadSubscriptionTask } from "../../hooks/useLoadSubscriptionTask";
import { TASK_UPDATED } from "../../graphql/subscriptions";
import { useDragTask } from "../../hooks/useDragTask";
import { MOVE_TASK } from "../../graphql/mutations";


const List = () => {
    
    const [projectStatus, setProjectStatus] = useState<ProjectStatus>()
    const [taskColumns, setTaskColumns] = useState<TaskColumns>([]);

    const { projectId } = useParams();
    const {loading: isLoadingTasks, error, data, subscribeToMore} = useQuery(GET_PROJECT_TASKS, {
        variables: {projectId: projectId},
        errorPolicy: 'all',
        fetchPolicy: 'cache-and-network',
        // onError: error => console.log(error.networkError.result.errors),
    })
    const loadedTask = useLoadSubscriptionTask(subscribeToMore, TASK_UPDATED, projectId);
    const [moveTask] = useMutation(MOVE_TASK)
    // FOR sharing all the drag logic and other related logic, not only for List view but for Kanbna, as
    // are using the same logic, one option could be wrap and use a provider.
    const { dragOverHandler, dragStartHandler, dropHandler, taskDragged, skeletonStyles, dragEnterHandler } = useDragTask({
        reOrdering: moveTask,
        mockedData: taskColumns,
        setMockedData: setTaskColumns
    });
    
    useEffect(()=> {
        // console.log('fired')
        const projectStatus:ProjectStatus = [
            {
                name: 'PENDING',
                color: 'rgba(66, 0, 255, 0.2)'
            },
            {
                name: 'IN_PROGRESS',
                color: 'rgba(66, 0, 255, 0.6)'
            },
            {
                name: 'REVIEW',
                color: 'rgba(66, 0, 255, 0.7)'
            },
            {
                name: 'COMPLETED',
                color: 'rgba(66, 0, 255, 1)'
            },
        ];
        const tasks = data?.getProjectTasks
        const tasksOrganizedInColumns: TaskColumns = projectStatus.map(status => {
            const result: TaskColumn = {};
            result[status.name] = tasks?.filter((task: Task) => task.status === status.name)
            .sort((a:Task, b: Task) => (a.indexPosition - b.indexPosition)); 
            return result
            
        })

        setTaskColumns(tasksOrganizedInColumns)
        setProjectStatus(projectStatus)

    }, [data])

    if (isLoadingTasks) {
        return <div>Loading list...</div>
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
                        taskColumns={taskColumns}
                        setTaskColumns={setTaskColumns}
                        status={status}
                        indexStatus={indexStatus}
                        isLoadedBySubscription={loadedTask.isLoadedBySubscription}
                        dragEnterHandler={dragEnterHandler}
                        dragStartHandler={dragStartHandler}
                        dragOverHandler={dragOverHandler}
                        dropHandler={dropHandler}
                        skeletonStyles={skeletonStyles}
                        taskDragged={taskDragged}
                        
                        />
                    )
                })
            }
        </div>
    )
}
export default List;