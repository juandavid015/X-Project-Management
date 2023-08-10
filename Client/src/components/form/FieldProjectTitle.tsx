import { TitleIcon } from "../../assets/icons/Icons";

interface FieldProjectTitleProps {
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>
    projectFormTitle: string
}
const FieldProjectTitle = ({handleInputChange, projectFormTitle}: FieldProjectTitleProps) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <span className="text-dark-purple-md font-bold">
                Step 1/3
            </span>
            <span className="text-dark-purple-md">
                First step, go ahead!
            </span>
            <label htmlFor="title"
            className="flex gap-2 items-center border-white-gray border-b pb-2">
         
                <TitleIcon className="h-[30px] fill-dark"/>
                <h2 className="font-heading text-2xl text-dark">
                    Type a title for your project
                </h2>
               
            </label>
            <input type="text" placeholder="Dope title project" onChange={handleInputChange} 
            value={projectFormTitle} id="title" name="title" autoFocus
            className="text-base w-full bg-white-purple p-4 outline-electric-blue"/>
        </div>
    )
}
export default FieldProjectTitle;