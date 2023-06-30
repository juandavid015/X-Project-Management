import { useState, useRef } from "react"
import { Task, TaskCreate } from "../types/types"
import { AssignMember } from "./AssignMember"
import { Members } from "./Members"
import { SearchMembers } from "./SearchMembers"
import { useClickOutside } from "../hooks/useClickOutside"
import { SetFormData } from "../hooks/useForm"



interface MembersFieldProps {
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        propertyName: keyof Task
      ) => void,
    [key:string]: any,
    setFormData: SetFormData<TaskCreate>
    onFinish?: ()=> void
}


export const MembersField = ({members, projectMembers, handleInputChange, setFormData, onFinish}:MembersFieldProps) => {
    console.log('m', members)
    const [openedSearch , setOpenedSearch] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    useClickOutside({elementRef: containerRef, onClickOutside: ()=> setOpenedSearch(false) })
    const toggleOpenSearch = () => {
        setOpenedSearch(!openedSearch);
    }
    return (
        <div className="flex items-center gap-2 relative">
            <Members 
            members={members}
            height='h-[20px]'
            width="w-[20px]" />
            <AssignMember
            width="h-[20px]"
            height="w-[20px]"
            openSearch = {toggleOpenSearch} />
            {   
                openedSearch && 
                <SearchMembers
                handleInputChange={ handleInputChange }
                reference={ containerRef }
                setFormData={ setFormData } 
                members={ members }
                projectMembers={ projectMembers }
                onFinish={onFinish || toggleOpenSearch}/>
                
                
            }
        </div>
    )
}