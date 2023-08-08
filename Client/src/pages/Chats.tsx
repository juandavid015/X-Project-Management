import { handleErrorResponse } from "../helpers/errorHelpers";

const Chats = () => {
    const chats = null
    if (!chats) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'chats'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Chats
        </div>
    )
};

export default Chats;