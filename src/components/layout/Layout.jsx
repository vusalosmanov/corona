import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Layout({ children }) {
    useEffect(() => {
        const handleScroll = () => {
            const pageScrollButton = document.querySelector('.page-scroll-button');
            if (pageScrollButton) {
                if (window.scrollY > 300) {
                    pageScrollButton.classList.remove('d-none');
                } else {
                    pageScrollButton.classList.add('d-none');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <button
                className='page-scroll-button d-none fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer transition-opacity duration-300'
                onClick={() => window.scrollTo(0, 0)}
                aria-label="Scroll to top"
            >
                <i className="fa-solid fa-chevron-up"></i>
            </button>
            <main>
                {children}
            </main>
            <ToastContainer position="bottom-right" theme="colored" autoClose={3000} />
        </>
    );
}

export default Layout;
