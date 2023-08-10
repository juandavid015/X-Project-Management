import { ProjectHeader } from "../components/project/ProjectHeader"
import { ProjectSubMenu } from "../components/project/ProjectSubMenu"
import { ProjectView } from "../components/project/ProjectView"

export const Project= () => {
    return (
        <div className="p-8 w-full text-dark-med
        flex flex-col gap-6  ">
            <ProjectHeader />
            <ProjectSubMenu />
            <ProjectView />
        </div>
    )
}