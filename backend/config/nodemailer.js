import nodemailer from 'nodemailer';
import {USER_EMAIL, USER_PASS} from "./environments.js";
import {BASE_URL} from "../utils/BASE_URL.js";

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: USER_EMAIL,
        pass: USER_PASS
    }
})

export const sendVerificationEmail = async (email, otp) => {
    const mailOptions = {
        from: USER_EMAIL,
        to: email,
        subject: 'Verify Your Email Address',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Email Verification</h2>
            <p>Your OTP code is: <strong>${otp}</strong></p>
            <p>This code will expire in 10 minutes.</p>
            <p>Or click this link to verify:</p>
            <a href="${BASE_URL}/verify-otp?email=${email}&otp=${otp}" 
               style="background-color: #2563eb; color: white; padding: 10px 20px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email
            </a>
          </div>
        `
    }

    await transporter.sendMail(mailOptions);
}