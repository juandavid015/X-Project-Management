import { ValidationError } from "yup";
import { projectSchema } from "../validation/validationSchemas";

import { useState } from 'react';

export const useValidate = () => {

    const [error, setError] = useState<{ [key: string]: string }>({});

    const validate = async<T>(formState: T) => {

        const errorResult: { [key: string]: string } = {};

        try {
            await projectSchema.validate(formState, { abortEarly: false })
        } catch (error) {
          

            if (error instanceof ValidationError) {
         
            
                if (error.inner.length && error) {
                  error.inner.forEach((innerError) => {
                    const key = innerError.path || 'error'; // Use 'error' as the key for generic errors
                    errorResult[key] = innerError.message;
                  });
                } else {
                  const key = error.path || 'error'; // Use 'error' as the key for generic errors
                  errorResult[key] = error.message;
                }
                // console.log(JSON.stringify(error));
              }
        }
        // console.log(errorResult)
        setError(()=>errorResult)
        return errorResult;
    }


    return { validate, error }
}