
import { User } from "../types/types";
import { UserPreview } from "./UserPreview";


interface MembersProps {
    members?: User[],
    [key: string] : unknown
    height: string
    width: string
}


export const Members = ({members, height, width}: MembersProps) => {
   
    if(!members?.length ) return null
    

    return(
        <div className={` flex  w-fit ${height ? height : 'h-[30px]'}`} >

        {
            members?.map((user:User, index:number) => {
                if(index <= 2) {
                    return (
                        <UserPreview expanded={false} name={user.name} image={user.image} key={index + 'mem'} 
                        className={`pointer-events-none rounded-full overflow-hidden ${width} ${height}
                        ${index === 0 ? '': '-ml-[12.25%]'}
                        `}/>
                    )
                } else if(index === members.length - 1) {
                    return (
                        <div key={index + 'mem'}
                        className={`pointer-events-none flex rounded-full bg-white-gray ${width} ${height}`}>
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