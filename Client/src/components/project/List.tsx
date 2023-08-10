import { handleErrorResponse } from "../../helpers/errorHelpers"

const List = () => {
    const listData = null
    if (!listData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'list'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            List
        </div>
    )
}
export default List;