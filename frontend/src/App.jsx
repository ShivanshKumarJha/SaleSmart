import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Products from "./pages/Products.jsx";
import User from "./pages/User.jsx";
import NotFound from "./pages/NotFound.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='signup' element={<Signup/>}/>
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