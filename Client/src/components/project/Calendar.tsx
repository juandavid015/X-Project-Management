import { handleErrorResponse } from "../../helpers/errorHelpers"

const Calendar = () => {
    const calendarData = null
    if (!calendarData) {
        //simulate error response for in-developement feature
        const error = {
            status: 404, 
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: {featureName: 'calendar'}
        }
        handleErrorResponse(error)
    }
    return (
        <div>
            Calendar
        </div>
    )
}
export default Calendar;