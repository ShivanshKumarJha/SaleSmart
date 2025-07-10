import mongoose from 'mongoose';
import { MONGODB_URI } from './environments.js';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(`Failed to connect to MongoDB : ${error}`);
    process.exit(1);
  }
};
