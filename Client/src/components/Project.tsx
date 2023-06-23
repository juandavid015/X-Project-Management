import { ProjectHeader } from "./ProjectHeader"
import { ProjectSubMenu } from "./ProjectSubMenu"
import { ProjectView } from "./ProjectView"

export const Project= () => {
    return (
        <div className="max-w-[1048px] p-8 w-full text-dark-med
        flex flex-col gap-6  ">
            <ProjectHeader />
            <ProjectSubMenu />
            <ProjectView />
        </div>
    )
}