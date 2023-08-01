import { LabelIcon } from "../assets/icons/Icons";

interface FieldProjectLabelProps {
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>
    projectFormLabel: string
}
const FieldProjectLabel = ({handleInputChange, projectFormLabel}: FieldProjectLabelProps) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <span className="text-dark-purple-md font-bold">
                Step 3/3
            </span>
            <span className="text-dark-purple-md">
                Done!
            </span>
            <label htmlFor="label"
            className="flex gap-2 items-center border-white-gray border-b pb-2">
                <LabelIcon className="h-[80px] fill-dark"/>
                <h2 className="font-heading text-2xl text-dark">
                    Finally, add a label name that identifies this project
                </h2>
               
            </label>
            <input type="text" placeholder="Bussiness" onChange={handleInputChange} 
            value={projectFormLabel} id="label" name="label" autoFocus
            className="text-base w-full bg-white-purple p-4 outline-electric-blue"/>
        </div>
    )
}
export default FieldProjectLabel;