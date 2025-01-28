import {ExclamationTriangleIcon} from '@heroicons/react/24/solid';

const Error = ({error}) => {
    return (
        <div
            className="flex flex-col items-center justify-center w-full p-4 bg-gradient-to-b from-red-50 to-white animate-fade-in rounded-md"
        >
            <div className="animate-pulse">
                <ExclamationTriangleIcon
                    className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-24 text-red-400 mx-auto"/>
            </div>

            <h1 className="text-xl sm:text-lg md:text-xl font-semibold text-gray-800 tracking-wide">
                Oops! Something went wrong
            </h1>

            <p className="text-red-600 text-sm sm:text-base md:text-lg font-semibold">
                {error?.message || "Failed to load data"}
            </p>
        </div>
    );
};

export default Error;
