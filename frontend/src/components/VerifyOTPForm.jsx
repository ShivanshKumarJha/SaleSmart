import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.jsx";
import BASE_URL from "../constants/BASE_URL.js";

const OTP_DURATION = 15 * 60;

const VerifyOTPForm = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(OTP_DURATION);
    const [expirationTime, setExpirationTime] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const {dispatch} = useAuth();
    const {email} = location.state || {};

    useEffect(() => {
        if (!email) {
            navigate('/signup');
            return;
        }

        const storedExpiration = localStorage.getItem('otpExpiration');
        let initialExpiration;

        if (storedExpiration) {
            initialExpiration = parseInt(storedExpiration);
        } else {
            initialExpiration = Date.now() + OTP_DURATION * 1000;
            localStorage.setItem('otpExpiration', initialExpiration.toString());
        }

        setExpirationTime(initialExpiration);

        const calculateTimeLeft = () => {
            const now = Date.now();
            return Math.max(0, Math.floor((initialExpiration - now) / 1000));
        };
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            const remaining = calculateTimeLeft();
            setTimeLeft(remaining);

            if (remaining <= 0) {
                clearInterval(timer);
                localStorage.removeItem('otpExpiration');
            }
        }, 1000);

        return () => {
            clearInterval(timer);
            if (timeLeft <= 0) {
                localStorage.removeItem('otpExpiration');
            }
        };
    }, [timeLeft, email, navigate]);

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

            if (!response.ok) {
                throw new Error(data.message || 'Verification failed');
            }

            localStorage.removeItem('otpExpiration');
            localStorage.setItem('user', JSON.stringify(data));
            dispatch({type: 'LOGIN', payload: data});
            navigate('/app');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (!email) {
            setError('Email not found. Please go back to signup.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(`${BASE_URL}/user/resend-otp`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email}),
                credentials: 'include',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to resend OTP');
            }

            const newExpiration = Date.now() + OTP_DURATION * 1000;
            localStorage.setItem('otpExpiration', newExpiration.toString());
            setExpirationTime(newExpiration);
            setTimeLeft(OTP_DURATION);

            setError('');
            alert('New OTP has been sent to your email.');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className='mb-4 text-center'>
                <h2 className="text-2xl font-bold uppercase mb-2">Verify OTP</h2>
                {timeLeft > 0 ? (
                    <div className="text-sm text-red-600">
                        Time remaining: {formatTime(timeLeft)}
                    </div>
                ) : (
                    <div className="text-sm text-red-600">
                        OTP has expired. Please request a new one.
                    </div>
                )}
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
                    disabled={isLoading || timeLeft <= 0}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-3"
                >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                </button>

                {timeLeft <= 0 && (
                    <button
                        type="button"
                        onClick={handleResendOTP}
                        disabled={isLoading}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Processing...' : 'Resend OTP'}
                    </button>
                )}
            </form>
        </div>
    );
};

export default VerifyOTPForm;