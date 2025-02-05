import React from 'react';
import {MdCategory, MdCurrencyRupee, MdInventory, MdOutlineProductionQuantityLimits, MdPerson,} from 'react-icons/md';

const Product = ({
                     productName,
                     category,
                     price,
                     quantity,
                     userName,
                     productId,
                 }) => {
    return (
        <li className="flex flex-col p-4 shadow-md bg-white hover:shadow-lg transition-shadow duration-300 gap-4">
            <div className="flex justify-between items-center w-full gap-2">
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

            <div className="flex justify-between items-center w-full gap-5">
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
        </li>
    );
};

export default Product;