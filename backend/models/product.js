import mongoose, {Schema} from 'mongoose';

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);
export default Product;