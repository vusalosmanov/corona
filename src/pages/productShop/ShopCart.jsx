import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { increaseQuantity, decreaseQuantity, removeItem } from '../../redux/slice/cartSlice';

const ShopCart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const isLoggedIn = useSelector(state => state.cart.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleCheckout = () => {
        if (isLoggedIn) {
            navigate('/invoice'); 
        } else {
            navigate('/invoice')
        }
    };

    return (
        <>
            {cartItems.length === 0 ? (
                <h2 className="text-2xl text-gray-700">Movcud deyil</h2>
            ) : (
                <div className="max-w-[1320px] mx-auto p-4 flex">
                    <div className="overflow-x-auto w-[900px]">
                        <table className="min-w-full bg-white shadow-md rounded-lg">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="w-1/6 py-3 px-4 text-center">Image</th>
                                    <th className="w-1/6 py-3 px-4 text-center">Name</th>
                                    <th className="w-1/6 py-3 px-4 text-center">Price</th>
                                    <th className="w-1/6 py-3 px-4 text-center">Quantity</th>
                                    <th className="w-1/6 py-3 px-4 text-center">Total Price</th>
                                    <th className="w-1/6 py-3 px-4 text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <tr className="hover:bg-gray-100 font-medium text-gray-800" key={index}>
                                        <td className="py-4 px-6 text-center">
                                            <img src={item.imgUrl} alt={item.productName} className="w-20 h-20 object-contain mx-auto" />
                                        </td>
                                        <td className="py-4 px-6 text-center text-lg">
                                            {item.productName}
                                        </td>
                                        <td className="py-4 px-6 text-center text-lg">
                                            {item.price} USD
                                        </td>
                                        <td className="py-4 px-6 text-center text-lg">
                                            <div className="flex justify-center items-center">
                                                <button
                                                    className="w-8 h-8 bg-red-500 text-white rounded-md"
                                                    onClick={() => dispatch(decreaseQuantity(index))}
                                                >
                                                    -
                                                </button>
                                                <span className="w-12 mx-2 text-center border border-gray-300 rounded-md">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    className="w-8 h-8 bg-blue-500 text-white rounded-md"
                                                    onClick={() => dispatch(increaseQuantity(index))}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center text-lg">
                                            {item.totalPrice} USD
                                        </td>
                                        <td className="py-4 px-6 flex h-[112px] justify-center items-center">
                                            <AiOutlineDelete
                                                className="cursor-pointer"
                                                onClick={() => dispatch(removeItem(index))}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-[420px] h-[200px] bg-[#f5f5f5] shadow-md p-6 ml-4 rounded-lg'>
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg">Total Price:</span>
                            <span className="text-lg font-bold">{totalAmount} USD</span>
                        </div>
                        <button
                            className="w-full py-3 bg-blue-500 text-white text-lg rounded-md "
                            onClick={handleCheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShopCart;
