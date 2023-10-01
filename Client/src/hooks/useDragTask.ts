
import { useEffect, useRef, useState, useCallback } from 'react';
import { Status, Task } from '../types/types';
import { FetchResult, MutationFunctionOptions } from '@apollo/client';
import { TaskColumns } from '../providers/TasksProvider';


type TaskDragInfo = {
	actualTaskId: string,
	previousTaskPosition?: number,
	actualTaskPosition?: number,
	nextTaskPosition?: number,
	newStatus: string
}
type TaskOptmisticResponse = Task & {
	__typename: string,
	id: string
	projectId: string
}
type MutationOpts = (options?: MutationFunctionOptions) => Promise<FetchResult<unknown>>
// (entityData: EntityData<OperationVariables>, optimisticData?: EntityData<OperationVariables>)=> Promise<void>
interface UserDragTaskProps {
	reOrdering: MutationOpts
	mockedData?: TaskColumns,
	setMockedData: React.Dispatch<React.SetStateAction<TaskColumns>>
}

export type TaskDragged = {
	id: string,
	index: number,
	isDragging: boolean,
	taskPosition: number,
	colName: string,
	colIndex: number
}

export type TaskSkeletonStyles = {
	height: string,
	width: string
}

export type DragStartType = (
	e: React.DragEvent,
	currentTaskId: string,
	initialTaskPosition: number,
	task: Task,
	index: number,
	colIndex: number,
	colName: string
) => void

export type DragEnterType = (
	e: React.DragEvent
) => void

export type DragOverType = (
	e: React.DragEvent,
	colIndex: number,
	colName: Status
) => void

export type DropType = (
	e: React.DragEvent,
	colName: string,
	colIndex: number
) => Promise<void>

