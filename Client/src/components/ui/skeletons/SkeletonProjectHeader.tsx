import { SkeletonLineText, SkeletonUser } from "./SkeletonElements";

const SkeletonProjectHeader = () => {
    return (
        <div className="max-w-[1048px] flex items-center justify-between font-medium text-dark-md">
            <div className="font-heading inline pr-4 text-xl font-bold 
            border-r border-gray">
                <SkeletonLineText />
            </div>
 
            <div>
                <div className="text-dark-purple-md">
                    Views
                </div>
                <div className="flex gap-2 mt-1">
                    <SkeletonLineText />
                    <SkeletonLineText />
                    <SkeletonLineText />
                    <SkeletonLineText />
                </div>
            </div>
            <SkeletonUser />
           
   
        </div>
    )
}
export default SkeletonProjectHeader;