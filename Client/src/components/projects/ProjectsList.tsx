import { Project } from "../../types/types";
import ProjectCard from "./ProjectCard";
import { useState } from 'react';
import ProjectCardEditable from "./ProjectCardEditable";

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