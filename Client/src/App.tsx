

import './App.css'
import { Project } from './components/Project'
import { Sidebar } from './components/Sidebar'
import {useAuth0} from '@auth0/auth0-react'
import {useEffect, useCallback} from 'react';
function App() {

  const { isAuthenticated, getAccessTokenSilently, isLoading} = useAuth0();
  const getToken = useCallback(async() => {
    const token = await getAccessTokenSilently();
    console.log('token', token)
    return token
  }, [getAccessTokenSilently])
  useEffect(()=> {
    if (isAuthenticated) {
      const tokenIsInLocalStorage = window.localStorage.getItem('token');

      if(tokenIsInLocalStorage) {
        return 
      } else {
        getToken().then(token => {
          window.localStorage.setItem('token', token)
        });

        return 
       
      }

    } else {
      return
    }
  })
  if (isLoading) {
    return(<div>Loading...</div>)
  }


  return (
    <>
      <main className='font-[Exo] text-sm bg-white-purple min-h-[3000px]
      flex'>
        <Sidebar />
        <Project />
      </main>
    </>
  )
}

export default App
