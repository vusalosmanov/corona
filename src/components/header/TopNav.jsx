import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Swal from "sweetalert2"
import { useDispatch } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice'
import { REMOVE_ACTIVE_USER } from '../../redux/slice/authSlice'
import ShowOnLogin, { ShowOnLogout } from '../hiddenLink/hiddenLink'
const TopNav = () => {

    const [displayName, setdisplayName] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const Alert = () => {
        Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Logout successfully...",
            showConfirmButton: false,
            timer: 1500,
        });
    };

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.displayName === null) {
                    const u1 = user.email.substring(0, user.email.indexOf("."))
                    const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    setdisplayName(uName)
                } else {
                    setdisplayName(user.displayName)
                }
                dispatch(SET_ACTIVE_USER({
                    email: user.email,
                    userName: user.displayName ? user.displayName : displayName,
                    userID: user.uid,
                }))
            } else {
                setdisplayName("");
                dispatch(REMOVE_ACTIVE_USER())
            }
        });
    }, [dispatch, displayName,])


    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                Alert();
                toast.success("Logout successfully.");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            <nav className='w-[100%]  relative bg-[#31363F]'>
                <div className="max-w-[1320px] w-full  mx-auto pr-[10px] pl-[10px] ">
                    <div className="flex  flex-row  justify-end items-center w-[100%] ">
                        <Link
                            to="/contact"
                            className=" mr-[20px]  text-[#fff]  text-[16px] relative hover:text-white"
                        >
                            Contact Us
                        </Link>
                        <ShowOnLogin>
                            <Link
                                to="/order-history"
                                className=" mr-[20px]  text-[#fff]  text-[16px] relative hover:text-white"
                            >
                                My Orders
                            </Link>
                        </ShowOnLogin>
                        <ShowOnLogin>
                            <Link to="" className='text-[#ff0000] text-[16px] mr-[10px]' >
                                Hi, {displayName}
                            </Link>
                        </ShowOnLogin>
                        <ShowOnLogin>
                            <Link
                                to="/"
                                className=" mr-[20px]  text-[#fff]  text-[16px] relative hover:text-white"
                                onClick={logoutUser}
                            >
                                Hesabdan Cıxış
                            </Link>
                        </ShowOnLogin>
                        <ShowOnLogout>
                            <Link
                                to="/login"
                                className="mr-[20px] text-[white]  text-[16px] relative hover:text-[#106853] "
                            >
                                Daxil ol
                            </Link>
                        </ShowOnLogout>
                        {/* <Link
                            to="/register"
                            className="  text-[#fff]  text-[16px] relative hover:text-white"
                        >
                            Qeydiyyat
                        </Link> */}
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}

export default TopNav