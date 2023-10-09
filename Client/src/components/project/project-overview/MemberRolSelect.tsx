import { ArrowSimpleIcon, CheckIcon } from "../../../assets/icons/Icons";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef, useState } from 'react';
import { ProjectPermissions, User } from "../../../types/types";
import { useForm } from "../../../hooks/useForm";
import { useMutation } from "@apollo/client";
import { ASSIGN_PROJECT_MEMBER } from "../../../graphql/mutations";
import LoadingItem from "../../ui/LoadingItem";


interface MemberRolSelectOptionsProps {
    defaultRole?: ProjectPermissions
    setFormData?: React.Dispatch<React.SetStateAction<{
        projectId: string;
        userEmail: string;
        userId: string;
        role: ProjectPermissions;
    }>>
    userIsTheOwner?: boolean
    projectId: string
    user?: User
    withOwnSendControll?: boolean
}

type InitialState = {
    projectId: string,
    userEmail: string,
    userId: string,
    role: ProjectPermissions
}
const MemberRolSelect = ({projectId, userIsTheOwner, defaultRole, user, withOwnSendControll }: MemberRolSelectOptionsProps) => {

    const initialState: InitialState = {
        projectId: projectId,
        userEmail: user?.email || '',
        userId: user?.id || '',
        role: defaultRole || 'VIEW'
    }

    const elementRef = useRef(null)
    const {formData: memberToAssign, setFormData} = useForm(initialState)
    const [permissionsIsCollapsed, setPermissionsIsCollapsed] = useState(false);
    const permissionOptions: ProjectPermissions[] = ['EDIT', 'ADMIN', 'VIEW']
    const permissionDescriptions = {
        ADMIN: {
            description: 'Total access of the project. Manage users all its content'
        },
        EDIT: {
            description: 'Add, edit y delete anything in the project'
        },
        VIEW: {
            description: 'Just view of the project, not modifications allowed'
        }
    }

    const [saveProjectMember, {loading}] = useMutation(ASSIGN_PROJECT_MEMBER);
    
    const updateMemberRol = async (permission: ProjectPermissions) => {
        // Here the permission is selected and setted manually on the form state
        // By simply change the value of permission field on the state
      
        setFormData((prevFormData) => {
            return {...prevFormData, role: permission}
        })
        !withOwnSendControll && saveProjectMember({
            variables: {...memberToAssign, role: permission}
        })
    }

    useClickOutside({elementRef, onClickOutside: ()=> setPermissionsIsCollapsed(false)})

    return (
        <div className="relative max-w-[200px] w-full" ref={elementRef} >
        {/* This is a custom select with li, need to be optimized for screen readers */}
            <div onClick={()=> setPermissionsIsCollapsed(!permissionsIsCollapsed)}
            className={`border border-white-gray rounded-md px-4 py-2 box 
            w-full cursor-pointer flex justify-between items-center capitalize
            ${userIsTheOwner ? 'bg-white-gray opacity-70 pointer-events-none': 'bg-white'}`}>
                <span>
                    {memberToAssign.role.toLowerCase().charAt(0).toUpperCase() + memberToAssign.role.slice(1).toLowerCase()}
                </span>
                {
                    permissionsIsCollapsed ?
                    <ArrowSimpleIcon className="h-[13px] -rotate-90 transition-all" />
                    :
                    <ArrowSimpleIcon className="h-[13px] rotate-90 transition-all" />
                }

            </div>
        {
            permissionsIsCollapsed &&
            <ul className="bg-white absolute top-full w-fit max-w-[300px] mt-4 z-[200]
            flex flex-col gap-2 shadow-white-gray shadow-md2 rounded-md " 
            >
                {
                    permissionOptions.map((permission, index) => {
                        return (
                            <li  onClick={()=> updateMemberRol(permission)} 
                            key={index} 
                            className="break-words flex flex-col w-full inline-block
                            hover:bg-white-gray cursor-pointer px-4 py-2 rounded-md "
                            >
                                <span className="font-bold flex gap-2 items-center block capitalize" style={{textTransform: 'none'}}>
                                    {permission.toLowerCase().charAt(0).toUpperCase() + permission.slice(1).toLowerCase()}
                                    {
                                        loading && permission === memberToAssign.role
                                        ?
                                        <LoadingItem height="h-[15px]" fillColor="fill-blue-bright"/> 
                                        :
                                        memberToAssign.role === permission &&
                                        <CheckIcon className="h-[20px]"/>
                                    }
                                </span>
                                <span className="block ">
                                    {permissionDescriptions[permission].description}
                                </span>
                            </li>
                        )
                    })
                }
            </ul>
        }
            
        </div>
    )
}
export default MemberRolSelect;