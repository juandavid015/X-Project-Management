import { handleErrorResponse } from "../helpers/errorHelpers";

const Notifications = () => {
    const notifications = null
    if (!notifications) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'notifications'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Notifications
        </div>
    )
}

export default Notifications;