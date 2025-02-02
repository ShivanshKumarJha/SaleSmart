import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SignupForm from "../components/SignupForm.jsx";

const Signup = () => {
    return (
        <div className='flex flex-col justify-center font-[Open Sans]'>
            <Header/>
            <div className='flex items-start justify-center gap-4 grow px-4 py-6'>
                <SignupForm/>
            </div>
            <Footer/>
        </div>
    );
};

export default Signup;