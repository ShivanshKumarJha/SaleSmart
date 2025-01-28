import {createContext, useContext, useReducer} from "react";

const initialState = {
    products: []
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {products: action.payload}
        case 'ADD_PRODUCT':
            return {products: [...state.products, action.payload]}
        case 'DELETE_PRODUCT':
            return {products: state.products.filter(product => product.id !== action.payload)}
        case 'EDIT_PRODUCT':
            return {...state}
        default:
            return state;
    }
}

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProductContext.Provider value={{...state, dispatch}}>
            {children}
        </ProductContext.Provider>
    );
}

export const useProduct = () => {
    const productContext = useContext(ProductContext);
    if (!productContext) {
        throw Error('useProductContext must be used inside an ProductContextProvider');
    }
    return productContext;
}