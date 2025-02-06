import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {ProductContextProvider} from "./contexts/ProductContext.jsx";
import {Bounce, ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ProductContextProvider>
                <App/>
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
            </ProductContextProvider>
        </AuthProvider>
    </StrictMode>,
)