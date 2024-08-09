import React, { useEffect, useState } from 'react';
import { db, collection, getDocs, updateDoc, doc, deleteDoc } from '../../firebase/config';
import { AiOutlineDown, AiOutlineUp, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [editOrderId, setEditOrderId] = useState(null); 
    const [newStatus, setNewStatus] = useState(''); 
    const [newDate, setNewDate] = useState(''); 
    const [newAddress, setNewAddress] = useState(''); 
    const [expandedOrderId, setExpandedOrderId] = useState(null);

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

    return (
        <div className="orders-page p-4 bg-[#0B1739] shadow-md rounded-lg">
            <h2 className="text-2xl font-normal font-sans mb-6 text-white text-[18px]">Orders Status</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg mb-6">
                <thead className="bg-[#0B1739] text-white">
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
                    {orders.map((order) => (
                        <React.Fragment key={order.id}>
                            <tr className="bg-[#081028] font-medium text-white">
                                <td className="py-4 px-6 text-center">{order.orderNumber}</td>
                                <td className="py-4 px-6 text-start">
                                    <div className="flex flex-col items-start">
                                        <span className="block mb-1 font-medium">{order.name}</span>
                                        <span className="block text-[#AEB9E1] text-[12px]">{order.email}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {editOrderId === order.id ? (
                                        <input
                                            type="date"
                                            value={newDate}
                                            onChange={(e) => setNewDate(e.target.value)}
                                            className="bg-[#0B1739] p-4 text-white"
                                        />
                                    ) : (
                                        <span>{order.date}</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {editOrderId === order.id ? (
                                        <select
                                            value={newStatus}
                                            onChange={(e) => setNewStatus(e.target.value)}
                                            className="bg-[#0B1739]  p-4"
                                        >
                                            <option value="· Pending" className={getStatusColor(' · Pending')}>· Pending</option>
                                            <option value="· Delivered" className={getStatusColor('· Delivered')}>· Delivered</option>
                                            <option value="· Canceled" className={getStatusColor('·Canceled')}>· Canceled</option>
                                        </select>
                                    ) : (
                                        <span className={getStatusColor(order.status)}>{order.status}</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {editOrderId === order.id ? (
                                        <input
                                            type="text"
                                            value={newAddress}
                                            onChange={(e) => setNewAddress(e.target.value)}
                                            className="bg-[#0B1739] p-4 text-white"
                                        />
                                    ) : (
                                        <span>{order.address}</span>
                                    )}
                                </td>
                                <td className="py-4 px-6 text-center">{order.totalAmount} $</td>
                                <td className="py-4 px-6 text-center">
                                    <span onClick={() => toggleAccordion(order.id)} className="cursor-pointer">
                                        {expandedOrderId === order.id ? (
                                            <AiOutlineUp />
                                        ) : (
                                            <AiOutlineDown />
                                        )}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    {editOrderId === order.id ? (
                                        <>
                                            <button onClick={() => handleSaveClick(order.id)} className="text-blue-500 mr-2">
                                                Save
                                            </button>
                                            <button onClick={() => setEditOrderId(null)} className="text-gray-500">
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <AiOutlineEdit
                                                onClick={() => handleEditClick(order.id, order.status, order.date, order.address)}
                                                className="text-gray-500 cursor-pointer mr-2"
                                            />
                                            <AiOutlineDelete
                                                onClick={() => handleDeleteClick(order.id)}
                                                className="text-red-500 cursor-pointer"
                                            />
                                        </>
                                    )}
                                </td>
                            </tr>
                            {expandedOrderId === order.id && (
                                <tr>
                                    <td colSpan="8" className="py-4 px-6 text-white bg-[#0B1739]">
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
    );
};

export default OrdersPage;
