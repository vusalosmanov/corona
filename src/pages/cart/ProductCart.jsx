// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { cartActions } from '../../redux/slice/cartSlice';

// const ProductCart = ({ item }) => {
//   const dispatch = useDispatch();

//   const addToCart = () => {
//     dispatch(cartActions.addItem({
//       id: item.id,
//       productName: item.title,
//       price: item.price,
//       imgUrl: item.imgUrl,
//     }));
//   };

//   return (
//     <div className="max-w-[280px] w-[100%] bg-[#fff] flex justify-center items-center flex-col py-[7px] px-[15px] pb-[20px] rounded-lg">
//       <Link to={`/product/${item.id}`} className="w-[100%] max-w-[200px] h-[200px] mb-[20px]">
//         <img src={item.imgUrl} alt={item.productName} className="w-[100%] h-[100%] object-contain" />
//       </Link>
//       <div className="w-[100%] flex justify-center items-center flex-col text-center mb-[20px]">
//         <div className="min-h-[60px] flex justify-center items-center mb-[5px] py-[0px] px-[10px] text-[#000]">
//           <h3>
//             {item.title || 'Ürün Adı Mevcut Değil'}
//           </h3>
//         </div>
//         <div className="flex justify-center items-center">
//           <span className="new">{item.price} USD</span>
//         </div>
//       </div>
//       <button className="max-w-[150px] py-[10px] px-[20px] text-[black] w-[100%] border-[1px] rounded hover:bg-[#106853] hover:text-[white] transition ease-in-out duration-200" onClick={addToCart}>
//         Səbətə at
//       </button>
//     </div>
//   );
// };

// export default ProductCart;

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slice/cartSlice';

const ProductCart = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.title,
      price: item.price,
      imgUrl: item.imgUrl,
      date: item.date, // Eklenen kısım
      color: item.color, // Eklenen kısım
      os: item.os, // Eklenen kısım
      cpu: item.cpu, // Eklenen kısım
      gpu: item.gpu, // Eklenen kısım
      storage: item.storage, // Eklenen kısım
    }));
  };

  return (
    <div className="max-w-[280px] w-[100%] bg-[#fff] flex justify-center items-center flex-col py-[7px] px-[15px] pb-[20px] rounded-lg">
      <Link to={`/product/${item.id}`} className="w-[100%] max-w-[200px] h-[200px] mb-[20px]">
        <img src={item.imgUrl} alt={item.title} className="w-[100%] h-[100%] object-contain" />
      </Link>
      <div className="w-[100%] flex justify-center items-center flex-col text-center mb-[20px]">
        <div className="min-h-[60px] flex justify-center items-center mb-[5px] py-[0px] px-[10px] text-[#000]">
          <h3>
            {item.title || 'Ürün Adı Mevcut Değil'}
            {item.cpu}
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <span className="new">{item.price} USD</span>
        </div>
      </div>
      <button className="max-w-[150px] py-[10px] px-[20px] text-[black] w-[100%] border-[1px] rounded hover:bg-[#106853] hover:text-[white] transition ease-in-out duration-200" onClick={addToCart}>
        Səbətə at
      </button>
    </div>
  );
};

export default ProductCart;
