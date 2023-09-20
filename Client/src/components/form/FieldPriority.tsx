import { ChangeEvent,  useRef, useState } from "react"
import { EqualIcon, LowLeftIcon, PriorityIcon } from "../../assets/icons/Icons";
import { useClickOutside } from "../../hooks/useClickOutside";
import { Task } from "../../types/types";

interface Props {
    handleInputChange: (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        propertyName: keyof Task
      ) => void,
    valueSelected: string | undefined,
    [key:string]: unknown,
}

const priorities = ['LOW', 'MODERATE', 'HIGH'] // make this not be hardcoded
export const FieldPriority = ({handleInputChange, valueSelected, ...rest}:Props) => {

    const containerRef = useRef<HTMLDivElement>(null)
    const [ expanded, setExpanded ] = useState(false);


    const handleClick = () => {
        // console.log(expanded)
        setExpanded(!expanded);
    }
  
    useClickOutside({elementRef: containerRef, onClickOutside: () => setExpanded(false)})

    
    return (
        <div className="relative z-10" {...rest}>
            <button onClick={handleClick} title="Set priority"
            className="w-fit flex items-center gap-1 fill-gray text-gray font-medium hover:fill-dark hover:font-bold hover:text-dark hover:scale-y-[1.03]">
                {
                    valueSelected === 'LOW' ?     
                    <LowLeftIcon className="h-[20px] w-[20px] fill-yellow-gold" />:
                    valueSelected === 'HIGH' ? 
                    <LowLeftIcon className="h-[20px] w-[20px] fill-red-warning rotate-180" />:
                    valueSelected === 'MODERATE' ? 
                    <EqualIcon className="h-[20px] w-[20px] fill-blue-bright"/>:
                    <PriorityIcon className="h-[18px] w-[18px]" />

                }
                <span>+ Set priority</span>
            </button>
            {
                expanded && 
                <div className="bg-white shadow-gray shadow-md2 rounded-md p-4
                flex flex-col gap-2 absolute top-[calc(100%+.5rem)]" ref={containerRef}>
                    {
                        priorities?.map((priority, index) => {
                            return (
                                <label htmlFor={priority} key={index}
                                className={`flex gap-1 items-center relative cursor-pointer
                                ${valueSelected === 'LOW' && priority === 'LOW' ? 'text-yellow-gold fill-yellow-gold':
                                valueSelected === 'MODERATE'  && priority === 'MODERATE' ? 'text-blue-bright fill-blue-bright'
                                : valueSelected === 'HIGH' && priority === 'HIGH' ? 'text-red-warning fill-red-warning':
                                'text-gray fill-gray'}`}>

                                    <input type="radio" id={priority} name={'priority'} value={priority}
                                    className="absolute w-[0px] h-[0px]" onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>}/> 
                                    {
                                        priority === 'LOW' ?     
                                        <LowLeftIcon className={`h-[20px] w-[20px] }`} />:
                                        priority === 'HIGH' ? 
                                        <LowLeftIcon className="h-[20px] w-[20px] rotate-180" />:

                                        <EqualIcon className="h-[20px] w-[20px] "/>
                                    }
                                    <span className={`'}
                                    font-bold capitalize`}>
                                        {priority}
                                    </span>

                                </label>
                            )
                        })
                    }
                </div>
            }
            
        </div>
    )
}