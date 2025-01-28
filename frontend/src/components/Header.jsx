import React from 'react';
import {useAuth} from "../hooks/useAuth.jsx";
import LinkButton from "./LinkButton.jsx";
import {Link} from "react-router-dom";
import {useLogout} from "../hooks/useLogout.jsx";

const Header = () => {
    const {isAuthenticated} = useAuth();
    const {logout} = useLogout();
    const toNav = isAuthenticated ? 'Logout' : 'Login';
    const toNavigate = isAuthenticated ? '/logout' : '/login';

    return (
        <header className='flex items-center justify-between bg-orange-800 text-amber-200 p-2 '>
            <h1 className='text-xl text-black-800 font-bold uppercase hover:text-amber-50'>
                <Link to='/' className='tracking-wide'>Sales Report Generator</Link>
            </h1>
            <ul className='flex items-center justify-between space-x-4 text-lg'>
                <LinkButton to='/'>Home</LinkButton>
                {isAuthenticated && <LinkButton to='/app/product'>Products</LinkButton>}
                {!isAuthenticated ? <LinkButton to={toNavigate}>{toNav}</LinkButton> :
                    <LinkButton onClick={logout}>Logout</LinkButton>}
            </ul>
        </header>
    );
};

export default Header;