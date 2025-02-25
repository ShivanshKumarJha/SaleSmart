import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 6001;
const SESSION_SECRET = process.env.SESSION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const LOCALHOST_URL = process.env.LOCALHOST_URL;
const PRODUCTION_URL = process.env.PRODUCTION_URL;
const USER_EMAIL = process.env.USER_EMAIL;
const USER_PASS = process.env.USER_PASS;
const NODE_ENV = process.env.NODE_ENV;

export {
    MONGODB_URI,
    PORT,
    SESSION_SECRET,
    JWT_SECRET,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    LOCALHOST_URL,
    PRODUCTION_URL,
    USER_EMAIL,
    USER_PASS,
    NODE_ENV
};