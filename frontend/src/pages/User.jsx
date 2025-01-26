import React from 'react';
import {useParams} from "react-router-dom";

const User = () => {
    const {id} = useParams();
    return (
        <main className='flex grow'>
            This is the User page : {id}
        </main>
    );
};

export default User;