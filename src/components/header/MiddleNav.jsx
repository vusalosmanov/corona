import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo/corona.png'
import GeneralIcon from './GeneralIcon'

const MiddleNav = () => {
    return (
        <>
            <nav className='relative w-full flex items-center '>
                <div className='max-w-[1320px] w-full mx-auto px-4'>
                    <div className='lg:flex w-full flex-row lg:justify-between  items-center'>
                        <div className='flex  items-center justify-between'>
                            <Link to='/' className='flex items-center justify-center'>
                                <img src={logo} alt="logo" className='w-16 h-16 object-contain' />
                                <h1 className='text-xl font-semibold font-mono text-white ml-3'>Corona</h1>
                            </Link>
                            <div className='block lg:hidden'>
                                <GeneralIcon />
                            </div>
                        </div>
                        <div className='flex w-full  lg:max-w-[400px] justify-around items-center text-white  font-medium'>
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
