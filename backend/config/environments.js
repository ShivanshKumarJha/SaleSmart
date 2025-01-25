import dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 6001;
const JWT_SECRET = process.env.JWT_SECRET;

export {MONGODB_URI, PORT, JWT_SECRET};