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
    image: {
        publicId: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
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