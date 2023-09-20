import Logo from '../../assets/LOGO.png'
import { LoadingIcon } from '../../assets/icons/Icons';

interface LoadingProps {
    messagge: string
}
const Loading = ({messagge}:LoadingProps) => {
    return (
        <div className="w-full h-full overflow-hidden
        flex flex-col gap-4 items-center justify-center ">
            <img src={Logo} alt='logo' className='h-[60px] w-auto'/>
            <h1 className='font-bold'>Loading content...</h1>
            <p className='font text-dark-med '>
                {messagge}
            </p>
            <LoadingIcon className={'h-[30px] fill-purple animate-spin'} />
        </div>
    )
}
export default Loading;