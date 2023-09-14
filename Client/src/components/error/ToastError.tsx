import toast, { Toast } from "react-hot-toast"
import { ErrorWarningIcon } from "../../assets/icons/Icons"

interface ToastErrorNotficationProps {
    message: string,
    t: Toast
}
const ToastErrorNotfication= ({message, t}: ToastErrorNotficationProps)=> {

    setTimeout(()=> {
        toast.dismiss(t.id)
    }, t.duration) 

    return (
        <div className='bg-white rounded-md px-4 py-3 shadow-white-gray shadow-md2
        flex gap-2 items-center'>

            <div>
                <ErrorWarningIcon className='h-[20px] fill-red-warning' />
            </div>

            <div className='max-w-[350px] flex gap-4 items-center'>
                <span className='text-red-warning font-medium'>
                    Error
                </span>
                <div>
                    <p className='font-bold'>
                        Action not completed:
                    </p>
                    <p className='text-dark-med'>
                        {message}
                    </p>
                </div>
            </div>

        </div>
    )
}

export default ToastErrorNotfication;