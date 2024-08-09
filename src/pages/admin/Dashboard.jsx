import React from 'react';
import useGetData from '../../customHooks/useGetData';

const Dashboard = () => {
  const { data: products } = useGetData('products');
  const { data: users } = useGetData('users');
  const { data: orders } = useGetData('orders');


  const totalSales = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  const totalOrders = orders.length;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-[#0B1739] shadow-lg rounded-md">
      <h2 className="text-3xl font-bold mb-6 text-white">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        <div className="bg-[#081028]  text-white rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold ">Total Sales</h3>
          <p className="text-2xl font-bold ">${totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-[#081028] text-white rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold ">{users.length}</p>
        </div>
        <div className="bg-[#081028] text-white rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold ">Orders</h3>
          <p className="text-2xl font-bold ">{totalOrders}</p>
        </div>
        <div className="bg-[#081028] text-white rounded-lg p-4 shadow-md flex flex-col items-center">
          <h3 className="text-lg font-semibold ">Total Products</h3>
          <p className="text-2xl font-bold ">{products.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
