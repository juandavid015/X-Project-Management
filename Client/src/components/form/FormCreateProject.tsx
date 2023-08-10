import { useState } from 'react';
import FieldProjectTitle from './FieldProjectTitle';
import FieldProjectDescription from './FieldProjectDescription';
import FieldProjectLabel from './FieldProjectLabel';
import { LargeArrow } from '../../assets/icons/Icons';
import NotificationCreateProject from './NotificationCreateProject';
import { useSaveEntity } from '../../hooks/useSaveEntity';
import { CREATE_PROJECT } from '../../graphql/mutations';
import { GET_PROJECTS } from '../../graphql/querys';

interface ProjectState { 
    userId: string,
    title: string,
    description: string,
    label: string
}
const FormCreateProject = () => {
    const initialState = {
        userId: "64c5cfe02f64b23b4eb88917",
        title: "",
        description: "",
        label: ""
    }
    const maxSteps = 3 || Object.values(initialState).length;
    const [formState, setFormState] = useState<ProjectState>(initialState)
    const [currentStep, setCurrentStep] = useState(1);
    const [finished, setFinished] = useState(false);

    const nextStep = () => {
        if(currentStep === maxSteps) return
        else  setCurrentStep((prevStep) => prevStep + 1)
    }
    const prevStep = () => {
        if(currentStep <= 1) return 
        else setCurrentStep((prevStep) => prevStep - 1)
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,) => {
        const {name, value} = e.target
        setFormState((prevState) => { 
            return {...prevState, [name]: value}
        })
    }
    const saveEntity = useSaveEntity(CREATE_PROJECT, GET_PROJECTS)

    const createProject = async () => {
        try {
            await saveEntity(formState)
            setFinished(true)
        } catch(err) {
            console.log(err)
        }
     
    }
    return (
        <form className='bg-white w-full h-full flex flex-col justify-between items-between text-base font-sans'>
            {
                currentStep === 1 && !finished? 
                <FieldProjectTitle 
                handleInputChange={handleInputChange} 
                projectFormTitle={formState.title}
                />:
                currentStep === 2 && !finished? 
                <FieldProjectDescription 
                handleInputChange={handleInputChange} 
                projectFormDescription={formState.description}
                />:
                currentStep === 3 && !finished? 
                <FieldProjectLabel
                handleInputChange={handleInputChange} 
                projectFormLabel={formState.label}
                />:
                currentStep === 3 && finished ? 
                <NotificationCreateProject />:
                null 
            }
            <div className='flex justify-between'>
                {   
                    !finished && currentStep > 1 &&
                    <button type='button' onClick={prevStep}
                    className='mr-auto flex items-center gap-2 text-base font-bold
                    bg-white px-8 py-2 rounded-full text-dark/70 hover:text-dark hover:fill-dark fill-dark/70'>
                        <LargeArrow className='w-[40px] rotate-180'/>
                        <span>
                            Back
                        </span>
                    </button>
                }
                {
                    !finished && currentStep < maxSteps &&
                    <button type='button' onClick={nextStep}
                    className='ml-auto flex items-center gap-2 text-base font-bold
                    bg-electric-blue px-8 py-2 rounded-full text-white/70 fill-white/70 hover:fill-white hover:text-white'>
                        <span>
                            Continue
                        </span>
                        <LargeArrow className='w-[40px]'/>
                    </button>
                }
                {
                    !finished && currentStep === maxSteps &&
                    <button type='button' onClick={createProject}
                    className='ml-auto flex items-center gap-2 text-base font-bold
                    bg-electric-blue px-8 py-2 rounded-full text-white/70 fill-white/70 hover:fill-white hover:text-white'>
                        <span>
                            Finish
                        </span>
                        <LargeArrow className='w-[40px]'/>
                    </button>
                }
                {
                    finished &&
                    <button type='button' 
                    className='ml-auto flex items-center gap-2 text-base font-bold
                    bg-electric-blue px-8 py-4 rounded-full text-white/70 fill-white/70 hover:fill-white hover:text-white'>
                        <span>
                            Close
                        </span>
                    </button>
                }
            </div>
        </form>
    )
}

export default FormCreateProject;