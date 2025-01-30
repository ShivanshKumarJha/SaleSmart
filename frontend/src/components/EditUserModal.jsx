import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {Button, TextField} from "@mui/material";
import {useUser} from "../hooks/useUser.jsx";

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
    outlineOffset: -3,
    border: '2px solid white',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    backdropFilter: 'blur(4px)',
};

const EditProductModal = ({open, onClose, userId, initialData}) => {
    const [formData, setFormData] = useState(initialData);
    const {isLoading, error, updateUser} = useUser();

    useEffect(() => {
        if (open) {
            setFormData(initialData);
        }
    }, [open, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log('Inside the handleSubmit in handleSubmit');

        await updateUser(userId, {
            email: formData.email,
            name: formData.name,
        });
        onClose();
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
                        Edit User
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="User Name"
                            name="name"
                            value={formData.name || ''}
                            onChange={handleChange}
                            margin="normal"
                            required
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={formData.email || ''}
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
                            {isLoading ? 'Updating...' : 'Update User'}
                        </Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default EditProductModal;