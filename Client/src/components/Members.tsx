import { gql, useQuery } from "@apollo/client"
import { UserPreview } from "./UserPreview";

export const GET_PROJECT_MEMBERS = gql`
    query GetProject($projectId: String!) {
        getProject(projectId: $projectId) {
            members {
                email,
                name,
                image
            }
        }
    }
`
export const Members = () => {
    const {loading, error, data} = useQuery(GET_PROJECT_MEMBERS, {
        variables: {projectId: '647923fd28fe2dee258fd9bc'}
    });

    if (loading) return (<p>Loading...</p>)
    if (error)  return (<p>Error</p>)
    
    let members = data?.getProject?.members;
    console.log(members)

    return(
        <div className="flex border-r border-white-gray">

        {
            members?.map((user:any, index:any) => {
                if(index <= 2) {
                    return (
                        <UserPreview expanded={false} name={user.name} image={user.image} key={index + 'mem'} 
                        className={`rounded-full h-[30px] w-[30px] overflow-hidden 
                        ${index === 0 ? '': '-ml-[12.25%]'}
                        `}/>
                    )
                } else if(index === members.length - 1) {
                    return (
                        <div key={index + 'mem'}
                        className="flex rounded-full bg-white-gray h-[30px] w-[30px]">
                            <span className="m-auto">{`+${members.length - 3}`}</span>
                        </div>
                    )
                } else {
                    return
                }
                
            })
        }

        </div>
    )
}