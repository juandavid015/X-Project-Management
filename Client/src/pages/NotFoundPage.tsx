import { Link } from "react-router-dom";
import { LargeArrow, NotFoundIcon } from "../assets/icons/Icons";

const NotFoundPage = () => {
    return(
        <div className="flex flex-col gap-6 items-center justify-center w-full h-screen">
            <h1 className="font-heading text-4xl text-dark-med">
                Page not founded
            </h1>
            <NotFoundIcon className={'h-[60px] inline fill-dark-med'}/>
            <p>
                You are trying to navigate on a non-existent page.
            </p>
            <Link to={'/projects'}
            className="bg-white px-8 py-2 rounded-full flex gap-2 items-center
            text-base text-electric-blue fill-electric-blue shadow
            hover:scale-[1.01]">
                <LargeArrow className="h-[40px] rotate-180"/>
                <strong>Go back to projects</strong>
            </Link>

        </div>
    )
}
export default NotFoundPage;