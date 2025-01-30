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
    const {user} = useAuth();

    return (
        <header
            className='flex items-center justify-between bg-orange-800 text-amber-200 p-2 font-[Helvetica]'>
            <h1 className='text-xl md:text-3xl text-black-800 font-bold hover:text-amber-50'>
                <Link to='/' className='tracking-wide'>SaleSmart</Link>
            </h1>
            <ul className='flex items-center justify-between space-x-4 sm:text-lg md:text-xl'>
                <LinkButton to='/'>Home</LinkButton>
                {isAuthenticated && <LinkButton to='/app/product'>Products</LinkButton>}
                {isAuthenticated && <LinkButton to={`/app/user/${user.user._id}`}>{user.user?.name}</LinkButton>}
                {!isAuthenticated ? <LinkButton to={toNavigate}>{toNav}</LinkButton> :
                    <LinkButton onClick={logout}>Logout</LinkButton>}
            </ul>
        </header>
    );
};

export default Header;

