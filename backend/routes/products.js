import express from 'express';
import {deleteProduct, editProduct, postProduct} from '../controllers/product_controller.js'
import {isAuth} from "../middleware/isAuth.js";

const router = express.Router();

router.post('/', isAuth, postProduct);
router.patch('/:productId', isAuth, editProduct);
router.delete('/:productId', isAuth, deleteProduct);

export default router;
