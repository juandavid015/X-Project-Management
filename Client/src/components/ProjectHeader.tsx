import { useQuery } from "@apollo/client";
import { GET_PROJECT_MEMBERS } from "../graphql/querys";
import { ProjectMembers } from "./ProjectMembers";

export const ProjectHeader = () => {
    let {loading, error, data} = useQuery(GET_PROJECT_MEMBERS, {
        variables: {projectId: '64776d5011f6af1e77f4e984'}
    });


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
    data = data?.getProject;
    let projectMembers = data?.members

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
                <ProjectMembers 
                projectMembers={projectMembers}
                members={projectMembers}
              
                />
               
       
        </header>
    )
}