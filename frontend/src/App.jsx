import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Product from "./pages/Product.jsx";
import User from "./components/User.jsx";

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
                    <Route path='user/:id' element={<User/>}/>
                    <Route path='product' element={<Product/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;