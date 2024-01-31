import { Link } from "react-router-dom";
import { LabelIcon } from "../../../assets/icons/Icons";
import { Discussion } from "../../../types/types";
import { Members } from "../../ui/Members";

const DiscussionCard = ({discussion} : { discussion: Discussion })=> {
    return (
        <li className='p-8 w-fit list-none 
        rounded-md w-full bg-white flex flex-col gap-2'
        >
            <Link to={discussion.id}>
                <h3 className='font-bold text-base text-dark underline underline-offset-2'>
                    {discussion.title}
                </h3>
            </Link>
            <p>
                {discussion.description}
            </p>
            <ul className='flex gap-2'>
                {
                    discussion?.subjects?.map((subject, subjectIndex) => {
                        return (
                            <li className='flex gap-2 mt-2'
                            key={'subj' + subjectIndex}
                            >
                                <span>
                                    {subject}
                                </span>
                                <LabelIcon className='h-[20px] fill-purple'/>
                            </li>
                        )
                    })
                }
            </ul>
            <Members
            height='h-[30px]'
            width='h-[30px]'
            members={discussion.members}

            />
        </li>
    )
}
export default DiscussionCard;