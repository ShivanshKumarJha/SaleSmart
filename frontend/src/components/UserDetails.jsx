import React from 'react';

const UserDetails = ({user}) => {
    return (
        <div className='w-full bg-white rounded-xl shadow-lg p-6'>
            <div className='flex flex-col items-center mb-6 space-y-4'>
                {user.user.image?.url && (
                    <div className='relative group'>
                        <img
                            src={user.user.image.url}
                            alt="Profile"
                            className='w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg'
                        />
                        <div
                            className='absolute inset-0 rounded-full border-2 border-orange-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300'/>
                    </div>
                )}
                <div className='text-center space-y-2'>
                    <h1 className='text-2xl font-bold text-gray-800 tracking-tight'>
                        {user.user.name}
                    </h1>
                    <p className='text-base text-gray-600 font-medium'>
                        {user.user.email}
                    </p>
                </div>
            </div>

            <div className='pt-6 border-t border-gray-100'>
                <div className='grid grid-cols-2 gap-4 text-sm'>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>
                            Account Created
                        </p>
                        <p className='text-gray-700 font-semibold'>
                            {new Date(user.user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className='p-3 bg-gray-50 rounded-lg'>
                        <p className='text-xs font-medium text-gray-500 uppercase tracking-wider mb-1'>
                            Last Updated
                        </p>
                        <p className='text-gray-700 font-semibold'>
                            {new Date(user.user.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;