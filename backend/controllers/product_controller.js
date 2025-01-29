import Product from "../models/product.js";

const getHome = async (req, res) => {

    /*
        CODE FLOW :
        1. Get all the product by calling find in mongoose
        2. Handle Error
    */

    try {
        const products = await Product.find().populate('user', 'name');
        return res.status(200).json(products);
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Something went wrong'});
    }
}


const postProduct = async (req, res) => {

    /*
        CODE FLOW :
        1. Catch the required field values - productName, quantity, price and category
        2. Check the field values are empty or not - if it is throw error
        3. Save it in DB
    */

    try {
        const {productName, quantity, price, category} = req.body;
        if (!productName || !quantity || !price || !category) {
            return res.status(400).json({message: 'Please enter a valid product'});
        }
        // console.log(productName, quantity, price, category);
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({message: 'Unauthorized: User not authenticated'});
        }

        const newProduct = new Product({
            productName, quantity, price, category, user: userId,
        })

        await newProduct.save();

        return res.status(201).json(newProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}


const editProduct = async (req, res) => {

    /*
        CODE FLOW:
        1. Get the productId from the req.params
        2. Get the product from the productId
        3. Execute FindByIdAndUpdate with productId and req.body
        4. If it results in error - throw error else send response
    */

    try {
        const {productId} = req.params;

        const product = await Product.findByIdAndUpdate(productId, req.body, {
            new: true,
            runValidators: true
        }).populate('user', 'name');
        
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        return res.status(200).json(product);
    } catch (err) {
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}


const deleteProduct = async (req, res) => {

    /*
        CODE FLOW:
        1. Extract productId from req.params
        2. If productId DNE ,throw error
        3. If it exists, delete it
    */

    try {
        const {productId} = req.params;

        if (!productId) {
            return res.status(404).json({message: 'Product not found'});
        }

        const product = await Product.findOneAndDelete(productId);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        return res.status(200).json(product);

    } catch (err) {
        console.error(err);
        return res.status(500).json({message: err.message});
    }
}

export {getHome, postProduct, editProduct, deleteProduct}