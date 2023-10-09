import ListColumnHeader from "../../list/ListColumnHeader";
import SkeletonListCard from "./SkeletonListCard";

const SkeletonList = () => {
    const columns = [
        {
            name: 'PENDING',
            color: 'rgba(66, 0, 255, 0.2)'
        },
        {
            name: 'IN_PROGRESS',
            color: 'rgba(66, 0, 255, 0.6)'
        },
        {
            name: 'REVIEW',
            color: 'rgba(66, 0, 255, 0.7)'
        },
        {
            name: 'COMPLETED',
            color: 'rgba(66, 0, 255, 1)'
        },
    ];
    return (
        <div className={`max-w-[1048px] flex flex-col gap-4 text-dark-med `}>
            
            <div className="flex flex-col gap-4 border-b border-white-gray pb-2">
                <ListColumnHeader
                status={columns[0]}
                expandedColumn={true}
                expandColumn={()=> null}
                createNewTask={()=> null}
                />
                <div className="flex flex-col gap-2 pb-[44px]">
                    <SkeletonListCard />
                    <SkeletonListCard />
                </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-white-gray pb-2">
                <ListColumnHeader
                status={columns[1]}
                expandedColumn={true}
                expandColumn={()=> null}
                createNewTask={()=> null}
                />
                <div className="flex flex-col gap-2 pb-[44px]">
                    <SkeletonListCard />
                </div>
            </div>

            <div className="flex flex-col gap-4 border-b border-white-gray pb-2">
                <ListColumnHeader
                status={columns[2]}
                expandedColumn={true}
                expandColumn={()=> null}
                createNewTask={()=> null}
                />
                <div className="flex flex-col gap-2 pb-[44px]">
                    <SkeletonListCard />
                </div>
            </div>
            
            <div className="flex flex-col gap-4 border-b border-white-gray pb-2">
                <ListColumnHeader
                status={columns[3]}
                expandedColumn={true}
                expandColumn={()=> null}
                createNewTask={()=> null}
                />
                <div className="flex flex-col gap-2 pb-[44px]">
        

                </div>
            </div>
            
        </div>
    )
}
export default SkeletonList;