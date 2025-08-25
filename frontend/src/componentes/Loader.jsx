import React, { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

const Loader = () => {
    const { navigate } = useContext(AppContext);
    const { nextUrl } = useParams();

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`)

            }, 8000)
        }
    }, [nextUrl])
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-50 via-white to-indigo-50">

            {/* Spinner */}
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>

            {/* Loader Text */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Loading...</h1>
            <p className="text-gray-600 text-center text-base md:text-lg">
                Please wait while we fetch your data
            </p>
        </div>
    );
};

export default Loader;
