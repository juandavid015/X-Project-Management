import { Link } from "react-router-dom";
import { Project } from "../../types/types";
import { Members } from "../ui/Members";

interface ProjectCardProps {
    project: Project
}
const ProjectCard = ({project}: ProjectCardProps) => {
    return (
        <div className="max-w-[270px] w-full bg-white p-8
         " key={project.id}>
            <Link to={project.id} className="w-full flex  flex-col gap-2">
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