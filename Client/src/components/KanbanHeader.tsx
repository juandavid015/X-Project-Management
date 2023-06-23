import { AddIcon } from "../assets/icons/Icons"


interface KanbanHeader {
    status: string,
    createNewTask: ()=> void
}

export const KanbanHeader = ({status, createNewTask}:KanbanHeader) => {
    return (
        <div className="bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px]
         flex flex-row items-center gap-2">
            <h2 className="text-sm font-bold capitalize flex flex-row center">
                {status.toLowerCase()}
            </h2>
            <span className="rounded-full inline-block bg-electric-blue h-[20px] w-[20px]"></span>
            <button onClick={()=> createNewTask()} title="Add new task"
            className="border border-dark-med rounded-full p-[5px] ml-auto">
                <AddIcon className="h-[10px] fill-dark-med"/>
            </button>
        </div>
    )
}