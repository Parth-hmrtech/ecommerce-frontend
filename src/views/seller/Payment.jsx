import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Sidebar from '../../components/common/Sidebar';

import {
    fetchSellerPaymentsAction,
    fetchSellerEarningsAction,
} from '../../store/actions/sellerPaymentAction';

const SellerPayments = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Grab everything from sellerPayments reducer
    const { payments, earnings, loading, error } = useSelector((state) => state.sellerPayments);

    useEffect(() => {
        dispatch(fetchSellerPaymentsAction());
        dispatch(fetchSellerEarningsAction());
    }, [dispatch]);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    const totalOrders = earnings?.total_orders || 0;
    const totalEarnings = earnings?.total_earnings || 0;

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', flexDirection: 'column' }}>
            <Header sidebarOpen={sidebarOpen} onToggleSidebar={handleToggleSidebar} />

            <Box sx={{ display: 'flex', flexGrow: 1, pt: '64px' }}>
                <Sidebar open={sidebarOpen} />

                <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h5" mb={2}>Seller Payments</Typography>

                    {loading ? (
                        <CircularProgress />
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <>
                            {/* Summary Cards */}
                            <Grid container spacing={2} mb={2}>
                                <Grid item xs={12} sm={6}>
                                    <Card sx={{ backgroundColor: '#e0f7fa' }}>
                                        <CardContent>
                                            <Typography variant="h6">Total Orders</Typography>
                                            <Typography variant="h5">{totalOrders}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Card sx={{ backgroundColor: '#f1f8e9' }}>
                                        <CardContent>
                                            <Typography variant="h6">Total Earnings</Typography>
                                            <Typography variant="h5">₹{totalEarnings.toFixed(2)}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>

                            {/* Payments Table */}
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Payment Method</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Transaction ID</TableCell>
                                            <TableCell>Created At</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {payments.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell>{payment.order_id}</TableCell>
                                                <TableCell>₹{payment.amount}</TableCell>
                                                <TableCell>{payment.payment_method}</TableCell>
                                                <TableCell>{payment.payment_status}</TableCell>
                                                <TableCell>{payment.transaction_id}</TableCell>
                                                <TableCell>
                                                    {new Date(payment.created_at).toLocaleString()}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                    )}
                </Box>
            </Box>

            <Footer />
        </Box>
    );
};

export default SellerPayments;
