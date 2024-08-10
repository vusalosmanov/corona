import React, { useState } from 'react';
import ProductCart from '../cart/ProductCart';
import useGetData from '../../customHooks/useGetData';
import Layout from '../../components/layout/Layout';

const Home = () => {
  const { data: products, loading } = useGetData('products');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('newToOld');
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

  const sortProducts = (products) => {
    return products.sort((a, b) => {
      if (sortOrder === 'newToOld') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = selectedCategory === 'All'
    ? sortProducts(products).slice(indexOfFirstProduct, indexOfLastProduct)
    : (sortProducts(categorizedProducts[selectedCategory])?.slice(indexOfFirstProduct, indexOfLastProduct) || []);

  const totalPages = selectedCategory === 'All'
    ? Math.ceil(products.length / productsPerPage)
    : Math.ceil((categorizedProducts[selectedCategory]?.length || 0) / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Layout>

        <div className='w-full max-w-[1400px] mx-auto px-[10px]'>
          {loading ? (
            <div className="flex items-center justify-center h-screen ">
              <div className="p-6 bg-white shadow-lg rounded-md text-center">
                <h5 className="text-xl font-semibold text-gray-700">Loading...</h5>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex gap-4 justify-center mt-[20px]">
                <div>
                  <select
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All</option>
                    {Object.keys(categorizedProducts).map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <select
                    id="sortOrder"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="newToOld">New to Old</option>
                    <option value="oldToNew">Old to New</option>
                  </select>
                </div>
              </div>
              <section className='mt-[40px]'>
                <div className='flex lg:justify-start gap-4 flex-wrap justify-center'>
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
            </>
          )}
        </div>
      </Layout>
    </>
  );
}

export default Home;
