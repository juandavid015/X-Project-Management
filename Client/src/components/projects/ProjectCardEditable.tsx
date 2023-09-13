import { Dispatch, SetStateAction, useRef } from "react";
import { Project } from "../../types/types";
import { Members } from "../ui/Members";
import ProjectCardOptions from "./ProjectCardOptions";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useForm } from "../../hooks/useForm";
import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "../../graphql/mutations";
import LoadingItem from "../ui/LoadingItem";

interface ProjectCardEditableProps {
    toggleEdit: () => void
    setEdit?: Dispatch<SetStateAction<{ isActive: boolean; item: string; input: string; }>>
    project: Project
}
const ProjectCardEditable = ({toggleEdit, project}:ProjectCardEditableProps) => {

    const containerRef = useRef(null);
    const initialState = {
        id: project.id,
        title: project.title,
        description: project.description,
        label: project.label,
        userIds: project.userIds
        
    }
    const { formData: projectData, handleInputChange } = useForm(initialState);

    useClickOutside({elementRef: containerRef, onClickOutside: toggleEdit});

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
        toggleEdit();
    }

    return (
        <div className="relative max-w-[270px] w-full bg-white p-8 relative rounded-md
        flex flex-col gap-2" ref={containerRef}>

            <ProjectCardOptions
            className={'absolute top-[1rem] left-[calc(100%-3rem)] z-10'}
            projectId={project.id}
            editProject={toggleEdit}
            />

            <label htmlFor="title">
                <input type="text" value={projectData.title} autoFocus placeholder="Title goes here..."
                name="title"
                id="title" onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                className="outline-none font-heading text-xl w-full"/>
            </label>

            <label className="w-fit flex flex-col gap-2" htmlFor={'label'}>
                <input type="text" value={projectData.label} placeholder="A tag. E.g: 'Programming'"
                name="label"
                id={'label'}  onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}
                className="p-1 w-full outline-electric-blue text-dark-purple-md font-bold"/>
                {/* <button className="flex items-center 
                hover:fill-dark hover:text-dark text-gray font-medium" >
                    <LabelIcon className="h-[20px] fill-dark"/>
                    <span>+Add label</span>
                </button> */}
            </label>

            <label htmlFor={'description'}>
                <textarea placeholder="A short description about your project..." rows={3}
                name="description"
                id="description" value={projectData.description} onChange={handleInputChange as React.ChangeEventHandler<HTMLTextAreaElement>}
                className="resize-none w-full p-2 bg-white-gray/30 rounded-md focus:outline-electric-blue outline-1"/>
            </label>

            <label className="flex gap-2" htmlFor="members">
                <Members
                members={project.members}
                height='h-[30px]'
                width="w-[30px]"
                />
                {/* <AssignMember
                width="h-[20px]"
                height="w-[20px]"
                openSearch = {()=> null} /> */}
                {/* {   
                    openedSearch && 
                    <SearchMembers
                    handleInputChange={ handleInputChange }
                    reference={ containerRef }
                    setFormData={ setFormData } 
                    members={ members }
                    projectMembers={ projectMembers }
                    onFinish={onFinish || toggleOpenSearch}/>
                    
                    
                } */}
            </label>
            <button className="ml-auto mt-2 bg-purple p-4 py-2 rounded-md
            text-white font-medium" onClick={handleEditProject}>
                {
                    loading ? 
                    <LoadingItem height="h-[15px]" fillColor="fill-white"/>:
                    <span>
                        Save
                    </span>
                }
            </button>
        </div>
    )
};

export default ProjectCardEditable;