import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import {Button, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Tune} from "@mui/icons-material";

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    maxHeight: '50vh',
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

const FilterModal = ({open = true, onClose, filterOption, setFilterOption, filterVal, setFilterVal}) => {
    const handleReset = () => {
        setFilterOption('');
        setFilterVal('');
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
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
                        <Typography variant="subtitle1" component="h2"
                                    sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                            <Tune fontSize="small"/>
                            Filters
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

                    <Divider sx={{mb: 2}}/>

                    <FormControl fullWidth size="small" sx={{mb: 2}}>
                        <InputLabel id="filter-by-label">Filter By</InputLabel>
                        <Select
                            labelId="filter-by-label"
                            value={filterOption || ''}
                            label="Filter By"
                            onChange={(e) => setFilterOption(e.target.value)}
                            sx={{borderRadius: '6px'}}
                        >
                            <MenuItem value=""><em>Select Filter</em></MenuItem>
                            <MenuItem value="name">Admin Name</MenuItem>
                            <MenuItem value="category">Category</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        fullWidth
                        size="small"
                        label="Search Value"
                        value={filterVal}
                        onChange={(e) => setFilterVal(e.target.value)}
                        placeholder="Enter filter value..."
                        sx={{mb: 2}}
                        disabled={!filterOption}
                    />

                    <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                        <Button
                            variant="outlined"
                            onClick={handleReset}
                            size="small"
                            sx={{
                                textTransform: 'none',
                                px: 2,
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
                            disabled={!filterOption || !filterVal}
                        >
                            Apply
                        </Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
};

export default FilterModal;