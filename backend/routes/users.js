import express from 'express';
import {postLogin, postSignup, updateUser, verifyOTP,} from '../controllers/user_controller.js';
import {isAuth} from '../middleware/isAuth.js';
import {upload} from '../config/multer.js';

const router = express.Router();

router.post('/signup', upload.single('image'), postSignup);
router.post('/login', postLogin);
router.patch('/:userId', isAuth, upload.single('image'), updateUser);
router.post('/verify-otp', verifyOTP);

export default router;
