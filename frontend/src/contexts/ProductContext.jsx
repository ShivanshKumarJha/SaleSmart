import {createContext, useContext, useReducer} from "react";

const initialState = {
    products: []
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {...state, products: action.payload};
        case 'ADD_PRODUCT':
            return {...state, products: [action.payload, ...state.products]};
        case 'DELETE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload)
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                products: state.products.map(product =>
                    product._id === action.payload.productId
                        ? {...product, ...action.payload.updatedProduct}
                        : product
                )
            };
        default:
            return state;
    }
};

export const ProductContext = createContext(initialState);

export const ProductContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProductContext.Provider value={{...state, dispatch}}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProduct must be used within a ProductContextProvider');
    }
    return context;
};