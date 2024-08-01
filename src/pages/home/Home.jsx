// import React from 'react'
// import ProductCart from '../cart/ProductCart'
// import useGetData from '../../customHooks/useGetData'
// const Home = () => {

//   const { data: products, loading } = useGetData('products')

//   return (
//     <>

//       <div className='w-full max-w-[1320px] mx-auto px-[10px] flex justify-center gap-4 mt-[40px] flex-wrap'>
//         {loading ? (
//           <h5> Loading....</h5>
//         ) : (
//           products.map(item =>
//             <ProductCart item={item} />
//           )
//         )}
//       </div>
//     </>
//   )
// }

// export default Home
import React, { useState } from 'react';
import ProductCart from '../cart/ProductCart';
import useGetData from '../../customHooks/useGetData';

const Home = () => {
  const { data: products, loading } = useGetData('products');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className='w-full max-w-[1320px] mx-auto px-[10px] flex justify-center gap-4 mt-[40px] flex-wrap'>
        {loading ? (
          <h5>Loading....</h5>
        ) : (
          currentProducts.map(item => (
            <ProductCart key={item.id} item={item} />
          ))
        )}
      </div>
      <div className='flex justify-center p-12'>
        <nav>
          <ul className='flex list-none'>
            {[...Array(totalPages)].map((_, i) => (
              <li key={i} className={`mx-1 ${currentPage === i + 1 ? 'font-bold' : ''}`}>
                <button
                  onClick={() => paginate(i + 1)}
                  className='px-3 py-1 border border-gray-300 rounded-md text-white'
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Home;
