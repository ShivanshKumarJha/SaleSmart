import {createContext, useEffect, useReducer, useState} from "react";

const initialState = {
    user: null,
    isAuthenticated: false
}

/* 1. CREATING CONTEXT */
export const AuthContext = createContext(initialState);

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload, isAuthenticated: true};
        case 'LOGOUT':
            return {...state, user: null, isAuthenticated: false};
        case 'UPDATE_USER':
            return {...state, user: {...state.user, user: action.payload}, isAuthenticated: true};
        default:
            return state;
    }
}

/* 2. CREATING CONTEXT PROVIDER */
export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    /* Setting the initial auth status */
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
        setIsCheckingAuth(false);
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch, isCheckingAuth}}>
            {children}
        </AuthContext.Provider>
    );
}