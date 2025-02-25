import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";
import VerifyOTPForm from "../components/VerifyOTPForm.jsx";

const VerifyOTP = () => {
    return (
        <div className='flex flex-col justify-center font-[Open Sans]'>
            <Header/>
            <div className='flex items-start justify-center gap-4 px-4 py-6'>
                <VerifyOTPForm/>
            </div>
            <Footer/>
        </div>
    );
};

export default VerifyOTP;