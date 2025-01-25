import express from 'express';
import {deleteProduct, editProduct, postProduct} from '../controllers/product_controller.js'

const router = express.Router();

router.post('/', postProduct);
router.put('/:productId', editProduct);
router.delete('/:productId', deleteProduct);

export default router;
