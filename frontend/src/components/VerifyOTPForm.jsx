import React, {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.jsx";
import BASE_URL from "../constants/BASE_URL.js";

const VerifyOTPForm = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const {dispatch} = useAuth();
    const {email} = location.state || {};
    // console.log(`INSIDE THE VERIFY OTP FORM from location.state.email: ${email}`);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if (!email) {
            setError('Email not found. Please go back to signup.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/user/verify-otp`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, otp}),
                credentials: 'include',
            });

            const data = await response.json();
            // console.log(data);

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            localStorage.setItem('user', JSON.stringify(data));
            dispatch({type: 'LOGIN', payload: data});
            navigate('/app');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className='mb-4 text-center'>
                <h2 className="text-2xl font-bold uppercase mb-2">Verify OTP</h2>
            </div>

            <form onSubmit={handleSubmit} className="w-full max-w-sm px-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                        Enter OTP sent to {email || "your email"}
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter 6-digit code"
                            maxLength="6"
                            pattern="\d{6}"
                            required
                        />
                    </label>
                </div>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>
            </form>
        </div>
    );
};

export default VerifyOTPForm;