// import React, { useEffect, useState, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { signOut } from 'firebase/auth'
// import { ToastContainer, toast } from 'react-toastify'
// import { onAuthStateChanged } from 'firebase/auth'
// import { auth } from '../../firebase/config'
// import { useDispatch } from 'react-redux'
// import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink'
// import userIcon from '../../assets/image/iconss/user icon.jpg'
// import useAuth from '../../customHooks/useAuth';

// const TopNav = () => {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()  
//     const year = new Date().getFullYear();

//     const { currentUser } = useAuth()

//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const menuRef = useRef(null);

//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen);
//     };

//     const handleClickOutside = (event) => {
//         if (menuRef.current && !menuRef.current.contains(event.target)) {
//             setIsMenuOpen(false);
//         }
//     };

//     useEffect(() => {
//         document.addEventListener('mousedown', handleClickOutside);

//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);
//     const logout = () => {
//         signOut(auth).then(() => {
//             toast.success("Logout successfully.");
//             navigate("/");
//         })
//             .catch((error) => {
//                 toast.error(error.message);
//             });
//     };
//     return (
//         <>
//             <nav className='w-[100%]  relative bg-[#1e1f29] py-[10px]'>
//                 <div className="max-w-[1320px] w-full  mx-auto   px-[10px] ">
//                     <div className='text-[#fff]'>
//                         ili gostermek  {year}
//                     </div>
//                     <div className='flex flex-row justify-end items-center w-full relative'>
//                         <div className='relative' ref={menuRef}>
//                             <img
//                                 src={currentUser ? currentUser.photoURL : userIcon}
//                                 alt="User Icon"
//                                 className='w-[40px] h-[40px] rounded-full cursor-pointer'
//                                 onClick={toggleMenu}
//                             />

//                             {isMenuOpen && (
//                                 <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50'>
//                                     {currentUser ? (
//                                         <button
//                                             onClick={logout}
//                                             className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'
//                                         >
//                                             Logout
//                                         </button>
//                                     ) : (
//                                         <div className='flex flex-col'>
//                                             <Link to='/register' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
//                                                 Register
//                                             </Link>
//                                             <Link to='/login' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
//                                                 Login
//                                             </Link>
//                                             <Link to='/dashboard' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
//                                                 Dashboard
//                                             </Link>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//             <ToastContainer />
//         </>
//     )
// }

// export default TopNav

import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import userIcon from '../../assets/image/iconss/user icon.jpg';
import useAuth from '../../customHooks/useAuth';

const TopNav = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const logout = () => {
        signOut(auth).then(() => {
            toast.success("Logout successfully.");
            navigate("/");
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    const year = new Date().getFullYear();

    return (
        <>
            <nav className='w-full bg-[#1e1f29] py-4 shadow-md'>
                <div className="max-w-[1320px] w-full mx-auto flex justify-between items-center px-4">
                    <div className='text-[#fff] text-lg font-semibold'>
                        {year}
                    </div>
                    <div className='flex items-center relative'>
                        <div className='relative' ref={menuRef}>
                            <img
                                src={currentUser ? currentUser.photoURL : userIcon}
                                alt="User Icon"
                                className='w-10 h-10 rounded-full cursor-pointer border-2 border-white'
                                onClick={toggleMenu}
                            />
                            {isMenuOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50'>
                                    {currentUser ? (
                                        <button
                                            onClick={logout}
                                            className='block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left'
                                        >
                                            Logout
                                        </button>
                                    ) : (
                                        <div className='flex flex-col'>
                                            <Link to='/register' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                                Register
                                            </Link>
                                            <Link to='/login' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                                Login
                                            </Link>
                                            <Link to='/dashboard' className='block px-4 py-2 text-gray-800 hover:bg-gray-100'>
                                                Dashboard
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    );
}

export default TopNav;
