import { DocumentNode, SubscribeToMoreOptions } from '@apollo/client';
import { useEffect, useState } from 'react';
import { Task } from '../types/types';

type useLoadSubscriptionHook = (
    subscribeToMore: (options: SubscribeToMoreOptions)=> void,
    documentToSubscribe: DocumentNode,
    projectId: string | undefined
) => LoadedTask

type LoadedTask = {
    id: string
    isLoadedBySubscription: boolean
}

export const useLoadSubscriptionTask: useLoadSubscriptionHook = (subscribeToMore, documentToSubscribe, projectId ) => {

    const [loadedTask, setLoadedTask] = useState<LoadedTask>(
        {id: '', isLoadedBySubscription: false}
    );

    useEffect(()=> {

        setLoadedTask({id:'', isLoadedBySubscription: false})

        return subscribeToMore({
            document: documentToSubscribe,
            variables: {
                projectId: projectId
            },
            updateQuery: (prevData, { subscriptionData }) => {
     
                if(!subscriptionData.data) return prevData
                const taskUpdated = subscriptionData.data.taskUpdated.task;
                const action = subscriptionData.data.taskUpdated.action; // Get the action type (add, edit, or delete)
                const taskIsAlreadyPresent = prevData.getProjectTasks.some((task: Task) => task.id ===  taskUpdated.id)
             
                if(action === 'CREATE' && !taskIsAlreadyPresent) {
                    setLoadedTask({id: taskUpdated.id, isLoadedBySubscription: true});
                    return {
                     
                        ...prevData,
                        // Add the new task to the appropriate field
                        getProjectTasks: [...prevData.getProjectTasks, taskUpdated],
                    };
                } else if (action === 'EDIT') {
                    return {
                        ...prevData,
                        // Update the existing task in the array
                        getProjectTasks: prevData.getProjectTasks.map((task: Task) => 
                            task.id === taskUpdated.id ? taskUpdated : task
                        ),
                    };
                } else if (action === 'DELETE') {
                    return {
                        ...prevData,
                        // Remove the deleted task from the array
                        getProjectTasks: prevData.getProjectTasks.filter((task: Task) => task.id !== taskUpdated.id),
                    };
                } else {
                
                    return prevData
                }
               
            }
        })
    }, [subscribeToMore, projectId, loadedTask.isLoadedBySubscription, documentToSubscribe])
   
    return loadedTask
}