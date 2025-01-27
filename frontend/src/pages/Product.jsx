import React from 'react';

const Product = () => {
    return (
        /*<main className='flex grow m-1 p-1'>
            Product
        </main>*/
        /* TODO : Will work in design perspective in future */
        <main
            className='flex grow bg-[url("/src/assets/bg.png")] bg-cover bg-center bg-no-repeat justify-center'
        >
            <p className='p-2 text-3xl font-bold text-black-800 uppercase text-center'>
                PRODUCT PAGE
            </p>
        </main>
    );
};

export default Product;