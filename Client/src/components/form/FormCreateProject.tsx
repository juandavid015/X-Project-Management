import { useState } from 'react';
import FieldProjectTitle from './FieldProjectTitle';
import FieldProjectDescription from './FieldProjectDescription';
import FieldProjectLabel from './FieldProjectLabel';
import { LargeArrow } from '../../assets/icons/Icons';
import NotificationCreateProject from './NotificationCreateProject';
import { useSaveEntity } from '../../hooks/useSaveEntity';
import { CREATE_PROJECT } from '../../graphql/mutations';
import { GET_PROJECTS } from '../../graphql/querys';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingItem from '../ui/LoadingItem';
import { useValidate } from '../../hooks/useValidate';


interface ProjectState { 
    userId: string,
    title: string,
    description: string,
    label: string
}

type FormResponse = {
    success: { [key: string]: unknown }| null
    error: unknown | null
}

const FormCreateProject = () => {
    
    const {user} = useAuth0();
    const userId = user && user[`app_metadata`].id;
    const initialState = {
        userId: userId || '',
        title: "",
        description: "",
        label: ""
    }
    const maxSteps = 3 || Object.values(initialState).length;
    const [formState, setFormState] = useState<ProjectState>(initialState)
    const [currentStep, setCurrentStep] = useState(1);
    const steps = [
        {
            number: 1,
            name: 'title'
        },
        {
            number: 2,
            name: 'description'
        },
        
        {
            number: 3,
            name: 'label'
        },
    ]
    const [finished, setFinished] = useState(false);

    const [formResponse, setFormResponse] = useState<FormResponse>({
        success: null,
        error: null
    })

    const nextStep = async() => {
     
        const errorResponse = await validate(formState).then(val => val)
        const errorName = steps[currentStep - 1].name
        const stepHasError = errorResponse[errorName]
        // console.log('step', stepHasError, errorResponse, errorName)
        if(currentStep === maxSteps) return
        if (stepHasError) return
        else setCurrentStep((prevStep) => prevStep + 1)
    
    }
    const prevStep = () => {
        if(currentStep <= 1) return 
        else setCurrentStep((prevStep) => prevStep - 1)
    }
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,) => {
        const {name, value} = e.target
        setFormState((prevState) => { 
            const newState = {...prevState, [name]: value}
            validate(newState)
            return newState
        })
       
    }
    const { saveEntity, loading } = useSaveEntity(CREATE_PROJECT, GET_PROJECTS);
    const { validate, error } = useValidate();

    const createProject = async () => {
        try {
            await validate(formState)
            const existErrors = Object.keys(error).length

            if(!existErrors) {
                const data = await saveEntity(formState)
                setFormResponse({success: data, error: null})
            }    
          
        } catch(error: unknown) {
            // error?.errors?.length ?
            // console.log('ERROR', error)
            setFormResponse({error: error, success: null});

        } finally {
            setFinished(true)
        }
     
    }
    return (
        <form className='bg-white w-full h-full flex flex-col justify-between items-between text-base font-sans
        rounded-md p-8'>
            {
                currentStep === 1 && !finished? 
                <FieldProjectTitle 
                handleInputChange={handleInputChange} 
                projectFormTitle={formState.title}
                errorMessage={error.title}
                />:
                currentStep === 2 && !finished? 
                <FieldProjectDescription 
                handleInputChange={handleInputChange} 
                projectFormDescription={formState.description}
                errorMessage={error.description}
                />:
                currentStep === 3 && !finished? 
                <FieldProjectLabel
                handleInputChange={handleInputChange} 
                projectFormLabel={formState.label}
                errorMessage={error.label}
                />:
                currentStep === 3 && finished  ? 
                <NotificationCreateProject
                success={formResponse.success}
                error={formResponse.error}
                 />:
                null 
            }
            <div className='flex flex-wrap justify-between mt-8'>
                {   
                    !finished && currentStep > 1 &&
                    <button type='button' onClick={prevStep}
                    className='mr-auto flex items-center gap-2 text-base font-bold
                    bg-white px-8 py-2 rounded-md text-dark/70 hover:text-dark hover:fill-dark fill-dark/70'>
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
                    bg-purple px-8 py-2 rounded-md text-white/70 fill-white/70 hover:fill-white hover:text-white
                    hover:scale-[1.01]'>
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
                    bg-purple px-8 py-2 rounded-md text-white/70 fill-white/70 hover:fill-white hover:text-white
                    hover:scale-[1.01]'>
                        <span>
                            Finish
                        </span>
                        {
                            loading ? 
                            <LoadingItem height='h-[20px]'/>
                            :
                            <LargeArrow className='w-[40px]'/>
                        }
                    </button>
                }
                {
                    finished &&
                    <button type='button' 
                    className='ml-auto flex items-center gap-2 text-base font-bold
                    bg-purple px-8 py-4 rounded-md text-white/70 fill-white/70 hover:fill-white hover:text-white'>
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