import Product from "../models/product.js";

const getHome = async (req, res) => {

    /*
        CODE FLOW :
        1. Get all the product by calling find in mongoose
        2. Handle Error
    */

    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'Something went wrong'});
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
            return res.status(400).send('Please enter a valid product');
        }
        // console.log(productName, quantity, price, category);

        const newProduct = new Product({
            productName, quantity, price, category
        })
        await newProduct.save();

        return res.status(201).send(newProduct);
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: err.message});
    }
}


const editProduct = async (req, res) => {

    /*
        CODE FLOW:
        1. Get all the field values - productName, quantity, price, category
        2. Extract the productId from the req.params
        3. Execute FindByIdAndUpdate with productId and req.body
        4. If it results in error - throw error else send response
    */

    try {
        const {productName, quantity, price, category} = req.body;
        if (!productName || !quantity || !price || !category) {
            return res.status(400).send('Fill all required fields');
        }

        const {productId} = req.params;
        const product = await Product.findByIdAndUpdate(productId, req.body);
        if (!product) {
            return res.status(404).send('Product not found');
        }

        return res.status(201).send(product);
    } catch (err) {
        console.error(err);
        return res.status(500).send({message: err.message});
    }
}

export {getHome, postProduct, editProduct}