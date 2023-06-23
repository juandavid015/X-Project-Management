
import { EditIcon, LabelIcon } from "../assets/icons/Icons"
import { Label, Task } from "../types/types"

interface Props extends Task {
    create: boolean, // not goes here
    onEdit?: () => void
}
export const KanbanCard = ({create, onEdit, ...task}: Props) => {
    const {title, description, labels} = task

    return (
        <div className="bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px]
        flex flex-col gap-1 relative group break-words">
            <button onClick={onEdit}
            className="absolute right-0 pr-4 group-hover:block hidden w-fit">
                <EditIcon className="fill-white-gray h-[20px] cursor-pointer"/>
            </button>
            <div
            className="flex gap-2">
                {
                    labels?.map((label: Label, index: number) => {
                        return (
                            <p key={index}
                            className="flex items-center gap-1 font-bold">
                                <LabelIcon className="h-[20px] fill-dark" />
                                <span style={{color: label.color}}>{label.name}</span>
                            </p>
                        )
                    } )
                }
            </div>
           
            <h2 className="text-md font-bold">
                {title}
            </h2>
              
            <p>
                {description}
            </p>
                
            {/* <input type="text" value={status}
            className="resize-none"
            /> */}
        
        
      
        </div>
    )
}