import { DescriptionIcon } from "../../assets/icons/Icons";
interface FieldProjectDescriptionProps {
    handleInputChange: React.ChangeEventHandler<HTMLInputElement>
    projectFormDescription: string
}
const FieldProjectDescription = ({handleInputChange, projectFormDescription}: FieldProjectDescriptionProps) => {
    return (
        <div className="flex flex-col gap-4 p-4">
            <span className="text-dark-purple-md font-bold">
                Step 2/3
            </span>
            <span className="text-dark-purple-md">
                We're almost there...
            </span>
            <label htmlFor="description"
            className="flex gap-2 items-center border-white-gray border-b pb-2">
                <DescriptionIcon className="h-[30px] fill-dark"/>
                <h2 className="font-heading text-2xl text-dark">
                    Now add a short description
                </h2>
               
            </label>
            <input type="text" placeholder="A short description about your project..." onChange={handleInputChange} 
            value={projectFormDescription} id="description" name="description" autoFocus
            className="text-base w-full bg-white-purple p-4 outline-electric-blue"/>
        </div>
    )
}
export default FieldProjectDescription;