import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, updateDoc, doc, deleteDoc } from '../../firebase/config';
import { AiOutlineDown, AiOutlineUp, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { CiSearch } from "react-icons/ci";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [editOrderId, setEditOrderId] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [newDate, setNewDate] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'orders'));
                const ordersList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setOrders(ordersList);
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };

        fetchOrders();
    }, []);

    const toggleAccordion = (orderId) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

    const handleStatusChange = async (orderId, newStatus, newDate, newAddress) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, { status: newStatus, date: newDate, address: newAddress });
            setOrders(orders.map(order =>
                order.id === orderId ? { ...order, status: newStatus, date: newDate, address: newAddress } : order
            ));
        } catch (error) {
            console.error('Error updating order:', error.message);
        }
    };

    const handleEditClick = (orderId, currentStatus, currentDate, currentAddress) => {
        setEditOrderId(orderId);
        setNewStatus(currentStatus);
        setNewDate(currentDate);
        setNewAddress(currentAddress);
        setExpandedOrderId(null);
    };

    const handleSaveClick = async (orderId) => {
        await handleStatusChange(orderId, newStatus, newDate, newAddress);
        setEditOrderId(null);
    };

    const handleDeleteClick = async (orderId) => {
        try {
            await deleteDoc(doc(db, 'orders', orderId));
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case '· Pending':
                return 'text-yellow-500';
            case '· Delivered':
                return 'text-green-500';
            case '· Canceled':
                return 'text-red-500';
            default:
                return 'text-gray-500';
        }
    };

    const filteredOrders = orders.filter(order =>
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.orderNumber.toString().includes(searchTerm)
    );

    return (
        <div className="orders-page p-4 bg-[#0B1739] shadow-md rounded-lg">
            <div className='flex flex-col md:flex-row justify-between mb-6'>
                <h2 className="text-2xl font-normal font-sans mb-4 md:mb-0 text-white">Orders Status</h2>
                <div className="relative w-full md:w-auto">
                    <CiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 border bg-[#0B1739] border-gray-300 rounded-md text-white"
                    />
                </div>
            </div>

            <div className=' overflow-x-auto'>
                <table className=" max-w-[1320px] justify-evenly mx-auto w-full shadow-md rounded-lg ">
                    <thead className="bg-[#0B1739] text-white w-full">
                        <tr>
                            <th className="py-3 px-4 text-center">Order</th>
                            <th className="py-3 px-4 text-start">Name</th>
                            <th className="py-3 px-4 text-center">Date</th>
                            <th className="py-3 px-4 text-center">Status</th>
                            <th className="py-3 px-4 text-center">Address</th>
                            <th className="py-3 px-4 text-center">Total Amount</th>
                            <th className="py-3 px-4 text-center">Product</th>
                            <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredOrders.map((order) => (
                        <React.Fragment key={order.id}>
                            <tr className="bg-[#081028] font-medium text-white">
                            <td className="py-4 px-6 text-center text-sm md:text-base">{order.orderNumber}</td>
                            <td className="py-4 px-6 text-start text-sm md:text-base">
                                    <div className="flex flex-col items-start">
                                    <span className="block mb-1 font-medium">{order.name}</span>
                                        <span className="block text-[#AEB9E1] text-[12px]">{order.email}</span>
                                    </div>
                                    </td>
                                <td className="py-4 px-6 text-center text-sm md:text-base">
                                {editOrderId === order.id ? (
                                    <input
                                    type="date"
                                    value={newDate}
                                    onChange={(e) => setNewDate(e.target.value)}
                                            className="bg-[#0B1739] p-2 text-white text-sm md:text-base"
                                        />
                                    ) : (
                                        <span>{order.date}</span>
                                        )}
                                </td>
                                <td className="py-4 px-6 text-center text-sm md:text-base">
                                    {editOrderId === order.id ? (
                                        <select
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            className="bg-[#0B1739] p-2 text-sm md:text-base"
                                        >
                                            <option value="· Pending" className={getStatusColor('· Pending')}>· Pending</option>
                                            <option value="· Delivered" className={getStatusColor('· Delivered')}>· Delivered</option>
                                            <option value="· Canceled" className={getStatusColor('· Canceled')}>· Canceled</option>
                                        </select>
                                        ) : (
                                        <span className={getStatusColor(order.status)}>{order.status}</span>
                                        )}
                                        </td>
                                        <td className="py-4 px-6 text-center text-sm md:text-base">
                                        {editOrderId === order.id ? (
                                            <input
                                            type="text"
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                            className="bg-[#0B1739] p-2 text-white text-sm md:text-base"
                                            />
                                            ) : (
                                                <span>{order.address}</span>
                                                )}
                                                </td>
                                                <td className="py-4 px-6 text-center text-sm md:text-base">{order.totalAmount} $</td>
                                                <td className="py-4 px-6 text-center text-sm md:text-base">
                                                <span onClick={() => toggleAccordion(order.id)} className="cursor-pointer text-lg md:text-xl">
                                                {expandedOrderId === order.id ? (
                                                    <AiOutlineUp />
                                                    ) : (
                                                        <AiOutlineDown />
                                                        )}
                                                        </span>
                                                        </td>
                                                        <td className="py-4 px-6 text-center text-sm md:text-base">
                                                        {editOrderId === order.id ? (
                                                            <>
                                            <button onClick={() => handleSaveClick(order.id)} className="text-blue-500 mr-2 text-sm md:text-base">
                                                Save
                                            </button>
                                            <button onClick={() => setEditOrderId(null)} className="text-gray-500 text-sm md:text-base">
                                                Cancel
                                                </button>
                                        </>
                                    ) : (
                                        <div className='flex justify-center gap-2'>
                                        <AiOutlineEdit
                                        onClick={() => handleEditClick(order.id, order.status, order.date, order.address)}
                                        className="text-blue-500 cursor-pointer"
                                        />
                                        <AiOutlineDelete
                                        onClick={() => handleDeleteClick(order.id)}
                                        className="text-red-500 cursor-pointer"
                                        />
                                        </div>
                                        )}
                                </td>
                                </tr>
                            {expandedOrderId === order.id && (
                                <tr>
                                    <td colSpan="8" className="py-4 px-6 text-white bg-[#0B1739] text-sm md:text-base">
                                    <div>
                                    {order.cartItems.map((item, index) => (
                                        <div key={index} className="mb-2">
                                                    <strong>{item.productName}</strong> - {item.quantity} x {item.price} USD
                                                    </div>
                                                    ))}
                                                    </div>
                                                    </td>
                                                    </tr>
                                                    )}
                                                    </React.Fragment>
                                                    ))}
                                                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersPage;
