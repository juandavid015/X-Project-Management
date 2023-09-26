import { AddIcon, ArrowCircleIcon, MinusBorderedIcon } from "../../assets/icons/Icons";

interface ListColumnHeaderProps {
    expandedColumn: boolean
    expandColumn: ()=> void
    status: {
        color: string
        name: string
    }
    createNewTask: ()=> void
}
const ListColumnHeader = ({expandColumn, expandedColumn, status, createNewTask}: ListColumnHeaderProps) => {
    return (
        <div className="flex items-center gap-2">
            <button onClick={expandColumn}>
                {
                    !expandedColumn ? 
                    <ArrowCircleIcon className="h-[25px]" />
                    :
                    <MinusBorderedIcon className="h-[25px]" />
                }
            </button>
            <span className="rounded-full inline-block bg-electric-blue h-[20px] w-[20px]"
            style={{backgroundColor: status.color}}></span>
            <h2 className="underline font-bold capitalize">
                {status.name.toLowerCase().replace('_', ' ')}
            </h2>
            <button title="Add new task" onClick={createNewTask}
            className="fill-gray text-gray rounded-full p-[5px] font-medium
            hover:border-dark-med hover:fill-dark-med hover:text-dark-med 
            flex items-center gap-2">
                <AddIcon className="h-[10px]"/>
                <span>Add task</span>
            </button>
        </div>
    )
}
export default ListColumnHeader;