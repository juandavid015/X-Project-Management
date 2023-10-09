import { handleErrorResponse } from "../../helpers/errorHelpers"
import MembersControlPanel from "./project-overview/MembersPanel";
import ProjectOverviewGeneralSection from "./project-overview/ProjectOverviewGeneralSection";
import { ProjectContext } from "../../providers/ProjectProvider";
import { useContext } from 'react';
import Loading from "../ui/Loading";

const ProjectOverview = () => {

    const { project, projectId, loading } = useContext(ProjectContext);

    if(loading) {
        return <div className=" flex items-center justify-center w-full overflow-hidden"><Loading messagge=""/></div>
    }
    
    if (!project) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'overview'}
        }
        handleErrorResponse(error)
    }

 

    return (
        <div className="max-w-[1048px] bg-white p-8 h-full rounded-md
        flex flex-col gap-8">

            <ProjectOverviewGeneralSection
            project={project}
            /> 
           
            <MembersControlPanel
            projectId={projectId || ''}
            members={project.members}
            project = {project}
            />

        </div>
    )
}
export default ProjectOverview;