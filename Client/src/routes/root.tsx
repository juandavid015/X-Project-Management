import { Sidebar } from "../components/ui/Sidebar";
import {Outlet} from 'react-router-dom';

const Root = () => {
    return (
      <>
        <main className='font-sans text-sm bg-white-purple min-h-screen w-full
        flex'>
            <Sidebar />
            <Outlet />
        </main>
      </>
    );
};
  
export default Root;