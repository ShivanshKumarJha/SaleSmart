import React, {useState} from 'react';
import {useProducts} from '../hooks/useProducts.jsx';
import {MdModeEditOutline, MdOutlineDelete} from 'react-icons/md';
import LinkButton from "./LinkButton.jsx";
import EditProductModal from "./EditProductModal.jsx";

const UserProductItem = ({category, productId, productName, price, quantity}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {deleteProduct, isLoading} = useProducts();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await deleteProduct(productId);
        }
    };

    return (
        <li className='flex items-center justify-center p-2 bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors'>
            <div className='flex-1'>
                <h3 className='text-lg font-medium text-gray-800'>{productName} - <strong
                    className='text-gray-800 text-sm'>{quantity.toLocaleString()}</strong></h3>
            </div>

            <div className='flex justify-around items-center gap-1'>
                <LinkButton
                    onClick={() => setIsModalOpen(true)}
                    title="Edit product"
                >
                    <MdModeEditOutline className="text-slate-800 hover:text-slate-600 text-2xl"/>
                </LinkButton>


                <LinkButton
                    onClick={handleDelete}
                    disabled={isLoading}
                    title="Delete product"
                >
                    <MdOutlineDelete className='text-slate-800 text-2xl hover:text-slate-600'/>
                </LinkButton>
            </div>
            <EditProductModal
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

export default UserProductItem;