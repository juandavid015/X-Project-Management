import { OperationVariables } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const useRedirectPublicProject = (
    createPublicProject: ()=> Promise<OperationVariables>,
    hasPublicSpace: boolean, 
    isAuthenticated: boolean
    ) => {

    const [reedirect, setReedirect] = useState(false);
    const [reedirectUrl, setReedirectUrl] = useState('');
    const navigate = useNavigate();

    // Check if not user has been logged in, or a public space/project already exists.
    useEffect(()=> {

        if(!hasPublicSpace && !isAuthenticated) {

            // Create a public project
            createPublicProject().then(res => {
                 // store the public space identifier in the localstorage
                 
                const publicProject = res.data?.createPublicProject;
                const publicIdentifier = publicProject?.token || '';

                window.localStorage.setItem('public', publicIdentifier);

                setReedirect(true);
                setReedirectUrl(`/projects/${publicProject.project.id}`);
            })
    
         
        }
        // Redirect to the public project created.
        if(reedirect && reedirectUrl)  {
            navigate(reedirectUrl, {replace: false});
        }
    },[navigate, reedirect, reedirectUrl, createPublicProject, hasPublicSpace, isAuthenticated])

}
export default useRedirectPublicProject;