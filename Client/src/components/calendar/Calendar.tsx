import { useContext} from "react";
import { handleErrorResponse } from "../../helpers/errorHelpers"
import Loading from "../ui/Loading";
import { ProjectContext } from "../../providers/ProjectProvider";
import { ArrowCircleIcon } from "../../assets/icons/Icons";
import { useDate } from "../../hooks/useDate";
import { TasksContext } from "../../providers/TasksProvider";
import CalendarCells from "./CalendarCells";


const Calendar = () => {

    const { project } = useContext(ProjectContext);

    const {

        weekDays,
        currentMonth,
        currentMonthDays,
        currentMonthIndex,
        currentYear,
        firstDayWeekOfCurrentMonth,
        firstDayWeekOfNextMonth,
        lastDateOfPrevMonth,
        presentDay,
        presentMonth,
        presentYear,
        changeDate,

    } = useDate();

    const {
        // projectStatus,
        error,
        isLoadingTasks,
    } = useContext(TasksContext);

    if (isLoadingTasks) {
        return <div className=" flex items-center justify-center w-full overflow-hidden"><Loading messagge="" /></div>
    }

    if (!project) {
        //simulate error response for in-developement feature
        const error = {
            status: 404,
            statusText: 'Service unavailable',
            message: 'is an in-developement feature and will be released soon in upcoming updates.',
            data: { featureName: 'calendar' }
        }
        handleErrorResponse(error)
    }
    if (error) {    
        handleErrorResponse(error);
    }

    return (
        <div className="max-w-screen bg-white p-4 min-h-screen h-full
        shadow-white-gray shadow-md2 rounded-md
        flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                {/* this could be in tag time and have a propert date value */}
                <button className="fill-dark-med hover:fill-dark"
                    onClick={() => changeDate('prev')}>
                    <ArrowCircleIcon className="h-[20px] rotate-90" />

                </button>
                <h2 className="text-base font-bold">
                    {currentMonth} {currentYear}
                </h2>
                <button className="fill-dark-med hover:fill-dark"
                    onClick={() => changeDate('next')}>
                    <ArrowCircleIcon className="h-[20px] -rotate-90" />
                </button>
            </div>
            <ul className="flex gap-2">
                {
                    weekDays.map((day, dayIndex) => {
                        return (
                            <li key={dayIndex}
                                className="flex-1 text-purple font-bold">
                                {day}
                            </li>
                        )
                    })
                }

            </ul>
            <CalendarCells
            lastDateOfPrevMonth={lastDateOfPrevMonth}
            firstDayWeekOfCurrentMonth={firstDayWeekOfCurrentMonth}
            firstDayWeekOfNextMonth={firstDayWeekOfNextMonth}
            currentMonthNumberOfDays={currentMonthDays}
            currentMonth={currentMonth}
            currentMonthIndex={currentMonthIndex}
            presentMonth={presentMonth}
            currentYear={currentYear}
            presentYear={presentYear}
            presentDay={presentDay} 
            />
        </div>
    )
}
export default Calendar;