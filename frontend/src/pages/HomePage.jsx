import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import LinkButton from "../components/LinkButton.jsx";
import {useAuth} from "../hooks/useAuth.jsx";

const HomePage = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className='flex flex-col justify-center h-screen font-[Open Sans]'>
            <Header/>
            <main
                className='flex flex-col grow items-center justify-center relative before:content-[""] before:absolute before:inset-0 before:bg-[url("/src/assets/bg.png")] before:bg-cover before:bg-center before:bg-no-repeat before:opacity-30 before:-z-10'
            >
                <p className='p-2 text-2xl md:text-3xl font-bold text-gray-600 text-center mb-4 tracking-widest uppercase'>
                    Welcome to <strong className='text-gray-800 '>SaleSmart</strong>
                </p>

                <LinkButton
                    to={`${isAuthenticated ? '/app/product' : '/login'}`}
                    className='inline-block text-lg rounded-full bg-orange-500 hover:bg-orange-600 font-semibold uppercase text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 cursor-pointer px-6 py-3 md:px-8 md:py-4 w-32 sm:w-40 text-center tracking-widest shadow-md hover:shadow-lg'
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