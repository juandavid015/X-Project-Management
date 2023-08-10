import { handleErrorResponse } from "../../helpers/errorHelpers"

const ProjectFiles = () => {
    const filesData = null
    if (!filesData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'files'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Files
        </div>
    )
}
export default ProjectFiles;