import { useMutation } from "@apollo/client";
import { CheckIcon } from "../../../assets/icons/Icons";
import { Project } from "../../../types/types";
import LoadingItem from "../../ui/LoadingItem";
import { UPDATE_PROJECT } from "../../../graphql/mutations";
import { useForm } from "../../../hooks/useForm";

interface ProjectOverviewGeneralSectionProps {
    project: Project
}

const ProjectOverviewGeneralSection = ({project}: ProjectOverviewGeneralSectionProps) => {

    const initialState = {
        id: project.id,
        title: project.title,
        description: project.description,
        label: project.label,
        userIds: project.userIds
    }
    const { formData: projectData, handleInputChange } = useForm(initialState);

    const [editProject, {loading}] = useMutation(UPDATE_PROJECT)

    const handleEditProject = async () => {
        
        const optimisticData = {...projectData, members: project.members, __typename: 'Project'};
        // "await" prefix is needed to loading layout if not optimistic response is given
        editProject({
            variables: projectData,
            optimisticResponse: {
                ['updateProject']: optimisticData
            }
        })
    }

    return (
        <>
         <label htmlFor="label">
                <span className="text-blue-bright flex flex-col">
                    <span>
                        Tag
                    </span>
                    <input type="text" name="label" id="label" value={projectData.label}
                    onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                    className="text-dark-med w-fit p-2 
                    hover:outline hover:outline-2 hover:outline-white-gray rounded-md outline-white-gray"/>
                </span>
            </label>

            <label className="flex flex-col gap-2" htmlFor="description">
                <span className="font-bold text-base">
                    Description
                </span>
                <textarea value={projectData.description} name="description" id="description"
                onChange={handleInputChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                placeholder="What is the project about? Does it have any rules?" rows={3}
                className="w-full p-4 resize-none
                hover:outline hover:outline-2 hover:outline-white-gray rounded-md outline-white-gray
                "/>
            </label>

            <button className="ml-auto mt-2 border border-white-gray p-4 py-2 rounded-md
            text-dark-med font-medium w-fit justify-center flex gap-2 items-center font-medium
            fill-dark-med hover:fill-dark hover:text-dark h-[38px]" onClick={handleEditProject}>
                {
                    loading ? 
                    <LoadingItem height="h-[15px]" fillColor="fill-blue-bright"/>:
                    <>
                        <span>
                            Save changes
                        </span>
                        <CheckIcon className="h-[20px] " />
                    </>
                }
            </button>
        </>
    )
}
export default ProjectOverviewGeneralSection;