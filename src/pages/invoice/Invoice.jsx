import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../redux/slice/orderSlice';
import { db, collection, addDoc } from '../../firebase/config';
import { toast, ToastContainer } from 'react-toastify';
import { removeItem } from '../../redux/slice/cartSlice';

const Invoice = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const currentDate = new Date().toLocaleDateString();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        address: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderNumber = `#${Math.floor(Math.random() * 1000000)}`;

        const order = {
            date: currentDate,
            orderNumber: orderNumber,
            ...formData,
            cartItems: cartItems.map(item => ({
                productName: item.productName,
                price: item.price,
                quantity: item.quantity,
                totalPrice: item.totalPrice
            })),
            totalAmount: totalAmount
        };

        console.log('Submitting Order:', order); 

        try {
            await addDoc(collection(db, 'orders'), order);
            console.log('Order successfully added to Firebase!');
            dispatch(addOrder(order));
            dispatch(removeItem());
            toast.success('Order successfully submitted!');
            setFormData({
                name: '',
                address: '',
                email: ''
            });
        } catch (error) {
            console.error('Error adding order to Firebase:', error.message);
            toast.error(`Error submitting order: ${error.message}`);
        }
    };



    return (
        <div className="w-full max-w-[1320px] mx-auto mt-8 p-4 bg-[#0B1739] shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Invoice</h2>
            <div className="mb-4">
                <span className="font-bold text-white">Date:</span> {currentDate}
            </div>
            <div className="mb-4 text-white">
                <span className="font-bold">Order Number:</span> #{Math.floor(Math.random() * 1000000)}
            </div>
            <table className="min-w-full  mb-6">
                <thead className=" border-b-[1px] text-white">
                    <tr>
                        <th className="py-3 px-4 text-center">Product Name</th>
                        <th className="py-3 px-4 text-center">Quantity</th>
                        <th className="py-3 px-4 text-center">Unit Price</th>
                        <th className="py-3 px-4 text-center">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-100 font-medium text-white  hover:text-[#212532]">
                            <td className="py-4 px-6 text-center">{item.productName}</td>
                            <td className="py-4 px-6 text-center">{item.quantity}</td>
                            <td className="py-4 px-6 text-center">{item.price} $</td>
                            <td className="py-4 px-6 text-center">{item.totalPrice} $</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between items-center mb-4 text-white">
                <span className="text-lg">Total Amount:</span>
                <span className="text-lg font-bold">{totalAmount} $</span>
            </div>
            <div className='flex justify-center  w-full'>
                <form onSubmit={handleSubmit} className="space-y-4 max-w-[400px] w-full flex flex-col justify-end">
                    <div>
                        <label className="block text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-[12px] py-[14px] border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-[12px] py-[14px] border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full  border border-gray-300 rounded-md px-[12px] py-[14px]"
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className=" bg-gradient-to-r from-[#cb3cff] to-[#7f25fb] text-[#fff] px-[20px] py-[15px] w-full  rounded-[5px] flex flex-row justify-center items-center text-center text-[18px] font-bold  transition-all"
                    >
                        Submit Order
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Invoice;
