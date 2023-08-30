interface SkeletonProjectListProps {
    totalItems: number
}
const SkeletonProjectList = ({totalItems}: SkeletonProjectListProps) => {
    
    return (
        <div className="flex gap-4 flex-wrap">
            {
                Array.from({length: totalItems}, (_, i)=> {
                    return (
                        <div role="status" key={i} 
                        className="max-w-[270px] w-full p-8 min-h-[206px] gap-4
                        rounded flex flex-col bg-gray/10
                        overflow-hidden relative isolate
                        before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite_ease]
                        before:bg-gradient-to-r before:from-transparent before:via-gray/20 before:to-transparent
                        "
                        > 
                    
                            <div className="h-3 bg-dark-med/[.06] rounded-full w-48 mt-2"></div>
                            <div className="h-2 bg-dark-med/[.06] rounded-full w-24 mt-1"></div>

                            <div className="flex flex-col gap-2">
                                <div className="h-2 bg-dark-med/[.06] rounded-full  "></div>
                                <div className="h-2 bg-dark-med/[.06] rounded-full  "></div>
                                <div className="h-2 bg-dark-med/[.06] rounded-full w-40"></div>
                            </div>
                            <div className="rounded-full h-[30px] w-[30px] bg-dark-med/[.06]">
                                
                            </div>
                           
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SkeletonProjectList;