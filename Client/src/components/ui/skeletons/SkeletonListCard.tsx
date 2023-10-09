import { SkeletonBox, SkeletonUser } from "./SkeletonElements";

const SkeletonListCard = () => {
    return (
        <div className="relative rounded-md shadow-white-gray shadow-md2 
        px-4 py-3 flex items-center gap-4 group 
        overflow-hidden relative isolate bg-gray/10
        before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite_ease]
        before:bg-gradient-to-r before:from-transparent before:via-gray/20 before:to-transparent">
            <SkeletonUser />
            <SkeletonBox height="h-[20px]" width="w-[60px]"/>
            <SkeletonBox height="h-[20px]" width="w-[60px]"/>
            <SkeletonBox height="h-[20px]" width="w-[100px]"/>
            <SkeletonBox height="h-[20px]" width="w-[200px]"/>
            <SkeletonUser />
            <SkeletonBox height="h-[20px]" width="w-[20px]"/>
            <SkeletonBox height="h-[20px]" width="w-[50px]"/>
        </div>
    )
}
export default SkeletonListCard;