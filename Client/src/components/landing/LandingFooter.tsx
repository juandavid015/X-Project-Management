import { Link } from "react-router-dom";
import { GithubIcon, LinkedInIcon, WebIcon } from "../../assets/icons/Icons";
import brandLogo from '../../assets/LOGO.png';
import { LoginLink } from "../ui/LoginLink";

const LandingFooter = () => {
    return (
        <footer className="w-full sm:p-16 p-8">
        <div className="max-w-[1048px] w-full flex sm:flex-nowrap flex-wrap m-auto gap-16">
            <div className="flex gap-2 max-h-[50px] m-auto ">
                <img src={brandLogo} width={50} height={50} />
                <span className="font-heading font-bold text-2xl ">
                    Soflink
                </span>
            </div>
            <ul className="flex gap-4 justify-between w-full">
                <li className="font-heading font-bold sm:text-lg text-base">
                    Product
                    <ul className={'text-base font-sans font-normal '}>
                        <li className="hover:text-purple/100 text-purple/70">
                            <Link to={'#project_management'} reloadDocument>
                                Project management
                            </Link>

                        </li>
                        <li className="hover:text-purple/100 text-purple/70">
                            <Link to={'#task_management'} reloadDocument>
                                Task management
                            </Link>
                        </li>
                        <li className="hover:text-purple/100 text-purple/70">
                            <Link to={'#collaboration_spaces'} reloadDocument>
                                Collaboration
                            </Link>
                        </li>
                    </ul>
                </li>
                <li className="font-heading font-bold sm:text-lg text-base">
                    Account
                    <ul className='text-base font-normal font-sans
                    hover:text-purple/100 text-purple/70'>
                        <li className="hover:text-purple/100 text-purple/70">
                            <LoginLink />
                        </li>
                    </ul>
                </li>
                <li className="font-heading font-bold sm:text-lg text-base">
                    Designed and developed by
                    <a className="text-purple"
                        href="https://github.com/juandavid015"
                        target="_blank">
                        {' @juandgr'}
                    </a>
                    <ul className='font-sans flex gap-4 fill-dark
                    text-base font-normal hover:text-purple/100 text-purple/70'>
                        <li>
                            <Link to={'https://juandgr.vercel.app/'} target="_blank"
                                className="hover:fill-purple">
                                <WebIcon className="h-[20px]" />
                            </Link>

                        </li>
                        <li>
                            <Link to={'https://github.com/juandavid015'} target="_blank"
                                className="hover:fill-purple">
                                <GithubIcon className="h-[20px]" />
                            </Link>

                        </li>
                        <li>
                            <Link to={'https://www.linkedin.com/in/juan-dgr/'} target="_blank"
                                className="hover:fill-purple">
                                <LinkedInIcon className="h-[20px]" />
                            </Link>

                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </footer>
    )
}
export default LandingFooter;