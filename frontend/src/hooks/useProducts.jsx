import { useState } from 'react';
import { useProductContext } from '../contexts/ProductContext.jsx';
import BASE_URL from '../constants/BASE_URL.js';
import { useAuth } from './useAuth.jsx';

export const useProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useProductContext();
  const { user } = useAuth();

  /* To get Authorization header */
  const getAuthHeader = () => {
    const token = user?.token;
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
  };

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
      dispatch({ type: 'SET_PRODUCTS', payload: json });
      setIsLoading(false);
      setError(null);
    }
  }

  /* To add the product */
  async function addProduct({ productName, price, quantity, category }) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BASE_URL}/product`, {
      method: 'POST',
      headers: getAuthHeader(),
      body: JSON.stringify({ productName, price, quantity, category }),
    });

    const json = await response.json();
    // console.log(`Successfully added: ${JSON.stringify(json)}`);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: json });
      setIsLoading(false);
      setError(null);
    }
  }

  /* To update the product Details */
  async function updateProduct(productId, updatedFields) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/product/${productId}`, {
        method: 'PATCH',
        headers: getAuthHeader(),
        body: JSON.stringify(updatedFields),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.message || 'Failed to update product');
      } else {
        dispatch({
          type: 'UPDATE_PRODUCT',
          payload: {
            productId,
            updatedProduct: json,
          },
        });
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred while updating the product');
    }
  }

  /* To delete the product */
  async function deleteProduct(productId) {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${BASE_URL}/product/${productId}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    const json = await response.json();
    // console.log(json)

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    } else {
      dispatch({ type: 'DELETE_PRODUCT', payload: productId });
      setIsLoading(false);
      setError(null);
    }
  }

  return {
    isLoading,
    error,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
