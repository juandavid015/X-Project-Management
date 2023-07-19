
import { useEffect, useRef, useState } from 'react';
import { TaskColumns, TaskSkeleton } from '../components/Kanban';
import { Status, Task } from '../types/types';

interface UserDragTaskProps {
    reOrdering: any
    mockedData?: any,
    setMockedData: any
}

type TaskDragged = {
	id: string,
	index: number,
	isDragging: boolean,
	taskPosition: number,
	colName: string,
	colIndex: number
}
// The main hook function for handling drag and drop functionality
export const useDragTask = ({reOrdering, setMockedData, mockedData}: UserDragTaskProps) => {
    // States to keep track of initial task position and other drag-related data
	const taskRef = useRef<HTMLElement | null>(null);
	const [initialColIndex, setInitialColIndex] = useState(0);
	const [initialColName, setInitialColName] = useState('');
	const [initialTask, setInitialTask] = useState<Task | undefined>();
	const [taskDragged, setTaskDragged] = useState<TaskDragged | undefined>();
	const [skeletonStyles, setSkeletonStyles] = useState<{ height: string; width: string }>({
	  height: '',
	  width: '',
	});
	// Function to find the index of the closest task to the drop position
    const findClosestTaskIndex = (e:React.DragEvent<Element>) => {

    	const element = e.currentTarget as HTMLElement
      	const dropContainer = element.getBoundingClientRect();
      	const dropContainerHeight = e.clientY - dropContainer.top;

      	const taskIndex = Array.from(element.children).findIndex((task)=> {
			const dropTarget = task.getBoundingClientRect();
			const dropTargetHeight = dropTarget.bottom - dropContainer.top;

			const isNearToTask = dropContainerHeight < dropTargetHeight;
			return isNearToTask
      	})

      	return taskIndex
    }
	 // Event handler when drag starts on a task
    const dragStartHandler = (e:React.DragEvent, currentTaskId: string, initialTaskPosition: number, task: Task, index:number, colIndex: number, colName: string) => {
        // Set initial settings of the data to be transfered over the drag handlers
		const data = currentTaskId
        e.dataTransfer.setData('application/tasks', data)
        e.dataTransfer.effectAllowed = "move";

		// Get the styles of the current Target
        const targetStyles = getComputedStyle(e.currentTarget);
		// Set and initialize the related-state based on the task that will be dragged
        setInitialColIndex(colIndex)
		setInitialColName(colName)
        setInitialTask(task)
        setSkeletonStyles({
			width: targetStyles.width, 
			height: targetStyles.height
		})
        setTaskDragged({
			isDragging: false,
			taskPosition: initialTaskPosition, 
			id: currentTaskId, 
			index: index, 
			colName: colName, 
			colIndex: colIndex
		});
		// Set and save the element node of the task being dragged, so then can be used to attach the dragEnd Handler
		// manually to it
        taskRef.current = e.currentTarget as HTMLElement;
       
    }
   
    const dropHandler = async (e:React.DragEvent, colName: string, colIndex: number) => {
        e.preventDefault();
        const currentTaskId = e.dataTransfer.getData('application/tasks');

		// find the index of the task target (drop target)
        const taskIndex = findClosestTaskIndex(e)
		// set the adjacents position of the drop target
        const previousTaskPosition = mockedData[colIndex][colName][taskIndex - 1]?.indexPosition;
        const currentTaskPosition = mockedData[colIndex][colName][taskIndex]?.indexPosition;
        const nextTaskPosition = mockedData[colIndex][colName][taskIndex + 1]?.indexPosition;
        // console.log('DATA', previousTaskPosition, currentTaskPosition, nextTaskPosition, colName)

        taskDragged && setTaskDragged({...taskDragged, isDragging: false})
        // execute mutation to change the index (order) and status of the task
        await reOrdering({
            actualTaskId: currentTaskId, 
            previousTaskPosition: previousTaskPosition, 
            actualTaskPosition: currentTaskPosition,
            nextTaskPosition: nextTaskPosition, 
            newStatus: colName
        })
        .finally(() => {
            console.log('done', )
        })
    }
    
    const dragOverHandler = (e: React.DragEvent, colIndex: number, colName: Status) => {
        e.preventDefault();
        e.dataTransfer.dropEffect ='move';
    
		if(taskDragged) {
			const taskInTargetIndex = findClosestTaskIndex(e);
			setMockedData((prevMockedData: TaskColumns) => {
				
				let newMockedData = [...prevMockedData];
				let columnTarget = newMockedData[colIndex][colName];
				let columnSource = newMockedData[taskDragged.colIndex][taskDragged.colName];
				
				const previousTaskPosition = columnTarget[taskInTargetIndex - 1]?.indexPosition;
				const currentTaskPosition = columnTarget[taskInTargetIndex]?.indexPosition;
				const nextTaskPosition = columnTarget[taskInTargetIndex + 1]?.indexPosition;

				const taskInTargetColumnExists = columnTarget
				.filter((task) => task.id === taskDragged.id).length;

				// If the task on the column target doesn't exists, move the task from its source column to the new one
				if (!taskInTargetColumnExists) {

					const taskInSourceIndex = columnSource // find the index of the task, that it's on the source column
					.findIndex((task) => task.id === taskDragged.id);
					let taskInSourceColumn = { ...columnSource[taskInSourceIndex] };

					taskInSourceColumn.indexPosition = parseFloat(Date.now().toString()) ;// Set the new position
					taskInSourceColumn.status = colName, // Set the new column
					columnSource.splice(taskInSourceIndex, 1); // Remove the task from the source column
					columnTarget.splice(taskInTargetIndex, 0, taskInSourceColumn); // Insert the task at the desired position in the new column

				} else { // Otherwise, move the task of position on the its own column

					let taskTargetIndex =  columnTarget.findIndex((task) => task.id === taskDragged.id);
					let taskInTargetColumn = {...columnTarget[taskTargetIndex]}
	
					if (!currentTaskPosition) { // move the task on a new position
					taskInTargetColumn.indexPosition = parseFloat(Date.now().toString());
					} else if (!previousTaskPosition) { // move the task one position before the drop target
					taskInTargetColumn.indexPosition = currentTaskPosition - 1;
				
					} else if (!nextTaskPosition) { // move the task one position after the drop target
					taskInTargetColumn.indexPosition = currentTaskPosition + 1;
				
					} else { // move the task between two drop target siblings
					taskInTargetColumn.indexPosition = (previousTaskPosition + nextTaskPosition) / 2;
					}
					columnTarget[taskTargetIndex] = taskInTargetColumn;
					
				}
				// apply the changes
				newMockedData[colIndex][colName] = columnTarget.sort(
					(a: TaskSkeleton | Task, b: TaskSkeleton | Task) => a.indexPosition - b.indexPosition
				);
			
				return newMockedData;
			});
			
			setTaskDragged({...taskDragged, colIndex, colName, isDragging: true,});
		}

      };

    const dragEndHandler = (e: React.DragEvent, colIndex: number, colName: string) => {
        //https://stackoverflow.com/questions/24537000/react-js-events-not-firing-for-the-last-rendered-element
      	if(e.dataTransfer.dropEffect === 'none' && taskDragged && initialTask) {
			
			setMockedData((prevMockedData: TaskColumns) => {
				let newPrevMockedData = [...prevMockedData];
				let columnTarget = newPrevMockedData[colIndex][colName];
				let columnSource = newPrevMockedData[initialColIndex][initialColName]
				let taskOnOriginalPosition = columnSource.filter(task => task.id === taskDragged.id).length;

				// if the task being dragged it's already on its original position leave it as this
				if(taskOnOriginalPosition) {
					return newPrevMockedData

				} else { // other wise, re undo to its original position (before being dragged)

					// remove the task from the target column
					newPrevMockedData[colIndex][colName] = columnTarget.filter(
						task => task.id !== taskDragged.id
					);
					// add again to its original/source column
					columnSource.push(initialTask);
					newPrevMockedData[initialColIndex][initialColName] = columnSource.sort(
						(a: TaskSkeleton | Task, b: TaskSkeleton | Task) => a.indexPosition - b.indexPosition
					);
					return newPrevMockedData

				}

			})
			setTaskDragged({...taskDragged, isDragging: false});
      }
    };
  
  
    useEffect(() => {
		if (taskDragged) {
			
			const dragEndListener = (e: React.DragEvent<HTMLElement>) => {
				dragEndHandler(e , taskDragged.colIndex, taskDragged.colName);
			  };
			  // Add to the current element (task being dragged) the dragEnd Handler.
			  // This because an unexpected bug working with the actual DragEvent
			  // Appeareantly, react bubbple up the functions of the drag to be handled in a centralized way from top,
			  // so, if for any reason, the element that initiate the drag is removed from the dom, its handler can not bubble up (unnatached)
			  // and are not fired, which is the case. For more info refer to:
			  // https://stackoverflow.com/questions/24537000/react-js-events-not-firing-for-the-last-rendered-element
			  if (taskDragged.isDragging && taskRef.current) {
				taskRef.current
				.addEventListener('dragend', dragEndListener as unknown as EventListener, false);
			  }
			  // Cleanup the event handler
			  return () => {
				if (taskDragged.isDragging && taskRef.current ) {
					taskRef.current.
					removeEventListener('dragend', dragEndListener as unknown as EventListener, false);
				}
		  }	;
		}
    }, [taskDragged]);

    return {
      dragOverHandler,
      dragStartHandler, 
      dropHandler, 
      dragEndHandler, 
      taskDragged, 
      skeletonStyles
    }
}