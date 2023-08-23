import { Project } from "../../types/types";
import ProjectCard from "./ProjectCard";

interface ProjectsListProps {
    projects: Project[]
}
const ProjectsList = ({projects}: ProjectsListProps) => {
    return (
        <div className="flex gap-4 flex-wrap">
            {
                projects?.map((project) => {
                return (
                    <ProjectCard
                    key={project.id}
                    project={project} />
                )
                })
            }
        </div>
    )
}
export default ProjectsList