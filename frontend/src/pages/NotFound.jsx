import React, {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.jsx";

const NotFound = () => {
    const {isAuthenticated} = useContext(AuthContext);
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-7xl font-bold text-gray-800">404</h1>
                <p className="mt-4 text-xl text-gray-600">
                    Oops! The page you&#39;re looking for doesn&#39;t exist.
                </p>
                <p className="mt-2 text-sm text-gray-500">
                    It might have been moved or deleted.
                </p>
                <div className="mt-6">
                    <a
                        href={isAuthenticated ? '/app' : '/'}
                        className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-500"
                    >
                        Go Back Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
