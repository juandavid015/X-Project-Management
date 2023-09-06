import { LoadingIcon } from "../../assets/icons/Icons";

const LoadingItem = ({height}:{height?: string}) => {
    return (
        <div className={`w-full h-full overflow-hidden
        flex flex-col gap-4 items-center justify-center`} >
            <LoadingIcon className={` ${height ? height: 'h-[25px]'} fill-purple animate-spin`} />
        </div>
    )
}
export default LoadingItem;