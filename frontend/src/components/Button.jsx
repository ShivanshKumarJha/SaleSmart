import React from 'react';

const Button = ({children, type, disabled}) => {
    return (
        <button type={type} disabled={disabled}
                className='inline-block text-sm rounded-full bg-green-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-green-300 focus:bg-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-offset-2 cursor-pointer px-4 py-3 md:px-6 md:py-4'>
            {children}
        </button>
    );
};

export default Button;