import React, {useEffect, useState} from 'react';
import {useProductContext} from '../contexts/ProductContext.jsx';
import {useProducts} from '../hooks/useProducts.jsx';
import ProductsHeader from '../components/ProductsHeader.jsx';
import ProductsContent from '../components/ProductsContent.jsx';
import AddProductModal from '../components/AddProductModal.jsx';
import FilterModal from "../components/FilterModal.jsx";

const Products = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [filterVal, setFilterVal] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    const {products, isLoading, error} = useProductContext();
    const {getProducts} = useProducts();
    const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const isFilter = filterOption.length > 0 && filterVal.length > 0;

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <main className="flex grow items-start justify-around gap-4 my-4 mx-4 relative">
            <div className="w-full">
                <ProductsHeader
                    onAddProduct={() => setIsAddModalOpen(true)}
                    setQuery={setQuery}
                    productCount={totalProducts}
                    onOpenFilters={() => setIsFilterModalOpen(true)}
                    isFilter={isFilter}
                />

                <ProductsContent
                    products={products}
                    query={query}
                    isLoading={isLoading}
                    error={error}
                    filterOption={filterOption}
                    filterValue={filterVal}
                />

                <AddProductModal
                    open={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />

                <FilterModal
                    open={isFilterModalOpen}
                    onClose={() => setIsFilterModalOpen(false)}
                    filterOption={filterOption}
                    setFilterOption={setFilterOption}
                    filterVal={filterVal}
                    setFilterVal={setFilterVal}
                />
            </div>
        </main>
    );
};

export default Products;
