import { useState } from "react"
import { ASSIGN_PROJECT_MEMBER } from "../../graphql/mutations"
import MemberRolSelect from "../project/project-overview/MemberRolSelect"
import { ProjectPermissions } from "../../types/types"
import LoadingItem from "./LoadingItem"
import { useMutation } from "@apollo/client"

interface InviteProjectMemberProps {
    projectId: string,
    reference: React.Ref<HTMLDivElement>
    onCancel : () => void
}

type InitialState = {
    projectId: string,
    userEmail: string,
    userId: string,
    role: ProjectPermissions
}
export const InviteProjectMember = ({projectId, reference, onCancel}: InviteProjectMemberProps) => {

    const [data, setData] = useState<InitialState>({
            projectId: projectId,
            userEmail: '',
            userId: '',
            role: 'VIEW'
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setData((prevData) => ({...prevData, [name]: value}))
    }
    const [saveEntity, {loading}] = useMutation(ASSIGN_PROJECT_MEMBER)
    const handleClick = async ()=> {
        await saveEntity({
            variables: data
        })
    }

    return (
        <div className="absolute top-full bg-white p-8 rounded-md
        flex  flex-col gap-4 z-20 text-dark-med font-normal min-w-[350px]" ref={reference}>
            <span className="text-lg font-bold">
                Inivite new members
            </span>
            <p>
                New members will have access to participate on the actual project. Decide either give 
                <strong> management</strong> or just
                <strong> member</strong> permissions
            </p>
            <div className="flex flex-wrap gap-2 items-center">

                <label className="w-full ">
                    <input type="search" placeholder="sampleEmail@gmail.com" onChange={handleChange} name="userEmail" value={data.userEmail}
                    className="w-full  p-4 bg-white-purple 
                    outline outline-1 outline-electric-blue rounded-md focus:outline-2 text-dark-med"/>
                </label>
                <MemberRolSelect
                projectId={projectId}
                defaultRole={data.role}
                setFormData={setData}
                withOwnSendControll
                />
            </div>
            <div className="flex gap-4 justify-center">
            
                <button className="px-8 py-2 rounded-md 
                border border-red-warning text-red-warning opacity-70 hover:opacity-100" onClick={onCancel}>
                    <strong>Cancel</strong>
                </button>
                <button onClick={handleClick}
                className="px-8 py-2 rounded-md 
                bg-electric-blue text-white opacity-70 hover:opacity-100">
                    {
                        loading ?
                        <LoadingItem height="h-[15px]" fillColor="fill-white"/>
                        :
                        <strong>Confirm</strong>
                    }
                </button>
            </div>
            
        </div>
    )
}