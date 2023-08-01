import { useQuery } from "@apollo/client";
import { Members } from "../components/Members";
import { GET_PROJECTS } from "../graphql/querys";
import { Link } from "react-router-dom";
import { Project } from "../types/types";
import { AddIcon } from "../assets/icons/Icons";
import { useModal } from "../hooks/useModal";
import ModalCreateProject from "../components/ModalCreateProject";
import FormCreateProject from "../components/FormCreateProject";


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
    const {loading, data} = useQuery(GET_PROJECTS, {
        variables: {
            userId: "64c5cfe02f64b23b4eb88917"
        }
    });

    const {openModal, closeModal, isActive} = useModal();

    if(loading) return (
        <div>Loding...</div>
    )
    const projects: Project[] = data.getAllProjects

    return (
        <>
            {
                isActive && 
                <ModalCreateProject closeModal={closeModal}>
                    <FormCreateProject />
                </ModalCreateProject>
            }
            <div className="p-8 flex flex-col gap-8 w-full">
                <div className="flex gap-4">
                    <h1 className="font-heading text-3xl pr-8 border-r border-gray inline w-fit
                    ">
                        Projects
                    </h1>
                    <button onClick={openModal} 
                    className="font-sans font-medium text-white/80 
                    hover:text-white hover:fill-white-gray fill-white-gray/80
                    flex items-center gap-3 bg-electric-blue py-2 px-4 rounded-full">
                        <AddIcon className="h-[16px] "/>
                        <span>
                            Create new project
                        </span>
                    </button>
                </div>
                <div className="flex gap-4 flex-wrap">
                    {
                        projects?.map((project) => {
                            return (
                                <div className="max-w-[270px] w-full bg-white p-8
                                flex  flex-col gap-2 text-base" key={project.id}>
                                    <Link to={project.id} className="w-full">
                                        <h2 className="font-heading text-xl
                                        line-clamp-3">
                                            {project.title}
                                        </h2>
                                        <span className="text-dark-purple-md font-bold">
                                            {project.label}
                                        </span>
                                        <p className="line-clamp-3">
                                            {project.description}
                                        </p>
                                        <div className="mt-auto flex flex-row justify-between ">
                                            <Members
                                            members={project.members}
                                            height='h-[30px]'
                                            width="w-[30px]"
                                            />
                                            {/* <div className="flex flex-col">
                                                <span className="text-dark-purple-md font-bold">
                                                    Completed 
                                                </span>
                                                <span className="text-dark-purple-md font-bold">
                                                    {project.tasksProgress.completed}/{project.tasksProgress.total}
                                                </span>
                                            </div> */}
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
};

export default Projects;