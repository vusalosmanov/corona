import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo/corona.png'
import GeneralIcon from './GeneralIcon'

const MiddleNav = () => {
    return (
        <>
            <nav className='relative w-full flex items-center '>
                <div className='max-w-[1320px] w-full mx-auto px-4'>
                    <div className='flex w-full flex-row lg:justify-between justify-center items-center'>
                        <Link to='/' className='flex items-center'>
                            <img src={logo} alt="logo" className='w-16 h-16 object-contain' />
                            <h1 className='text-xl font-semibold font-mono text-white ml-3'>Corona</h1>
                        </Link>
                        <div className='flex w-[400px] justify-around items-center text-white  font-medium'>
                            <Link to="/" className='hover:text-gray-400 transition duration-300 text-lg'>Home</Link>
                            <Link to='/dashboard' className='hover:text-gray-400 transition duration-300 text-lg'>Dashboard</Link>
                            <Link to='/invoice' className='hover:text-gray-400 transition duration-300 text-lg'>Invoice</Link>
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
