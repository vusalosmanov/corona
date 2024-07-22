import React, { useEffect, useState } from 'react'
import ProductCart from '../cart/ProductCart'
import useGetData from '../../customHooks/useGetData'
import products from '../../assets/data/products'
const Home = () => {

  const { data: products, loading } = useGetData('products')

  return (
    <>

      <div className='w-full max-w-[1320px] mx-auto px-[10px] flex justify-center'>

        {loading ? (
          <h5> Loading....</h5>
        ) : (
          products.map(item =>
            <ProductCart item={item} />
          )
        )}
      </div>
    </>
  )
}

export default Home