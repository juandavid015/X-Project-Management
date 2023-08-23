import { AddIcon } from "../../assets/icons/Icons";

interface ProjectsHeaderProps {
    openModal: () => void
}
const ProjectsHeader = ({openModal}: ProjectsHeaderProps) => {
    return (
        <div className="flex gap-4">
            <h1 className="font-heading text-3xl pr-8 border-r border-gray inline w-fit
            ">
                Projects
            </h1>
            <button onClick={openModal} 
            className="font-sans font-medium text-white/80 
            hover:text-white hover:fill-white-gray fill-white-gray/80
            flex items-center gap-3 bg-electric-blue py-2 px-4 rounded-full">
                <AddIcon className="h-[16px] "/>
                <span>
                    Create new project
                </span>
            </button>
        </div>
    )
}
export default ProjectsHeader;