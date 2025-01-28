import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import LinkButton from "../components/LinkButton.jsx";

const HomePage = () => {
    return (
        <div className='flex flex-col justify-center h-screen font-[Open Sans]'>
            <Header/>
            <main
                className='flex flex-col grow items-center justify-around'
            >
                <p className='p-2 text-4xl font-bold text-gray-800 text-center mb-4 tracking-widest uppercase'>
                    Welcome to Website
                </p>

                <LinkButton
                    to='/app/product'
                    className='inline-block text-lg rounded-full bg-slate-600 hover:bg-slate-700 font-semibold uppercase text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 cursor-pointer px-6 py-3 md:px-8 md:py-4 w-24 sm:w-28 text-center tracking-widest shadow-lg hover:shadow-xl'
                >
                    Visit
                </LinkButton>
                <p></p>
            </main>
            <Footer/>
        </div>
    );
};

export default HomePage;