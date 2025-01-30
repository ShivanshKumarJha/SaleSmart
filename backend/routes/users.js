import express from 'express';
import {postLogin, postSignup, updateUser} from '../controllers/user_controller.js'
import {isAuth} from "../middleware/isAuth.js";

const router = express.Router();

router.post('/signup', postSignup);
router.post('/login', postLogin);
router.patch('/:userId', isAuth, updateUser);

export default router;
