import React, { useState } from 'react';
import ProductCart from '../cart/ProductCart';
import useGetData from '../../customHooks/useGetData';

const Home = () => {
  const { data: products, loading } = useGetData('products');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const groupByCategory = (products) => {
    return products.reduce((acc, product) => {
      const category = product.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  };

  const categorizedProducts = groupByCategory(products);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='w-full max-w-[1320px] mx-auto px-[10px]'>
      {loading ? (
        <h5>Loading....</h5>
      ) : (
        Object.keys(categorizedProducts).map((category) => {
          const currentProducts = categorizedProducts[category].slice(indexOfFirstProduct, indexOfLastProduct);
          const totalPages = Math.ceil(categorizedProducts[category].length / productsPerPage);

          return (
            <section key={category} className='mt-[40px]'>
              <h2 className='text-2xl font-bold mb-4'>{category}</h2>
              <div className='flex justify-center gap-4 flex-wrap'>
                {currentProducts.map(item => (
                  <ProductCart key={item.id} item={item} />
                ))}
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
            </section>
          );
        })
      )}
    </div>
  );
}

export default Home;
