import React from 'react';
import {useProductContext} from "../contexts/ProductContext.jsx";
import UserProductItem from "./UserProductItem.jsx";
import Loader from "./Loader.jsx";

const ProductDetails = ({userId}) => {
    const {products, isLoading} = useProductContext();
    const userProducts = products.filter((product) => product.user._id === userId);

    if (isLoading) {
        return <Loader/>;
    }

    const totalValue = userProducts.reduce(
        (sum, product) => sum + (product.price * product.quantity), 0
    );

    return (
        <div className='w-auto bg-white rounded-xl shadow-lg flex flex-col'>
            <div className='p-6 border-b border-gray-100'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg font-semibold text-gray-800'>
                        My Products ({userProducts.length})
                    </h1>
                    <div className='text-sm bg-gray-100 px-3 py-1 rounded-full hover:bg-gray-200'>
                        Total Value: {' '}
                        <span className='font-semibold text-green-600'>
                            ₹{totalValue.toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className='flex-1 overflow-hidden'>
                <div className='h-full overflow-y-auto smooth-scroll'>
                    <ul className='divide-y divide-gray-100'>
                        {userProducts.map((product) => (
                            <UserProductItem
                                key={product._id}
                                productId={product._id}
                                productName={product.productName}
                                price={product.price}
                                quantity={product.quantity}
                                category={product.category}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;