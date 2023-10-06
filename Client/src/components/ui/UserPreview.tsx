

export type UserPreviewProps = {
    expanded: boolean,
    width?: string,
    height?: string,
    name: string,
    image: string,
    [key:string]: unknown
} 
export const UserPreview = ({expanded, name, image, height, width , ...rest}: UserPreviewProps) => {
    return (
        expanded ? 
        <div className={`relative flex gap-2 items-center `}  {...rest} title={name}>
            <img src={image} alt={'profile picture'} className={`object-cover rounded-full
            ${height ? height: 'h-[30px]'} ${width ? width : 'w-[30px]'}`}/>
            <span className="">{name}</span>
        </div>:

        <div className={`${height} ${width}`}{...rest} title={name}>
            <img src={image} alt={'profile picture'} 
            className={`object-cover rounded-full
            ${height ? height: 'h-[30px]'} ${width ? width : 'w-[30px]'}`}/>
            
        </div>
    )
}