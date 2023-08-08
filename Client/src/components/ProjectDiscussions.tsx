import { handleErrorResponse } from "../helpers/errorHelpers"

const ProjectDiscussions = () => {
    const discussionsData = null
    if (!discussionsData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'discussions'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Discussions
        </div>
    )
}
export default ProjectDiscussions;