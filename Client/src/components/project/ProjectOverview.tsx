import { handleErrorResponse } from "../../helpers/errorHelpers"

const ProjectOverview = () => {
    const overviewData = null
    if (!overviewData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'overview'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Overview
        </div>
    )
}
export default ProjectOverview;