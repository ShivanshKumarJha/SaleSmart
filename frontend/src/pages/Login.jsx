import React from 'react';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import LoginForm from "../components/LoginForm.jsx";

const Login = () => {
    return (
        <div className='flex flex-col justify-center h-screen'>
            <Header/>
            <div className='flex items-start justify-center gap-4 grow px-4 py-6'>
                <LoginForm/>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;