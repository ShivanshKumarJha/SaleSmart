import React from 'react';
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import Product from "./Product.jsx";

const ProductsContent = ({products, isLoading, error, query}) => {
    if (error) return <Error error={error}/>;

    return (
        <div className='flex flex-col items-center justify-center gap-4 mb-12'>
            {!isLoading ? (
                <ul className='flex flex-wrap items-start justify-around gap-6'>
                    {products.filter((product) =>
                        product.productName.toLowerCase().includes(query)
                    ).map((product) => (
                        <Product key={product._id} {...product} userName={product.user.name}/>
                    ))}
                </ul>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default ProductsContent;