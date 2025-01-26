import React from 'react';
import PageNav from "../components/PageNav.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
    return (
        <div className='flex flex-col justify-center h-screen'>
            <PageNav/>
            <main className='bg-orange-200 flex grow'>
                This is the landing page of this website
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;