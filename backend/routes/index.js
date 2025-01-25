import express from 'express';
import userRoutes from './users.js'
import productRoutes from './products.js'
import {getHome} from "../controllers/product_controller.js";

const router = express.Router();

router.get('/', getHome);
router.use('/user', userRoutes);
router.use('/product', productRoutes);

export default router;
