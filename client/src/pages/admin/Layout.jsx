import React from 'react'
import { Outlet} from 'react-router-dom';
import {assets} from '../../assets/assets';
import Sidebar from '../../componets/admin/Sidebar';
import { useAppContext } from '../../context/appContext';

const Layout = () => {
    const {axios,setToken,navigate}=useAppContext();

    const logout = () => {
      localStorage.removeItem('token');
      axios.defaults.headers.common['Authorization'] = null;
      setToken(null);
        navigate('/');
    }
  return (
    <>
          <div className='flex justify-between items-center bg-blue-100 px-4 sm:px-12 border-b h-[70px] p-4 shadow-md border-gray-200'>
            <img src={assets.logo} alt="" className='w-32 sm:w-40 cursor-pointer' onClick={()=>navigate('/')}/>
            <button onClick={logout} className='text-sm px-8 py-2 bg-primary text-white rounded-full cursor-pointer'>Logout</button>
          </div>
          <div className='flex h-[calc(100vh-70px)]'>
            <Sidebar />
            <Outlet />
          </div>
    </>
  )
}

export default Layout