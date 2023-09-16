import { ApolloError, isApolloError } from "@apollo/client";
import { isCustomErrorResponse } from "../types/typeGuards";
import { ChatIcon, DateIcon, DiscussionsIcon, DocumentIcon, ErrorWarningIcon, GanttIcon, GoalsIcon, ListIcon, NotificationsIcon, OverviewIcon, TeamIcon, TimelineIcon } from "../assets/icons/Icons";
import { json } from "react-router-dom";
import { CustomErrorResponse } from "../types/types";
import toast from "react-hot-toast";
import ToastErrorNotfication from "../components/error/ToastError";

export async function getErrorResponseBody(response: Response) {
  const clonedBody = response.clone().body
  if (!clonedBody) {
    return 
  }

  const reader = clonedBody.getReader();
  const { value, done } = await reader.read();

  if (done) {
    return
  }

  const responseBody = new TextDecoder().decode(value);
  const data = JSON.parse(responseBody);
  const message = data.message
  return {message, data: data.data}
}

export const handleErrorResponse = (error: ApolloError | CustomErrorResponse) => {
    
    if (error instanceof ApolloError && isApolloError(error)) {
        if (error.networkError && 'result' in error.networkError) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const result = error.networkError.result as Record<string, any> 
            if ('errors' in result) {
                const errors = result.errors 
                const statusCode = error.networkError.statusCode;
                const statusText = errors[0].extensions.code;
                const errorBody = JSON.stringify({message: errors[0].message, data: errors[0]})
                
                throw new Response(errorBody, {status: statusCode, statusText: statusText, })
            }
        } else if ('message' in error && error.message === 'Failed to fetch') {
            const statusCode = 503;
            const statusText = 'Service unavailable';
            const message = 'is currently unavailable. Please try again later. If the problem persist, contact with the administrator.'
            throw json({message: message, data: {featureName: 'Server'}}, {status: statusCode, statusText: statusText})

        } else if(error.graphQLErrors) {
            const errorResponse = error.graphQLErrors[0] as Record<string, any> 
            if(errorResponse.extensions.code === 'INTERNAL_SERVER_ERROR') {

                const statusCode = errorResponse?.extensions?.statusCode || 500
                const statusText = errorResponse?.extensions?.code || 'INTERNAL_SERVER_ERROR'
                const message = 'An internal server error has ocurred. Try again later while the error is fixed.'
                const errorBody = JSON.stringify({message: message})
                
                throw new Response(errorBody, {status: statusCode, statusText: statusText, })
            }
        } 

      } else if(isCustomErrorResponse(error)) {
      
        const statusCode = error.status;
        const statusText = error.statusText;
        const message = error.message
        throw json({message: message, data: error.data}, {status: statusCode, statusText: statusText})

      } 
      console.log(JSON.stringify(error))
      throw new Error(error.message)
}

export const throwToastErrorNotification = (error: unknown) => {
    if (error instanceof ApolloError && error.networkError && 'result' in error.networkError ) {
        const result = error.networkError.result as Record<string, any> 
        const message = result.errors[0].message
        toast.custom((t)=> ToastErrorNotfication ({t, message}), {
            duration: 2000
        });
    } 
}

export const generateUnavailableServiceIcon = (serviceName: string) => {
  switch(serviceName) {
    case 'notifications':
      return (NotificationsIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "chats":
      return(ChatIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "goals": 
      return(GoalsIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "spaces": 
      return(TeamIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "timeline": 
      return(TimelineIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "files": 
      return(DocumentIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "discussions": 
      return(DiscussionsIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "overview": 
      return(OverviewIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "gantt": 
      return(GanttIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "list": 
      return(ListIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "calendar": 
      return(DateIcon({className: 'h-[60px] inline fill-blue-bright'}));
    case "Server": 
        return(ErrorWarningIcon({className: 'h-[60px] inline fill-dark-med'}))
    default: 
    return ""
  }

}