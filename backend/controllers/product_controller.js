import Product from '../models/product.js';
import mongoose from 'mongoose';

const getHome = async (req, res) => {
    /*
        CODE FLOW :
        1. Parse pagination parameters (page, limit) from query
        2. Parse filter and sort parameters
        3. Build query with filters
        4. Execute paginated query with sort
        5. Return products with pagination metadata
    */

  try {
    // Parse pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Parse filter parameters
    const { search, filterOption, filterValue } = req.query;

    // Parse sort parameters
    const sortBy = req.query.sortBy || 'updatedAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    // Build query
    let query = {};

    // Add search filter
    if (search) {
      query.productName = { $regex: search, $options: 'i' };
    }

    // Add additional filters
    if (filterOption && filterValue) {
      if (filterOption === 'category') {
        query.category = { $regex: filterValue, $options: 'i' };
      } else if (filterOption === 'name') {
        // For filtering by user name, we need to use aggregation
        // We'll handle this separately below
      }
    }

    // Build sort object
    let sortObject = {};
    if (sortBy === 'price') {
      sortObject.price = sortOrder;
    } else if (sortBy === 'quantity') {
      sortObject.quantity = sortOrder;
    } else if (sortBy === 'date') {
      sortObject.updatedAt = sortOrder;
    } else {
      sortObject.updatedAt = -1; // Default sort by recent
    }

    let products;
    let totalItems;

    // If filtering by user name, use aggregation pipeline
    if (filterOption === 'name' && filterValue) {
      const pipeline = [
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $match: {
            ...query,
            'user.name': { $regex: filterValue, $options: 'i' }
          }
        },
        {
          $sort: sortObject
        }
      ];

      // Get total count
      const countPipeline = [
        ...pipeline,
        { $count: 'total' }
      ];
      const countResult = await Product.aggregate(countPipeline);
      totalItems = countResult.length > 0 ? countResult[0].total : 0;

      // Get paginated products
      const dataPipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit },
        {
          $project: {
            productName: 1,
            quantity: 1,
            price: 1,
            category: 1,
            createdAt: 1,
            updatedAt: 1,
            'user._id': 1,
            'user.name': 1
          }
        }
      ];
      products = await Product.aggregate(dataPipeline);
    } else {
      // Standard query without user name filter
      products = await Product.find(query)
        .populate('user', 'name')
        .sort(sortObject)
        .limit(limit)
        .skip(skip);

      // Get total count for pagination metadata
      totalItems = await Product.countDocuments(query);
    }

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      products,
      totalItems,
      currentPage: page,
      totalPages,
      limit
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const postProduct = async (req, res) => {
    /*
        CODE FLOW :
        1. Catch the required field values - productName, quantity, price and category
        2. Check the field values are empty or not - if it is throw error
        3. Save it in DB
    */

  try {
    const { productName, quantity, price, category } = req.body;
    if (!productName || !quantity || !price || !category) {
      return res.status(400).json({ message: 'Please enter a valid product' });
    }
    // console.log(productName, quantity, price, category);
    const userId = req.user?._id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: User not authenticated' });
    }

    const newProduct = new Product({
      productName,
      quantity,
      price,
      category,
      user: userId,
    });

    await newProduct.save();

    const populatedProduct = await Product.findById(newProduct._id).populate(
      'user',
      'name'
    );

    return res.status(201).json(populatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const editProduct = async (req, res) => {
    /*
        CODE FLOW:
        1. Get the productId from the req.params
        2. Get the product from the productId and check the ownership
        3. Execute FindByIdAndUpdate with productId and req.body
        4. If it results in error - throw error else send response
    */

  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate('user', 'name');

    return res.status(200).json(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  /*
        CODE FLOW:
        1. Extract productId from req.params
        2. If productId DNE ,throw error
        3. If it exists, first check ownership then delete it
    */

  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);
    return res.status(200).json(deletedProduct);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

export { getHome, postProduct, editProduct, deleteProduct };
