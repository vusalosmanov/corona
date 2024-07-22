import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/image/logo/corona.png'
import GeneralIcon from './GeneralIcon'

const MiddleNav = () => {
    return (
        <>
            <nav className='relative w-full bg-[#15161d] h-auto flex items-center py-4'>
                <div className='max-w-[1320px] w-full mx-auto px-4'>
                    <div className='flex w-full flex-row lg:justify-between justify-center items-center'>
                        <Link to='/' className='flex items-center'>
                            <img src={logo} alt="logo" className='w-20 h-20 object-contain' />
                            <h1 className='text-2xl font-bold font-mono text-white ml-2'>Corona</h1>
                        </Link>
                        <div className='flex w-[400px] justify-around items-center text-white'>
                            <Link to="/" className='hover:text-gray-400 transition duration-300'>Home</Link>
                            <Link to='/shope' className='hover:text-gray-400 transition duration-300'>Shop</Link>
                            <Link to='/productcart' className='hover:text-gray-400 transition duration-300'>Cart</Link>
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
