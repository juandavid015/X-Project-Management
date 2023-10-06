import { GET_PROJECTS } from "../../graphql/querys";
import { ProjectMembers } from "./ProjectMembers";
import { NavLink } from "react-router-dom";
import { useSaveEntity } from "../../hooks/useSaveEntity";
import { useForm } from "../../hooks/useForm";
import { CHANGE_PROJECT_TITLE } from "../../graphql/mutations";
import { useContext } from 'react';
import { ProjectContext } from "../../providers/ProjectProvider";
import { CheckIcon } from "../../assets/icons/Icons";
import LoadingItem from "../ui/LoadingItem";

const ProjectHeader = () => {
 
    const {projectId, project, error} = useContext(ProjectContext);

    const initialState = {
        id: projectId,
        title: project?.title 
    }
  
    const { formData, handleInputChange } = useForm(initialState);

    const { saveEntity: updateProjectTitle , loading} = useSaveEntity(CHANGE_PROJECT_TITLE, GET_PROJECTS)
    
   
    // if (loading) {
    //     return <SkeletonProjectHeader />
    // }
    if (error)  return (<p>Error</p>)

    const changeTitle = () => {
        updateProjectTitle(formData)
    }
 

    return (
        <header className="max-w-[1048px] flex items-center justify-between font-medium text-dark-md">
            <div className="flex items-center gap-2">

                <label htmlFor="title" >

                    <input type="text" value={formData.title} id="title" name="title" 
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                    className="font-heading inline pr-4 text-xl font-bold truncate max-w-[300px]
                    border-gray hover:outline-white-gray hover:outline rounded-md hover:outline-2
                    focus:outline focus:outline-white-gray focus:outline-2 bg-transparent
                    px-2">
                    </input>
                </label>
                <button onClick={changeTitle} title="Save title" 
                className="rounded-full border border-white-gray h-[30px] w-[30px] 
                flex hover:bg-white-gray"> 
                    {
                        loading 
                        ? <LoadingItem fillColor="fill-dark-med" height="h-[15px]"/>
                        : <CheckIcon className="h-[20px] m-auto"/>
                    }
                   
                </button>
            </div>
     
                <div>
                    <span className="text-dark-purple-md">
                        Views
                    </span>
                    <ul className="flex gap-4">
                        <li>
                            <NavLink to={'tasks/kanban'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                Kanban
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'tasks/list'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'tasks/gantt'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                Gantt
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'tasks/calendar'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                Calendar
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <ProjectMembers 
                members={project?.members}
                projectId= {project?.id}
                />
               
       
        </header>
    )
}

export default ProjectHeader;