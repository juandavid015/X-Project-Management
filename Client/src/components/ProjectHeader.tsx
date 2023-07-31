import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/querys";
import { ProjectMembers } from "./ProjectMembers";
import { useParams } from "react-router-dom";
import { Project } from "../types/types";

export const ProjectHeader = () => {
    
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
        <header className="flex items-center justify-between font-bold text-dark-md">
            <h1 className="font-heading inline pr-4 text-xl font-bold 
            border-r border-black">
                {project.title}
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
                <ProjectMembers 
                members={project.members}
                projectId= {project.id}
                />
               
       
        </header>
    )
}