export type DragEndType = (
	e: React.DragEvent,
	colIndex: number,
	colName: string
) => void
// The main hook function for handling drag and drop functionality
export const useDragTask = ({ reOrdering, setMockedData, mockedData }: UserDragTaskProps) => {
	// States to keep track of initial task position and other drag-related data
	const taskRef = useRef<HTMLElement | null>(null);
	const [initialColIndex, setInitialColIndex] = useState(0);
	const [initialColName, setInitialColName] = useState('');
	const [initialTask, setInitialTask] = useState<Task | undefined>();
	const [taskDragged, setTaskDragged] = useState<TaskDragged | undefined>();
	const [skeletonStyles, setSkeletonStyles] = useState<TaskSkeletonStyles>({
		height: '',
		width: '',
	});
	// Function to find the index of the closest task to the drop position
	const findClosestTaskIndex = (e: React.DragEvent<Element>) => {

		const element = e.currentTarget as HTMLElement
		const dropContainer = element.getBoundingClientRect();
		const dropContainerHeight = e.clientY - dropContainer.top;

		const taskIndex = Array.from(element.children).findIndex((task) => {
			//actually when the target is too larget when reposition the dragged gray desplace so much that the mouse doesn target due to the large droptarget
			//making re loop and erratic behaviour
			// console.log('t', task, task.className.includes('task'))
			const dropTarget = task.getBoundingClientRect();
			const dropTargetHeight = dropTarget.bottom - dropContainer.top;

			const isNearToTask = dropContainerHeight < dropTargetHeight;
			return isNearToTask;
		})
		// console.log(taskIndex)
		return taskIndex
	}
	// Event handler when drag starts on a task
	const dragStartHandler: DragStartType = (
		e,
		currentTaskId,
		initialTaskPosition,
		task,
		index,
		colIndex,
		colName,

	) => {
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
		// Set and save the element node of the task being dragged, so then can be used to attach the dragEnd Handler
		// manually to it
		taskRef.current = e.currentTarget as HTMLElement;

		setTaskDragged(() => ({
			isDragging: false,
			taskPosition: initialTaskPosition,
			id: currentTaskId,
			index: index,
			colName: colName,
			colIndex: colIndex
		}));

	}

	const dragEnterHandler: DragEnterType = (e) => {

		const element = e.target as HTMLElement
		if (element && element.className.length && element.className.includes('task')) {
			taskDragged && setTaskDragged(() => ({ ...taskDragged, isDragging: true }));
		}
	}

	const dragOverHandler: DragOverType = (e, colIndex, colName) => {

		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';

		if (taskDragged) {
			const taskInTargetIndex = findClosestTaskIndex(e);
			setMockedData((prevMockedData: TaskColumns) => {

				const newMockedData = [...prevMockedData];
				const columnTarget = newMockedData[colIndex][colName];
				const columnSource = newMockedData[taskDragged.colIndex][taskDragged.colName];

				const previousTaskPosition = columnTarget[taskInTargetIndex - 1]?.indexPosition;
				const currentTaskPosition = columnTarget[taskInTargetIndex]?.indexPosition;
				const nextTaskPosition = columnTarget[taskInTargetIndex + 1]?.indexPosition;

				const taskInTargetColumnExists = columnTarget
					.filter((task) => task.id === taskDragged.id).length;

				// If the task on the column target doesn't exists, move the task from its source column to the new one
				if (!taskInTargetColumnExists) {

					const taskInSourceIndex = columnSource // find the index of the task, that it's on the source column
						.findIndex((task) => task.id === taskDragged.id);
					const taskInSourceColumn = { ...columnSource[taskInSourceIndex] };

					taskInSourceColumn.indexPosition = parseFloat(Date.now().toString());// Set the new position
					taskInSourceColumn.status = colName, // Set the new column
						taskInSourceIndex >= 0 && columnSource.splice(taskInSourceIndex, 1); // Remove the existing task from the source column
					taskInSourceIndex >= 0 && columnTarget.splice(taskInTargetIndex, 0, taskInSourceColumn); // Insert the existing task at the desired position in the new column

				} else { // Otherwise, move the task of position on the its own column

					const taskTargetIndex = columnTarget.findIndex((task) => task.id === taskDragged.id);
					const taskInTargetColumn = { ...columnTarget[taskTargetIndex] }

					if (!currentTaskPosition) { // move the task on a new position
						taskInTargetColumn.indexPosition = parseFloat(Date.now().toString());
					} else if (!previousTaskPosition) { // move the task one position before the drop target
						taskInTargetColumn.indexPosition = currentTaskPosition - 1;

					} else if (!nextTaskPosition) { // move the task one position after the drop target
						taskInTargetColumn.indexPosition = currentTaskPosition + 1;

					} else { // move the task between two drop target siblings
						taskInTargetColumn.indexPosition = (previousTaskPosition + nextTaskPosition) / 2;
					}
					newMockedData[colIndex][colName][taskTargetIndex] = taskInTargetColumn;
					setTaskDragged((prevTaskDragged) => {
						return prevTaskDragged && { ...prevTaskDragged, colIndex, colName, taskPosition: taskInTargetColumn.indexPosition }
					});
				}
				// apply the changes
				newMockedData[colIndex][colName] = columnTarget.sort(
					(a: Task, b: Task) => a.indexPosition - b.indexPosition
				);

				return newMockedData;
			});


		}

	};

	const dropHandler: DropType = async (e, colName, colIndex) => {

		e.preventDefault();
		const currentTaskId = e.dataTransfer.getData('application/tasks');

		// find the index of the task target (drop target)
		const taskIndex = findClosestTaskIndex(e)
		// set the adjacents position of the drop target
		const previousTaskPosition = mockedData ? mockedData[colIndex][colName][taskIndex - 1]?.indexPosition : undefined;
		const currentTaskPosition = mockedData ? mockedData[colIndex][colName][taskIndex]?.indexPosition : undefined;
		const nextTaskPosition = mockedData ? mockedData[colIndex][colName][taskIndex + 1]?.indexPosition : undefined;
		// console.log('DATA', previousTaskPosition, currentTaskPosition, nextTaskPosition, colName)

		const optimisticData = { ...initialTask, indexPosition: taskDragged?.taskPosition, status: taskDragged?.colName, __typename: 'Task' }
		// execute mutation to change the index (order) and status of the task
		setTaskDragged((prevTaskDragged) => {
			return prevTaskDragged && { ...prevTaskDragged, isDragging: false }
		});
		await reOrdering({
			variables: {

				actualTaskId: currentTaskId,
				previousTaskPosition: previousTaskPosition,
				actualTaskPosition: currentTaskPosition,
				nextTaskPosition: nextTaskPosition,
				newStatus: colName
			} as TaskDragInfo,
			optimisticResponse: {
				moveTask: optimisticData as TaskOptmisticResponse
			}

		},)

	}

	const dragEndHandler: DragEndType = useCallback((e, colIndex, colName) => {
		//https://stackoverflow.com/questions/24537000/react-js-events-not-firing-for-the-last-rendered-element

		if (e.dataTransfer.dropEffect === 'none' && taskDragged && initialTask) {

			setMockedData((prevMockedData: TaskColumns) => {
				const newPrevMockedData = [...prevMockedData];
				const columnTarget = newPrevMockedData[colIndex][colName];
				const columnSource = newPrevMockedData[initialColIndex][initialColName]
				const taskOnOriginalPosition = columnSource.filter(task => task.id === taskDragged.id).length;

				// if the task being dragged it's already on its original position leave it as this
				if (taskOnOriginalPosition) {
					return newPrevMockedData

				} else { // other wise, re undo to its original position (before being dragged)

					// remove the task from the target column
					newPrevMockedData[colIndex][colName] = columnTarget.filter(
						task => task.id !== taskDragged.id
					);
					// add again to its original/source column
					columnSource.push(initialTask);
					newPrevMockedData[initialColIndex][initialColName] = columnSource.sort(
						(a: Task, b: Task) => a.indexPosition - b.indexPosition
					);
					return newPrevMockedData

				}

			})

		}

		setTaskDragged((prevTaskDragged) => {
			return prevTaskDragged && { ...prevTaskDragged, isDragging: false }
		});

	}, [initialColIndex, initialColName, initialTask, setMockedData, taskDragged])


	useEffect(() => {

		if (taskDragged) {

			const dragEndListener = (e: React.DragEvent<HTMLElement>) => {
				dragEndHandler(e, taskDragged.colIndex, taskDragged.colName);
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
				if (taskDragged.isDragging && taskRef.current) {
					taskRef.current.
						removeEventListener('dragend', dragEndListener as unknown as EventListener, false);
				}
			};
		}
	}, [taskDragged, dragEndHandler]);

	return {
		dragOverHandler,
		dragStartHandler,
		dragEnterHandler,
		dropHandler,
		dragEndHandler,
		taskDragged,
		skeletonStyles
	}
}