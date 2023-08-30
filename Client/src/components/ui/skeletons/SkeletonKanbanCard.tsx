import { SkeletonBox, SkeletonUser, SkeletonLineText, SkeletonParagraph } from "./SkeletonElements";
interface SkeletonKanbanCardProps {
    withImage?: boolean
    withParagraph?: boolean
    withUser?: boolean
}
const SkeletonKanbanCard = ({ withParagraph, withImage, withUser }: SkeletonKanbanCardProps) => {
    return (
        <div className={`relative max-w-[238px] bg-gray/10 px-[16px] py-[10px] 
        shadow-white-gray shadow-md2 rounded-md 
        flex flex-col gap-2
        overflow-hidden relative isolate
        before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite_ease]
        before:bg-gradient-to-r before:from-transparent before:via-gray/20 before:to-transparent`
        }>
            {
                withImage &&
                <SkeletonBox height="h-[100px]" width="w-full" />
            }
            <div className="flex gap-2">
                <SkeletonLineText height={`h-[16px]`} width={'w-[50px]'} />
                <SkeletonLineText height={`h-[16px]`} width={'w-[50px]'} />
                <div className="absolute right-[1em]">
                    <SkeletonBox height={"h-[16px]"} width={'w-[16px]'} />
                </div>
            </div>
            {
                withParagraph &&
                <SkeletonParagraph />
            }
          
            <SkeletonLineText height={`h-[24px]`} width={'w-[70%]'} />
            
            
            {
                withUser && 
                <SkeletonUser />
            }
            
           

        </div>
    )
}
export default SkeletonKanbanCard;