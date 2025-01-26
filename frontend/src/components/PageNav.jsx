import React from 'react';
import {useAuth} from "../hooks/useAuth.jsx";

const PageNav = () => {
    const {isAuthenticated} = useAuth();
    return (
        <nav className='flex items-center justify-between bg-orange-800 text-amber-200 p-2'>
            <h1 className='text-black-800 font-bold uppercase'>Sales Report Generator</h1>
            <ul className='flex items-center justify-between space-x-4'>
                <li>Home</li>
                <li>Products</li>
                <li>{isAuthenticated ? 'Logout' : 'Login'}</li>
            </ul>
        </nav>
    );
};

export default PageNav;