import express from 'express';
import {editProduct, getHome, postProduct} from '../controllers/controller.js'

const router = express.Router();

router.get('/', getHome);
router.post('/product', postProduct);
router.put('/product/:productId', editProduct);

export default router;
