import React from 'react';
import { useSelector } from 'react-redux';

const Invoice = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const currentDate = new Date().toLocaleDateString();

    return (
        <div className="invoice-container p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6">Invoice</h2>
            <div className="mb-4">
                <span className="font-bold">Date:</span> {currentDate}
            </div>
            <div className="mb-4">
                <span className="font-bold">Order Number:</span> #123456
            </div>
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="py-3 px-4 text-center">Product Name</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4 text-center">Unit Price</th>
                        <th className="py-3 px-4 text-center">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 font-medium text-gray-800">
                            <td className="py-4 px-6 text-center">{item.productName}</td>
                            <td className="py-4 px-6 text-center">{item.quantity}</td>
                            <td className="py-4 px-6 text-center">{item.price} USD</td>
                            <td className="py-4 px-6 text-center">{item.totalPrice} USD</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mb-4">
                <span className="text-lg">Total Amount:</span>
                <span className="text-lg font-bold">{totalAmount} USD</span>
            </div>
        </div>
    );
};

export default Invoice;
