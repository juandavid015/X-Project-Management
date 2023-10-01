import { useEffect, useState } from "react";
import { ProjectStatus, TaskColumn, TaskColumns } from "../providers/TasksProvider";
import { Task } from "../types/types";
import { TaskDragged } from "./useDragTask";

interface useOrganizeTasksProps {
    tasks: Task[],
    taskDragged: TaskDragged | undefined
    setTaskColumns: React.Dispatch<React.SetStateAction<TaskColumns>>
    setProjectStatuses: React.Dispatch<React.SetStateAction<ProjectStatus | undefined>>
}
export const useOrganizeTasks = ({tasks, taskDragged, setTaskColumns, setProjectStatuses}: useOrganizeTasksProps) =>{


    const [dragginIsOcurring, setDragginIsOcurring] = useState(false)

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
  
        const tasksOrganizedInColumns: TaskColumns = projectStatus.map(status => {
            const result: TaskColumn = {};
            result[status.name] = tasks?.filter((task: Task) => task.status === status.name)
            .sort((a:Task, b: Task) => (a.indexPosition - b.indexPosition)); 
            return result
            
        })
      
        // Correct the problem of too many isDragging due to useDragTask over is setting to true each time
        if(taskDragged && taskDragged.isDragging) {
           setDragginIsOcurring(true)
        } else {
            setDragginIsOcurring(false)
        }
        if(!dragginIsOcurring) {
          // Only force to re order/update the task's columns if 
          // any task is being dragged. This way avoid sync conflict between
          // optimistic updates and server response, provoking erratic or laggy behaviour
            setTaskColumns(tasksOrganizedInColumns)

        }
          setProjectStatuses(projectStatus)
    }, [taskDragged, dragginIsOcurring, tasks, setProjectStatuses, setTaskColumns])

   
}