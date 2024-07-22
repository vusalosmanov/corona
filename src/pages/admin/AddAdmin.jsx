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
        } catch (error) {
            console.error('Error adding admin:', error);
        }
    };

    return (
        <div>
            <h2>Add Admin</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Admin Email"
            />
            <button onClick={handleAddAdmin}>Add Admin</button>
        </div>
    );
};

export default AddAdmin;
