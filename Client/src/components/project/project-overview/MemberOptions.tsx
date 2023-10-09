import { useRef, useState } from 'react';
import { useDeleteEntity } from '../../../hooks/useDeleteEntity';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { MoreOptionsIcon, RemoveIcon } from '../../../assets/icons/Icons';
import LoadingItem from '../../ui/LoadingItem';
import { DELETE_PROJECT_MEMBER } from '../../../graphql/mutations';
import { GET_PROJECT_MEMBERS } from '../../../graphql/querys';

interface ProjectOverviewMemberOptionsProps {
    [key:string]: unknown
    userEmail: string
    projectId: string
    userId: string
}
const MemberOptions = ({projectId, userEmail, userId, ...rest}: ProjectOverviewMemberOptionsProps) => {
    
    const containerRef = useRef<HTMLUListElement>(null);
    const [expanded, setExpanded] = useState(false);
    const {deleteFields: deleteMember, loading} = useDeleteEntity(DELETE_PROJECT_MEMBER, GET_PROJECT_MEMBERS)
    
    const expand = () =>{
        setExpanded(!expanded);
    }
    const eliminateMemberFromProject = async (projectId: string, userEmail: string) => {
        const optimisticResponse = {projectId, userEmail,  __typename: "Project"}
        await deleteMember({projectId, userEmail, userId}, optimisticResponse)       
    }
    useClickOutside({elementRef: containerRef, onClickOutside: () => setExpanded(false)});

    return (
        <div  {...rest}>
            <button onClick={expand}>
                <MoreOptionsIcon className='h-[20px] fill-dark-med hover:fill-dark'/>
            </button>
            {
                expanded && 
                <ul className='bg-white rounded-md p-4 flex flex-col gap-4
                shadow-gray shadow-md2 text-dark-med fill-dark-med' ref={containerRef} 
                >
                    <li>
                        <button onClick={()=> eliminateMemberFromProject(projectId, userEmail)}
                        className='flex gap-2 text-red-warning/70 fill-red-warning/70
                        hover:fill-red-warning hover:text-red-warning'>
                            {
                                !loading ?
                                <RemoveIcon className='h-[20px]'/>:
                                <LoadingItem height="h-[15px]"/>
                            }
                            <span>Eliminate</span>
                        </button>
                    </li>
                </ul>
            }
        </div>
    )
}
export default MemberOptions;