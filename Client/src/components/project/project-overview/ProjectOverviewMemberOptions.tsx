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
}
const ProjectOverviewMemberOptions = ({projectId, userEmail, ...rest}: ProjectOverviewMemberOptionsProps) => {
    const containerRef = useRef<HTMLUListElement>(null);
    const [expanded, setExpanded] = useState(false);
    const {deleteFields: deleteMember, loading} = useDeleteEntity(DELETE_PROJECT_MEMBER, GET_PROJECT_MEMBERS)
    
    const expand = () =>{
        setExpanded(!expanded);
    }
    const eliminateMemberFromProject = async (projectId: string, userEmail: string) => {
        const optimisticResponse = {projectId, userEmail, __typename: "Project"}
        await deleteMember({projectId, userEmail}, optimisticResponse)
        // .catch(async error => {
        //     const newError = await getErrorResponseBody(error as Response)
        //     toast.custom((t)=> <ToastErrorNotfication t={t} message={newError?.message} />, {
        //         duration: 2000
        //     })
        // })
       
        
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
                    {/* <li>
                        <button onClick={editProject}
                        className='flex gap-2 
                        hover:fill-dark hover:text-dark'>
                            <EditIcon className='h-[20px]'/>
                            <span>Edit</span>
                        </button>
                    </li> */}
                    <li>
                        <button onClick={()=> eliminateMemberFromProject(projectId, userEmail)}
                        className='flex gap-2 
                        hover:fill-dark hover:text-dark'>
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
export default ProjectOverviewMemberOptions;