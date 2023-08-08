import { handleErrorResponse } from "../helpers/errorHelpers"

const Spaces = () => {
    const spaces = null
    if (!spaces) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'spaces'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Spaces
        </div>
    )
}

export default Spaces;