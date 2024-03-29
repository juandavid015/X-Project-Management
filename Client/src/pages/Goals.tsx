import { handleErrorResponse } from "../helpers/errorHelpers";

const Goals = () => {
    const goals = null
    if (!goals) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'goals'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Goals
        </div>
    )
};

export default Goals;