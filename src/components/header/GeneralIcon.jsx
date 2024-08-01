import React from 'react'
import shoping from '../../assets/image/iconss/cart.svg'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GeneralIcon = () => {

  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  return (
    <>
      <div className='flex flex-row justify-between items-center'>
        <div className="icon">
          <div className="flex items-center">
            <Link to="/shopcart" className="relative">
              <img src={shoping} alt="Shopping Cart" className="w-6 lg:w-6" />
              <div className="absolute top-[-10px] left-5 lg:w-[18px] w-[18px] h-[18px] bg-red-600 rounded-full flex items-center justify-center text-white text-xs">
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