import React from 'react';
import {Link} from "react-router-dom";

const LinkButton = ({children, to}) => {
    return (
        <Link to={to} className='hover:text-amber-50'>{children}</Link>
    );
};

export default LinkButton;