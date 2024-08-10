import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase/config';
import userIcon from '../../assets/image/iconss/user icon.jpg';
import useAuth from '../../customHooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';

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
    const now = new Date();

    const day = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });
    const year = now.getFullYear();

    return (
        <>
            <nav className="w-full  py-2 shadow-lg">
                <div className="max-w-[1320px] w-full mx-auto flex justify-between items-center px-4">
                    <div className="text-white  ">
                  <span className='text-[12px]'>© by Vusal Osmanov</span> -  {day} {month} {year}
                    </div>
                    <div className="flex items-center relative">
                        <div className="relative" ref={menuRef}>
                            <img
                                src={currentUser ? currentUser.photoURL : userIcon}
                                alt="User Icon"
                                className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                                onClick={toggleMenu}
                            />
                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                    {currentUser ? (
                                        <button
                                            onClick={logout}
                                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    ) : (
                                        <div className="flex flex-col">
                                            <Link to='/register' className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                Register
                                            </Link>
                                            <Link to='/login' className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                                Login
                                            </Link>
                                            <Link to='/dashboard' className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
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
