import React from 'react'
import { useSelector } from 'react-redux'
const ShopCart = () => {

    const cartItems = useSelector(state => state.cart.cartItems)
    return (
        <>
            {cartItems.length === 0 ? (
                <h2>movcud deil</h2>
            ) : (
                <div className='max-w-[1320px] w-full my-0 mx-auto pr-[10px] pl-[10px] flex  flex-col justify-center items-center '>
                    <div className='w-[100%] max-w-[1200px]  flex items-center justify-center'>
                    </div>
                    <div className='mb-[40px] w-[100%] overflow-auto'>
                        <table className='mb-[50px] min-w-[1200px] w-[100%] border-collapse  caption-bottom mt-[50px]'>
                            <thead>
                                <tr className='border-b-[2px]'>
                                    <th className='py-[15px] px-[0px] text-center' ></th>
                                    <th className='py-[15px] px-[0px] text-center' >Məhsulun adı</th>
                                    <th className='py-[15px] px-[0px] text-center' >Qiymət</th>
                                    <th className='py-[15px] px-[0px] text-center' >Sayı</th>
                                    <th className='py-[15px] px-[0px] text-center' >Cəmi</th>
                                    <th className='py-[15px] px-[0px] text-center' ></th>
                                </tr>
                            </thead>
                            <tbody >
                                {cartItems.map((item, index) =>
                                    <tr className='border-b-[2px]' key={index}>
                                        <td className=" w-[100px]  h-[100px] py-[10px]">
                                            <img src={item.imgUrl} alt="" className='w-[100%] h-[100%] object-contain' />
                                        </td>
                                        <td className='py-[10px] px-[0px] text-[18px] text-center'>
                                            <p>{item.productName}</p>
                                        </td>
                                        <td className="py-[10px] text-[20px] text-center min-w-[150px] capitalize font-[400]">
                                            <p>{item.price}AZN</p>
                                        </td>
                                        <td className=" justify-center items-center py-[10px] w-[150px]">
                                            <div className="flex gap-3 justify-around mb-4">
                                                <button className='w-[40px] h-[40px] text-[white] bg-orange-500 rounded-[5px]'>-</button>
                                                <span className='min-w-[50px] my-0 mx-[10px] text-center inline-block text-[18px] bg-[white] border-[1px] py-[5px] px-[10px] '>{item.quatity}</span>
                                                <button className='w-[40px] h-[40px] text-[white] bg-orange-500 rounded-[5px]'>+</button>
                                            </div>
                                        </td>
                                        <td className="py-[10px] text-[20px] text-center min-w-[150px]">
                                            <span>
                                                AZN
                                            </span>
                                        </td>
                                        <td>
                                            <button className='bg-[#c82333] text-[white] w-[40px] h-[40px] rounded-[5px] text-[22px]'><i className='fa-solid fa-xmark'></i></button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}

export default ShopCart