import bcrypt from 'bcrypt';
import User from '../models/user.js';
import {createToken} from '../config/createToken.js';
import cloudinary from 'cloudinary';
import {uploadToCloudinary} from '../config/cloudinary.js';
import * as fs from 'node:fs';

const postSignup = async (req, res) => {
    /*
          CODE FLOW:
          1. Extract name, email, password, confirm_password from req.body.
          2. Check if password === confirm_password -> if not throw error
          3. Also check if the user email exists -> if it exists then throw error
          4. If an image is uploaded:
              - Upload to Cloudinary, store publicId & url.
          6. Hash the password and create a new user in DB.
          7. Return user details (excluding password) in response.
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

        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            image: newUser.image,
            products: newUser.products,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
        };
        return res.status(200).json({user: userResponse});
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

export {postLogin, postSignup, updateUser};
