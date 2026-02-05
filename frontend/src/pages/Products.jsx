import React, {useState, useEffect, useCallback} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useProductContext} from '../contexts/ProductContext.jsx';
import {useProducts} from '../hooks/useProducts.jsx';
import ProductsHeader from '../components/ProductsHeader.jsx';
import ProductsContent from '../components/ProductsContent.jsx';
import AddProductModal from '../components/AddProductModal.jsx';
import FilterModal from "../components/FilterModal.jsx";
import SortModal from "../components/SortModal.jsx";

const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [filterOption, setFilterOption] = useState('');
    const [filterVal, setFilterVal] = useState('');
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isSortModalOpen, setIsSortModalOpen] = useState(false);
    const [limit, setLimit] = useState(10);

    const {products, totalItems, currentPage, totalPages, isLoading, error} = useProductContext();
    const {getProducts} = useProducts();
    
    const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);
    const isFilter = filterOption.length > 0 && filterVal.length > 0;
    const isSort = sortBy.length > 0;

    // Get current page from URL
    const pageFromUrl = parseInt(searchParams.get('page')) || 1;

    // Fetch products when page, limit, query, filter, or sort changes
    useEffect(() => {
        const params = {
            page: pageFromUrl,
            limit: limit,
        };

        if (query) params.search = query;
        if (filterOption && filterVal) {
            params.filterOption = filterOption;
            params.filterValue = filterVal;
        }
        if (sortBy) {
            params.sortBy = sortBy;
            params.sortOrder = sortOrder;
        }

        getProducts(params);
    }, [pageFromUrl, limit, query, filterOption, filterVal, sortBy, sortOrder, getProducts]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setSearchParams({ page: newPage });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

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
                    isLoading={isLoading}
                    error={error}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    limit={limit}
                    onPageChange={handlePageChange}
                    onLimitChange={setLimit}
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
