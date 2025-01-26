import React from 'react';
import {Outlet} from "react-router-dom";
import PageNav from "../components/PageNav.jsx";
import Footer from "../components/Footer.jsx";

const AppLayout = () => {
    return (
        <div className='flex flex-col justify-center h-screen'>
            <PageNav/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AppLayout;