import React from 'react';
import {useAuth} from "../hooks/useAuth.jsx";
import UserDetails from "../components/UserDetails.jsx";
import ProductDetails from "../components/ProductDetails.jsx";

const User = () => {
    const {user} = useAuth();
    // console.log(user)

    if (!user?.user) {
        return (
            <main className='flex grow items-center justify-center bg-gray-50'>
                <p className='text-xl font-medium text-gray-500'>User not found</p>
            </main>
        );
    }

    return (
        <main className='flex grow bg-gray-50 p-6'>
            <div className='w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8'>
                <div className='lg:sticky lg:top-6 lg:h-fit w-full'>
                    <UserDetails user={user.user}/>
                </div>
                <div className='flex flex-col gap-8'>
                    <ProductDetails userId={user.user._id}/>
                </div>
            </div>
        </main>
    );
};

export default User;