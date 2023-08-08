import { handleErrorResponse } from "../helpers/errorHelpers"

const Gantt = () => {
    const ganttData = null
    if (!ganttData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'gantt'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Gantt
        </div>
    )
}
export default Gantt;