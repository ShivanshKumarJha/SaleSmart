import React, {useState} from 'react';
import {useProductContext} from '../contexts/ProductContext.jsx';
import ProductsHeader from '../components/ProductsHeader.jsx';
import ProductsContent from '../components/ProductsContent.jsx';
import AddProductModal from '../components/AddProductModal.jsx';
import FilterModal from "../components/FilterModal.jsx";
import SortModal from "../components/SortModal.jsx";

const Products = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [filterVal, setFilterVal] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);

    const {products, isLoading, error} = useProductContext();
    const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const isFilter = filterOption.length > 0 && filterVal.length > 0;
    const isSort = sortBy.length > 0;

    return (
        <main className="flex grow items-start justify-around gap-4 my-4 mx-4 relative">
            <div className="w-full">
                <ProductsHeader
                    onAddProduct={() => setIsAddModalOpen(true)}
                    setQuery={setQuery}
                    productCount={totalProducts}
                    onOpenFilters={() => setIsFilterModalOpen(true)}
                    isFilter={isFilter}
                    onOpenSort={() => setIsSortModalOpen(true)}
                    isSort={isSort}
                />

                <ProductsContent
                    products={products}
                    query={query}
                    isLoading={isLoading}
                    error={error}
                    filterOption={filterOption}
                    filterValue={filterVal}
                    sortValue={sortBy}
                    sortOrder={sortOrder}
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

                <SortModal
                    open={isSortModalOpen}
                    onClose={() => setIsSortModalOpen(false)}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
            </div>
        </main>
    );
};

export default Products;
