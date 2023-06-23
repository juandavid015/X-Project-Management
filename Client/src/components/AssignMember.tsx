import { AddIcon } from "../assets/icons/Icons"
import { UserPreview } from "./UserPreview"
import { gql, useMutation } from "@apollo/client"
const sampleMembers = [
    {
        name: 'Juan',
        image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Davida',
        image: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Luef',
        image: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Schvotskovy',
        image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Rina',
        image: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    
    //some more rested...
]
const ADD_MEMBER_TO_PROJECT = gql`
mutation AddMemberToProject($projectId: String, $userId: String) {
    addMemberToProject(projectId: $projectId, userId: $userId) {
        id,
        title,
        members {
            email,
            name,
        }
    }
} `
export const AssignMember = () => {
    const [addMemberToProject, {data, loading, error}] = useMutation(ADD_MEMBER_TO_PROJECT);

    const assignMember = () => {
        addMemberToProject({
            variables: {
                projectId: '647923fd28fe2dee258fd9bc',
                userId: '64873818119649e7aaf2da2f'
            }
        })
    }
    if (loading) return (<p>Submitting...</p>)
    if (error)  return (<p>Error</p>)

    return (
        // Still the possibility to use form instead
        <div className="flex gap-2 items-center">
           

            <button onClick={()=> assignMember()}
            className="h-[30px] w-[30px] border-dotted border-dark-med border-2 rounded-full flex
            ">
                <AddIcon
                className="h-[10px] fill-dark-med hover:fill-dark cursor-pointer m-auto " />
            </button>
            <span>
                Assign member
            </span>
        </div>
     
    )
}