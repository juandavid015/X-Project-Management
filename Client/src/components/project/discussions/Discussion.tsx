import { Link, useParams } from "react-router-dom";
import { ArrowCircleIcon, ChatIcon, CheckIcon, LabelIcon } from "../../../assets/icons/Icons";
import { useQuery } from "@apollo/client";
import { GET_PROJECT_DISCUSSION } from "../../../graphql/querys";
import { Discussion } from "../../../types/types";
import { handleErrorResponse } from "../../../helpers/errorHelpers";
import Loading from "../../ui/Loading";
import { UserPreview } from "../../ui/UserPreview";

const Discussion = () => {
    
    const { projectId, discussionId } = useParams();
    const { error, loading: isLoadingDiscussions, data } = useQuery(GET_PROJECT_DISCUSSION, {
        variables: {
            discussionId: discussionId
        }
    })

    if(isLoadingDiscussions) {
        return (
            <div className=" flex items-center justify-center w-full overflow-hidden">
                <Loading messagge=""/>
            </div>
        )
    }

    if (!data) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'discussions'}
        }
        handleErrorResponse(error)
    }
    if(error) {
        handleErrorResponse(error)
    }

    console.log(error, isLoadingDiscussions, data)
    const discussion: Discussion = data?.getDiscussion
    return (
        <div className="flex flex-col gap-4 font-medium max-w-[1048px]">
            <Link to={`/projects/${projectId}/discussions`} 
            className="fill-dark"
            title="Go to back">
                <ArrowCircleIcon className="h-[30px] rotate-90"/>
            </Link>
            <h2 className="font-bold text-dark text-lg">
                {discussion.title}
            </h2>
            <div className="flex flex-wrap gap-8">

                <ul className="flex gap-2">
                    <span>Subjects:</span>
                    {
                        discussion.subjects.map((subject, subjectIndex) => {
                            return (
                                <li className="flex gap-2 fill-purple"
                                key={'subj' + subjectIndex}>
                                    <span>{subject}</span>
                                    <LabelIcon className="h-[20px]"/>
                                </li>
                            )
                        })
                    }
                </ul>
                <p className="flex gap-2">
                    <span>Created by:</span>
                    <span>{discussion.createdBy.name}</span>
                </p>
            </div>
            <p className="mt-2">
                {discussion.description}
            </p>
            <div className="p-4 flex flex-col gap-4">
                <h3 className="font-bold inline-flex gap-2">
                    <span>
                        Messages
                    </span>
                
                    <span aria-hidden>
                        <ChatIcon className="h-[20px]"/>
                    </span>
                </h3>
                <div className="border-t border-white-gray pt-4
                flex flex-col gap-8">
                    {
                        discussion.chat.messages.map((message, messageIndex) => {
                            return (
                                <div className="flex gap-2 text-dark">
                                    <UserPreview 
                                    expanded={false}
                                    name={message.createdBy.name}
                                    image={message.createdBy.image || ''}
                                    />
                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold">
                                            <span>{message.createdBy?.name}</span>
                                            <span className="text-blue-bright font-bold">
                                                {' commented:'}
                                            </span>
                                        </p>
                                        <p >
                                            {message.content}
                                        </p>
                                        <div className="max-w-[300px] w-full max-h-[200px] h-full overflow-hidden">
                                            <img src={message?.attachment}
                                            className="w-full h-full object-cover rounded-md"/>
                                        </div>
                                        <div className="w-[300px] border-t border-white-gray pt-2
                                        flex gap-2 items-center">
                                            
                                            <CheckIcon className="h-[20px]"/>
                                            <span>
                                                {`(${message.likes})`}
                                            </span>
                                        </div>
                                    </div>
                                
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Discussion;