import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {useLogin} from "../hooks/useLogin.jsx";
import {useAuth} from "../hooks/useAuth.jsx";
import Button from "./Button.jsx";

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
            <h1 className='text-xl font-bold text-center uppercase tracking-widest'>Login form</h1>

            <input type='text' name='email' placeholder='Email' value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className='border border-gray-200 rounded-sm p-2 text-black w-72'/>

            <input type='password' name='password' placeholder='Password' value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className='border border-gray-200 rounded-sm p-2 text-black w-72'/>

            <Button type="submit" disabled={isLoading}
                    variant='primary'>{isLoading ? 'Logging in...' : 'Login'}</Button>

            {error && <p className="text-red-500 text-sm text-center">⚠️ {error}</p>}

            <div className="mt-2 flex flex-col items-center gap-2">
                <span className="text-gray-600 text-sm">Don&#39;t have an account?</span>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/signup')}
                >
                    Create New Account
                </Button>
            </div>
        </form>

    );
};

export default LoginForm;