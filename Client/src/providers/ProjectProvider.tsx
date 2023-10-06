import { ApolloError, useQuery } from "@apollo/client";
import { createContext } from "react";
import { useParams } from "react-router-dom";
import { GET_PROJECT } from "../graphql/querys";
import { Project } from "../types/types";

type ProjectContextType = {
    project: Project
    loading: boolean
    error: ApolloError | undefined
    projectId: string | undefined
}

const defaultProject = {
    id: '',
    title: '',
    members: [],
    userIds: ''
}

const defaultProjectContext = {
    project: defaultProject,
    loading: true,
    error: undefined,
    projectId: undefined

}
export const ProjectContext = createContext<ProjectContextType>(defaultProjectContext);

const ProjectProvider = ({children}: React.PropsWithChildren) => {

    const { projectId } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: {projectId: projectId}
    })

    const project = data?.getProject;

    const projectValues = {
        project, loading, error, projectId
    }

    return (
        <ProjectContext.Provider value={projectValues}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectProvider;