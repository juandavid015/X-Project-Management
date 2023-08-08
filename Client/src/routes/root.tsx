import { Sidebar } from "../components/Sidebar";
import {Outlet} from 'react-router-dom';

const Root = () => {
    return (
      <>
        <main className='font-sans text-sm bg-white-purple min-h-screen
        flex'>
            <Sidebar />
            <Outlet />
        </main>
      </>
    );
};
  
export default Root;