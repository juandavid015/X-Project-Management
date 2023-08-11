
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import { Project } from "../pages/Project";
import Projects from "../pages/Projects";
import Notifications from "../pages/Notifications";
import Spaces from "../pages/Spaces";
import Goals from "../pages/Goals";
import Chats from "../pages/Chats";
import PostLogin from "../pages/PostLogin";
import Auth0ProviderWithNavigate from "../providers/Auth0ProviderWithNavigate";
import ErrorPage from "../components/error/ErrorPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectDiscussions from "../components/project/ProjectDiscussions";
import { Kanban } from "../components/kanban/Kanban";
import ProjectTimeline from "../components/project/ProjectTimeline";
import ProjectOverview from "../components/project/ProjectOverview";
import ProjectFiles from "../components/project/ProjectFiles";
import List from "../components/project/List";
import Calendar from "../components/project/Calendar";
import Gantt from "../components/project/Gantt";
import Tasks from "../components/project/Tasks";
import ProtectedRoute from "../components/authentication/ProtectedRoute";
import Settings from "../pages/Settings";

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
                                element: <PostLogin />
                            },
                            {
                                path: "projects",
                                element: <Projects />
                            },
                            {
                                path: "projects/:projectId",
                                element: <Project />,
                                errorElement: <ErrorPage />,
                                children: [
                                    {
                                        errorElement: <ErrorPage />,
                                        children: [
                                            {
                                                path: "tasks",
                                                element: <Tasks />,
                                                children: [
                                                    {
                                                        path: "",
                                                        element: <Kanban />
                                                    },
                                                    {
                                                        path: "kanban",
                                                        element: <Kanban />
                                                    },
                                                    {
                                                        path: "list",
                                                        element: <ProtectedRoute children={<List />} />
                                                        // List will be public once the feature is ready
                                                    },
                                                    {
                                                        path: "calendar",
                                                        element: <ProtectedRoute children={<Calendar />} />
                                                        // Calendar will be public once the feature is ready
                                                    },
                                                    {
                                                        path: "gantt",
                                                        element: <ProtectedRoute children={<Gantt />} />
                                                    },
                                                ]
                                            },
                                            {
                                                path: "",
                                                element: <Kanban />
                                            },
                                            {
                                                path: "discussions",
                                                element: <ProtectedRoute children={<ProjectDiscussions />} />
                                            },
                                            {
                                                path: "timeline",
                                                element: <ProtectedRoute children={<ProjectTimeline />} />
                                            },
                                            {
                                                path: "overview",
                                                element: <ProtectedRoute children={<ProjectOverview />} />
                                            },
                                            {
                                                path: "files",
                                                element: <ProtectedRoute children={<ProjectFiles />} />
                                            }
                                        ]
                                    }
                                ],
                  
                                
                            },
                            
                    
                            {
                                path: "notifications",
                                element: <ProtectedRoute children={<Notifications />} />
                            },
                            {
                                path: "spaces",
                                element: <ProtectedRoute children={<Spaces />} />
                            },
                            {
                                path: "goals",
                                element: <ProtectedRoute children={<Goals />} />
                            },
                            {
                                path: "chats",
                                element: <ProtectedRoute children={<Chats />} />
                            },
                            {
                                path: "settings",
                                element: <ProtectedRoute children={<Settings />} />
                            },
                            {
                                path: '*',
                                element: <NotFoundPage />
                            }
                        
                            
                        ]
                    }
                ]
            }
        ]
    },
    
])