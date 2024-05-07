import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/config'
import Swal from "sweetalert2"
const TopNav = () => {

    const [displayName, setdisplayName] = useState("")
    const navigate = useNavigate()


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
                const uid = user.uid;
                console.log(user.displayName);
                setdisplayName(user.displayName)
            } else {
                setdisplayName("");
            }
        });
    }, [])


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
                        <Link
                            to="/order-history"
                            className=" mr-[20px]  text-[#fff]  text-[16px] relative hover:text-white"
                        >
                            My Orders
                        </Link>
                        <a href="#">
                            Hi, {displayName}
                        </a>
                        <Link
                            to="/"
                            className=" mr-[20px]  text-[#fff]  text-[16px] relative hover:text-white"
                            onClick={logoutUser}
                        >
                            Hesabdan Cıxış
                        </Link>
                        <Link
                            to="/login"
                            className="mr-[20px] text-[white]  text-[16px] relative hover:text-[#106853] "
                        >
                            Daxil ol
                        </Link>
                        <Link
                            to="/register"
                            className="  text-[#fff]  text-[16px] relative hover:text-white"
                        >
                            Qeydiyyat
                        </Link>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}

export default TopNav