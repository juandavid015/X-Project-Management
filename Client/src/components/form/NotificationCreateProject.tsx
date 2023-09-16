import { isCustomErrorResponse } from "../../types/typeGuards";
import { useEffect, useState } from 'react';

interface NotificationCreateProjectProps {
    success: {[key: string]: any} | null
    error: unknown | null
}
type Success = {
    message: string,
    code: string
}
type Error = {
    message: string,
}
type ResponseStatus = {
    success: Success | null
    error: Error | null
}
const NotificationCreateProject = ({success, error}: NotificationCreateProjectProps) => {
   
    const [response, setResponse] = useState<ResponseStatus>({
        success: null,
        error: null
    })
    
    useEffect(()=> {

        if(success) {

            setResponse({
                success: {
                    message:`
                    Now you can invite members to join your project
                    by sharing the next code:
                    `,
                    code: success?.createProject?.id || ''
                },
                error: null
            })

        } else if (error) {
            if(isCustomErrorResponse(error)) {
                if(error.status === 400 && error.statusText === 'BAD_USER_INPUT') {
                    setResponse({
                            error: {
                                message: `Invalid inputs. 
                                The request could not be completed
                                due to invalid inputs. 
                                Verify your inputs and try again.`
                            },
                            success: null
                        }
                    )
                }else if(error.status >= 500 ) {
                    setResponse({
                        error: {
                            message: 'Server errror. An unexpected error occurred but it is not your fault. Try again later, while the problem is fixed.'
                        },
                        success: null
                    })
                }
            } else {
                setResponse({
                    error: {
                        message: 'Sorry. An unexpected error occurred while processing your request. Try again.'
                    },
                    success: null
                })
            }
        }

        return ()=> setResponse({success: null, error: null});

    }, [ success, error ])
   
    return (
    <>
    {
        response.success ?
        <div className="flex flex-col gap-4 p-4">
            <span className="text-dark-purple-md font-bold">
                Done!
            </span>
            <h2 className="font-heading text-2xl text-purple">
                Your project was created successfully!
            </h2>
            <p>
                {response.success.message || `Now you can invite members to join your project
                by sharing the next code:`}
            </p>
            <div className="p-4 bg-white-purple">
                {response.success.code}
            </div>
        </div>
        :response.error ?
        <div className="flex flex-col gap-4 p-4">
            <span className="text-red-warning font-bold">
                Error!
            </span>
            <h2 className="font-heading text-2xl text-red-warning">
                The project was not created.
            </h2>
            <p>
                {response.error.message}
            </p>
        </div>
        : null
    }
    
    
    
    </>
        
      
    )
}
export default NotificationCreateProject;