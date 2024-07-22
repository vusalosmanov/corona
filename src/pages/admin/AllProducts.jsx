import React from 'react';
import { FaTrash } from 'react-icons/fa'; // Trash icon from react-icons
import useGetData from '../../customHooks/useGetData';
import { db } from '../../firebase/config';
import { deleteDoc , doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');

  const  deleteProduct = async id=> {
    await deleteDoc(doc(db , 'products' , id))
    toast.success("Deleted!")
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-50 border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="border-b px-4 py-2 text-left">Image</th>
              <th className="border-b px-4 py-2 text-left">Title</th>
              <th className="border-b px-4 py-2 text-left">Category</th>
              <th className="border-b px-4 py-2 text-left">Price</th>
              <th className="border-b px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="5" className="border-b px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-4 text-lg">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : productsData.length > 0 ? (
              productsData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border-b px-4 py-2">
                    <img src={item.imgUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                  </td>
                  <td className="border-b px-4 py-2">{item.title}</td>
                  <td className="border-b px-4 py-2">{item.category}</td>
                  <td className="border-b px-4 py-2">${item.price}</td>
                  <td className="border-b px-4 py-2 text-center">
                    <button className="text-red-500 hover:text-red-700 transition-colors" onClick={()=> {deleteProduct(item.id)}}>
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="border-b px-4 py-2 text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
