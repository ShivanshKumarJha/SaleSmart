import React from 'react';
import {useAuth} from "../hooks/useAuth.jsx";

const PageNav = () => {
    const {isAuthenticated} = useAuth();
    return (
        <nav>
            <h1>Sales Report Generator</h1>
            <ul>
                <li>Home</li>
                <li>Products</li>
                <li>{isAuthenticated ? 'Logout' : 'Login'}</li>
            </ul>
        </nav>
    );
};

export default PageNav;