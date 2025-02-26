import cloudinary from 'cloudinary';
import bcrypt from "bcrypt";
import * as fs from 'node:fs';

import User from '../models/user.js';
import Otp from "../models/otp.js";

import {createToken} from '../config/createToken.js';
import {uploadToCloudinary} from '../config/cloudinary.js';
import {sendVerificationEmail} from "../config/nodemailer.js";
import {BASE_URL} from "../utils/BASE_URL.js";

const postSignup = async (req, res) => {
    /*
          CODE FLOW:
          1. Extract name, email, password, confirm_password from req.body.
          2. Check if password === confirm_password -> if not throw error
          3. Also check if the user email exists -> if it exists then throw error
          4. Generate OTP
          5. Store temporary user data in session
          6. Save OTP in DB
          7. Send verification email
          8. Return success response
          8. Handle errors and return 500 if any issue occurs.
      */

    try {
        const {name, email, password, confirm_password} = req.body;
        const imageFile = req.file;

        if (!name || !email || !password || !confirm_password) {
            return res
                .status(401)
                .json({message: 'Please fill all the required fields'});
        }

        if (password !== confirm_password) {
            return res.status(401).json({message: 'Passwords do not match'});
        }

        const user = await User.findOne({email: email});
        if (user) {
            return res.status(401).json({message: 'User already exists'});
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        req.session.tempUser = {email, name, password, imageFile};

        await req.session.save();

        await Otp.findOneAndUpdate(
            {email},
            {otp, createdAt: Date.now()},
            {upsert: true}
        );
        await sendVerificationEmail(email, otp);

        return res.status(200).json({
            message: 'OTP sent to your email',
            email: email,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
};

const postLogin = async (req, res) => {
    /*
          CODE FLOW:
          1. Get the email and password along with validation
          2. Check if the email exists in DB, if DNE then throw error
          3. Create a token using JWT and send it along with user.name, user._id, user.email
      */

    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res
                .status(401)
                .json({message: 'Please fill all the required fields'});
        }

        const doExist = await User.findOne({email}).select('-password -products');
        if (!doExist) {
            return res.status(401).json({message: 'User do not exists'});
        }
        const token = await createToken(doExist._id);
        return res.status(200).json({user: doExist, token});
    } catch (err) {
        console.log(err);
        return res
            .status(401)
            .json({message: 'Please fill all the required fields'});
    }
};

const updateUser = async (req, res) => {
    /*
          CODE FLOW:
          1. Extract `userId` from `req.params`, `{ name, email }` from `req.body`.
          2. Fetch user; return `404` if not found.
          3. Set `imageData` from existing user image.
          4. If a new image is uploaded:
              - Upload to Cloudinary, store `publicId` & `url`.
              - Delete old image from Cloudinary (if exists).
              - Remove temp file from the server.
          5. Fetch and associate user's products.
          6. Update user with new details and return updated data.
          7. Handle errors and return `500` if any issue occurs.
      */

    try {
        const {userId} = req.params;
        const imageFile = req.file;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({message: 'User not found'});
        const userProducts = user.products;

        let imageData = user.image || {};

        if (imageFile) {
            const result = await uploadToCloudinary(imageFile.path, 'my-profile');
            imageData = {publicId: result.publicId, url: result.url};
            if (user.image?.publicId) {
                await cloudinary.uploader.destroy(user.image.publicId);
            }

            fs.unlinkSync(imageFile.path);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {...req.body, products: userProducts, image: imageData},
            {
                new: true,
                runValidators: true,
            }
        ).select('-password');

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Update User Error:', err);
        res.status(500).json({message: 'Server error'});
    }
};

const verifyOTP = async (req, res) => {
    /*
        CODE FLOW:
        1. Extract email and OTP from request body
        2. Validate OTP existence and match along with expiration
        3. Verify session validity
        4. Process image upload (if any)
        5. Hash password and save it in the DB
        6. Generate JWT token
        7. Cleanup OTP
        8. Prepare response data and return it as response
        9. Handle errors
    */

    try {
        const {email, otp} = req.body;
        console.log(`Processing OTP verification for email: ${email}, Session ID: ${req.sessionID}`);
        console.log(`Current session data:`, req.session);

        const storedOTP = await Otp.findOne({email});
        if (!storedOTP || storedOTP.otp !== otp) {
            return res.status(400).json({message: 'Invalid Otp'});
        }

        if (Date.now() > new Date(storedOTP.createdAt).getTime() + 600000) {
            return res.status(400).json({message: 'OTP expired'});
        }

        if (!req.session.tempUser || req.session.tempUser.email !== email) {
            console.log(`Session validation failed. Session tempUser:`, req.session.tempUser);
            return res.status(400).json({message: 'Session expired. Please restart registration.'});
        }

        const {name, password, imageFile} = req.session.tempUser;

        let imageData = null;
        if (imageFile) {
            try {
                const cloudinaryResult = await uploadToCloudinary(
                    imageFile.path,
                    'my-profile'
                );
                fs.unlinkSync(imageFile.path);
                imageData = {
                    publicId: cloudinaryResult.publicId,
                    url: cloudinaryResult.url,
                };
            } catch (uploadError) {
                fs.unlinkSync(imageFile.path);
                return res.status(500).json({message: 'Image upload failed'});
            }
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            image: imageData || {publicId: '', url: ''},
        });
        await newUser.save();
        const token = await createToken(newUser._id);

        await Otp.deleteOne({email});

        req.session.user = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email
        };

        await new Promise((resolve, reject) => {
            req.session.save(err => {
                if (err) reject(err);
                else resolve();
            });
        });

        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            products: newUser.products,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };

        return res.status(200)
            .header('Access-Control-Allow-Origin', BASE_URL)
            .header('Access-Control-Allow-Credentials', 'true')
            .json({user: userResponse, token: token});
    } catch (err) {
        console.error('OTP verification error:', err);
        return res.status(500).json({message: 'Server error'});
    }
}

/* TODO : TO CHECK IN FUTURE */
const resendOTP = async (req, res) => {
    try {
        const {email} = req.body;
        const newOTP = Math.floor(100000 + Math.random() * 900000).toString();

        await Otp.findOneAndUpdate(
            {email},
            {otp: newOTP, createdAt: Date.now()},
            {upsert: true}
        );
        await sendVerificationEmail(email, newOTP);

        return res.status(200).json({message: 'New OTP sent'});
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: 'Server error'});
    }
};

export {postLogin, postSignup, updateUser, verifyOTP, resendOTP};
