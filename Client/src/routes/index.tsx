
import { createBrowserRouter } from "react-router-dom";
import Root from "./root";
import { Project } from "../components/Project";
import Projects from "../pages/Projects";
import Notifications from "../pages/Notifications";
import Spaces from "../pages/Spaces";
import Goals from "../pages/Goals";
import Chats from "../pages/Chats";
import PostLogin from "../pages/PostLogin";
import Auth0ProviderWithNavigate from "../providers/Auth0ProviderWithNavigate";

export const router = createBrowserRouter([
    {
        element: <Auth0ProviderWithNavigate/>,
        children: [
            {
                path: "/",
                element: <Root />,
                children: [
                    {
                        path: "login",
                        element: <PostLogin />
                    },
                    {
                        path: "projects/:projectId",
                        element: <Project />
                    },
                    {
                        path: "projects",
                        element: <Projects />
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
                    }
                ]
            }
        ]
    },
    
])