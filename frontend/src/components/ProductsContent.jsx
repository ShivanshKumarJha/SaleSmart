import Product from "./Product.jsx";
import Loader from "./Loader.jsx";

const ProductsContent = ({products, query, isLoading, error, filterOption, filterValue}) => {
    const filteredProducts = products.filter(product => {
        const productName = product.productName?.toLowerCase() || '';
        const adminName = product.user.name?.toLowerCase() || '';
        const productCategory = product.category?.toLowerCase() || '';

        const searchQuery = query.toLowerCase();
        const filterQuery = filterValue?.toLowerCase() || '';
        const matchesSearch = productName.includes(searchQuery);

        let matchesFilter = true;
        if (filterOption && filterQuery) {
            switch (filterOption) {
                case 'name':
                    matchesFilter = adminName.includes(filterQuery);
                    break;
                case 'category':
                    matchesFilter = productCategory.includes(filterQuery);
                    break;
                default:
                    matchesFilter = true;
            }
        }

        // Return the product if it matches with query and filter option
        return matchesSearch && matchesFilter;
    });

    return (
        <div className='flex flex-col items-center justify-center gap-4 mb-12'>
            {!isLoading ? (
                <ul className='flex flex-wrap items-start justify-around gap-6'>
                    {filteredProducts.filter((product) =>
                        product.productName.toLowerCase().includes(query)
                    ).map((product) => (
                        <Product key={product._id} {...product} userName={product.user.name.split(' ')[0]}/>
                    ))}
                </ul>
            ) : (
                <Loader/>
            )}
        </div>
    );
};

export default ProductsContent;