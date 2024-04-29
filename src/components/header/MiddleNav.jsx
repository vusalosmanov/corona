import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo/corona.png'
import GeneralIcon from './GeneralIcon'
import Search from './Search'

const MiddleNav = () => {
    return (
        <>
            <nav className=' relative  w-full bg-[#0C2D57] h-[100px] flex items-center '>
                <div className='max-w-[1320px] w-[100%] mx-auto '>
                    <div className='flex w-[100%] flex-row  lg:justify-between justify- center  items-center'>
                        <Link to='/' className='flex items-center'>
                            <img src={logo} alt="logo" className='w-[100%]  object-contain max-w-[125px] ' />
                            <h1 className='text-[32px] font-bold font-mono text-[#fff]'>Corona.</h1>
                        </Link>
                        <div className='w-[100%] flex  flex-row justify-center items-center search'>
                            <Search />
                        </div>
                        <div className='hidden lg:block'>
                            <GeneralIcon />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default MiddleNav