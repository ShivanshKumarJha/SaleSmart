import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './environments.js';

export const createToken = async _id => {
  return await jwt.sign({ _id }, JWT_SECRET, { expiresIn: '2d' });
};
