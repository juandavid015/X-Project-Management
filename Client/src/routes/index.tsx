
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
                                                        element: <List />
                                                    },
                                                    {
                                                        path: "calendar",
                                                        element: <Calendar />
                                                    },
                                                    {
                                                        path: "gantt",
                                                        element: <Gantt />
                                                    },
                                                ]
                                            },
                                            {
                                                path: "",
                                                element: <Kanban />
                                            },
                                            {
                                                path: "discussions",
                                                element: <ProjectDiscussions />
                                            },
                                            {
                                                path: "timeline",
                                                element: <ProjectTimeline />
                                            },
                                            {
                                                path: "overview",
                                                element: <ProjectOverview />
                                            },
                                            {
                                                path: "files",
                                                element: <ProjectFiles />
                                            }
                                        ]
                                    }
                                ],
                  
                                
                            },
                            {
                                path: "notifications",
                                element: <Notifications />
                            },
                            {
                                path: "spaces",
                                element: <Spaces />
                            },
                            {
                                path: "goals",
                                element: <Goals />
                            },
                            {
                                path: "chats",
                                element: <Chats />
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