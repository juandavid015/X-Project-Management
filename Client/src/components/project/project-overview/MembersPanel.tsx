import { ASSIGN_PROJECT_MEMBER } from "../../../graphql/mutations";
import { GET_PROJECT_MEMBERS } from "../../../graphql/querys";
import { useForm } from "../../../hooks/useForm";
import { useSaveEntity } from "../../../hooks/useSaveEntity";
import { User } from "../../../types/types";
import { UserPreview } from "../../ui/UserPreview";
import MemberRolSelectOptions from "./MemberRolSelectOptions";
import ProjectOverviewMemberOptions from "./ProjectOverviewMemberOptions";

interface MembersControlPanelProps {
    projectId: string,
    members: User[]
}


const MembersControlPanel = ({projectId, members}:MembersControlPanelProps) => {
    
    const initialState = {
        projectId: projectId,
        userEmail: ''
    }

    const {formData: memberToAssign, handleInputChange} = useForm(initialState)

    const {saveEntity} = useSaveEntity(ASSIGN_PROJECT_MEMBER, GET_PROJECT_MEMBERS)
    const handleClick = async ()=> {
        await saveEntity(memberToAssign)
    }

    return (
        <div className="border-t border-white-gray pt-4 ">
            
            <span className="font-bold text-base">
                Members
            </span>
            <div className="px-8 py-4 flex flex-col gap-4">
                <span className="font-bold">
                    Assign new user by email
                </span>
                <div className="flex gap-8 items-center w-full">

                    <input type="email" name="userEmail" value={memberToAssign.userEmail} 
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement> }
                    placeholder="sample@email.com"
                    className="p-2 bg-white-gray rounded-md outline-blue-bright w-full"/>

                    <MemberRolSelectOptions />
                    
                    <button onClick={handleClick}
                    className="w-fit border border-white-gray rounded-md py-2 px-4
                    ml-auto font-medium hover:bg-white-gray hover:text-dark ">
                        Send
                    </button>
                </div>
            </div>

            <div className="px-8 py-4 flex flex-col gap-4">
                <span className="font-bold">
                    Manage members
                </span>
                {
                    members.map((user, index)=> {
                        return (
                            <div className="flex items-center gap-4 " key={index}> 
                                <UserPreview
                                name={user.name}
                                expanded
                                image={user.image || ''}
                                className='flex items-center gap-2 flex-1'
                                />
                                <div className="relative flex items-center gap-2 ml-auto flex-1">
                                    <MemberRolSelectOptions
                                    />
                                    <ProjectOverviewMemberOptions
                                    className="ml-auto flex-1 
                                    absolute top-[0rem] left-[calc(100%-3rem)] z-20"
                                    projectId={projectId || ''}
                                    userEmail={user.email}
                                    style={{zIndex: members.length - index + ""}}
                                    
                                    />
                                </div>
                            </div>
                        )
                    })
                    
                }
                </div>

            </div>
    )
}
export default MembersControlPanel;