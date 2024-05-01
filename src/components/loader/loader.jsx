import React from 'react';
import LoaderImg from '../../assets/image/iconss/loader.gif';
import ReactDOM from 'react-dom';

const Loader = () => {
    const loader = (
        <div className='w-full h-full fixed z-[9] bg-slate-500'>
            <div className='fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%]'>
                <img src={LoaderImg} alt="Loading.." />
            </div>
        </div>
    );

    return ReactDOM.createPortal(loader, document.getElementById('loader'));
}

export default Loader;
