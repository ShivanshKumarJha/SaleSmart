import Product from "./Product.jsx";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";
import ReactPaginate from 'react-paginate';

const ProductsContent = ({
    products, 
    isLoading, 
    error, 
    currentPage, 
    totalPages, 
    totalItems,
    limit,
    onPageChange,
    onLimitChange
}) => {
    if (error) return <Error error={error}/>

    if (isLoading) {
        return <Loader/>
    }

    const handlePageClick = (event) => {
        onPageChange(event.selected + 1); // react-paginate uses 0-based indexing
    };

    const handleLimitChange = (e) => {
        onLimitChange(parseInt(e.target.value));
        onPageChange(1); // Reset to first page when changing limit
    };

    return (
        <div className='flex flex-col items-center justify-center gap-4 mb-12'>
            {/* Pagination info and limit selector */}
            <div className='w-full flex items-center justify-between px-4 py-2'>
                <div className='flex items-center gap-2'>
                    <span className='text-sm text-gray-600'>Items per page:</span>
                    <select 
                        value={limit} 
                        onChange={handleLimitChange}
                        className='px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500'
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={100}>100</option>
                    </select>
                </div>
                <div className='text-sm text-gray-600'>
                    Page {currentPage} of {totalPages} ({totalItems} total items)
                </div>
            </div>

            {/* Products list */}
            <ul className='flex flex-wrap items-start justify-around gap-6'>
                {products.map((product) => (
                    <Product key={product._id} {...product} userName={product.user.name.split(' ')[0]}/>
                ))}
            </ul>

            {/* No products message */}
            {products.length === 0 && !isLoading && (
                <div className='text-center py-8 text-gray-500'>
                    No products found
                </div>
            )}

            {/* Pagination controls */}
            {totalPages > 1 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={totalPages}
                    previousLabel="< Previous"
                    forcePage={currentPage - 1} // react-paginate uses 0-based indexing
                    renderOnZeroPageCount={null}
                    containerClassName="flex items-center gap-2 mt-4"
                    pageClassName="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer"
                    pageLinkClassName="block w-full h-full"
                    activeClassName="bg-orange-500 text-white hover:bg-orange-600 border-orange-500"
                    previousClassName={`px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer ${currentPage === 1 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    nextClassName={`px-4 py-1 border border-gray-300 rounded-md hover:bg-gray-100 cursor-pointer ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    previousLinkClassName="block w-full h-full"
                    nextLinkClassName="block w-full h-full"
                    breakClassName="px-3 py-1"
                    disabledClassName="opacity-50 cursor-not-allowed"
                />
            )}
        </div>
    );
};

export default ProductsContent;