import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Products from "./pages/Products.jsx";
import User from "./pages/User.jsx";
import NotFound from "./pages/NotFound.jsx";
import VerifyOTP from "./pages/VerifyOTP.jsx";

import {useProducts} from "./hooks/useProducts.jsx";

const App = () => {
    const {getProducts} = useProducts();
    useEffect(() => {
        getProducts().then(() => console.log('Got all products'));
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='signup' element={<Signup/>}/>
                <Route path='verify-otp' element={<VerifyOTP/>}/>
                <Route
                    path='app'
                    element={
                        <ProtectedRoute>
                            <AppLayout/>
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate replace to='product'/>}/>
                    <Route path='product' element={<Products/>}/>
                    <Route path='user/:id' element={<User/>}/>
                </Route>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;