

export interface UserPreview {
    expanded: boolean,
    [key:string] : any
}
export const UserPreview = ({expanded, name, image, ...rest}: UserPreview) => {
    return (
        expanded ? 
        <div className="relative" {...rest} title={name}>
            <img src={image} alt={'profile picture'} />
            <span className="">{name}</span>
        </div>:

        <div {...rest} title={name}>
            <img src={image} alt={'profile picture'} 
            className="object-cover h-full w-full"/>
            
        </div>
    )
}