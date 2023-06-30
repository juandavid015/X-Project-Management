import { useState } from 'react';
import { Task } from '../types/types';

type FormValues = {
    [key: string]: any;
  };
export type SetFormData<T> = React.Dispatch<React.SetStateAction<T>>

export type HandleInputChange<T> =  (
  e: React.ChangeEvent<T>,
  index: number,
  propertyName: keyof Task
) => void

  export const useForm = <T extends FormValues>(initialState: T) => {
    const [formData, setFormData] = useState<T>(initialState);
  
    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number,
      propertyName: keyof T
    ) => {
      const { name, value } = e.target;
  
      setFormData((prevFormData) => {
        const propertyValue = prevFormData[propertyName];
        if (Array.isArray(propertyValue)) {
          const updatedArray = [...propertyValue];
          const updatedObject = { ...updatedArray[index], [name]: value };
          updatedArray[index] = updatedObject;
          return { ...prevFormData, [propertyName]: updatedArray };
        } else if (propertyValue && typeof propertyValue === 'object') {
          const updatedObject = { ...propertyValue, [name]: value };
          return { ...prevFormData, [propertyName]: updatedObject };
        } else {
          return { ...prevFormData, [name]: value };
        }
      });
    };
  
    return { formData, setFormData, handleInputChange };
  };