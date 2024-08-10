import React, { useState } from 'react';
import useAuth from '../../customHooks/useAuth';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const Admin = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const admin_nav = [
    { display: 'Dashboard', path: '/dashboard' },
    { display: 'All-Products', path: '/dashboard/all-products' },
    { display: 'Add-Products', path: '/dashboard/add-products' },
    { display: 'Orders', path: '/dashboard/orders' },
    { display: 'Users', path: '/dashboard/users' }
  ];

  const { currentUser } = useAuth();

  return (
    <>
      <div className='w-full max-w-[1470px] mx-auto p-6 bg-[#0B1739] shadow-lg rounded-md'>
        <div className='flex justify-between items-center px-4 py-3'>
          <div>
            <h2 className='text-2xl font-bold text-white'>Corona</h2>
          </div>
          <div className='relative flex items-center'>
            <img
              src={currentUser?.photoURL}
              className='w-10 h-10 rounded-full border border-gray-300'
              alt="User Avatar"
            />
            <button
              className='ml-4 text-white text-2xl lg:hidden'
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              {isNavOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
            </button>
          </div>
        </div>
        <nav className={`lg:flex lg:justify-evenly  bg-white py-2 rounded-md ${isNavOpen ? 'block' : 'hidden'} lg:block`}>
          <ul className='lg:flex lg:space-x-4 lg:justify-evenly lg:w-[1320px]'>
            {admin_nav.map((item, index) => (
              <li key={index} className='mx-2'>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-md mb-[5px] font-medium text-gray-700 ${isActive ? 'bg-[#0B1739] text-white' : 'hover:bg-blue-100'}`
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='content p-6'>
        <Outlet />
      </div>
    </>
  );
}

export default Admin;

