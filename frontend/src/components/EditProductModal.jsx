import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {Button, TextField} from "@mui/material";
import {useProducts} from "../hooks/useProducts.jsx";
import {toast} from "react-toastify";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    maxHeight: '90vh',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    outline: '2px solid gray',
    outlineOffset: -1,
    border: '2px solid white',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    backdropFilter: 'blur(4px)',
};

const EditProductModal = ({open, onClose, productId, initialData}) => {
    const [formData, setFormData] = useState(initialData);
    const {updateProduct, isLoading, error} = useProducts();

    useEffect(() => {
        if (open) {
            setFormData(initialData);
        }
    }, [open, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProduct(productId, {
                productName: formData.productName,
                category: formData.category,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            });

            toast.success("Product updated successfully!");
            onClose();
        } catch (err) {
            toast.error("Failed to update product. Please try again.");
        }
    };

    /* To efficiently handle multiple input fields */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="edit-product-modal"
            aria-describedby="edit-product-form"
            slotProps={{
                backdrop: {
                    style: {
                        backdropFilter: 'blur(5px)',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    }
                }
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Edit Product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Product Name"
                            name="productName"
                            value={formData.productName || ''}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Category"
                            name="category"
                            value={formData.category || ''}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={formData.price || ''}
                            onChange={handleChange}
                            margin="normal"
                            inputProps={{step: "0.01"}}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Quantity"
                            name="quantity"
                            type="number"
                            value={formData.quantity || ''}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />

                        {error && (
                            <Typography color="error" variant="body2" sx={{mt: 1}}>
                                {error}
                            </Typography>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{mt: 2}}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Updating...' : 'Update Product'}
                        </Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default EditProductModal;