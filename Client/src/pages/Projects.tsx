import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/querys";
import { Project } from "../types/types";
import { useModal } from "../hooks/useModal";
import ModalCreateProject from "../components/modal/ModalCreateProject";
import FormCreateProject from "../components/form/FormCreateProject";
import { handleErrorResponse } from "../helpers/errorHelpers";
import { CREATE_PUBLIC_PROJECT } from "../graphql/mutations";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/ui/Loading";
import useRedirectPublicProject from "../hooks/useRedirectPublicProject";
import ProjectsHeader from "../components/projects/ProjectsHeader";
import ProjectsList from "../components/projects/ProjectsList";
import SkeletonProjectList from "../components/ui/skeletons/SkeletonProjectList";


// const sampleProjects = [
//     {
//         title: 'First Project',
//         tag: 'Bussiness',
//         description: 'A short description.',
//         members: [
//             {   
//                 name: 'Juan',
//                 image: 'https://images.pexels.com/photos/953722/pexels-photo-953722.jpeg?auto=compress&cs=tinysrgb&w=1600'
//             },
//             {
//                 name: 'David',
//                 image: 'https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1600'
//             },
//             {
//                 name: 'Lex',
//                 image: 'https://images.pexels.com/photos/2853198/pexels-photo-2853198.jpeg?auto=compress&cs=tinysrgb&w=1600'
//             },
//             {
//                 name: 'Sen',
//                 image: 'https://images.pexels.com/photos/3533228/pexels-photo-3533228.png?auto=compress&cs=tinysrgb&w=1600'
//             }
//         ],
//         tasksProgress: {
//             completed: 6,
//             total: 9
//         }
//     },
//     {
//         title: 'Second and lately last project',
//         tag: 'Bussiness',
//         description: 'A short description. But a little more longer than the previous one',
//         members: [
//             {
//                 name: 'Lex',
//                 image: 'https://images.pexels.com/photos/977320/pexels-photo-977320.jpeg?auto=compress&cs=tinysrgb&w=1600'
//             },
//         ],
//         tasksProgress: {
//             completed: 3,
//             total: 9
//         }
//     }
// ]
const Projects = () => {

    const {openModal, closeModal, isActive} = useModal();
    const { isAuthenticated, user, isLoading: isLoadingUser} = useAuth0();
    const userId = user && user[`app_metadata`].id
    const hasPublicSpace = window.localStorage.getItem('public')?.length ? true: false;

    const [ createPublicProject, 
        {
            data: publicProject, 
            loading: loadingPublicProject
        }
    ] = useMutation( CREATE_PUBLIC_PROJECT );

    const {
        loading: isLoadingProjects, 
        data, 
        error
    } = useQuery( GET_PROJECTS, 
        {
            skip: isLoadingUser || (!isAuthenticated && !hasPublicSpace) ,
            
            variables: {
                userId: userId || ''
            }
        }
    );

    // console.log('USER', user)
 
    useRedirectPublicProject(createPublicProject, hasPublicSpace, isAuthenticated);
    

    if(loadingPublicProject) return (
        <div className=" flex items-center justify-center w-full overflow-hidden"><Loading messagge="Wait, all is being set up for you..."/></div>
        
    )

    

    if (error ) {    
        handleErrorResponse(error);
    }

    // user didn't have public session or were logged in... use the public project recently created
    // otherwise... the user is logged in, so use its related data.
    const projects: Project[] = !isAuthenticated && !hasPublicSpace 
        ? (publicProject && [publicProject?.createPublicProject?.project]) 
        : data?.getAllProjects

        
    return (
        <>
            {
                isActive && 
                <ModalCreateProject closeModal={closeModal}>
                    <FormCreateProject />
                </ModalCreateProject>
            }
            <div className="p-8 flex flex-col gap-8 w-full">

                <ProjectsHeader
                openModal={openModal} />

                {
                    isLoadingProjects || isLoadingUser
                    ?
                    <SkeletonProjectList
                    totalItems={4}
                    />
                    :
                    <ProjectsList
                    projects={projects} />
                
                }
                

            </div>
        </>
    )
};

export default Projects;