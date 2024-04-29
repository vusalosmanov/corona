import React from 'react'
import { Link } from 'react-router-dom'
const TopNav = () => {
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
        </>
    )
}

export default TopNav