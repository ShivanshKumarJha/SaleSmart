import React, {useEffect, useState} from 'react';
import BASE_URL from "../constants/BASE_URL.js";
import Loader from "../components/Loader.jsx";
import Product from '../components/Product.jsx'
import Error from '../components/Error.jsx'
import AddProductForm from "../components/AddProductForm.jsx";

const Products = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                setError(null);
                const res = await fetch(`${BASE_URL}`);

                if (!res.ok) {
                    throw Error(res.statusText);
                }

                const json = await res.json();
                setProducts(json);

                setLoading(false);
                setError(null);
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        }

        fetchProducts();
    }, []);

    return (
        <main
            className='flex grow items-start justify-around gap-4 my-4 mx-4'
        >
            {error ? <Error error={error}/> :
                <div className='flex flex-col items-center justify-center gap-4  mb-12'>
                    <h1 className='font-bold text-gray-800 uppercase tracking-normal text-xl font-[Roboto]'>Products</h1>
                    {!loading ? <ul className='flex flex-wrap items-start justify-center gap-6 '>
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
                <h1 className='font-bold text-gray-800 uppercase tracking-normal text-xl font-[Roboto]'>
                    Add Product
                </h1>
                <AddProductForm/>
            </div>
        </main>
    );
};

export default Products;