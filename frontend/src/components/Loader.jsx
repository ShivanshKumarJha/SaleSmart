import React from 'react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-400 border-t-transparent"></div>
            <p className="text-gray-600 font-semibold">Loading Products...</p>
        </div>
    );
};

export default Loader;