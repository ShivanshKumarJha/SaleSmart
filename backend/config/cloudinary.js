import {v2 as cloudinary} from 'cloudinary';
import {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME} from "./environments.js";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (path, folder = 'my-profile') => {
    try {
        const data = await cloudinary.uploader.upload(path, {folder: folder});
        return {url: data.secure_url, publicId: data.public_id};
    } catch (error) {
        console.log(error);
    }
}