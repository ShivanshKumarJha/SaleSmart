import jwt from 'jsonwebtoken';
import {JWT_SECRET} from "./environments.js";

const createToken = async (_id) => {
    return await jwt.sign({_id}, JWT_SECRET, {expiresIn: '2d'});
}

export {createToken};