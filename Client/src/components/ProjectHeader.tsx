import { AssignMember } from "./AssignMember"
import { Members } from "./Members"

export const ProjectHeader = () => {
    return (
        <header className="flex items-center justify-between font-bold text-dark-md">
            <h1 className="inline pr-4 text-xl font-bold text-dark
            border-r border-black">
                My App Project
            </h1>
     
                <div>
                    <span className="text-dark-purple-md">
                        Views
                    </span>
                    <ul className="flex gap-4">
                        <li>Kanban</li>
                        <li>List</li>
                        <li>Gantt</li>
                        <li>Calendar</li>
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <Members />
                    <AssignMember />
                </div>
               
       
        </header>
    )
}