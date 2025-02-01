const Button = ({children, type, disabled, onClick, variant = 'primary'}) => {
    const baseStyles = 'inline-block text-sm rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2';

    const variants = {
        primary: 'bg-green-400 text-stone-800 hover:bg-green-300 focus:bg-green-300 focus:ring-green-300 px-4 py-3 md:px-6 md:py-4',
        secondary: 'bg-transparent border-2 border-blue-600 text-stone-800 hover:bg-blue-200 focus:bg-blue-200 focus:ring-blue-200 px-4 py-3 md:px-4 md:py-2'
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            {children}
        </button>
    );
};

export default Button;