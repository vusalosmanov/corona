import React from 'react'
import { Link } from 'react-router-dom'
import ResetImg from '../../assets/image/iconss/forgot.png'
const Reset = () => {
  return (
    <>
      <section className='w-full h-auto'>
        <div className='max-[1320px] w-full mx-auto flex justify-center gap-[40px] items-center h-[600px]'>
          <div className='login w-[full]'>
            <img src={ResetImg} alt="ResetImg" className='w-[400px] object-cover' />
          </div>
          <form className="w-full flex justify-center items-center flex-col max-w-[450px]">
            <h2 className="lg:mb-[55px] relative text-center capitalize text-[2rem]">Reset Password</h2>
            <div className="w-[40px]  h-[5px] rounded-lg bg-[#106853] block lg:hidden mt-[10px]"></div>
            <div className="flex flex-row gap-[20px] w-full mt-[40px] lg:mt-[0]">
              <div className="w-[100%] flex items-center justify-center flex-col">
                <div className="w-[100%] mb-[25px]">
                  <input type="text" className="block w-[100%] p-2 text-base font-normal leading-6 text-gray-700 bg-white border border-gray-300 appearance-none rounded-md px-[12px] py-[16px]" id="company" placeholder="E-poct ünvanı *" />
                </div>
              </div>
            </div>
            <Link to="" className="mt-[30px] bg-[#fc8410] text-[#fff] px-[20px] py-[15px] w-full max-w-[240px] rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold hover:bg-[#106853] ">Reset password</Link>
            <div className='flex items-center lg:justify-between justify-center flex-col lg:flex-row max-w-[600px] w-full'>
              <Link to='/login' className='text-[#106853]'>Daxil ol</Link>
              <Link to='/register' className='text-[#106853]'>Qeydiyyat</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default Reset