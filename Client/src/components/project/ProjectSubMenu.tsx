import { NavLink} from "react-router-dom"

const ProjectSubMenu = () => {
  
    return (
        <div className="max-w-[1048px] py-2 border-b border-white-gray text-dark-med font-medium">
            <ul className="flex gap-4">
                <li>
                    <NavLink to={'tasks'} 
                    className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}
                    >
                        Tasks   
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'discussions'} 
                    className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}
                    >
                        Discussions
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"timeline"} 
                    className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}
                    >
                        Timeline
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"files"} 
                    className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}
                    >
                        Files
                    </NavLink>
                </li>
                <li>
                    <NavLink to={"overview"} 
                    className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}
                    >
                        Overview
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default ProjectSubMenu;