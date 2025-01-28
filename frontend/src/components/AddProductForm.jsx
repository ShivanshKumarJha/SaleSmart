import React, {useState} from 'react';
import Button from "./Button.jsx";

const AddProductForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');

    // TODO : To handle the creation of the product

    return (
        <form className='flex justify-center items-center gap-4 flex-col w-full' method='POST'>
            <input type='text' name='productName' placeholder='Product Name' value={productName}
                   onChange={(e) => setProductName(e.target.value)}
                   className='border border-gray-200 rounded-sm p-2 text-black w-72'/>

            <input type='text' name='quantity' placeholder='Quantity' value={quantity}
                   onChange={(e) => setQuantity(e.target.value)}
                   className='border border-gray-200 rounded-sm p-2 text-black w-72'/>

            <input type='text' name='price' placeholder='Price' value={price}
                   onChange={(e) => setPrice(e.target.value)}
                   className='border border-gray-200 rounded-sm p-2 text-black w-72'/>

            <input type='text' name='category' placeholder='Category' value={category}
                   onChange={(e) => setCategory(e.target.value)}
                   className='border border-gray-200 rounded-sm p-2 text-black w-72'/>

            <Button type="submit" disabled={isLoading}>Add Product</Button>
        </form>
    );
};

export default AddProductForm;