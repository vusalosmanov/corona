import React from 'react'
import heart from '../../assets/image/iconss/heart.svg'
import shoping from '../../assets/image/iconss/cart.svg'
import { Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
const GeneralIcon = () => {

  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  return (
    <>
      <div className='flex flex-row  justify-between items-center'>
        <div className="icon">
          <div className="flex gap-5 items-center">
            <Link to="/shopcart" className="relative">
              <img src={shoping} alt="" className="lg:w-[25px] w-[25px] " />
              <div className="absolute top-[-9px] left-5 lg:w-[18px] lg:h-[18px] w-[18px] h-[18px] bg-[#ff0000] rounded-[50%] flex items-center text-white  justify-center">
                {totalQuantity}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralIcon