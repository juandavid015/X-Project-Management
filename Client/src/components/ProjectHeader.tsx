import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/querys";
import { ProjectMembers } from "./ProjectMembers";
import { NavLink, useParams } from "react-router-dom";
import { Project } from "../types/types";

export const 
ProjectHeader = () => {
    
    const { projectId } = useParams();
    const {loading, error, data } = useQuery(GET_PROJECT, {
        variables: {projectId: projectId}
    });
    console.log('ID', projectId)


    // const initialState = {
    //     members: data?.members || [],
    //     userIds: data?.userIds || [],
    //     projectId: data?.id || '64776d5011f6af1e77f4e984'
    // }
    // const [project, setProject] = useState(initialState);
  
    // useEffect(() => {
    //   setProject(initialState);
    // }, [data]);
   
   
    if (loading) return (<p>Loading...</p>)
    if (error)  return (<p>Error</p>)
    const project: Project = data?.getProject;


    return (
        <header className="max-w-[1048px] flex items-center justify-between font-medium text-dark-md">
            <h1 className="font-heading inline pr-4 text-xl font-bold 
            border-r border-gray">
                {project.title}
            </h1>
     
                <div>
                    <span className="text-dark-purple-md">
                        Views
                    </span>
                    <ul className="flex gap-4">
                        <li>
                            <NavLink to={'tasks/kanban'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                Kanban
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'tasks/list'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                List
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'tasks/gantt'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                Gantt
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'tasks/calendar'}
                            className={({isActive, isPending}) => 
                            isActive 
                            ? 'text-electric-blue border-b border-white-gray'
                            : isPending 
                            ? 'text-red-warning'
                            : ''}>
                                Calendar
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <ProjectMembers 
                members={project.members}
                projectId= {project.id}
                />
               
       
        </header>
    )
}