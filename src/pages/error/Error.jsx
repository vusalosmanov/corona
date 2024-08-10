import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#081028] text-white text-center">
            <div>
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-xl mb-4">Page Not Found</p>
                <Link to="/" className="text-blue-400 underline">Go back to Home</Link>
            </div>
        </div>
    );
};

export default Error;
