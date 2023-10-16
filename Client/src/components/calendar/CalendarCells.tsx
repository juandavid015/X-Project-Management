import { TasksContext } from "../../providers/TasksProvider";
import { Task } from "../../types/types";
import CalendarCell from "./CalendarCell";
import { useContext } from 'react';

interface CalendarCellsProps {
    lastDateOfPrevMonth: number,
    firstDayWeekOfCurrentMonth: number,
    firstDayWeekOfNextMonth: number
    currentMonth: string,
    currentMonthIndex: number,
    currentMonthNumberOfDays: number
    presentMonth: string,
    currentYear: number,
    presentYear: number,
    presentDay: number
}

const CalendarCells = (  {
    lastDateOfPrevMonth,
    firstDayWeekOfCurrentMonth,
    firstDayWeekOfNextMonth,
    currentMonth,
    currentMonthIndex,
    currentMonthNumberOfDays,
    presentMonth,
    currentYear,
    presentYear,
    presentDay
}: CalendarCellsProps) => {

    const { taskColumns } = useContext(TasksContext)
    const tasksWithDates = taskColumns.reduce((acc: Task[], column) => {
        const t = Object.values(column)[0] || [];
        acc = [...acc, ...t]
        return acc
    }, []).filter(task => task.timeline)

    const getTasksMatchByDate = (tasksWithDates: Task[], day: number, currentMonthIndex: number, currentYear: number) => {
        return tasksWithDates.filter(taskWithDate => {
            const dateTask = new Date(taskWithDate.timeline);
            const dateTaskMonth = dateTask.getMonth();
            const dateTaskYear = dateTask.getFullYear();
            const dateTaskDay = dateTask.getDate()
            // console.log('d', day, currentMonthIndex, dateTaskMonth)
            if(dateTaskYear === currentYear && dateTaskMonth === currentMonthIndex  && dateTaskDay === day) {
                // console.log('MATCH!')
                // console.log(dateTaskYear, dateTaskMonth, dateTaskDay, )
                return taskWithDate
            } 
        })
    }
    // console.log(tasksWithDates)
    return (
        <div className="grid grid-cols-7 h-full gap-1">
                {/* This section represents the first days of the previous month before reach the first day the current month */}
                {
                    Array.from({ length: firstDayWeekOfCurrentMonth }, (_, dayIndex) => {
                        return (
                            <CalendarCell
                            key={dayIndex + 'prev'}
                            dayNumber={dayIndex}
                            monthTime="previous"
                            lastDateOfPrevMonth={lastDateOfPrevMonth}
                            firstDayWeekOfCurrentMonth={firstDayWeekOfCurrentMonth}
                            currentMonth={currentMonth}
                            currentMonthIndex={currentMonthIndex-1}
                            presentMonth={presentMonth}
                            currentYear={currentYear}
                            presentYear={presentYear}
                            presentDay={presentDay}
                            tasks={getTasksMatchByDate(tasksWithDates,  (lastDateOfPrevMonth - firstDayWeekOfCurrentMonth) + (dayIndex ), currentMonthIndex-1, currentYear)}
                            />
                        )
                    })
                }
                {/* This section represents the total days of the current month */}
                {
                    Array.from({ length: currentMonthNumberOfDays }, (_, dayIndex) => {
                        return (
                            <CalendarCell
                            key={dayIndex + 'curr'}
                            dayNumber={dayIndex}
                            monthTime="current"
                            lastDateOfPrevMonth={lastDateOfPrevMonth}
                            firstDayWeekOfCurrentMonth={firstDayWeekOfCurrentMonth}
                            currentMonth={currentMonth}
                            currentMonthIndex={currentMonthIndex}
                            presentMonth={presentMonth}
                            currentYear={currentYear}
                            presentYear={presentYear}
                            presentDay={presentDay}
                            tasks={getTasksMatchByDate(tasksWithDates, dayIndex +1 , currentMonthIndex, currentYear)}
                           />
                        )
                    })
                }
                {/* This section represents the first days of next month to complete the whole week of calendar*/}
                {
                    Array.from({ length: 7 - firstDayWeekOfNextMonth }, (_, dayIndex) => {
                        return (
                            <CalendarCell
                            key={dayIndex + 'next'}
                            dayNumber={dayIndex}
                            monthTime="next"
                            lastDateOfPrevMonth={lastDateOfPrevMonth}
                            firstDayWeekOfCurrentMonth={firstDayWeekOfCurrentMonth}
                            currentMonth={currentMonth}
                            currentMonthIndex={currentMonthIndex +1}
                            presentMonth={presentMonth}
                            currentYear={currentYear}
                            presentYear={presentYear}
                            presentDay={presentDay}
                            tasks={getTasksMatchByDate(tasksWithDates, dayIndex +1, currentMonthIndex +1, currentYear)}
                           />
                        )
                    })
                }
            </div>
    )
}
export default CalendarCells;