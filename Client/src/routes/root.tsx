import { Toaster } from "react-hot-toast";
import { Sidebar } from "../components/ui/Sidebar";
import {  Outlet, useLocation } from 'react-router-dom';
import Landing from "../pages/Landing";
const Root = () => {

  const location = useLocation();
  // useEffect(()=> {
  //   if (location.pathname === '/') {
  //     navigate('/projects')
  //   }
  // },[location, navigate])
    return (
      <>
      {
        location.pathname !== '/' ?

        <main className='font-sans text-sm bg-white-purple min-h-screen w-full 
        flex'>
            <Sidebar />
            <Outlet />
            <Toaster />
        </main>:
        <main className='font-sans text-sm bg-white-purple min-h-screen w-full 
        flex flex-col'>
          <Landing />
        </main >
      }
      </>
    );
};
  
export default Root;