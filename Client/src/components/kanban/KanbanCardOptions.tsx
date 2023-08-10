
import { DuplicateIcon, MoreOptionsIcon, RemoveIcon } from "../../assets/icons/Icons"
import { useState, useRef } from 'react';
import { DELETE_TASK } from "../../graphql/mutations";
import { Task, TaskCreate } from "../../types/types";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useDeleteEntity } from "../../hooks/useDeleteEntity";
import { GET_PROJECT_TASKS } from "../../graphql/querys";

interface KanbanCardOptionsProps {
    task: TaskCreate,
    duplicate?: (task: Task)=> void;
    [key:string] : unknown
}
export const KanbanCardOptions = ({task, ...rest}: KanbanCardOptionsProps) => {

    const containerRef = useRef<HTMLUListElement>(null);
    const {id} = task || {};
    const [expanded, setExpanded] = useState(false);

    const expand = () => {
        setExpanded(!expanded);
    }

    const deleteTaks = useDeleteEntity(DELETE_TASK, GET_PROJECT_TASKS)
    const eliminateTask = (id: string | undefined) => {
        deleteTaks(id || undefined);
    } 
    // const duplicateTask = (task: Task) => {
    //     const taskCopy = {...task}
    //     delete taskCopy.id
    //     duplicate(taskCopy);
    // }
    useClickOutside({elementRef: containerRef, onClickOutside: () => setExpanded(false)});

    // if(error) {
    //     console.log(error)
    // }

    return (
        <div {...rest} >
            <button onClick={expand}>
                <MoreOptionsIcon className='w-[20px] fill-gray' />
            </button>
            {
                expanded && 
                <ul className="bg-white shadow-gray shadow-md2 rounded-md p-4
                flex flex-col gap-2" ref={containerRef}>
                    <li>
                        <button className="flex items-center gap-1 fill-gray hover:fill-dark hover:text-dark font-medium">
                            <DuplicateIcon className="h-[20px]"/>
                            <span>Duplicate</span>
                        </button>
                    </li>
                    <li>
                        <button className="flex items-center gap-1 fill-gray hover:fill-red-warning hover:text-red-warning font-medium"
                        onClick={()=> eliminateTask(id)}>
                            <RemoveIcon className="h-[20px]"/>
                            <span>Eliminate</span>
                        </button>
                    </li>
                </ul>
            }
        </div>
    )
}