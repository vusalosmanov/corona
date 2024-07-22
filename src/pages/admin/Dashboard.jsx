import React from 'react';
import useGetData from '../../customHooks/useGetData';
const Dashboard = () => {

  const { data: products} = useGetData('products')
  const { data: users} = useGetData('users')
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-800">$1,000,000</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Users</h3>
          <p className="text-2xl font-bold text-gray-800">{users.length}</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Orders</h3>
          <p className="text-2xl font-bold text-gray-800">10,000</p>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-600">Total Products</h3>
          <p className="text-2xl font-bold text-gray-800">{products.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
