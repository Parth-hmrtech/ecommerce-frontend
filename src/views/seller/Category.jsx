import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCategories } from '../../store/actions/sellerAction';
import {
    Box,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const Category = () => {
    const dispatch = useDispatch();
    const { list, loading, error } = useSelector((state) => state.categories);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleUpdate = (id) => {
        console.log('Update clicked for:', id);
        // Navigate to update form or open modal
    };

    const handleDelete = (id) => {
        console.log('Delete clicked for:', id);
        // Dispatch delete action or confirm dialog
    };

    const filteredList = list.filter((category) =>
        category.category_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

            <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
                <Sidebar open={sidebarOpen} />

                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5" gutterBottom>
                        Categories
                    </Typography>

                    <TextField
                        label="Search by Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                        sx={{ mb: 2, maxWidth: 400 }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : filteredList.length === 0 ? (
                        <Typography>No matching categories found.</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><strong>Name</strong></TableCell>
                                        <TableCell><strong>Created At</strong></TableCell>
                                        <TableCell align="right"><strong>Actions</strong></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredList.map((category) => (
                                        <TableRow key={category.id}>
                                            <TableCell>{category.category_name}</TableCell>
                                            <TableCell>
                                                {new Date(category.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    size="small"
                                                    onClick={() => handleUpdate(category.id)}
                                                    sx={{ mr: 1 }}
                                                    startIcon={<EditIcon />}
                                                >
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleDelete(category.id)}
                                                    startIcon={<DeleteIcon />}
                                                >
                                                    
                                                </Button>

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export default Category;
