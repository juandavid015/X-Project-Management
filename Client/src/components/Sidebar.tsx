import {useState} from 'react';
import { ChatIcon, GoalsIcon,  NotificationsIcon, ProjectsIcon, RightDoubleArrowIcon, SettingsIcon, TeamIcon } from "../assets/icons/Icons"
import Logo from '../assets/Brand_Logo.png'
import {useAuth0} from '@auth0/auth0-react';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { Link } from 'react-router-dom';
export const Sidebar = () => {

    const {isAuthenticated} = useAuth0();

    const [expand, setExapand] = useState(false);

    const toggleNavbarVisibility = () => {
        setExapand(expand => !expand);
    }
    return (
        <div className={`relative h-full  font-bold text-dark-med
        ${expand ? 'w-[222px]': 'w-[84px]'} transition-[width] duration-700`}>
            <nav className={`h-full bg-white flex flex-col p-8 justify-between
            fixed top-0 left-0  ${expand ? 'w-[222px]': 'w-[84px] '} transition-[width] duration-700
            `}>
                <div className="flex flex-col gap-4 -ml-[15px]">
                    <img className="w-[50px] min-w-[50px]  h-auto" src={Logo}/>
                    {
                        !expand ? 
                        <button onClick={toggleNavbarVisibility} className='w-fit transition-all duration-700'>
                            <RightDoubleArrowIcon className="w-[40px] fill-dark-med" />
                        </button> :
                        <button onClick={toggleNavbarVisibility} className='w-fit rotate-180 transition-all duration-700'>
                            <RightDoubleArrowIcon className="w-[40px] fill-dark-med" />
                        </button>
                    }
                    <span className={`origin-center text-electric-blue text-xl ${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700 whitespace-nowrap
                    ml-[15px]`}
                     >
                        Light Connect 
                    </span>
                </div>
                    <ul className="flex flex-col gap-10">
                        <li>
                            <Link to={`projects`}
                            className="flex gap-2 items-center">
                                <span>
                                    <ProjectsIcon className="h-[20px]"/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Projects
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'notifications'} 
                            className="flex gap-2 items-center"> 
                                <span>
                                    <NotificationsIcon className={`h-[20px] fill-electric-blue`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Notifications
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'chats'} 
                            className="flex gap-2 items-center"> 
                                <span>
                                    <ChatIcon className={`h-[20px] fill-electric-blue`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Chat
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'goals'} 
                            className="flex gap-2 items-center"> 
                                <span>
                                    <GoalsIcon className={`h-[20px] fill-electric-blue`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Goals
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to={'spaces'} 
                            className="flex gap-2 items-center"> 
                                <span>
                                    <TeamIcon className={`h-[20px] fill-electric-blue`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Spaces
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-10">
                        <li>
                            <Link to={'settings'} 
                            className="flex gap-2 items-center"> 
                                <span>
                                    <SettingsIcon className={`h-[20px] fill-electric-blue`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Settings
                                </span>
                            </Link>
                        </li>
                        {
                            isAuthenticated ? 
                            <li>
                                <LogoutButton />
                            </li> :
                            <li>
                                {/* <a className="flex gap-2 items-center"> 
                                    <span>
                                        <LogoutIcon className={`h-[20px] fill-electric-blue`}/>
                                    </span>
                                    <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700 whitespace-nowrap`}>
                                        Log out
                                    </span>
                                </a> */}
                                <LoginButton />
                            </li>
                        }
                        
                    </ul>
             
            </nav>
        </div>
        
    )
}