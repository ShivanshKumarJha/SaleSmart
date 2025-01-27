import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const HomePage = () => {
    return (
        <div className='flex flex-col justify-center h-screen'>
            <Header/>
            {/* TODO Let's do in the future */}
            {/*<main className='flex grow p-1 m-1'>
                This is the landing page of this website and contains all the products added by different user.
            </main>*/}
            <main
                className='flex grow bg-[url("/src/assets/bg.png")] bg-cover bg-center bg-no-repeat justify-center'
            >
                <p className='p-2 text-3xl font-bold text-black-800 uppercase text-center'>
                    HOME PAGE
                </p>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;