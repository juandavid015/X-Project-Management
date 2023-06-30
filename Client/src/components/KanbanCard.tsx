
import { DocumentIcon, EditIcon, EqualIcon, LabelIcon, LowLeftIcon, MessageIcon } from "../assets/icons/Icons"
import { Label, Task } from "../types/types"
import { Members } from "./Members"

interface Props extends Task {
    create: boolean, // not goes here
    onEdit?: () => void
}
export const membersSample = [
    {
        name: 'Juan',
        image: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Davida',
        image: 'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Luef',
        image: 'https://images.pexels.com/photos/1547971/pexels-photo-1547971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Schvotskovy',
        image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
        name: 'Rina',
        image: 'https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    
    //some more rested...
]
export const KanbanCard = ({create, onEdit, ...task}: Props) => {
    let {title, description, labels, priority, timeline, members} = task
    let timelineString = new Date(timeline || '');
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    let formattedTimeline = timeline && timelineString.toLocaleDateString(undefined, options as Intl.DateTimeFormatOptions);
    return (
        <div className="bg-white shadow-white-gray shadow-md2 rounded-md px-[16px] py-[10px]
        flex flex-col gap-1 relative group break-words">
            <button onClick={onEdit}
            className="absolute right-0 pr-4 group-hover:block hidden w-fit">
                <EditIcon className="fill-white-gray h-[20px] cursor-pointer"/>
            </button>
            <div
            className="flex flex-wrap gap-2">
                {
                    labels?.map((label: Label, index: number) => {
                        return (
                            <p key={index}
                            className="flex items-center gap-1 font-bold">
                                <LabelIcon className="h-[20px] fill-dark" />
                                <span style={{color: label.color}}>{label.name}</span>
                            </p>
                        )
                    } )
                }
            </div>
           
            <h2 className="text-md font-bold">
                {title}
            </h2>
              
            <p>
                {description}
            </p>
            <p className="text-gray">
                { formattedTimeline }
            </p>
            <Members
            height="h-[20px]"
            width="w-[20px]"
            members={members} />
            
                
            {
                priority && 
                <p title={priority === "LOW" ? 'Low priority': priority === 'HIGH' ? 'High Priority': priority === 'MODERATE' ? 'Moderate priority': ''}
                className="inline w-fit">
                {
                        priority === 'LOW' ?     
                        <LowLeftIcon className={`h-[20px] w-[20px] fill-yellow-gold`} />:
                        priority === 'HIGH' ? 
                        <LowLeftIcon className="h-[20px] w-[20px] fill-red-warning rotate-180" />:
                        priority === 'MODERATE' ?
                        <EqualIcon className="h-[20px] w-[20px] "/>:
                        ''
                }
            </p>
            }
             
            <div className="border-t border-white-gray pt-2 w-full flex items-center justify-evenly 
            hidden group-hover:flex ">
                <button className="w-fit fill-dark-med hover:fill-dark">
                    <MessageIcon className="h-[20px] w-[20px]" />
                </button>
                <button className="w-fit fill-dark-med hover:fill-dark">
                    <DocumentIcon className="h-[18px] w-[20px]" />
                </button>

            </div>
        
        
      
        </div>
    )
}