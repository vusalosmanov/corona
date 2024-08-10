import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase/config';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(initializeApp(firebaseConfig));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productDoc = doc(db, 'products', productId);
        const productSnapshot = await getDoc(productDoc);
        if (productSnapshot.exists()) {
          setProduct(productSnapshot.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, db]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-[1320px] my-0 mx-auto pr-[15px] pl-[15px] w-full relative py-[40px] mb-[40px]   h-full ">
      <div className="detailes lg:flex   ">
        <div className='flex justify-center flex-row  items-center mb-[40px] w-full lg:max-w-[50%] px-[12px]'>
          <div className='lg:h-[400px] h-[300px] w-full lg:max-w-[600px]  '>
            <img src={product.imgUrl} alt="product" className='h-[100%] w-[100%] object-contain ' />
          </div>
        </div>
        <div className='mt-[30px] flex w-full lg:max-w-[50%] mb-[40px] justify-center items-start flex-row'>
          <div className='flex  flex-col justify-center items-start  w-full '>
            <div className='lg:text-start text-center mb-[30px] flex justify-center flex-col  w-full'>
              <h3 className='mb-[20px] text-[1.75rem] text-white font-bold'>{product.title}</h3>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>Date:</span>
                <span className="text-bold mr-[10px]">{product.date}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>Color:</span>
                <span className="text-bold mr-[10px]">{product.color}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>OS:</span>
                <span className="text-bold mr-[10px]">{product.os}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>CPU:</span>
                <span className="text-bold mr-[10px]">{product.cpu}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>GPU:</span>
                <span className="text-bold mr-[10px]">{product.gpu}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>Storange:</span>
                <span className="text-bold mr-[10px]">{product.storageCapacity}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>Category:</span>
                <span className="text-bold mr-[10px]">{product.category}</span>
              </div>
              <div className='flex items-center flex-row  lg:justify-start justify-center text-white mb-[5px]'>
                <span className='mr-[10px] text-white font-bold'>Price:</span>
                <span className="text-bold mr-[10px]">{product.price}$</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
