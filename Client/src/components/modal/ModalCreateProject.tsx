import { useRef } from 'react'
import { useClickOutside } from '../../hooks/useClickOutside'
import { RemoveCircleIcon } from '../../assets/icons/Icons'

interface ModalCreateProjectProps {
    children: React.ReactNode
    closeModal: () => void,
    openModal?: () => void,
    isActive?: boolean
}
const ModalCreateProject = ({closeModal, children}: ModalCreateProjectProps) => {
    const divRef = useRef<HTMLDivElement>(null)

    useClickOutside({elementRef: divRef, onClickOutside: closeModal})

    return (
        <div className="w-full h-screen bg-white/70 flex justify-center items-center
        fixed top-0 left-0" >
            <div ref={divRef}
            className='max-w-[400px] w-full min-h-[300px] relative'>
                <button onClick={closeModal} 
                className='absolute right-[1em] hover:scale-105 fill-dark'>
                    <RemoveCircleIcon className='h-[30px]'/>
                </button>
                {children}
            </div>
        </div>
    )
}
export default ModalCreateProject;
