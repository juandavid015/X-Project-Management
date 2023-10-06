import { ArrowSimpleIcon, CheckIcon } from "../../../assets/icons/Icons";
import { useClickOutside } from "../../../hooks/useClickOutside";
import { useRef, useState } from 'react';

type Permissions = 'view' | 'admin' | 'edit'
// interface MemberRolSelectOptionsProps {
//     [key:string]: unknown
// }
const MemberRolSelectOptions = () => {
    const [permissionsIsCollapsed, setPermissionsIsCollapsed] = useState(false);
    const [permissionSelected, setPermissionSelected] = useState('view');
    const selectPermission = (permission: Permissions) => {
        // Here the permission is selected and setted manually on the form state
        // By simply change the value of permission field on the 

        //optionally this is how will work until the field is included on the form state:
        setPermissionSelected(permission);
    }
    const permissionOptions:Permissions[] = ['edit', 'admin', 'view']
    const permissionDescriptions = {
        admin: {
            description: 'Total access of the project'
        },
        edit: {
            description: 'Add, edit y delete anything in the project'
        },
        view: {
            description: 'Just view of the project, not modifications allowed'
        }
    }
    const elementRef = useRef(null)
    useClickOutside({elementRef, onClickOutside: ()=> setPermissionsIsCollapsed(false)})

    return (
        <div className="relative max-w-[200px] w-full" ref={elementRef} >
        {/* This is a custom select with li, need to be optimized for screen readers */}
            <div onClick={()=> setPermissionsIsCollapsed(!permissionsIsCollapsed)}
            className="border border-white-gray rounded-md px-4 py-2 box 
            w-full cursor-pointer flex justify-between items-center">
                <span>
                    {permissionSelected}
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
            flex flex-col gap-2 shadow-white-gray shadow-md2 rounded-md" 
            >
                {
                    permissionOptions.map((permission, index) => {
                        return (
                            <li onClick={()=> selectPermission(permission)} key={index} 
                            className="break-words flex flex-col w-full inline-block
                            hover:bg-white-gray cursor-pointer px-4 py-2 rounded-md "
                            >
                                <span className="font-bold flex gap-2 items-center block">
                                    {permission}
                                    {
                                        permissionSelected === permission &&
                                        <CheckIcon className="h-[20px]"/>
                                    }
                                </span>
                                <span className="block">
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
export default MemberRolSelectOptions;