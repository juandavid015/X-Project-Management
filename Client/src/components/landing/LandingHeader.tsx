import { Link, useNavigate } from "react-router-dom"
import { LoginLink } from "../ui/LoginLink"
import brandLogo from '../../assets/LOGO.png';
import { ArrowSimpleIcon, LargeArrow } from "../../assets/icons/Icons";
import { useAuth0 } from "@auth0/auth0-react";
import { UserPreview } from "../ui/UserPreview";
import { SkeletonUser } from "../ui/skeletons/SkeletonElements";
import { useState } from "react";

const LandingHeader = () => {

    const navigate = useNavigate();
    const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0();
    const [show, setShow] = useState(false)
    const handleLogin = async () => {
        if (!isAuthenticated) {
            await loginWithRedirect({
                appState: { returnTo: '/projects', }

            })
        } else {
            navigate('/projects')
        }
    }

    return (
        <header 
        className="relative w-full mx-auto h-full min-h-[70vh] 
        flex flex-col items-center gap-8
        text-dark font-heading bg-hero bg-no-repeat bg-cover px-8"
        >
            <div className="fixed w-full sm:bg-transparent bg-white/80 z-[100] backdrop-blur-[3px]">
                <nav className="mx-auto flex items-center justify-between 
                max-w-[1048px] w-full p-2  ">
                    <div>
                        <img src={brandLogo} width={50} height={50} alt="brand logo" />
                    </div>
                    <ul className="flex gap-4 items-center">
                        <li className="border border-dark rounded-md px-2 py-1 
                         text-dark hover:shadow-lg">
                            <Link to={'/projects'}>
                                Enter the app
                            </Link>
                        </li>
                        <li 
                        id="product-label"
                        className="relative"
                        aria-haspopup 
                        aria-expanded={show} 
                        aria-label="Product dropdown menu"
                        >
                            <button 
                            className="flex gap-4 items-center"
                            onClick={()=> setShow(!show)}
                            aria-label="Toggle Product dropdown menu"
                            >
                                <span>Product</span>
                                {
                                    show 
                                    ?
                                    <ArrowSimpleIcon className="h-[15px] -rotate-90 transition-all fill-purple"/>
                                    :
                                    <ArrowSimpleIcon className="h-[15px] rotate-90 transition-all"/>
                                    
                                }
                            </button>
                            <div aria-labelledby="product-label"
                            className="relative w-ful">

                                <ul 
                                className={`absolute top-[200%] flex flex-col gap-2 font-sans
                                bg-white/80 backdrop-blur-[8px] p-8 rounded-md 
                                h-[0px] transition-all origin-bottom opacity-0
                                ${show && 'h-auto opacity-100'} list-disc`}
                                >
                                    <li className="text-dark-med/80 hover:text-purple ">
                                        <Link to={'#project_management'} reloadDocument>
                                            Project management
                                        </Link>
                                    </li>
                                    <li className="text-dark-med/80 hover:text-purple ">
                                        <Link to={'#task_management'} reloadDocument>
                                            Task management
                                        </Link>
                                    </li>
                                    <li className="text-dark-med/80 hover:text-purple ">
                                        <Link to={'#collaboration_spaces'} reloadDocument>
                                            Collaboration spaces
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            {
                                !isAuthenticated
                                    ?
                                    <LoginLink />
                                    :
                                    user && !isLoading ?

                                    <UserPreview
                                        expanded={false}
                                        name={user.nickname ? user.given_name || user.nickname : ''}
                                        image={user.picture ? user.picture : ''}
                                        className=' w-[30px] -top-0 left-[.5em] whitespace-nowrap 
                                        flex items-center gap-2 text-dark-med '
                                    />
                                    :
                                    <SkeletonUser />
                            }

                        </li>

                    </ul>
                </nav>
            </div>

            <div className="flex flex-col items-center gap-8 m-auto
                max-w-[1048px]">
                <h1 className="sm:text-6xl text-3xl">
                    Start management easily, efficiently and friendly
                </h1>
                <div className="flex justify-center flex-wrap gap-4">
                    <Link to={'/projects'}
                        className="flex gap-2 items-center w-fit text-white/90 fill-white
                        text-base font-bold rounded-full px-8 py-2 bg-purple 
                        hover:shadow-lg hover:bg-purple/90 transition-all text-white/100">
                        <span>
                            Create a space know!
                        </span>
                        <LargeArrow className="w-[40px]" />
                    </Link>
                    <button onClick={() => handleLogin()}
                        className="flex gap-2 items-center w-fit text-white fill-white 
                        text-base font-bold rounded-full px-8 py-2 bg-dark
                        hover:shadow-xl transition-all text-white/100">
                        <span>
                            Sign up
                        </span>
                        <LargeArrow className="w-[40px]" />
                    </button>
                </div>
            </div>
        </header>
    )
}
export default LandingHeader