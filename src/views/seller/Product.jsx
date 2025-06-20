import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAllProductsAction,
    addProductAction,
    deleteProductAction,
    updateProductAction,
} from '../../store/actions/sellerProductAction';
import { fetchAllCategoriesAction } from '../../store/actions/sellerCategoryAction';
import { fetchAllSubCategoriesByIdAction } from '../../store/actions/sellerSubCategoryAction';

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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const SellerProduct = () => {
    const dispatch = useDispatch();

    const { list: products, loading, error } = useSelector((state) => state.sellerProduct);
    const { list: categories } = useSelector((state) => state.categories);
    const { list: subcategories } = useSelector((state) => state.subcategories);

    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        price: '',
        quantity: '',
        category_id: '',
        subcategory_id: '',
    });

    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({});
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [expandedDescriptions, setExpandedDescriptions] = useState({});

    useEffect(() => {
        dispatch(fetchAllProductsAction());
        dispatch(fetchAllCategoriesAction());
    }, [dispatch]);

    useEffect(() => {
        if (formData.category_id) {
            dispatch(fetchAllSubCategoriesByIdAction(formData.category_id))
                .then((res) => {
                    const subList = res?.payload || [];
                    if (!subList.some((sub) => sub.id === formData.subcategory_id)) {
                        setFormData((prev) => ({ ...prev, subcategory_id: '' }));
                    }
                })
                .catch((err) => {
                    console.error('Error fetching subcategories:', err);
                });
        } else {
            setFormData((prev) => ({ ...prev, subcategory_id: '' }));
        }
    }, [formData.category_id, dispatch]);

    const handleToggleSidebar = () => setSidebarOpen((prev) => !prev);

    const handleAdd = () => {
        const {
            product_name,
            price,
            description,
            quantity,
            category_id,
            subcategory_id,
        } = formData;

        if (
            !product_name.trim() ||
            !description.trim() ||
            !price ||
            !quantity ||
            !category_id ||
            !subcategory_id
        )
            return;

        const payload = {
            ...formData,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        };

        dispatch(addProductAction(payload))
            .then(() => {
                setFormData({
                    product_name: '',
                    description: '',
                    price: '',
                    quantity: '',
                    category_id: '',
                    subcategory_id: '',
                });
                setShowAddForm(false);
                dispatch(fetchAllProductsAction());
            })
            .catch((err) => console.error('Add failed:', err));
    };

    const handleEditClick = (product) => {
        setEditId(product.id);
        setEditData(product);
    };

    const handleEditSave = () => {
        const updatedPayload = {
            ...editData,
            price: parseFloat(editData.price),
            quantity: parseInt(editData.quantity),
        };

        dispatch(updateProductAction(updatedPayload))
            .then(() => {
                setEditId(null);
                setEditData({});
                dispatch(fetchAllProductsAction());
            })
            .catch((err) => console.error('Update failed:', err));
    };

    const handleEditCancel = () => {
        setEditId(null);
        setEditData({});
    };

    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setConfirmOpen(true);
    };

    const confirmDelete = () => {
        dispatch(deleteProductAction(productToDelete))
            .then(() => {
                setConfirmOpen(false);
                setProductToDelete(null);
                dispatch(fetchAllProductsAction());
            })
            .catch((err) => console.error('Delete failed:', err));
    };

    const toggleDescription = (id) => {
        setExpandedDescriptions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const filteredList = Array.isArray(products)
        ? products.filter((p) =>
            p.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />
            <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
                <Sidebar open={sidebarOpen} />
                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h5">Products</Typography>
                        <Button variant="contained" onClick={() => setShowAddForm((prev) => !prev)}>
                            {showAddForm ? 'Cancel' : 'Add Product'}
                        </Button>
                    </Box>

                    {showAddForm && (
                        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                                       <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={formData.category_id}
                                    label="Category"
                                    onChange={(e) =>
                                        setFormData({ ...formData, category_id: e.target.value, subcategory_id: '' })
                                    }
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat.id} value={cat.id}>
                                            {cat.category_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 150 }}>
                                <InputLabel>Subcategory</InputLabel>
                                <Select
                                    value={formData.subcategory_id}
                                    label="Subcategory"
                                    onChange={(e) =>
                                        setFormData({ ...formData, subcategory_id: e.target.value })
                                    }
                                    disabled={!formData.category_id || !Array.isArray(subcategories)}
                                >
                                    {formData.category_id && Array.isArray(subcategories) && subcategories.length > 0 ? (
                                        subcategories.map((sub) => (
                                            <MenuItem key={sub.id} value={sub.id}>
                                                {sub.sub_category_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled value="">
                                            {formData.category_id ? 'No Subcategories Found' : 'Select Category First'}
                                        </MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField label="Name" size="small" value={formData.product_name} onChange={(e) => setFormData({ ...formData, product_name: e.target.value })} />
                            <TextField label="Description" size="small" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                            <TextField label="Price" size="small" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
                            <TextField label="Quantity" size="small" type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />



                            <Button variant="contained" color="success" onClick={handleAdd}>Save</Button>
                        </Box>
                    )}

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
                        <Typography>No products found.</Typography>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell>Updated</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredList.map((product, index) => {
                                        const isEditing = editId === product.id;

                                        return (
                                            <TableRow key={product.id}>
                                                <TableCell>{index + 1}</TableCell>

                                                <TableCell>
                                                    {isEditing ? (
                                                        <TextField
                                                            size="small"
                                                            value={editData.product_name}
                                                            onChange={(e) => setEditData({ ...editData, product_name: e.target.value })}
                                                        />
                                                    ) : (
                                                        product.product_name
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {isEditing ? (
                                                        <TextField
                                                            size="small"
                                                            multiline
                                                            value={editData.description}
                                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                        />
                                                    ) : expandedDescriptions[product.id] ? (
                                                        product.description
                                                    ) : (
                                                        `${product.description.slice(0, 50)}${product.description.length > 50 ? '...' : ''}`
                                                    )}

                                                    {!isEditing && product.description.length > 50 && (
                                                        <Button
                                                            onClick={() => toggleDescription(product.id)}
                                                            size="small"
                                                            sx={{ textTransform: 'none', ml: 1 }}
                                                        >
                                                            {expandedDescriptions[product.id] ? 'Less' : 'More'}
                                                        </Button>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {isEditing ? (
                                                        <TextField
                                                            type="number"
                                                            size="small"
                                                            value={editData.price}
                                                            onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                                        />
                                                    ) : (
                                                        product.price
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {isEditing ? (
                                                        <TextField
                                                            type="number"
                                                            size="small"
                                                            value={editData.quantity}
                                                            onChange={(e) => setEditData({ ...editData, quantity: e.target.value })}
                                                        />
                                                    ) : (
                                                        product.quantity
                                                    )}
                                                </TableCell>

                                                <TableCell>{new Date(product.createdAt).toLocaleString()}</TableCell>
                                                <TableCell>{new Date(product.updatedAt).toLocaleString()}</TableCell>

<TableCell align="right">
  {isEditing ? (
    <>
      <Button
        variant="contained" // ✅ for filled green
        size="small"
        color="success"
        sx={{ mr: 1 }}
        onClick={handleEditSave}
      >
        Save
      </Button>
      <Button
        variant="outlined"
        size="small"
        onClick={handleEditCancel}
      >
        Cancel
      </Button>
    </>
  ) : (
    <>
      <Button
        variant="outlined"
        size="small"
        color="primary"
        sx={{ mr: 1 }}
        startIcon={<EditIcon />}
        onClick={() => handleEditClick(product)}
      />
      <Button
        variant="outlined"
        size="small"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={() => handleDeleteClick(product.id)}
      />
    </>
  )}
</TableCell>

                                            </TableRow>
                                        );
                                    })}
                                </TableBody>

                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this product?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
                    <Button variant="contained" color="error" onClick={confirmDelete}>Delete</Button>
                </DialogActions>
            </Dialog>

            <Footer />
        </Box>
    );
};

export default SellerProduct;
