import { Link } from "react-router-dom";
import { LargeArrow } from "../../assets/icons/Icons";

interface ButtonNavigationProps {
    text: string
    link: string
}
const ButtonNavigation = ({text, link}: ButtonNavigationProps) => {
    return (
        <Link to={link}
                className="bg-white px-8 py-2 rounded-full flex gap-2 items-center w-fit self-center
                text-base text-blue-bright fill-blue-bright shadow
                hover:scale-[1.01]">
                    
                    <strong>{text}</strong>
                    <LargeArrow className="h-[40px]"/>
        </Link>
    )
}
export default ButtonNavigation;