export interface CustomErrorResponse {
    status: number,
    statusText: string,
    message?: string
    data?: Record<string, unknown>
} 
import { useRouteError } from "react-router-dom";
import { isCustomErrorResponse } from "../../types/typeGuards";
import ErrorLayoutCustom from "./ErrorLayoutCustom";
import ErrorLayoutDefault from "./ErrorLayoutDefault";
import ErrorLayoutUnavailable from "./ErrorLayoutUnavailable";
import { getErrorResponseBody } from "../../helpers/errorHelpers";
import { useState, useEffect } from 'react'
import ErrorLayoutUnauthenticated from "./ErrorLayoutUnauthenticated";
export const ErrorPage = () => {

    const error = useRouteError()
    const [message, setMessage] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Record<string, any>>({});

    useEffect(() => {
        if (error && isCustomErrorResponse(error)) {
     
            if (error.status === 401) {
                setMessage('Invalid user credentials. Please login first before continue.');

            } else if(error.status === 404 && error.statusText === 'Service unavailable') {
                setLoading(true)
                const getMessage = async (error: CustomErrorResponse) => {
                    const responseBody = await getErrorResponseBody(error as Response);
                  
                    try {
                        setMessage(responseBody?.message);
                        setData(responseBody?.data)
                    } catch (error) {
                        setMessage('This feauture is an in-developement feature and will be released soon in upcoming updates.')
                    } finally {
                        setLoading(false)
                        setExtraInfo('You can still visit and make use of Projects.') 
                    }     
                }
            
                getMessage(error)
                // !message && setMessage('This feauture is an in-developement feature and will be released soon in upcoming updates.')
            } else if (error.status === 404) {
                setMessage('The resource you\'re trying to access does not exist.')
    
            }
        }
    
        return () => setLoading(false)
    },[message, error])

    if (loading) return (<div className="min-h-screen w-full text-red-warning">Loading error...</div>)
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full m-auto">
            <div className="max-w-[400px] flex flex-col gap-3 text-justify">
                {
                    isCustomErrorResponse(error) && error.statusText === 'Service unavailable' ?
                    <ErrorLayoutUnavailable 
                    statusTitle={error.statusText} 
                    message={message} 
                    extraInfo={extraInfo}
                    featureName={data?.featureName}
                    />: 
                    isCustomErrorResponse(error) && error.status === 401 ?
                    <ErrorLayoutUnauthenticated
                    title={error.statusText}
                    message={message}
                    extraInfo={extraInfo}
                    />:
                    isCustomErrorResponse(error) ?
                    <ErrorLayoutCustom 
                    title={error.statusText} 
                    message={message} 
                    extraInfo={extraInfo}
                    />:
                    <ErrorLayoutDefault />
                }
            </div>
        </div>

    )
}
export default ErrorPage;