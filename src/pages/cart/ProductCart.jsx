import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../redux/slice/cartSlice';

const ProductCart = ({ item }) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartActions.addItem({
      id: item.id,
      productName: item.productName,
      price: item.price,
      imgUrl: item.imgUrl,
    }));
  };

  return (
    <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden flex flex-col items-center p-4">
      <Link to={`/product/${item.id}`} className="w-full flex justify-center">
        <img
          src={item.imgUrl}
          alt={item.productName}
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
      </Link>
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.productName}</h3>
        <p className="text-lg text-gray-600 mb-4">{item.price} USD</p>
        <button
          className="w-full py-2 px-4 bg-[#106853] text-white rounded-lg shadow-md hover:bg-[#0d5b47] transition duration-300"
          onClick={addToCart}
        >
          Səbətə at
        </button>
      </div>
    </div>
  );
};

export default ProductCart;
