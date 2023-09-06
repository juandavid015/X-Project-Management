import { useState } from "react"
import { useSaveEntity } from "../../hooks/useSaveEntity"
import { ASSIGN_PROJECT_MEMBER } from "../../graphql/mutations"
import { GET_PROJECT_MEMBERS } from "../../graphql/querys"

interface InviteProjectMemberProps {
    projectId: string,
    reference: React.Ref<HTMLDivElement>
    onCancel : () => void
}
export const InviteProjectMember = ({projectId, reference, onCancel}: InviteProjectMemberProps) => {

    const [data, setData] = useState({
        projectId: projectId || '64776d5011f6af1e77f4e984',
        userEmail: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prevData) => ({...prevData, [name]: value}))
        console.log(name, value)
    }
    const {saveEntity} = useSaveEntity(ASSIGN_PROJECT_MEMBER, GET_PROJECT_MEMBERS)
    const handleClick = async ()=> {
        await saveEntity(data).finally(()=> {
            console.log('Invited member')
        })
    }

    return (
        <div className="absolute top-full bg-white p-8 rounded-md
        flex flex-col gap-4 z-20 text-dark-med font-normal" ref={reference}>
            <span className="text-lg font-bold">
                Inivite new members
            </span>
            <p>
                New members will have access to participate on the actual project. Decide either give 
                <strong> management</strong> or just
                <strong> member</strong> permissions
            </p>
            <label className="w-full">
                <input type="search" placeholder="sampleEmail@gmail.com" onChange={handleChange} name="userEmail" value={data.userEmail}
                className="w-full p-4 bg-white-purple outline outline-1 outline-electric-blue rounded-md focus:outline-2 text-dark-med"/>
            </label>
            <div className="flex gap-4">
            
                <button className="px-8 py-2 rounded-md 
                border border-gray text-red-warning opacity-70 hover:opacity-100" onClick={onCancel}>
                    <strong>Cancel</strong>
                </button>
                <button onClick={handleClick}
                className="px-8 py-2 rounded-md 
                bg-electric-blue text-white opacity-70 hover:opacity-100">
                    <strong>Confirm</strong>
                </button>
            </div>
            
        </div>
    )
}