import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import LoaderImg from '../../assets/image/iconss/loader.gif';

const Loader = () => {
    const [targetNode, setTargetNode] = useState(null);

    useEffect(() => {
        const node = document.getElementById('loader');
        if (node) {
            setTargetNode(node);
        } else {
            console.error('Target container not found');
        }
    }, []);

    const loader = (
        <div className='w-full h-full fixed z-[9] bg-slate-500'>
            <div className='fixed left-[50%] top-[50%] z-[999] translate-x-[-50%] translate-y-[-50%]'>
                <img src={LoaderImg} alt="Loading.." />
            </div>
        </div>
    );

    if (!targetNode) return null;

    return ReactDOM.createPortal(loader, targetNode);
}

export default Loader;
