import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  TableContainer,
  Paper,
  Button,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';

import {
  fetchBuyerOrders,
  deleteBuyerOrder,
  updateBuyerOrderAddress,
} from '../../store/actions/buyerOrderAction';
import {
  buyerCheckoutPayment,
  buyerVerifyPayment,
  buyerCheckPaymentStatus,
} from '../../store/actions/buyerPaymentAction';
import { fetchProducts } from '../../store/actions/productActions';

const BuyerOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { orders = [], loading, error } = useSelector((state) => state.buyerOrder);
  const { products = [] } = useSelector((state) => state.product);
  const { paymentStatusByOrder } = useSelector(
    (state) => state.buyerPayment
  );

  const [openRows, setOpenRows] = useState({});
  const [editAddressRow, setEditAddressRow] = useState(null);
  const [newAddress, setNewAddress] = useState('');

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [payingOrderId, setPayingOrderId] = useState(null);

  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  console.log(paymentStatusByOrder);

  useEffect(() => {
    dispatch(fetchBuyerOrders());
    dispatch(fetchProducts());

  }, [dispatch, location]);

  useEffect(() => {
    orders.forEach((order) => {
      const alreadyChecked = paymentStatusByOrder.find((p) => p.order_id === order.id);
      if (!alreadyChecked && order.status?.toLowerCase() !== 'cancelled') {
        dispatch(buyerCheckPaymentStatus({ order_id: order.id }));
      }
    });
  }, [orders, dispatch, paymentStatusByOrder]);

  const handleToggleRow = (orderId) => {
    setOpenRows((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleDelete = (orderId) => {
    dispatch(deleteBuyerOrder(orderId)).then(() => dispatch(fetchBuyerOrders()));
  };

  const handleEditAddress = (orderId, currentAddress) => {
    setEditAddressRow(orderId);
    setNewAddress(currentAddress);
  };

  const handleSaveAddress = (orderId) => {
    if (!newAddress.trim()) return alert('Address cannot be empty.');
    dispatch(updateBuyerOrderAddress({ orderId, delivery_address: newAddress })).then(() => {
      setEditAddressRow(null);
      dispatch(fetchBuyerOrders());
    });
  };

  const getProductName = (product_id) => {
    const product = products.find((p) => p.id === product_id);
    return product?.product_name || 'Unknown Product';
  };

  const calculateOrderTotal = (items = []) =>
    items.reduce((sum, item) => sum + (Number(item?.price) || 0) * (Number(item?.quantity) || 0), 0);

  const handlePayNowClick = (order) => {
    setSelectedOrder(order);
    setPaymentMethod('UPI');
    setPaymentModalOpen(true);
  };

  const handleVerifyPayment = async () => {
    const totalAmount = calculateOrderTotal(selectedOrder?.order_items || []);
    const transactionId = `txn_${Date.now()}_${selectedOrder.id}`;
    setPayingOrderId(selectedOrder.id);

    try {
      await dispatch(
        buyerCheckoutPayment({
          order_id: selectedOrder.id,
          seller_id: selectedOrder.seller_id,
          amount: totalAmount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
        })
      ).unwrap();

      await dispatch(
        buyerVerifyPayment({
          status: 'success',
          transaction_id: transactionId,
        })
      ).unwrap();

      const statusRes = await dispatch(
        buyerCheckPaymentStatus({ order_id: selectedOrder.id })
      ).unwrap();

      if (
        statusRes?.payment_status?.toLowerCase() === 'success' ||
        statusRes?.payment_status?.toLowerCase() === 'paid'
      ) {
        setSuccessMessage(`Payment successful for Order #${selectedOrder.id}`);
        setOpenSnackbar(true);
        setPaymentModalOpen(false);
        dispatch(fetchBuyerOrders());
      }
    } catch (err) {
      alert(`Payment failed: ${err?.message || err}`);
    } finally {
      setPayingOrderId(null);
    }
  };

  const isOrderPaid = (orderId) => {
    const entry = paymentStatusByOrder.find((p) => p.order_id === orderId);
    return entry?.payment_status?.toLowerCase() === 'success' || entry?.payment_status?.toLowerCase() === 'paid';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <BuyerHeader />

      <Container maxWidth={false} sx={{ my: 4, flex: 1 }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity="success" sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Typography variant="h5" gutterBottom>
          My Orders
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : orders.filter((order) => order.status?.toLowerCase() !== 'cancelled').length === 0 ? (
          <Typography>No active orders found.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: '#f0f0f0' }}>
                <TableRow>
                  <TableCell />
                  <TableCell>Order ID</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Total</TableCell>
                  <TableCell>Order Date</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .filter((order) => order.status?.toLowerCase() !== 'cancelled')
                  .map((order) => (
                    <React.Fragment key={order.id}>
                      <TableRow hover>
                        <TableCell>
                          <IconButton size="small" onClick={() => handleToggleRow(order.id)}>
                            {openRows[order.id] ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                          </IconButton>
                        </TableCell>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>
                          {editAddressRow === order.id ? (
                            <TextField
                              size="small"
                              value={newAddress}
                              onChange={(e) => setNewAddress(e.target.value)}
                              fullWidth
                            />
                          ) : (
                            order.delivery_address
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography color={order.status === 'delivered' ? 'green' : 'orange'}>
                            {order.status || 'Pending'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          ₹{calculateOrderTotal(order.order_items).toLocaleString()}
                        </TableCell>
                        <TableCell>{new Date(order.order_date).toLocaleString()}</TableCell>
                        <TableCell align="right">
                          {editAddressRow === order.id ? (
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleSaveAddress(order.id)}
                              sx={{ mr: 1 }}
                            >
                              Save
                            </Button>
                          ) : (
                            <Button
                              size="small"
                              onClick={() => handleEditAddress(order.id, order.delivery_address)}
                              sx={{ mr: 1 }}
                            >
                              Edit
                            </Button>
                          )}
                          <Button
                            color="error"
                            size="small"
                            onClick={() => handleDelete(order.id)}
                            sx={{ mr: 1 }}
                          >
                            Delete
                          </Button>
                          {!isOrderPaid(order.id) && (
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              onClick={() => handlePayNowClick(order)}
                              disabled={payingOrderId === order.id}
                            >
                              {payingOrderId === order.id ? 'Processing...' : 'Pay Now'}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={7} sx={{ padding: 0 }}>
                          <Collapse in={openRows[order.id]} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                              <Typography variant="subtitle1" gutterBottom>
                                Ordered Items
                              </Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order.order_items?.map((item, idx) => (
                                    <TableRow key={item.id || idx}>
                                      <TableCell>{getProductName(item.product_id)}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>₹{Number(item.price || 0).toLocaleString()}</TableCell>
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
      </Container>

      {/* 💳 Payment Modal */}
      <Modal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            zIndex: 1500,
          }}
        >
          <Typography variant="h6" mb={2}>
            Complete Your Payment
          </Typography>

          <Typography mb={1}>
            <strong>Order ID:</strong> {selectedOrder?.id}
          </Typography>

          <Typography mb={1}>
            <strong>Amount:</strong> ₹
            {calculateOrderTotal(selectedOrder?.order_items || []).toLocaleString()}
          </Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Method</InputLabel>
            <Select
              value={paymentMethod}
              label="Select Method"
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="NetBanking">NetBanking</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            color="success"
            sx={{ mt: 3 }}
            onClick={handleVerifyPayment}
            disabled={payingOrderId === selectedOrder?.id}
          >
            {payingOrderId === selectedOrder?.id ? 'Processing...' : 'Verify & Pay'}
          </Button>
        </Box>
      </Modal>

      <Box mt="auto">
        <BuyerFooter />
      </Box>
    </Box>
  );
};

export default BuyerOrders;
