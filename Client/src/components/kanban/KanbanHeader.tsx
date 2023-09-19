import { AddIcon } from "../../assets/icons/Icons"


interface KanbanHeaderProps {
    status: string,
    createNewTask: ()=> void
    color?: string
}

export const KanbanHeader = ({status, color, createNewTask}:KanbanHeaderProps) => {
    return (
        <div className="bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px]
         flex flex-row items-center gap-2">
            <h2 className="font-sans text-sm font-medium capitalize flex flex-row center">
                {status.toLowerCase().replace('_', ' ')}
            </h2>
            <span className={`rounded-full inline-block bg-electric-blue h-[20px] w-[20px]`}
            style={{backgroundColor:color}}></span>
            <button onClick={()=> createNewTask()} title="Add new task"
            className="border border-gray fill-gray rounded-full p-[5px] ml-auto
            hover:border-dark-med hover:fill-dark-med">
                <AddIcon className="h-[10px]"/>
            </button>
        </div>
    )
}