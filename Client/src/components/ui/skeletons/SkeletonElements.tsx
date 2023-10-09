
export const SkeletonUser = ({height, width}: {height?: string, width?: string}) => {

    return (
        <div className={`${height} ${width} w-[20px] h-[20px] rounded-full bg-dark-med/[.06] rounded`}>

        </div>
    )
}

export const SkeletonLineText = ({height, width}: {height?: string, width?: string}) => {
    return (
        <div className={`min-h-[16px] w-[50px] ${height} ${width}
        bg-dark-med/[.06] rounded`}>

        </div>
    )
}

export const SkeletonParagraph = ({height, width}: {height?: string, width?: string}) => {
    return (
        <div className={`${height} ${width} w-full
        flex flex-col gap-1`
        }>
            <div className="w-full h-[16px] bg-dark-med/[.06] rounded"></div>
            <div className="w-full h-[16px] bg-dark-med/[.06] rounded "></div>
            <div className="w-[80%] h-[16px] bg-dark-med/[.06] rounded"></div>
        </div>
    )
}

export const SkeletonBox = ({height, width}: {height: string, width: string}) => {
    return (
        <div className={`${height} ${width}
        bg-dark-med/[.06] rounded`}>

        </div>
    )
}
