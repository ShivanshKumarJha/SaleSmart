import React, {useState} from 'react';
import Button from "./Button.jsx";
import {useProducts} from "../hooks/useProducts.jsx";

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    const {addProduct, isLoading, error} = useProducts();

    async function handleAddProduct(e) {
        e.preventDefault();
        if (!productName || !quantity || !category || !price) {
            return;
        }

        const productData = {
            productName,
            quantity: Number(quantity),
            price: Number(price),
            category
        };

        // console.log('Inside the AddProductForm');
        await addProduct(productData);

        if (!error) {
            setProductName('');
            setQuantity('');
            setPrice('');
            setCategory('');
        }
    }

    return (
        <form
            className='flex justify-center items-center gap-4 flex-col w-72'
            method='POST'
            onSubmit={handleAddProduct}
        >
            <div className="w-full">
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                    type='text'
                    name='productName'
                    placeholder='Product Name'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className='border border-gray-200 rounded-sm p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                />
            </div>

            <div className="w-full">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <input
                    type='number'
                    name='quantity'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className='border border-gray-200 rounded-sm p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    min="1"
                    required
                />
            </div>

            <div className="w-full">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input
                    type='number'
                    name='price'
                    placeholder='Price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className='border border-gray-200 rounded-sm p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    step="0.01"
                    required
                />
            </div>

            <div className="w-full">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                    type='text'
                    name='category'
                    placeholder='Category'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='border border-gray-200 rounded-sm p-2 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                    required
                />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full justify-center"
            >
                {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
        </form>
    );
};

export default AddProductForm;