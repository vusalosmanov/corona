import React from 'react'
import heart from '../../assets/image/iconss/heart.svg'
import shoping from '../../assets/image/iconss/cart.svg'
import { Link } from 'react-router-dom'
const GeneralIcon = () => {
  return (
    <>
      <div className='flex flex-row  justify-between items-center'>
        <div className="icon">
          <div className="flex gap-5 items-center">
            <Link to="" className="relative">
              <img src={heart} alt="" className="lg:w-[50px] w-[40px]" />
              <div className="absolute top-[-9px] lg:left-7 left-6 lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] bg-[#ff0000] rounded-[50%] flex items-center text-white  justify-center">
              </div>
            </Link>
            <Link to="" className="relative">
              <img src={shoping} alt="" className="lg:w-[50px] w-[40px] " />
              <div className="absolute top-[-9px] left-7 lg:w-[25px] lg:h-[25px] w-[20px] h-[20px] bg-[#ff0000] rounded-[50%] flex items-center text-white  justify-center">
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralIcon