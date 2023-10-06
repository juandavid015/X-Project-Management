import ProjectHeader from "../components/project/ProjectHeader"
import ProjectSubMenu from "../components/project/ProjectSubMenu"
import ProjectView  from "../components/project/ProjectView"
import SkeletonProjectHeader from "../components/ui/skeletons/SkeletonProjectHeader";
import { ProjectContext } from "../providers/ProjectProvider"
import { useContext } from 'react';

const Project= () => {
    const {loading} = useContext(ProjectContext)
    return (
            <div className="p-8 w-full text-dark-med
            flex flex-col gap-6  ">
                {
                    loading 
                    ? <SkeletonProjectHeader />
                    : <ProjectHeader />
                }
                <ProjectSubMenu />
                <ProjectView />
            </div>
    )
}

export default Project;