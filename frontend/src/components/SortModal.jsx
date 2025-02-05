import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Tune} from "@mui/icons-material";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 380,
    maxHeight: '55vh',
    overflowY: 'auto',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    boxShadow: 24,
    p: 3,
    backdropFilter: 'blur(6px)',
};

const SortModal = ({open = true, onClose, sortBy, setSortBy, sortOrder, setSortOrder}) => {
    const handleReset = () => {
        setSortBy('');
        setSortOrder('asc');
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onClose();
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            sx={{backdropFilter: 'blur(10px)'}}
        >
            <Fade in={open}>
                <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="subtitle1" component="h2"
                                    sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Tune fontSize="small"/>
                            Sort Options
                        </Typography>
                        <CloseIcon
                            onClick={onClose}
                            sx={{
                                cursor: 'pointer',
                                fontSize: '1.2rem',
                                '&:hover': {color: 'primary.main'}
                            }}
                        />
                    </Stack>

                    <Divider sx={{mb: 3}}/>

                    <Stack spacing={2}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="sort-by-label">Sort By</InputLabel>
                            <Select
                                labelId="sort-by-label"
                                value={sortBy || ''}
                                label="Sort By"
                                onChange={(e) => setSortBy(e.target.value)}
                                sx={{borderRadius: '6px'}}
                            >
                                <MenuItem value=""><em>Select Sort</em></MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                                <MenuItem value="quantity">Quantity</MenuItem>
                                <MenuItem value="date">Date Updated</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl fullWidth size="small">
                            <Select
                                value={sortOrder || 'asc'}
                                onChange={(e) => setSortOrder(e.target.value)}
                                sx={{borderRadius: '6px'}}
                            >
                                <MenuItem value="asc">Low to High</MenuItem>
                                <MenuItem value="desc">High to Low</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>

                    <Stack direction="row" spacing={1.5} justifyContent="flex-end" mt={3}>
                        <Button
                            variant="outlined"
                            onClick={handleReset}
                            size="small"
                            sx={{
                                textTransform: 'none',
                                px: 2.5,
                                fontSize: '0.875rem'
                            }}
                        >
                            Clear
                        </Button>
                        <Button
                            variant="contained"
                            type="submit"
                            size="small"
                            sx={{
                                textTransform: 'none',
                                px: 3,
                                fontSize: '0.875rem'
                            }}
                            disabled={!sortBy}
                        >
                            Apply
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
};

export default SortModal;
