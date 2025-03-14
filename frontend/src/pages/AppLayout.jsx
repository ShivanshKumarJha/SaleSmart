import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const AppLayout = () => {
    return (
        <div className='flex flex-col justify-center font-[Open Sans] min-h-screen'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AppLayout;