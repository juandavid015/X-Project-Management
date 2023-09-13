import { LoadingIcon } from "../../assets/icons/Icons";

const LoadingItem = ({height, fillColor}:{height?: string, fillColor?: string}) => {
    return (
        <div className={`w-full h-full overflow-hidden 
        flex flex-col gap-4 items-center justify-center`} >
            <LoadingIcon className={` ${height ? height:'h-[25px]'} ${fillColor ? fillColor: 'fill-purple'} animate-spin`} />
        </div>
    )
}
export default LoadingItem;