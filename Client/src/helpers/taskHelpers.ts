import { Dispatch, SetStateAction } from "react"
import { Task, TaskCreate } from "../types/types"

export type TaskSetter = React.Dispatch<React.SetStateAction<Task | TaskCreate>>
export type InputSetter = Dispatch<SetStateAction< { inputName: string, inputIsEditable: boolean }>>

export const addNewLabel = (taskSetter: TaskSetter , inputSetter: InputSetter) => {
    const label = {name: '', color: '#000000'}
    inputSetter({inputName: 'labels', inputIsEditable: false})
    taskSetter(prevTask => ({...prevTask, labels: [...prevTask.labels, label]}))
}

export const removeLabel = (index: number, taskSetter: TaskSetter) => {
    
    taskSetter((prevCard) => {
        const updatedLabels = 
        [...prevCard.labels.slice(0, index), 
        ...prevCard.labels.slice(index + 1 , prevCard.labels.length)];
        
        return {...prevCard, labels: updatedLabels}
    })
}