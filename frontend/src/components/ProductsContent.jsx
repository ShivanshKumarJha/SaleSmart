import Product from "./Product.jsx";
import Error from "./Error.jsx";
import Loader from "./Loader.jsx";

const ProductsContent = ({products, query, isLoading, error, filterOption, filterValue, sortValue, sortOrder}) => {
    if (error) return <Error error={error}/>

    if (isLoading) {
        return <Loader/>
    }

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

    const finalProducts = [...filteredProducts].sort((a, b) => {
        let comparison = 0;

        if (sortValue === "price") {
            comparison = a.price - b.price;
        } else if (sortValue === "quantity") {
            comparison = a.quantity - b.quantity;
        } else if (sortValue === "date") {
            comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
        }

        return sortOrder === "asc" ? comparison : -comparison;
    });

    console.log(finalProducts);

    return (
        <div className='flex flex-col items-center justify-center gap-4 mb-12'>
            <ul className='flex flex-wrap items-start justify-around gap-6'>
                {finalProducts.filter((product) =>
                    product.productName.toLowerCase().includes(query)
                ).map((product) => (
                    <Product key={product._id} {...product} userName={product.user.name.split(' ')[0]}/>
                ))}
            </ul>
        </div>
    );
};

export default ProductsContent;