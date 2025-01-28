import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const AppLayout = () => {
    return (
        <div className='flex flex-col justify-center h-screen font-[Open Sans]'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AppLayout;