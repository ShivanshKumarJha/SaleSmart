import React, {useEffect, useState} from 'react';
import {useProductContext} from "../contexts/ProductContext.jsx";
import {useProducts} from "../hooks/useProducts.jsx";
import ProductsHeader from "../components/ProductsHeader.jsx";
import ProductsContent from "../components/ProductsContent.jsx";
import AddProductModal from "../components/AddProductModal.jsx";

const Products = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [query, setQuery] = useState("");
    
    const {products, isLoading, error} = useProductContext();
    const {getProducts} = useProducts();
    const totalProducts = products.reduce((acc, curr) => acc + curr.quantity, 0);

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
                />

                <ProductsContent
                    products={products}
                    query={query}
                    isLoading={isLoading}
                    error={error}
                />

                <AddProductModal
                    open={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </div>
        </main>
    );
};

export default Products;