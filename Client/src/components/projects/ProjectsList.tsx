import { Project } from "../../types/types";
import ProjectCard from "./ProjectCard";
import { useState } from 'react';
import ProjectCardEditable from "./ProjectCardEditable";
import { EmptyFolderIcon } from "../../assets/icons/Icons";

interface ProjectsListProps {
    projects: Project[]
}

const ProjectsList = ({projects}: ProjectsListProps) => {

    const [edit, setEdit] = useState({
        isActive: false,
        item: '',
        input: ''
    })

    const toggleEdit = (itemToBeEdited: string, inputToBeEdited: string) =>{
        setEdit((prevEditValues) => ({
            ...prevEditValues, 
            isActive: prevEditValues.item !== itemToBeEdited,
            item: itemToBeEdited,
            input: inputToBeEdited
        }))
    }

    if(!projects?.length) {
        return (
            <div className="max-w-[350px] flex flex-col justify-center m-auto gap-2">
                <EmptyFolderIcon className="h-[60px] fill-dark-med" />
                <p className="font-medium text-dark-med">
                    Not projects have been added yet.
                    Add one by pressing
                    <span className="text-purple">
                        {` create new project `}
                    </span>
                    button.
                </p>
            </div>
        )
    }
    return (
        <div className="flex gap-4 flex-wrap">
            {
                projects?.map((project) => {
                    return edit.isActive && project.id === edit.item
                    ?(
                        <ProjectCardEditable
                        key={project.id}
                        toggleEdit={()=> toggleEdit('', '')}
                        setEdit={setEdit}
                        project={project}
                        />
                      
                    )
                    :(
                        <ProjectCard
                        key={project.id}
                        toggleEdit={()=> toggleEdit(project.id, '')}
                        project={project}
                        />
                    )
                })
            }
        </div>
    )
}
export default ProjectsList