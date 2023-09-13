import { Link } from "react-router-dom";
import { Project } from "../../types/types";
import { Members } from "../ui/Members";
import ProjectCardOptions from "./ProjectCardOptions";

interface ProjectCardProps {
    toggleEdit: ()=> void
    project: Project
}
const ProjectCard = ({project, toggleEdit}: ProjectCardProps) => {
    return (
        <div className="max-w-[270px] w-full bg-white p-8 relative rounded-md
         " key={project.id}>

            <ProjectCardOptions 
            className={'absolute top-[1rem] left-[calc(100%-3rem)] z-10'}
            editProject={toggleEdit}
            projectId={project.id}
            />
            <Link to={project.id} className="w-full flex flex-col gap-2">
                <h2 className="font-heading text-xl
                line-clamp-3">
                    {project.title}
                </h2>
                <span className="text-dark-purple-md font-bold">
                    {project.label}
                </span>
                <p className="line-clamp-3">
                    {project.description}
                </p>
                <div className="mt-auto flex flex-row justify-between ">
                    <Members
                    members={project.members}
                    height='h-[30px]'
                    width="w-[30px]"
                    />
                    {/* <div className="flex flex-col">
                        <span className="text-dark-purple-md font-bold">
                            Completed 
                        </span>
                        <span className="text-dark-purple-md font-bold">
                            {project.tasksProgress.completed}/{project.tasksProgress.total}
                        </span>
                    </div> */}
                </div>
            </Link>
        </div>
    )
}
export default ProjectCard;