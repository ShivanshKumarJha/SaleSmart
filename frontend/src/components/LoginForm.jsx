import React, {useEffect, useState} from 'react';
import {useLogin} from "../hooks/useLogin.jsx";
import {useAuth} from "../hooks/useAuth.jsx";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {login, isLoading, error} = useLogin();
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        if (!email || !password) return;
        await login(email, password);
    }

    useEffect(
        () => {
            if (isAuthenticated) {
                navigate('/app');
            }
        },
        [isAuthenticated, navigate],
        {replace: true}
    );

    return (
        <form className='flex flex-col justify-center gap-4' method='POST' onSubmit={handleSubmit}>
            <h1 className='text-2xl font-bold'>Login Form</h1>

            <input type='text' name='email' placeholder='Email' value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className='border border-gray-200 rounded-sm p-1 text-black'/>

            <input type='password' name='password' placeholder='Password' value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className='border border-gray-200 rounded-sm p-1'/>

            <button type='submit' disabled={isLoading} className='border border-green-400 cursor-pointer'>
                Login
            </button>

            {error && <p>Some Error occurred!</p>}
        </form>

    );
};

export default LoginForm;