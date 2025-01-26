import {createContext, useEffect, useReducer} from "react";

const initialState = {
    user: null,
}

/* 1. CREATING CONTEXT */
export const AuthContext = createContext(initialState);

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {...state, user: action.payload, isAuthenticated: true};
        case 'LOGOUT':
            return {...state, user: null, isAuthenticated: false};
        default:
            return state;
    }
}

/* 2. CREATING CONTEXT PROVIDER */
export function AuthProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    /* Setting the initial auth status */
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({type: 'LOGIN', payload: user})
        }
    }, []);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}