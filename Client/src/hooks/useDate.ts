import { useState } from 'react';

const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const useDate = () => {
    // the "date" will be the start reference point  to get all the date values
    const [date, setDate] = useState(new Date());

    // the year of the date with four digits/full format
    const [currentYear, setCurrentYear] = useState(date.getFullYear());

    // the month of the present date, parsed to string with long format
    const [currentMonthIndex, setCurrentMonthIndex] = useState(date.getMonth())
    const [currentMonth, setCurrentMonth] = useState(months[currentMonthIndex])


    // Get the total days of the present month
    // let currentMonthIndex = date.getMonth();
    // In the new Date(yyy, mm, dd) where on "mm" is summed 1 and "dd" is 0 because 
    // that's how works and commented on docs (date time string format): 
    //"When a segment overflows or underflows its expected range,
    // it usually "carries over to" or "borrows from" the higher segment."
    const currentMonthDays = new Date(currentYear, currentMonthIndex + 1, 0).getDate();

    // the day number of the present date
    const presentDate = new Date();
    const presentDay = presentDate.getDate();
    const presentMonth = months[presentDate.getMonth()];
    const presentYear = presentDate.getFullYear();

    // Get the first day week number of the current month
    // This helps to know how many days were before reaching the first day of the present month
    // where 0 is the first day (sunday)
    const firstDayWeekOfCurrentMonth = new Date(currentYear, currentMonthIndex, 1).getDay(); // return 0 - 6, where 0 is sunday

    // Get the number of days or last date of the previous month
    const lastDateOfPrevMonth = new Date(currentYear, currentMonthIndex, 0).getDate();

    // Get the firt day week number of the next month
    const firstDayWeekOfNextMonth = new Date(currentYear, currentMonthIndex + 1, 1).getDay();


    const changeDate = (action: 'prev' | 'next') => {

        let newMonthIndex = action === 'prev' ? (currentMonthIndex - 1) : (currentMonthIndex + 1);

        if (newMonthIndex > 11 || newMonthIndex < 0) {
            const newDate = new Date(currentYear, newMonthIndex) // new Data(currentYear, -1 or 12), as both are invalid index, the date api convert to one date below or after
            setDate(newDate)
            newMonthIndex = newDate.getMonth();
            setCurrentYear(newDate.getFullYear());
        }
        setCurrentMonthIndex(newMonthIndex)
        setCurrentMonth(months[newMonthIndex])
    }

    return {
        weekDays,
        months,
        date,
        currentMonth,
        currentMonthIndex,
        currentMonthDays,
        currentYear,
        firstDayWeekOfCurrentMonth,
        firstDayWeekOfNextMonth,
        lastDateOfPrevMonth,
        presentDate,
        presentDay,
        presentMonth,
        presentYear,
        changeDate
    }
    // console.log(currentMonth, currentYear, currentMonthDays, presentDay, firstDayWeekOfCurrentMonth, firstDayWeekOfNextMonth)
}