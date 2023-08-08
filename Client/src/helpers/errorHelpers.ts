import { ApolloError, isApolloError } from "@apollo/client";

import { CustomErrorResponse } from "../components/ErrorPage";
import { isCustomErrorResponse } from "../types/typeGuards";
import { ChatIcon, DateIcon, DiscussionsIcon, DocumentIcon, GanttIcon, GoalsIcon, ListIcon, NotificationsIcon, OverviewIcon, TeamIcon, TimelineIcon } from "../assets/icons/Icons";
import { json } from "react-router-dom";

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
                
                throw new Response('', {status: statusCode, statusText: statusText})
            }
        } 
      } else if(isCustomErrorResponse(error)) {
      
        const statusCode = error.status;
        const statusText = error.statusText;
        const message = error.message
        throw json({message: message, data: error.data}, {status: statusCode, statusText: statusText})
      }

      throw new Error(error.message)
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
      
    default: 
    return ""
  }

}