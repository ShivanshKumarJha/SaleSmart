import express from 'express';
import {getLogin, getSignup, postLogin, postLogout, postSignup} from '../controllers/user_controller.js'

const router = express.Router();

router.get('/signup', getSignup);
router.post('/signup', postSignup);

router.get('/login', getLogin);
router.post('/login', postLogin);

router.post('/logout', postLogout);

export default router;
