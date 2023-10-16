
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import Auth0ProviderWithNavigate from "../providers/Auth0ProviderWithNavigate";
import ErrorPage from "../components/error/ErrorPage";

export const router = createBrowserRouter([
    {
        element: <Auth0ProviderWithNavigate/>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Root />, 
                children: [
                    {
                        errorElement: <ErrorPage />,
                        children: [
                            {
                                path: "login",
                                async lazy() {
                                    const  PostLogin  = (await import("../pages/PostLogin")).default
                                    return { Component: PostLogin }
                                }
                            },
                            {
                                path: "projects",
                                async lazy() {
                                    const  Projects  = (await import("../pages/Projects")).default
                                    return { Component: Projects }
                                }
                            },
                            {
                                path: "projects/:projectId",
                                async lazy() {  const ProjectProvider = (await import ("../providers/ProjectProvider")).default
                                const  Project  = (await import("../pages/Project")).default
                                return { Component: ()=> <ProjectProvider children={<Project/>}/>}
                              
                                    return { Component: Project }
                                },
                                errorElement: <ErrorPage />,
                                children: [
                                    {
                                        errorElement: <ErrorPage />,
                                        children: [
                                            {
                                                path: "tasks",
                                                async lazy () {
                                                    const  Tasks  = (await import ("../components/project/Tasks")).default
                                                    return { Component: Tasks }
                                                },
                                                children: [
                                                    {
                                                        path: "",
                                                        async lazy () {
                                                            const  Kanban = (await import ( "../components/kanban/Kanban")).default
                                                            return { Component: Kanban }
                                                        },
                                                    },
                                                    {
                                                        path: "kanban",
                                                        async lazy () {
                                                            const  Kanban = (await import ( "../components/kanban/Kanban")).default
                                                            return { Component: Kanban }
                                                        },
                                                    },
                                                    {
                                                        path: "list",
                                                        async lazy() {
                                                            const List = (await import("../components/list/List")).default;
                                                            return { Component: List} 
                                                        }
                                                    },
                                                    {
                                                        path: "calendar",
                                                        async lazy() {
                                                            const Calendar = (await import("../components/calendar/Calendar")).default;
                                                            const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                                            return { Component: ()=> <ProtectedRoute children={<Calendar />}/> }
                                                        },
                                                        // Calendar will be public once the feature is ready
                                                    },
                                                    {
                                                        path: "gantt",
                                                        async lazy() {
                                                            const Gantt = (await import("../components/project/Gantt")).default;
                                                            const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                                            return { Component: ()=> <ProtectedRoute children={<Gantt />}/> }
                                                        },
                                                    },
                                                ]
                                            },
                                            {
                                                path: "",
                                                async lazy () {
                                                    const TasksProvider = (await import ("../providers/TasksProvider")).default
                                                    const  Kanban = (await import ( "../components/kanban/Kanban")).default
                                                    return { Component: ()=> <TasksProvider children={<Kanban/>}/>}
                                                },
                                            },
                                            {
                                                path: "discussions",
                                                async lazy() {
                                                    const ProjectDiscussions = (await import("../components/project/ProjectDiscussions")).default;
                                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                                    return { Component: ()=> <ProtectedRoute children={<ProjectDiscussions />}/> }
                                                },
                                            },
                                            {
                                                path: "timeline",
                                                async lazy() {
                                                    const ProjectTimeline = (await import("../components/project/ProjectTimeline")).default;
                                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                                    return { Component: ()=> <ProtectedRoute children={<ProjectTimeline />}/> }
                                                },
                                            },
                                            {
                                                path: "overview",
                                                async lazy() {
                                                    const ProjectOverview = (await import("../components/project/ProjectOverview")).default;
                                                    return { Component: ProjectOverview }
                                                },
                                            },
                                            {
                                                path: "files",
                                                async lazy() {
                                                    const ProjectFiles = (await import("../components/project/ProjectFiles")).default;
                                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                                    return { Component: ()=> <ProtectedRoute children={<ProjectFiles />}/> }
                                                },
                                            }
                                        ]
                                    }
                                ],
                  
                                
                            },
                            
                    
                            {
                                path: "notifications",
                                async lazy() {
                                    const Notifications = (await import("../pages/Notifications")).default;
                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                    return { Component: ()=> <ProtectedRoute children={<Notifications />}/> }
                                },
                            },
                            {
                                path: "spaces",
                                async lazy() {
                                    const Spaces = (await import("../pages/Spaces")).default;
                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                    return { Component: ()=> <ProtectedRoute children={<Spaces />}/> }
                                },
                            },
                            {
                                path: "goals",
                                async lazy() {
                                    const Goals = (await import("../pages/Goals")).default;
                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                    return { Component: ()=> <ProtectedRoute children={<Goals />}/> }
                                },
                            },
                            {
                                path: "chats",
                                async lazy() {
                                    const Chats = (await import("../pages/Chats")).default;
                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                    return { Component: ()=> <ProtectedRoute children={<Chats />}/> }
                                },
                            },
                            {
                                path: "settings",
                                async lazy() {
                                    const Settings = (await import("../pages/Settings")).default;
                                    const ProtectedRoute = (await import("../components/authentication/ProtectedRoute")).default;

                                    return { Component: ()=> <ProtectedRoute children={<Settings />}/> }
                                },
                            },
                            {
                                path: '*',
                                async lazy () {
                                    const  NotFoundPage  = (await import ("../pages/NotFoundPage")).default
                                    return { Component: NotFoundPage }
                                },
                            }
                        
                            
                        ]
                    }
                ]
            }
        ]
    },
    
])