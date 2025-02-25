import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth.jsx';
import {useSignup} from '../hooks/useSignup.jsx';
import Button from './Button.jsx';

const SignupForm = () => {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [validationError, setValidationError] = useState('');

    const {signup, isLoading, error} = useSignup();
    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');

        if (!formValues.name || !formValues.email ||
            !formValues.password || !formValues.confirmPassword) {
            return setValidationError('Please fill all required fields');
        }

        if (formValues.password !== formValues.confirmPassword) {
            return setValidationError('Passwords do not match');
        }

        const formData = new FormData();
        formData.append('name', formValues.name);
        formData.append('email', formValues.email);
        formData.append('password', formValues.password);
        formData.append('confirm_password', formValues.confirmPassword);
        if (profileImage) {
            formData.append('image', profileImage);
        }

        await signup(formData);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setProfileImage(e.target.files[0]);
        }
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
                placeholder="Full Name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <input
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) => setFormValues({...formValues, email: e.target.value})}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <input
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) => setFormValues({...formValues, password: e.target.value})}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={(e) => setFormValues({...formValues, confirmPassword: e.target.value})}
                className="border border-gray-200 rounded-sm p-2 text-black w-72"
                required
            />

            <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">
                    Profile Image (optional)
                </label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
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