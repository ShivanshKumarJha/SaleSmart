import React, {useState} from 'react';
import {
    MdCategory,
    MdCurrencyRupee,
    MdInventory,
    MdModeEditOutline,
    MdOutlineDelete,
    MdOutlineProductionQuantityLimits,
    MdPerson
} from "react-icons/md";

import LinkButton from "./LinkButton.jsx";
import {useProducts} from '../hooks/useProducts.jsx';
import {useNavigate} from 'react-router-dom';
import EditModal from "./EditModal.jsx";

const Product = ({productName, category, price, quantity, userName, productId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {deleteProduct, isLoading} = useProducts();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    };

    const handleEdit = () => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <li className="flex flex-col p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 gap-4">
            <div className='flex justify-between items-center w-full gap-2'>
                <div className="flex items-center">
                    <MdCategory className="text-green-500 text-xl"/>
                    <span className="text-gray-600 truncate">
                        {productName[0].toUpperCase() + productName.slice(1)}
                    </span>
                </div>

                <div className="flex items-center">
                    <MdInventory className="text-purple-500 text-xl"/>
                    <span className="text-gray-600">
                        {category[0].toUpperCase() + category.slice(1)}
                    </span>
                </div>
            </div>

            <div className='flex justify-between items-center w-full gap-5'>
                <div className="flex items-center flex-1 justify-center">
                    <MdPerson className="text-blue-500 text-xl"/>
                    <span className="text-gray-700 truncate">{userName}</span>
                </div>

                <div className="flex items-center flex-1 justify-center">
                    <MdCurrencyRupee className="text-yellow-500 text-xl"/>
                    <span className="text-gray-600">{price.toLocaleString()}</span>
                </div>

                <div className="flex items-center flex-1 justify-center">
                    <MdOutlineProductionQuantityLimits className="text-red-500 text-xl"/>
                    <span className="text-gray-600">{quantity.toLocaleString()}</span>
                </div>
            </div>

            <div className='flex justify-around items-center gap-1'>
                <LinkButton
                    onClick={() => setIsModalOpen(true)}
                    title="Edit product"
                >
                    <MdModeEditOutline className="text-slate-800 hover:text-slate-600 text-xl"/>
                </LinkButton>


                <LinkButton
                    onClick={handleDelete}
                    disabled={isLoading}
                    title="Delete product"
                >
                    <MdOutlineDelete className='text-slate-800 text-xl hover:text-slate-600'/>
                </LinkButton>
            </div>
            
            <EditModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                productId={productId}
                initialData={{
                    productName,
                    category,
                    price: price.toString(),
                    quantity: quantity.toString()
                }}
            />
        </li>
    );
};

export default Product;