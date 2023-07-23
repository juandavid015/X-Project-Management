import { useState, useRef } from "react"
import { Task, TaskCreate, User } from "../types/types"
import { AssignMember } from "./AssignMember"
import { Members } from "./Members"
import { useClickOutside } from "../hooks/useClickOutside"
import { SetFormData } from "../hooks/useForm"
import { InviteProjectMember } from "./InviteProjectMember"



interface ProjectMembersProps {
    handleInputChange?: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        propertyName: keyof Task
      ) => void,
    [key:string]: unknown,
    members: User[]
    setFormData?: SetFormData<TaskCreate>
    onFinish?: ()=> void,
    projectId: string
}


export const ProjectMembers = ({members, projectId}:ProjectMembersProps) => {

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
            height='h-[30px]'
            width="w-[30px]" />
            <AssignMember
            width="h-[20px]"
            height="w-[20px]"
            openSearch = {toggleOpenSearch} />
            {   
                openedSearch && 
                <InviteProjectMember
                projectId={projectId}
                reference={containerRef}
                onCancel={()=> setOpenedSearch(false)}
                />
                
                
            }
        </div>
    )
}