import React, { useState, useEffect } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    // Örnek veri yükleme
    useEffect(() => {
        // Burada bir API'den sipariş verilerini alabilirsiniz
        const fetchOrders = async () => {
            // Örnek veri
            const fetchedOrders = [
                { id: 1, customer: 'Ali Yılmaz', date: '2024-07-20', total: 150 },
                { id: 2, customer: 'Ayşe Demir', date: '2024-07-21', total: 200 },
                { id: 3, customer: 'Mehmet Kara', date: '2024-07-22', total: 300 },
            ];
            setOrders(fetchedOrders);
        };

        fetchOrders();
    }, []);

    return (
        <div className='p-4'>
            <h1 className='text-3xl font-bold mb-4'>Siparişler</h1>
            <table className='min-w-full bg-white border border-gray-200'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-6 py-3 text-left text-gray-600'>Sipariş ID</th>
                        <th className='px-6 py-3 text-left text-gray-600'>Müşteri</th>
                        <th className='px-6 py-3 text-left text-gray-600'>Tarih</th>
                        <th className='px-6 py-3 text-left text-gray-600'>Toplam</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id} className='border-b'>
                            <td className='px-6 py-4'>{order.id}</td>
                            <td className='px-6 py-4'>{order.customer}</td>
                            <td className='px-6 py-4'>{order.date}</td>
                            <td className='px-6 py-4'>${order.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Orders;
