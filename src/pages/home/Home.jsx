import React from 'react'
import ProductCart from '../cart/ProductCart'
import useGetData from '../../customHooks/useGetData'
const Home = () => {

  const { data: products, loading } = useGetData('products')

  return (
    <>

      <div className='w-full max-w-[1320px] mx-auto px-[10px] flex justify-center gap-4 mt-[40px] flex-wrap'>
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