import { Outlet } from "react-router-dom"

export const ProjectView = () => {
    // The outlet render the view/ui or childrens of the present parent route "Project"
    // depending on the current pathname
    return (
        <div className="h-full ">
            <Outlet />
        </div>
    )
}