import React, { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase/config';

const AddAdmin = () => {
    const [email, setEmail] = useState('');
    const db = getFirestore(initializeApp(firebaseConfig));

    const handleAddAdmin = async () => {
        try {
            const adminDocRef = doc(db, 'admins', email);
            await setDoc(adminDocRef, { email: email });
            alert('Admin added successfully!');
            setEmail('');
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-[#0B1739] shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-6 text-white">Add Admin</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-white mb-2">Admin Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter admin email"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <button
                onClick={handleAddAdmin}
                className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
                Add Admin
            </button>
        </div>
    );
};

export default AddAdmin;
