import { useContext } from 'react';
import { handleErrorResponse } from "../../../helpers/errorHelpers"
import { ProjectContext } from "../../../providers/ProjectProvider";
import Loading from '../../ui/Loading';
import { useQuery } from '@apollo/client';
import { GET_PROJECT_DISCUSSIONS } from '../../../graphql/querys';
import { Discussion } from '../../../types/types';
import DiscussionCard from './DiscussionCard';
import { Outlet } from 'react-router-dom';

const ProjectDiscussions = () => {
    const { project, projectId, loading } = useContext(ProjectContext);
    const { error, loading: isLoadingDiscussions, data } = useQuery(GET_PROJECT_DISCUSSIONS, {
        variables: {
            projectId: projectId
        }
    })
    if(loading) {
        return (
            <div className=" flex items-center justify-center w-full overflow-hidden">
                <Loading messagge=""/>
            </div>
        )
    }

    if (!project) {
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
    const discussions: Discussion[] = data?.getDiscussions ?? []
    console.log(error, isLoadingDiscussions, data)
    return (
        <div className='flex flex-col gap-4 max-w-[1048px]'>
            <ul className='flex flex-col gap-8'>
                {
                    discussions?.map((discussion, discussionIndex) => {
                        return (
                            <DiscussionCard 
                            discussion={discussion} 
                            key={'disc' + discussionIndex}
                            />
                        )
                    })
                }
            </ul>
            <Outlet />
        </div>
    )
}
export default ProjectDiscussions;