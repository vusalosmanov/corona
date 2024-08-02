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
    }));
  };

  return (
    <div className="max-w-[320px] w-[100%] bg-[#fff] flex justify-center items-center flex-col py-[7px] px-[15px] pb-[20px] rounded-lg">
      <Link to={`/product/${item.id}`} className="w-[100%] max-w-[280px] h-[200px] mb-[20px]">
        <img src={item.imgUrl} alt={item.title} className="w-[100%] h-[100%] object-cover" />
      </Link>
      <div className="w-[100%] flex justify-center items-center flex-col text-center mb-[20px]">
        <div className="min-h-[60px]  py-[0px] px-[10px] text-[#000]">
          <h3 className='font-bold'>
            {item.title || 'Ürün Adı Mevcut Değil'}
          </h3>
        </div>
        <div className="flex justify-center items-center font-medium">
          <span className="new">{item.price} $</span>
        </div>
      </div>
      <button className="max-w-[150px] py-[10px] px-[20px] font-medium text-[black] w-[100%] border-black border-[1px] rounded hover:bg-blue-500 hover:border-white hover:text-[white] transition ease-in-out duration-200" onClick={addToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default ProductCart;
