import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import LinkButton from "../components/LinkButton.jsx";
import {useAuth} from "../hooks/useAuth.jsx";

const HomePage = () => {
    const {isAuthenticated} = useAuth();
    return (
        <div className='flex flex-col justify-center min-h-screen font-[Open Sans] w-full'>
            <Header/>

            <main className='flex flex-col grow items-center justify-center relative min-h-[calc(100vh-160px)]'>
                <div
                    className="absolute inset-0 -z-20 opacity-20 bg-[url('/src/assets/bg.png')] bg-cover bg-center bg-no-repeat"></div>

                <div className="flex flex-col items-center justify-center text-center z-10 space-y-6 px-4">
                    <h1 className='text-4xl md:text-6xl font-bold text-gray-800 tracking-tight'>
                        Welcome to{' '}
                        <span className='bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent'>
                            SaleSmart
                        </span>
                    </h1>

                    <p className='text-lg font-semibold md:text-xl text-gray-600 max-w-xl'>
                        Intelligent inventory management meets seamless sales tracking
                    </p>

                    <LinkButton
                        to={isAuthenticated ? '/app/product' : '/login'}
                        className='relative overflow-hidden group px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'
                    >
                        <span className="relative z-10">
                            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                        </span>
                    </LinkButton>
                </div>
            </main>

            <Footer/>
        </div>
    );
};

export default HomePage;