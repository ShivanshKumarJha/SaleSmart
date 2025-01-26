import React from 'react';
import {Outlet} from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <Outlet/>
            App Layout
        </div>
    );
};

export default AppLayout;