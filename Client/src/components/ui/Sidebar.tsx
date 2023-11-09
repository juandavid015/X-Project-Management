import {useState} from 'react';
import { ChatIcon, GoalsIcon,  NotificationsIcon, ProjectsIcon, RightDoubleArrowIcon, TeamIcon } from "../../assets/icons/Icons"
import Logo from '../../assets/LOGO.png'
import {useAuth0} from '@auth0/auth0-react';
import { LogoutButton } from './LogoutButton';
import { LoginButton } from './LoginButton';
import { Link, NavLink } from 'react-router-dom';
import { SkeletonUser } from './skeletons/SkeletonElements';
import { UserPreview } from './UserPreview';
export const Sidebar = () => {

    const {isAuthenticated, user, isLoading} = useAuth0();

    const [expand, setExapand] = useState(false);

    const toggleNavbarVisibility = () => {
        setExapand(expand => !expand);
    }
    return (
        <div className={`relative h-full  font-bold text-dark-med 
        ${expand ? 'w-[222px]': 'w-[84px]'} transition-[width] duration-700`}>
            <nav className={`h-full bg-white flex flex-col py-8 px-4 justify-between 
            fixed top-0 left-0  ${expand ? 'w-[calc(222px-2rem)]': 'w-[84px] '} transition-[width] duration-700
            `}>
                <div className="flex flex-col gap-4 ">
                    <Link to={'/'}
                    className='w-fit'>
                        <img className="w-[50px] min-w-[50px]  h-auto" src={Logo}/>
                    </Link>
                    <Link to={'/'}
                    className={`origin-center text-electric-blue text-xl ${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700 whitespace-nowrap
                    ml-[15px] font-heading`}
                     >
                        Soft Link
                    </Link>
                    {
                        !expand ? 
                        <button onClick={toggleNavbarVisibility} className='w-fit transition-all duration-700'>
                            <RightDoubleArrowIcon className="w-[40px] fill-dark-med" />
                        </button> :
                        <button onClick={toggleNavbarVisibility} className='w-fit rotate-180 transition-all duration-700'>
                            <RightDoubleArrowIcon className="w-[40px] fill-dark-med" />
                        </button>
                    }
                </div>
                    <ul className="flex flex-col gap-4 border-gray/20 border-t border-b pt-8 pb-8">
                        <li>
                            <NavLink to={`projects`}
                            className={({isActive, isPending})=> 
                        isActive 
                        ? 'fill-electric-blue text-electric-blue flex gap-2 items-center text-dark font-medium bg-white-gray rounded-md px-4 py-2':
                        isPending
                        ? 'hover:fill-dark-med flex gap-2 items-center rounded-md px-4 py-2'
                        : 'fill-dark-med flex gap-2 items-center opacity-90 font-medium rounded-md px-4 py-2'    
                    }
                            >
                                <span>
                                    <ProjectsIcon className="h-[20px]"/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Projects
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'notifications'} 
                            className={({isActive, isPending})=> 
                        isActive 
                        ? 'fill-electric-blue text-electric-blue flex gap-2 items-center font-medium bg-white-gray rounded-md px-4 py-2':
                        isPending
                        ? 'hover:fill-dark-med flex gap-2 items-center rounded-md px-4 py-2'
                        : 'fill-dark-med flex gap-2 items-center opacity-90 font-medium rounded-md px-4 py-2'    
                    }
                            > 
                                <span>
                                    <NotificationsIcon className={`h-[20px]`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Notifications
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'chats'} 
                            className={({isActive, isPending})=> 
                        isActive 
                        ? 'fill-electric-blue text-electric-blue flex gap-2 items-center font-medium bg-white-gray rounded-md px-4 py-2':
                        isPending
                        ? 'hover:fill-dark-med flex gap-2 items-center rounded-md px-4 py-2'
                        : 'fill-dark-med flex gap-2 items-center opacity-90 font-medium rounded-md px-4 py-2'    
                    }
                            > 
                                <span>
                                    <ChatIcon className={`h-[20px]`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Chat
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'goals'} 
                            className={({isActive, isPending})=> 
                        isActive 
                        ? 'fill-electric-blue text-electric-blue flex gap-2 items-center font-medium bg-white-gray rounded-md px-4 py-2':
                        isPending
                        ? 'hover:fill-dark-med flex gap-2 items-center rounded-md px-4 py-2'
                        : 'fill-dark-med flex gap-2 items-center opacity-90 font-medium rounded-md px-4 py-2'    
                    }
                            > 
                                <span>
                                    <GoalsIcon className={`h-[20px]`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Goals
                                </span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'spaces'} 
                            className={({isActive, isPending})=> 
                        isActive 
                        ? 'fill-electric-blue text-electric-blue flex gap-2 items-center font-medium bg-white-gray rounded-md px-4 py-2':
                        isPending
                        ? 'hover:fill-dark-med flex gap-2 items-center rounded-md px-4 py-2'
                        : 'fill-dark-med flex gap-2 items-center opacity-90 font-medium rounded-md px-4 py-2'    
                    }
                            > 
                                <span>
                                    <TeamIcon className={`h-[20px]`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Spaces
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                    <ul className="flex flex-col gap-10 rounded-md ">
                        {/* <li>
                            <NavLink to={'settings'} 
                            className={({isActive, isPending})=> 
                        isActive 
                        ? 'stroke flex gap-2 items-center text-dark font-medium bg-white-gray rounded-md px-4 py-2':
                        isPending
                        ? 'hover:fill-dark-med flex gap-2 items-center rounded-md px-4 py-2'
                        : 'fill-electric-blue flex gap-2 items-center opacity-90 font-medium rounded-md px-4 py-2'    
                    }
                            > 
                                <span>
                                    <SettingsIcon className={`h-[20px]`}/>
                                </span>
                                <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700`}>
                                    Settings
                                </span>
                            </NavLink>
                        </li> */}
                        {
                            isAuthenticated &&

                            <li className='relative min-h-[20px] '>
                                {
                                    user && !isLoading?
                                 
                                    <UserPreview
                                    expanded={expand}
                                    name={user.nickname ? user.given_name || user.nickname : ''}
                                    image={user.picture ? user.picture : ''}
                                    className ={'absolute w-[30px] -top-0 left-[.5em] whitespace-nowrap flex items-center gap-2 text-dark-med '}
                                    />
                                    :
                                    <SkeletonUser />
                                }
                            </li>
                        }
                        {
                            isAuthenticated ? 
                            <li >
                                <LogoutButton expanded={expand} />
                            </li> :
                            <li >
                                {/* <a className="flex gap-2 items-center"> 
                                    <span>
                                        <LogoutIcon className={`h-[20px] fill-electric-blue`}/>
                                    </span>
                                    <span className={`${!expand ? 'invisible opacity-0': 'visible opacity-100'} transition-all duration-700 whitespace-nowrap`}>
                                        Log out
                                    </span>
                                </a> */}
                                <LoginButton expanded={expand} />
                            </li>
                        }
                        
                    </ul>
             
            </nav>
        </div>
        
    )
}