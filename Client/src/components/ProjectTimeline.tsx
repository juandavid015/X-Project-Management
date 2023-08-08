import { handleErrorResponse } from "../helpers/errorHelpers"

const ProjectTimeline = () => {
    const timelineData = null
    if (!timelineData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'timeline'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Timeline
        </div>
    )
}
export default ProjectTimeline;
