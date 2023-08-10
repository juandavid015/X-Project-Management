import {  UserIcon } from "../../assets/icons/Icons"


interface AssignMemberProps {
    openSearch: () => void
    height?: string,
    width?: string
    
}

export const AssignMember = ({openSearch}: AssignMemberProps) => {
    // const [addMemberToProject, {data, loading, error}] = useMutation(ADD_MEMBER_TO_PROJECT);
    
    // const assignMember = () => {
    //     addMemberToProject({
    //         variables: {
    //             projectId: '647923fd28fe2dee258fd9bc',
    //             userId: '64873818119649e7aaf2da2f'
    //         }
    //     })
    // }
    // if (loading) return (<p>Submitting...</p>)
    // if (error)  return (<p>Error</p>)

    return (
        // Still the possibility to use form instead
        <div className="flex gap-2 items-center
        group flex items-center gap-1 fill-gray text-gray font-medium hover:fill-dark hover:font-bold hover:text-dark hover:scale-y-[1.03] cursor-pointer">
           

            <button onClick={openSearch}
            className={`group-hover:border-dark rounded-full flex
            `}>
                <UserIcon
                className="h-[20px] w-[20px] cursor-pointer m-auto " />
                <span>
                    + Assign member
                </span>
            </button>
        </div>
     
    )
}