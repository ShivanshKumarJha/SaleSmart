import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {ProductContextProvider} from "./contexts/ProductContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <ProductContextProvider>
                <App/>
            </ProductContextProvider>
        </AuthProvider>
    </StrictMode>,
)
