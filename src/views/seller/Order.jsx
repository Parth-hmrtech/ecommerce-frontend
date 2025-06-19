import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    TableContainer,
    Collapse,
    IconButton,
    Select,
    MenuItem,
    FormControl,
    CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerOrdersAction, updateOrderStatusAction } from '../../store/actions/sellerOrderAction';
import { fetchAllProducts } from '../../store/actions/sellerProductAction';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

const SellerOrderList = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const [openRowIndex, setOpenRowIndex] = useState(null);

    const { list: orders = [], loading } = useSelector((state) => state.sellerOrders || {});
    const { list: productList = [] } = useSelector((state) => state.sellerProduct || {});

    useEffect(() => {
        dispatch(fetchSellerOrdersAction());
        dispatch(fetchAllProducts());
    }, [dispatch]);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const toggleRow = (index) => {
        setOpenRowIndex(openRowIndex === index ? null : index);
    };

    const getProductName = (productId) => {
        const product = productList.find((p) => p.id === productId);
        return product ? product.product_name : 'Unknown Product';
    };

    const handleStatusChange = (orderId, newStatus) => {
        dispatch(updateOrderStatusAction({ orderId, status: newStatus }));
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

            <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
                <Sidebar open={sidebarOpen} />

                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5" gutterBottom>Seller Orders</Typography>

                    {loading ? (
                        <Box display="flex" justifyContent="center" my={4}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Order ID</TableCell>
                                        <TableCell>Address</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Order Date</TableCell>
                                        <TableCell>Change Status</TableCell>

                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {orders.map((order, index) => (
                                        <React.Fragment key={order.id}>
                                            <TableRow>
                                                <TableCell>
                                                    <IconButton size="small" onClick={() => toggleRow(index)}>
                                                        {openRowIndex === index ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>

                                                <TableCell>{order.id}</TableCell>
                                                <TableCell>{order.delivery_address}</TableCell>

                                                <TableCell>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            textTransform: 'capitalize',
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {order.status}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>&#8377;{order.total_amount}</TableCell>
                                                <TableCell>{new Date(order.order_date).toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Select
                                                        value={order.status?.toLowerCase() || 'pending'} 
                                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    >
                                                        <MenuItem value="pending">Pending</MenuItem>
                                                        <MenuItem value="accepted">Accepted</MenuItem>
                                                        <MenuItem value="shipped">Shipped</MenuItem>
                                                        <MenuItem value="delivered">Delivered</MenuItem>
                                                        <MenuItem value="cancelled">Cancelled</MenuItem>
                                                    </Select>

                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell colSpan={7} sx={{ paddingBottom: 0, paddingTop: 0 }}>
                                                    <Collapse in={openRowIndex === index} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="subtitle1">Items</Typography>
                                                            <Table size="small">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>Product ID</TableCell>
                                                                        <TableCell>Product Name</TableCell>
                                                                        <TableCell>Price</TableCell>
                                                                        <TableCell>Quantity</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    {order.order_items?.map((item) => (
                                                                        <TableRow key={item.id}>
                                                                            <TableCell>{item.product_id}</TableCell>
                                                                            <TableCell>{getProductName(item.product_id)}</TableCell>
                                                                            <TableCell>&#8377;{item.price}</TableCell>
                                                                            <TableCell>{item.quantity}</TableCell>
                                                                        </TableRow>
                                                                    ))}
                                                                </TableBody>
                                                            </Table>
                                                        </Box>
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
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

export default SellerOrderList;
