import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.jsx';
import {useSignup} from '../hooks/useSignup.jsx';
import Button from './Button.jsx';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password: '',
        image: null,
    });

    const [validationError, setValidationError] = useState('');

    const {signup, isLoading, error} = useSignup();
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleChange = e => {
        const {name, value, files} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setValidationError('');

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirm_password
        ) {
            return setValidationError('Please fill all required fields');
        }
        if (formData.password !== formData.confirm_password) {
            return setValidationError('Passwords do not match');
        }

        const newUser = new FormData();
        newUser.append('name', formData.name);
        newUser.append('email', formData.email);
        newUser.append('password', formData.password);
        newUser.append('confirm_password', formData.confirm_password);
        if (formData.image) {
            newUser.append('image', formData.image);
        }
        // console.log(newUser)

        await signup(newUser);
        navigate('/login');
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/app');
        }
    }, [isAuthenticated, navigate]);

    return (
        <form
            className="flex flex-col justify-center gap-4"
            onSubmit={handleSubmit}
        >
            <h1 className="text-xl font-bold text-center uppercase tracking-widest">
                Create Account
            </h1>

            <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">
                    Profile Image (optional)
                </label>
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="border border-gray-200 rounded-sm p-2 text-black w-72"
                />
            </div>

            <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            {validationError && (
                <p className="text-red-500 text-sm text-center">⚠️ {validationError}</p>
            )}
            {error && <p className="text-red-500 text-sm text-center">⚠️ {error}</p>}

            <div className="mt-2 flex flex-col items-center gap-2">
                <span className="text-gray-600 text-sm">Already have an account?</span>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => navigate('/login')}
                >
                    Login Instead
                </Button>
            </div>
        </form>
    );
};

export default SignupForm;
