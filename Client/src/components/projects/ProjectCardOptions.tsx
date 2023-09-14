import { useState, useRef } from 'react';
import { EditIcon, MoreOptionsIcon, RemoveIcon } from '../../assets/icons/Icons';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useDeleteEntity } from '../../hooks/useDeleteEntity';
import { DELETE_PROJECT } from '../../graphql/mutations';
import { GET_PROJECTS } from '../../graphql/querys';
import LoadingItem from '../ui/LoadingItem';
import { getErrorResponseBody } from '../../helpers/errorHelpers';
import toast from 'react-hot-toast';
import ToastErrorNotfication from '../error/ToastError';

interface ProjectCardOptions {
    projectId: string,
    editProject: () => void
    [key:string]: unknown
}

const ProjectCardOptions = ({projectId, editProject, ...rest}: ProjectCardOptions) => {

    const containerRef = useRef<HTMLUListElement>(null);
    const [expanded, setExpanded] = useState(false);
    const {deleteFields: deleteProject, loading} = useDeleteEntity(DELETE_PROJECT, GET_PROJECTS)
    
    const expand = () =>{
        setExpanded(!expanded);
    }
    const eliminateProject = async (id: string) => {
        const optimisticResponse = {id, __typename: "Project"}
        await deleteProject(id, optimisticResponse)
        .catch(async error => {
            const newError = await getErrorResponseBody(error as Response)
            toast.custom((t)=> <ToastErrorNotfication t={t} message={newError?.message} />, {
                duration: 2000
            })
        })
       
        
    }
    useClickOutside({elementRef: containerRef, onClickOutside: () => setExpanded(false)});

    return (
        <div {...rest}>
            <button onClick={expand}>
                <MoreOptionsIcon className='h-[20px] fill-dark-med hover:fill-dark'/>
            </button>
            {
                expanded && 
                <ul className='bg-white rounded-md p-4 flex flex-col gap-4
                shadow-gray shadow-md2 text-dark-med fill-dark-med' ref={containerRef}>
                    <li>
                        <button onClick={editProject}
                        className='flex gap-2 
                        hover:fill-dark hover:text-dark'>
                            <EditIcon className='h-[20px]'/>
                            <span>Edit</span>
                        </button>
                    </li>
                    <li>
                        <button onClick={()=> eliminateProject(projectId)}
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

export default ProjectCardOptions