

export interface UserPreview {
    expanded: boolean,
    width?: string,
    height?: string
    [key:string] : any
}
export const UserPreview = ({expanded, name, image, height, width , ...rest}: UserPreview) => {
    return (
        expanded ? 
        <div className={`relative flex-col `}  {...rest} title={name}>
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