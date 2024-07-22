import React from 'react';
import useGetData from '../../customHooks/useGetData';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';
const Users = () => {
    const { data: usersData, loading } = useGetData('users')

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, 'users', id))
        toast.success("user deleted!")
    }
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Registered Users</h2>
            <div className="overflow-x-auto">
                <table className="w-full bg-gray-50 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Image</th>
                            <th className="border-b px-4 py-2 text-left">User Name</th>
                            <th className="border-b px-4 py-2 text-left">Email</th>
                            <th className="border-b px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {
                            loading ? <h5>Loading....</h5> :
                                usersData?.map(user => (
                                    <tr className="hover:bg-gray-50 transition-colors" key={user.uid}>
                                        <td className="border-b px-4 py-2">
                                            <img
                                                src={user.photoURL}
                                                alt="User"
                                                className="w-16 h-16 object-cover rounded-full shadow-sm"
                                            />
                                        </td>
                                        <td className="border-b px-4 py-2">{user.displayName}</td>
                                        <td className="border-b px-4 py-2">{user.email}</td>
                                        <td className="border-b px-4 py-2 text-center">
                                            <button className="text-red-500 hover:text-red-700 transition-colors" onClick={() => {
                                                deleteUser(user.uid)
                                            }}>
                                                <svg
                                                    className="w-5 h-5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    ></path>
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
