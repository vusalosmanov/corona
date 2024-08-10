import React from 'react';
import useGetData from '../../customHooks/useGetData';
import { deleteDoc, doc } from '../../firebase/config';
import { db } from '../../firebase/config';
import { toast } from 'react-toastify';

const Users = () => {
    const { data: usersData, loading, refetch } = useGetData('users');

    const deleteUser = async (id) => {
        try {
            console.log(`Attempting to delete user with ID: ${id}`);
            await deleteDoc(doc(db, 'users', id));
            toast.success("User deleted successfully!");
            refetch();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-[#0B1739] shadow-lg rounded-md">
            <h2 className="text-3xl font-bold mb-6 text-white">Registered Users</h2>
            <div className="overflow-x-auto">
                <table className="w-full rounded-lg">
                    <thead className="text-white uppercase text-sm">
                        <tr>
                            <th className="border-b px-4 py-2 text-left">Logo</th>
                            <th className="border-b px-4 py-2 text-left">User Name</th>
                            <th className="border-b px-4 py-2 text-left">Email</th>
                            <th className="border-b px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {loading ? <h5>Loading....</h5> :
                            usersData?.map(user => (
                                <tr className="hover:bg-gray-50 transition-colors text-white hover:text-[#171921]" key={user.uid}>
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
                                            deleteUser(user.uid);
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
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
