import React from 'react';
import {Link} from "react-router-dom";

const LinkButton = ({children, to, onClick, className = ''}) => {
    if (onClick) {
        return <Link className={`${className || 'hover:text-amber-50'}`}
                     onClick={onClick}>{children}</Link>;
    }
    return (
        <Link to={to} className={`${className || 'hover:text-amber-50'}`}>{children}</Link>
    );
};

export default LinkButton;