import { Task } from "../../types/types";
import CalendarTaskCard from "./CalendarTaskCard";
import CalendarTaskCardEditable from "./CalendarTaskCardEditable";
import { TasksContext } from "../../providers/TasksProvider";
import { useContext, useEffect, useState } from 'react';

type MonthTime = 'previous' | 'current' | 'next'
interface CalendarCellProps {
    dayNumber: number,
    monthTime: MonthTime,
    lastDateOfPrevMonth: number,
    firstDayWeekOfCurrentMonth: number,
    currentMonth: string,
    currentMonthIndex: number,
    presentMonth: string,
    currentYear: number,
    presentYear: number,
    presentDay: number
    tasks?: Task[]
}

const CalendarCell = (
    {
        dayNumber,
        monthTime,
        lastDateOfPrevMonth,
        firstDayWeekOfCurrentMonth,
        currentMonth,
        currentMonthIndex,
        presentMonth,
        currentYear,
        presentYear,
        presentDay,
        tasks
    }
    : CalendarCellProps) => {
    // console.log(tasks)

    const {
        // taskColumns,
        dragEnterHandler,
        // dragStartHandler,
        dragOverHandler,
        dropHandler,
        create,
        setCreate, 
    } = useContext(TasksContext);
    // console.log(currentYear, currentMonthIndex, dayNumber)
    // console.log(create.isActive)
    const [attempsToCreate, setAttemptsToCreate] = useState(0);
    const createNewTask = () => {
        setCreate({isActive: true, columnTarget: 'PENDING', itemTargetId: dayNumber + monthTime})
       
    }

    const generateDayFixed = () => {
        if(monthTime === 'previous') {
            return (lastDateOfPrevMonth - firstDayWeekOfCurrentMonth) + (dayNumber + 1)
        } else {
            return (dayNumber +1)
        }
   
    }

    const dayNumberFixed = generateDayFixed();
    // const {taskColumns: taskGeneral} = useContext(TasksContext);
    // const findIndexOfTaskWithDate = (taskId: any)=> {
    //     const result = taskGeneral.reduce((acc: Task[], column) => {
    //         const t = Object.values(column)[0] || [];
    //         acc = [...acc, ...t]
    //         return acc
    //     }, []).findIndex(task => task.id === taskId)
    //     console.log(result)
    //     return result

    // }
        
    
    useEffect(()=> {
        // 
        setAttemptsToCreate((prevAttempt) => {
            if(prevAttempt === 0) return prevAttempt +=1;
            else if(prevAttempt === 1) return prevAttempt -=1;
            return prevAttempt;
        })

    }, [create.isActive])
  
    
    // console.log('c', currentMonthIndex, dayNumberFixed)

    return (
        <div onClick={()=> attempsToCreate === 0  && createNewTask()}
        className={`font-bold h-full w-full flex flex-col gap-2 relative
        rounded-md border border-white-gray p-2
        cursor-cell ${(dayNumber === presentDay && currentMonth === presentMonth && currentYear === presentYear) && 'text-purple'}
        gr group/day hover:bg-white-gray  ${monthTime !== 'current' && 'opacity-50' }`}>
            <span className="group-hover/day:bg-white-gray 
            inline-block ">
                {
                   dayNumberFixed
                }
                
            </span>
            <div className="dropzone flex flex-col gap-1 pb-2"
             onDrop={(e: React.DragEvent) => dropHandler(e, 'PENDING', 0)} 
             onDragOver={(e:React.DragEvent)=> dragOverHandler(e, 0, 'PENDING')}
             onDragEnter={dragEnterHandler}>
                {
                    tasks?.map((taskWithDate) => {
                        
                        return (
                           
                            <CalendarTaskCard
                            task={taskWithDate}
                            key={taskWithDate.id}
                            // onDragStart={(e: React.DragEvent) => 
                            //     dragStartHandler(
                            //         e, 
                            //         taskWithDate.id, 
                            //         taskWithDate.indexPosition, 
                            //         taskWithDate,
                            //         findIndexOfTaskWithDate(taskWithDate.id),
                            //         0, 
                            //         'PENDING'
                            //     )
                            // }
                            />
                        )

                    })
                }
                
              
            </div>
            {
                    create.isActive && (create.columnTarget === 'PENDING' ) &&  (create.itemTargetId === (dayNumber + monthTime)) &&
                    <CalendarTaskCardEditable
                    status={'PENDING'}
                    toggleEdit={()=> setCreate({isActive: false, columnTarget: '', itemTargetId: ''})}
                    timeline={`${currentYear}-${currentMonthIndex +1}-${dayNumberFixed}`}
                    />
            }
            {/* <button 
            className="w-fit group-hover/day:visible invisible m-auto ">
                <AddIcon className="h-[10px]"/>
            </button> */}
        </div>
    )
}

export default CalendarCell;