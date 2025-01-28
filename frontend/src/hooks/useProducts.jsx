import {useState} from "react";
import {useProduct} from "../contexts/ProductContext.jsx";
import BASE_URL from "../constants/BASE_URL.js";

export const useProducts = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const {dispatch} = useProduct();

    /* To get all the products */
    async function getProducts() {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}`);
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            dispatch({type: 'GET_PRODUCTS', payload: json});
            setIsLoading(false);
            setError(null);
        }
    }


    /* To add the product */
    async function addProduct({productName, price, quantity, category}) {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/product`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({productName, price, quantity, category}),
        })

        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            dispatch({type: 'ADD_PRODUCT', payload: json});
            setIsLoading(false);
            setError(null);
        }
    }


    /* To update the product Details */
    async function updateProduct(productId) {
    }


    /* To delete the product */
    async function deleteProduct(productId) {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/${productId}`, {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}
        })
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        } else {
            dispatch({type: 'DELETE_PRODUCT', payload: productId});
            setIsLoading(false);
            setError(null);
        }
    }

    return {isLoading, error, getProducts, addProduct, updateProduct, deleteProduct};
}