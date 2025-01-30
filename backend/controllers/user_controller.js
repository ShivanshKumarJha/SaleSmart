import bcrypt from "bcrypt";
import User from "../models/user.js";
import {createToken} from "../config/createToken.js";
import Product from "../models/product.js";

const postSignup = async (req, res) => {

    /*
        CODE FLOW:
        1. Get all the details from the req.body
        2. Check if the user email exists -> if it exists then throw error
        3. Also check if password === confirm_password -> if not throw error
        3. Else create an account in DB
    */

    try {
        const {name, email, password, confirm_password, image} = req.body;
        if (!name || !email || !password || !confirm_password) {
            return res.status(401).json({message: 'Please fill all the required fields'});
        }
        if (password !== confirm_password) {
            return res.status(401).json({message: 'Passwords do not match'});
        }

        const user = await User.findOne({email: email});
        if (user) {
            return res.status(401).json({message: 'User already exists'});
        }

        /* TODO : To do this in future when i write react code */
        // if (image) {
        //     image = await uploadToCloudinary(image, 'my-profile')
        // }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({name, email, password: hashedPassword, image});

        await newUser.save();
        return res.status(200).json({user: newUser});

    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
}


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
            return res.status(401).json({message: 'Please fill all the required fields'});
        }

        const doExist = await User.findOne({email}).select('-password -products');
        if (!doExist) {
            return res.status(401).json({message: 'User do not exists'});
        }
        const token = await createToken(doExist._id);
        return res.status(200).json({user: doExist, token});

    } catch (err) {
        console.log(err);
        return res.status(401).json({message: 'Please fill all the required fields'});
    }
}

const updateUser = async (req, res) => {

    /*
        CODE FLOW:
        1. Get the userId from the req.params
        2. Get the user from the userId and check the ownership
        3. Execute FindByIdAndUpdate with userId and req.body
        4. If it results in error - throw error else send response
    */

    try {
        const {userId} = req.params;
        // console.log(`Inside the updateUser controller : ${userId}`);
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const products = await Product.find().populate("user");
        const userProducts = products.filter(({user}) => user._id.toString() === userId);
        // console.log(userProducts);

        const updatedUser = await User.findByIdAndUpdate(userId, {...req.body, products: userProducts}, {
            new: true,
            runValidators: true
        }).select('-password');

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}


export {postLogin, postSignup, updateUser}