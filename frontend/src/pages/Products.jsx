import React, {useEffect} from 'react';
import Loader from "../components/Loader.jsx";
import Product from '../components/Product.jsx'
import Error from '../components/Error.jsx'
import AddProductForm from "../components/AddProductForm.jsx";
import {useProducts} from "../hooks/useProducts.jsx";
import {useProductContext} from "../contexts/ProductContext.jsx";

const Products = () => {
    const {products, isLoading, error} = useProductContext();
    const {getProducts} = useProducts();
    // console.log(products);

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <main
            className='flex grow items-start justify-around gap-4 my-4 mx-4'
        >
            {error ? <Error error={error}/> :
                <div className='flex flex-col items-center justify-center gap-4  mb-12'>
                    <h1 className='font-bold text-gray-800 uppercase tracking-normal text-xl tracking-widest'>Products</h1>
                    {!isLoading ? <ul className='flex flex-wrap items-start justify-center gap-6 '>
                        {products.map(({category, price, productName, quantity, user, _id}) => <Product key={_id}
                                                                                                        category={category}
                                                                                                        price={price}
                                                                                                        productName={productName}
                                                                                                        quantity={quantity}
                                                                                                        userName={user.name}
                                                                                                        productId={_id}/>)}
                    </ul> : <Loader/>}
                </div>}

            <div className='w-5xl flex flex-col items-center justify-center gap-4 overflow-y-visible mb-8'>
                <h1 className='font-bold text-gray-800 uppercase tracking-normal text-xl tracking-widest'>
                    Add Product
                </h1>
                <AddProductForm/>
            </div>
        </main>
    );
};

export default Products;