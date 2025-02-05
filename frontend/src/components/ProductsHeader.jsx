import React from 'react';
import SearchControls from "./SearchControls.jsx";
import ActionButton from "./ActionButton.jsx";
import {MdOutlineAnalytics} from "react-icons/md";

const ProductsHeader = ({onAddProduct, setQuery, productCount, onOpenFilters, isFilter, onOpenSort, isSort}) => {
    return (
        <header className='flex flex-col md:flex-row items-center justify-between gap-4 w-full mb-8 px-4'>
            <div className='flex items-center gap-4'>
                <div className="bg-green-100 p-3 rounded-lg">
                    <MdOutlineAnalytics className="text-emerald-400-600 text-3xl"/>
                </div>
                <div>
                    <p className='text-sm text-gray-500 flex items-center gap-2'>
                        <span>{productCount || 0} Active Products</span>
                    </p>
                </div>
            </div>

            <div className='w-full max-w-2xl flex-1'>
                <SearchControls setQuery={setQuery}
                                onOpenFilters={onOpenFilters}
                                isFilter={isFilter}
                                onOpenSort={onOpenSort}
                                isSort={isSort}
                />
            </div>

            {/*<div className="hidden md:block h-12 w-px bg-gray-200"></div>*/}
            <div className='w-full md:w-auto flex justify-center md:justify-end gap-4'>
                <ActionButton onClick={onAddProduct} isMobile>
                    New Product
                </ActionButton>
                <ActionButton onClick={onAddProduct}>
                    New Product
                </ActionButton>
            </div>
        </header>
    );
};

export default ProductsHeader;