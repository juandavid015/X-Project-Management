import { Toaster } from "react-hot-toast";
import { Sidebar } from "../components/ui/Sidebar";
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
const Root = () => {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(()=> {
    if (location.pathname === '/') {
      navigate('/projects')
    }
  },[location, navigate])
    return (
      <>
        <main className='font-sans text-sm bg-white-purple min-h-screen w-full
        flex'>
            <Sidebar />
            <Outlet />
            <Toaster />
        </main>
      </>
    );
};
  
export default Root;