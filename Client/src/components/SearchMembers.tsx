
import { LargeArrow } from "../assets/icons/Icons"
import { SetFormData } from "../hooks/useForm"
import { Task, TaskCreate, User } from "../types/types"
import { UserPreview } from "./UserPreview"

interface SearchMembersProp {
    [key: string] : unknown
    projectMembers: User[],
    members: User[]
    reference: React.Ref<HTMLDivElement>
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        propertyName: keyof Task
    ) => void,
    setFormData: SetFormData<TaskCreate>
    onFinish: ()=> void
    
}

export const SearchMembers = ({reference, projectMembers, members, setFormData, onFinish}: SearchMembersProp) => {
  
    
    const handleChange =(e: React.ChangeEvent<HTMLInputElement>, index: number, member: User)=>  {
        const { checked, name } = e.target;


        if(checked) {
           
            setFormData((prevTask) => {
                const updatedUserIds = [...prevTask['userIds']]
                const updatedMembers = [...prevTask['members']]
                updatedMembers.push(projectMembers[index]);
                updatedUserIds.push(projectMembers[index].id)
                return {...prevTask, [name]: updatedMembers, userIds: updatedUserIds}
            })
            
        } else {
           
            setFormData((prevTask) => {
          
                let updatedUserIds = [...prevTask['userIds']]
                let updatedMembers = [...prevTask['members']]
                updatedMembers = updatedMembers.filter(m => m.name !== member.name)
                updatedUserIds = updatedUserIds.filter(u => u !== member.id)
                return {...prevTask, [name]: updatedMembers, userIds: updatedUserIds}
            })
        }
    }

    return (
        <div className="absolute top-[calc(100%+0.5rem)] z-20 flex flex-col gap-2
        bg-white shadow-gray shadow-md2 rounded-md p-4" ref={reference}>
            <label htmlFor="searchUser" className="border-b border-white-gray pb-1">
                <input type="search" name="search_users" id="searchUser" placeholder="Search user..." autoFocus
                className="outline-none"/>
            </label>
            <div className="flex flex-col gap-2">
            {
                projectMembers?.map((member: User, index: number) => {
                    return(
                        <label htmlFor={'member' + index} key={index} 
                        className="flex gap-2 w-full">
                            <input type='checkbox' name="members" value={member.name} id={'member' + index}
                            onChange={(e) => handleChange(e, index, member)} defaultChecked={members[index]?.id === member.id}/>

                            <UserPreview expanded={true} name={member.name} image={member.image} height="h-[30px]" width="w-[30px]"
                            className={'flex gap-1 items-center text-gray hover:text-dark cursor-pointer font-medium ' }/>
                        </label>
                    )
                })
            }
            </div>
            <button className="w-fit mt-2 m-auto px-4 py-1 bg-dark text-white fill-gray rounded-full transition-all opacity-80 hover:opacity-100
            flex gap-1" onClick={onFinish}>
                <span>Done</span>
                <LargeArrow className="h-[20px]" />
            </button>
        </div>
    )
}