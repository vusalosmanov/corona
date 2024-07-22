import React from 'react';
import useAuth from '../../customHooks/useAuth';
import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const Admin = () => {
  const admin_nav = [
    { display: 'Dashboard', path: '/dashboard' },
    { display: 'All-Products', path: '/dashboard/all-products' },
    { display: 'Orders', path: '/dashboard/orders' },
    { display: 'Users', path: '/dashboard/users' }
  ];

  const { currentUser } = useAuth();

  return (
    <>
      <div className='max-w-[1320px] mx-auto bg-gray-100 shadow-md'>
        <div className='w-full flex justify-between items-center px-4 py-3 bg-white'>
          <div>
            <h2 className='text-2xl font-bold text-gray-800'>Corona</h2>
          </div>
          <div className='flex-grow mx-4 flex justify-center'>
            <input
              type="text"
              placeholder='Search...'
              className='w-[600px] py-2 px-4 rounded border border-gray-300 focus:outline-none focus:border-blue-500'
            />
          </div>
          <div className='relative'>
            <img
              src={currentUser?.photoURL}
              className='w-10 h-10 rounded-full border border-gray-300'
              alt="User Avatar"
            />
            <div className='absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
          </div>
        </div>
        <nav className='bg-gray-200 py-2'>
          <ul className='flex justify-around'>
            {admin_nav.map((item, index) => (
              <li key={index} className='mx-2'>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-md font-medium text-gray-700 ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`
                  }
                >
                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className='content p-4'>
        <Outlet />
      </div>
    </>
  );
}

export default Admin;
