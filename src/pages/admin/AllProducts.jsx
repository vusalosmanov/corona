import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { AiOutlineEdit } from "react-icons/ai";// Edit icon from react-icons
import useGetData from '../../customHooks/useGetData';
import { db } from '../../firebase/config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const AllProducts = () => {
  const { data: productsData, loading } = useGetData('products');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    imgUrl: '',
    price: '',
    category: '',
    date: '',
    color: '',
    os: '',
    cpu: '',
    gpu: '',
    storageCapacity: ''
  });

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    toast.success('Deleted!');
  };

  const toggleEditForm = (product) => {
    if (selectedProduct && selectedProduct.id === product.id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(product);
      setEditFormData({
        title: product.title,
        imgUrl: product.imgUrl,
        price: product.price,
        category: product.category,
        date: product.date,
        color: product.color,
        os: product.os,
        cpu: product.cpu,
        gpu: product.gpu,
        storageCapacity: product.storageCapacity
      });
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const productRef = doc(db, 'products', selectedProduct.id);
    await updateDoc(productRef, editFormData);
    toast.success('Product updated successfully!');
    setSelectedProduct(null);
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Products</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-50 border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="border-b px-4 py-2 text-start">Name</th>
              <th className="border-b px-4 py-2 text-start">Image</th>
              <th className="border-b px-4 py-2 text-center">Price</th>
              <th className="border-b px-4 py-2 text-center">Category</th>
              <th className="border-b px-4 py-2 text-center">Edit</th>
              <th className="border-b px-4 py-2 text-center">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {loading ? (
              <tr>
                <td colSpan="6" className="border-b px-4 py-2 text-center">
                  <div className="flex justify-center items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-4 text-lg">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : productsData.length > 0 ? (
              productsData.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className="hover:bg-gray-50 transition-colors text-center font-medium">
                    <td className="border-b px-4 py-2 text-start">{item.title}</td>
                    <td className="border-b px-4 py-2">
                      <img src={item.imgUrl} alt={item.title} className="w-[100px] h-[70px] object-cover rounded-lg" />
                    </td>
                    <td className="border-b px-4 py-2">${item.price}</td>
                    <td className="border-b px-4 py-2">{item.category}</td>
                    <td className="border-b px-4 py-2 text-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        onClick={() => toggleEditForm(item)}
                      >
                        <AiOutlineEdit  className="w-5 h-5" />
                      </button>
                    </td>
                    <td className="border-b px-4 py-2 text-center">
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        onClick={() => {
                          deleteProduct(item.id);
                        }}
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="border-b px-4 py-2 text-center">
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[600px] p-6 rounded-md shadow-lg h-auto top-0">
            <h3 className="text-2xl font-bold mb-4">{editFormData.title}</h3>
            <form onSubmit={handleEditSubmit} className="text-left">
              <div className="flex justify-center ">
                {editFormData.imgUrl && (
                  <div className="mt-4">
                    <img
                      src={editFormData.imgUrl}
                      alt="Preview"
                      className="w-[150px] h-[100px] object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
              <div className="flex flex-wrap  justify-between font-semibold mt-[10px] ">
                <div className="mb-4 ">
                  <label className="block text-gray-700 mb-2 " htmlFor="title">Name</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    className="w-full px-[16px] py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditChange}
                    className="w-full px-[16px] py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditChange}
                    className="w-full px-[16px] py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4 w-[228px]">
                  <label className="block text-gray-700 mb-2" htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={editFormData.date}
                    onChange={handleEditChange}
                    className="w-full px-[16px] py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={editFormData.color}
                    onChange={handleEditChange}
                    className="w-full px-[16px] py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="os">OS</label>
                  <input
                    type="text"
                    id="os"
                    name="os"
                    value={editFormData.os}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="cpu">CPU</label>
                  <input
                    type="text"
                    id="cpu"
                    name="cpu"
                    value={editFormData.cpu}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="gpu">GPU</label>
                  <input
                    type="text"
                    id="gpu"
                    name="gpu"
                    value={editFormData.gpu}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="storageCapacity">Storage</label>
                  <input
                    type="text"
                    id="storageCapacity"
                    name="storageCapacity"
                    value={editFormData.storageCapacity}
                    onChange={handleEditChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  onClick={() => setSelectedProduct(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;

