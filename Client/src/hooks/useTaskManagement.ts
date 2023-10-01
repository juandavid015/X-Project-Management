import { useState } from 'react';
export const useTaskManagement = () => {

    const [edit, setEdit] = useState({
        isActive: false,
        item: '',
        input: ''
    })
    const [create, setCreate] = useState({
        isActive: false,
        columnTarget: ''
    })

    const toggleEdit = (itemToBeEdited: string, inputToBeEdited: string) =>{
        setEdit((prevEditValues) => ({
            ...prevEditValues, 
            isActive: prevEditValues.item !== itemToBeEdited,
            item: itemToBeEdited,
            input: inputToBeEdited
        }))
    }

    return { edit, setEdit, toggleEdit, create, setCreate}
}
