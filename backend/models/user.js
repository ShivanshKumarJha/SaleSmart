import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: ''
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;