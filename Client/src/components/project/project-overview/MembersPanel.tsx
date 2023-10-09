import { useMutation } from "@apollo/client";
import { ASSIGN_PROJECT_MEMBER } from "../../../graphql/mutations";
import { useForm } from "../../../hooks/useForm";
import { Project, ProjectPermissions, User } from "../../../types/types";
import { UserPreview } from "../../ui/UserPreview";
import MemberRolSelectOptions from "./MemberRolSelect";
import LoadingItem from "../../ui/LoadingItem";
import MemberRolSelect from "./MemberRolSelect";
import MemberOptions from "./MemberOptions";

interface MembersControlPanelProps {
    projectId: string,
    members: User[]
    project: Project
}
type InitialState = {
    projectId: string,
    userEmail: string,
    userId: string,
    role: ProjectPermissions
}

const MembersControlPanel = ({projectId, members, project}:MembersControlPanelProps) => {

    const initialState: InitialState = {
        projectId: projectId,
        userEmail: '',
        userId: '',
        role: 'VIEW'
    }

    const {formData: memberToAssign, handleInputChange, setFormData} = useForm(initialState)
    const [saveEntity, {loading}] = useMutation(ASSIGN_PROJECT_MEMBER)

    const updateProjectMember = async (setFormData:React.Dispatch<React.SetStateAction<InitialState>>, formData: InitialState)=> {
        // manually find the userId to assign, once the userEmail is defined
        const userToAssign = members.find(user => user.email === formData.userEmail)
        userToAssign?.id && setFormData((prevFormData: InitialState) => {
            return { ...prevFormData, userId: userToAssign.id }
        })

        await saveEntity({
            variables: {...formData, userId: userToAssign?.id}
        })
    }

    const findUserRole = (userId: string) => {
        return project?.userPermissions?.find(userPermission => userPermission.userId === userId)?.role
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

                    <MemberRolSelectOptions
                    projectId={projectId}
                    defaultRole={memberToAssign.role}
                    setFormData={setFormData}
                    withOwnSendControll
                    />
                    
                    <button onClick={()=> updateProjectMember(setFormData, memberToAssign)}
                    className="w-fit border border-white-gray rounded-md py-2 px-4
                    ml-auto font-medium hover:bg-white-gray hover:text-dark h-[38px]">
                        {
                            loading ? 
                            <LoadingItem height="h-[15px]" fillColor="fill-blue-bright"/>:
                            <span>Send</span>
                        }
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
                                    <MemberRolSelect
                                    defaultRole={findUserRole(user.id)}
                                    projectId={projectId}
                                    userIsTheOwner= {project.ownerId === user.id}
                                    setFormData={setFormData}
                                    user={user}
                                    />
                                    <MemberOptions
                                    className="ml-auto flex-1 
                                    absolute top-[0rem] left-[calc(100%-3rem)] z-20"
                                    projectId={projectId || ''}
                                    userEmail={user.email}
                                    userId={user.id}
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