import React from 'react';
import PageNav from "../components/PageNav.jsx";
import Footer from "../components/Footer.jsx";
import LoginForm from "../components/LoginForm.jsx";

const Login = () => {
    return (
        <div className='flex flex-col justify-center h-screen'>
            <PageNav/>
            <div className='flex items-start justify-center gap-4 grow'>
                <LoginForm/>
            </div>
            <Footer/>
        </div>
    );
};

export default Login;