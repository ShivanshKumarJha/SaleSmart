import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Signup = () => {
    return (
        <div className='flex flex-col justify-center h-screen font-[Open Sans]'>
            <Header/>
            <main className='bg-orange-200 flex grow'>
                This is the signup page of this website
            </main>
            <Footer/>
        </div>
    );
};

export default Signup;