import Logo from '../../assets/LOGO.png'

const LoadingScreen = () => {
    return (
        <div className="w-full h-full overflow-hidden
        flex flex-col gap-4 items-center justify-center ">
            <div className='w-[120px] h-[120px] border-t  border-gray rounded-full 
            flex flex-col items-center justify-center '>

                <img src={Logo} alt='logo' className='h-[60px] w-auto'/>
            
            
         
            </div>
            <h1 className='text-center font-base '>Loading content...</h1>
        </div>
    )
}
export default LoadingScreen;