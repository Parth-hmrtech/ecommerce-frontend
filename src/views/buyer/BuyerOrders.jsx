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
  Rating
} from '@mui/material';

import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';

import {
  fetchBuyerOrdersAction,
  deleteBuyerOrderAction,
  updateBuyerOrderAddressAction,
} from '../../store/actions/buyerOrderAction';

import {
  buyerCheckoutPaymentAction,
  buyerVerifyPaymentAction,
  buyerCheckPaymentStatusAction,
} from '../../store/actions/buyerPaymentAction';

import { fetchProductsAction } from '../../store/actions/productActions';

import {
  addBuyerReviewAction,
  updateBuyerReviewAction,
  deleteBuyerReviewAction,
  fetchBuyerReviewByProductIdAction,
} from '../../store/actions/buyerReviewAction';

const BuyerOrders = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { orders = [], loading, error } = useSelector((state) => state.buyerOrder);
  const { products = [] } = useSelector((state) => state.product);
  const { buyerCheckPayments = [] } = useSelector((state) => state.buyerPayment);
  const { items: reviewResponses = [] } = useSelector((state) => state.buyerReview);

  const [openRows, setOpenRows] = useState({});
  const [editAddressRow, setEditAddressRow] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [payingOrderId, setPayingOrderId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [reviewInputs, setReviewInputs] = useState({});

  useEffect(() => {
    dispatch(fetchBuyerOrdersAction());
    dispatch(fetchProductsAction());
    dispatch(buyerCheckPaymentStatusAction());
  }, [dispatch, location]);

  useEffect(() => {
    const uniqueProductIds = new Set();

    orders.forEach((order) => {
      order.order_items?.forEach((item) => {
        if (item.product_id) {
          uniqueProductIds.add(item.product_id);
        }
      });
    });

    uniqueProductIds.forEach((productId) => {
      dispatch(fetchBuyerReviewByProductIdAction(productId));
    });
  }, [orders, dispatch]);

  const handleToggleRow = (orderId) => {
    setOpenRows((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const handleDelete = (orderId) => {
    dispatch(deleteBuyerOrderAction(orderId)).then(() => {
      dispatch(fetchBuyerOrdersAction());
      dispatch(buyerCheckPaymentStatusAction());
    });
  };

  const handleEditAddress = (orderId, currentAddress) => {
    setEditAddressRow(orderId);
    setNewAddress(currentAddress);
  };

  const handleSaveAddress = (orderId) => {
    if (!newAddress.trim()) return alert('Address cannot be empty.');
    dispatch(updateBuyerOrderAddressAction({ orderId, delivery_address: newAddress })).then(() => {
      setEditAddressRow(null);
      dispatch(fetchBuyerOrdersAction());
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
    if (!selectedOrder || isOrderPaid(selectedOrder.id)) return;
    const totalAmount = calculateOrderTotal(selectedOrder?.order_items || []);
    const transactionId = `txn_${Date.now()}_${selectedOrder.id}`;
    setPayingOrderId(selectedOrder.id);
    try {
      await dispatch(
        buyerCheckoutPaymentAction({
          order_id: selectedOrder.id,
          seller_id: selectedOrder.seller_id,
          amount: totalAmount,
          payment_method: paymentMethod,
          transaction_id: transactionId,
        })
      );
      setOpenSnackbar(true);
      setSuccessMessage(`Checkout initiated for Order #${selectedOrder.id}`);
      await dispatch(
        buyerVerifyPaymentAction({
          status: 'success',
          transaction_id: transactionId,
        })
      );
      setSuccessMessage(`Payment verified for Order #${selectedOrder.id}`);
      await dispatch(fetchBuyerOrdersAction());
      await dispatch(buyerCheckPaymentStatusAction());
      setPaymentModalOpen(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Payment error:', error);
      setSuccessMessage(`Payment failed for Order #${selectedOrder.id}`);
    } finally {
      setOpenSnackbar(true);
      setPayingOrderId(null);
    }
  };

  const isOrderPaid = (orderId) => {
    const entry = buyerCheckPayments.find((p) => p.order_id === orderId);
    return entry?.payment_status?.toLowerCase() === 'success' || entry?.payment_status?.toLowerCase() === 'paid';
  };

  const handleReviewInputChange = (orderId, field, value) => {
    setReviewInputs((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [field]: value,
      },
    }));
  };

  const handleAddReview = async (order, productId) => {
    const { comment, rating } = reviewInputs[order.id] || {};
    if (!comment || !rating || !productId) return alert('Please enter rating, comment, and product');
    await dispatch(
      addBuyerReviewAction({
        order_id: order.id,
        product_id: productId,
        buyer_id: order.buyer_id,
        seller_id: order.seller_id,
        rating,
        comment,
      })
    );
    setReviewInputs((prev) => ({ ...prev, [order.id]: {} }));
    dispatch(fetchBuyerReviewByProductIdAction(productId));
  };

  const handleUpdateReview = async (reviewId, orderId) => {
    const { rating, comment, product_id } = reviewInputs[orderId] || {};

    if (!reviewId || !rating || !comment) {
      alert('Please select a review to edit and fill in all details.');
      return;
    }

    try {
      await dispatch(updateBuyerReviewAction({ id: reviewId, rating, comment }));
      dispatch(fetchBuyerReviewByProductIdAction(product_id));
    } catch (error) {
      console.error('Failed to update review:', error);
      alert('Something went wrong while updating the review.');
    }
  };

  const handleDeleteReview = async (reviewId, productId) => {
    await dispatch(deleteBuyerReviewAction(reviewId));
    await dispatch(fetchBuyerReviewByProductIdAction(productId));
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <BuyerHeader />
      <Container maxWidth={false} sx={{ my: 4, flex: 1 }}>
        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
            {successMessage}
          </Alert>
        </Snackbar>

        <Typography variant="h5" gutterBottom>My Orders</Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>
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
                            <TextField size="small" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} fullWidth />
                          ) : (
                            order.delivery_address
                          )}
                        </TableCell>
                        <TableCell>
                          <Typography color={order.status === 'delivered' ? 'green' : 'orange'}>
                            {order.status || 'Pending'}
                          </Typography>
                        </TableCell>
                        <TableCell>₹{calculateOrderTotal(order.order_items).toLocaleString()}</TableCell>
                        <TableCell>{order.order_date ? new Date(order.order_date).toLocaleString() : '-'}</TableCell>
                        <TableCell align="right">
                          {editAddressRow === order.id ? (
                            <Button size="small" variant="contained" onClick={() => handleSaveAddress(order.id)} sx={{ mr: 1 }}>
                              Save
                            </Button>
                          ) : (
                            <Button size="small" onClick={() => handleEditAddress(order.id, order.delivery_address)} sx={{ mr: 1 }}>
                              Edit
                            </Button>
                          )}
                          <Button color="error" size="small" onClick={() => handleDelete(order.id)} sx={{ mr: 1 }}>
                            Delete
                          </Button>
                          {!isOrderPaid(order.id) && (
                            <Button size="small" variant="contained" color="primary" onClick={() => handlePayNowClick(order)} disabled={payingOrderId === order.id}>
                              {payingOrderId === order.id ? 'Processing...' : 'Pay Now'}
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={7} sx={{ padding: 0 }}>
                          <Collapse in={openRows[order.id]} timeout="auto" unmountOnExit>
                            <Box margin={2}>
                              <Typography variant="subtitle1" gutterBottom>Ordered Items</Typography>
                              <Table size="small">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Price</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {order.order_items?.map((item, idx) => (
                                    <TableRow key={`${order.id}-${item.product_id}-${idx}`}>
                                      <TableCell>{getProductName(item.product_id)}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>₹{Number(item.price || 0).toLocaleString()}</TableCell>
                                    </TableRow>
                                  ))}

                                  {/* Reviews */}
                                  {(() => {
                                    const uniqueReviews = reviewResponses
                                      .filter(
                                        (review) =>
                                          review.order_id === order.id &&
                                          review.order_id !== null &&
                                          order.order_items.some((item) => item.product_id === review.product_id)
                                      )
                                      .filter(
                                        (review, index, self) =>
                                          index === self.findIndex((r) => r.id === review.id)
                                      );

                                    return uniqueReviews.map((review) => (
                                      <TableRow key={`review-${review.id}`}>
                                        <TableCell colSpan={4}>
                                          <Box
                                            sx={{
                                              p: 2,
                                              bgcolor: '#f9f9f9',
                                              mb: 1,
                                              borderRadius: 1,
                                              display: 'flex',
                                              justifyContent: 'space-between',
                                              alignItems: 'center',
                                            }}
                                          >
                                            <Box>
                                              <Typography variant="body2">
                                                <strong>Product:</strong> {getProductName(review.product_id)}
                                              </Typography>
                                              <Typography variant="body2">
                                                <strong>Rating:</strong> {review.rating}
                                              </Typography>
                                              <Typography variant="body2">
                                                <strong>Comment:</strong> {review.comment}
                                              </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                              <Button
                                                size="small"
                                                color="error"
                                                variant="outlined"
                                                onClick={() => handleDeleteReview(review.id, review.product_id)}
                                              >
                                                Delete
                                              </Button>
                                              <Button
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                                onClick={() =>
                                                  setReviewInputs((prev) => ({
                                                    ...prev,
                                                    [order.id]: {
                                                      product_id: review.product_id,
                                                      rating: review.rating,
                                                      comment: review.comment,
                                                      review_id: review.id,
                                                    },
                                                  }))
                                                }
                                              >
                                                Edit
                                              </Button>
                                            </Box>
                                          </Box>
                                        </TableCell>
                                      </TableRow>
                                    ));
                                  })()}

                                  {/* Add/ Review */}
                                  {order.status === 'delivered' && (
                                    <TableRow>
                                      <TableCell colSpan={4}>
                                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
                                          {/* Product Select Dropdown */}
                                          <FormControl size="small" sx={{ minWidth: 220 }}>
                                            <InputLabel id={`select-product-label-${order.id}`}></InputLabel>
                                            <Select
                                              labelId={`select-product-label-${order.id}`}
                                              value={reviewInputs[order.id]?.product_id || ''}
                                              onChange={(e) =>
                                                handleReviewInputChange(order.id, 'product_id', e.target.value)
                                              }
                                              label="Select Product"
                                              displayEmpty
                                              MenuProps={{
                                                disableAutoFocusItem: true,
                                              }}
                                              sx={{
                                                backgroundColor: '#f9f9f9',
                                                borderRadius: 1,
                                                '.MuiSelect-select': {
                                                  padding: '8px 12px',
                                                },
                                              }}
                                            >
                                              <MenuItem disabled value="">
                                                <em>Choose a product...</em>
                                              </MenuItem>
                                              {order.order_items?.map((item, idx) => (
                                                <MenuItem
                                                  key={`${order.id}-${item.product_id}-${idx}`}
                                                  value={item.product_id}
                                                >
                                                  {getProductName(item.product_id)}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>

                                          {/* Rating Field */}
                                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography variant="body2" sx={{ mr: 1 }}>
                                              Rating:
                                            </Typography>
                                            <Rating
                                              name={`rating-${order.id}`}
                                              value={Number(reviewInputs[order.id]?.rating || 0)}
                                              onChange={(event, newValue) => {
                                                handleReviewInputChange(order.id, 'rating', newValue);
                                              }}
                                              size="small"
                                            />
                                          </Box>


                                          {/* Comment Field */}
                                          <TextField
                                            label="Comment"
                                            size="small"
                                            sx={{ minWidth: 200, flex: 1 }}
                                            value={reviewInputs[order.id]?.comment || ''}
                                            onChange={(e) =>
                                              handleReviewInputChange(order.id, 'comment', e.target.value)
                                            }
                                          />

                                          {/* Add/Send Button */}
                                          <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() =>
                                              handleAddReview(order, reviewInputs[order.id]?.product_id)
                                            }
                                          >
                                            Send
                                          </Button>

                                          {/* Edit Button (Only if review_id exists) */}
                                          {reviewInputs[order.id]?.review_id && (
                                            <Button
                                              size="small"
                                              color="success"
                                              variant="contained"
                                              onClick={() =>
                                                handleUpdateReview(
                                                  reviewInputs[order.id].review_id,
                                                  order.id
                                                )
                                              }
                                            >
                                              Update
                                            </Button>
                                          )}

                                        </Box>
                                      </TableCell>

                                    </TableRow>
                                  )}
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

      {/* Payment Modal */}
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
          <Typography variant="h6" mb={2}>Complete Your Payment</Typography>
          <Typography mb={1}><strong>Order ID:</strong> {selectedOrder?.id}</Typography>
          <Typography mb={1}><strong>Amount:</strong> ₹{calculateOrderTotal(selectedOrder?.order_items || []).toLocaleString()}</Typography>

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Select Method</InputLabel>
            <Select value={paymentMethod} label="Select Method" onChange={(e) => setPaymentMethod(e.target.value)}>
              <MenuItem value="UPI">UPI</MenuItem>
              <MenuItem value="Card">Card</MenuItem>
              <MenuItem value="NetBanking">NetBanking</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" fullWidth color="success" sx={{ mt: 3 }} onClick={handleVerifyPayment} disabled={payingOrderId === selectedOrder?.id}>
            {payingOrderId === selectedOrder?.id ? 'Processing...' : 'Verify & Pay'}
          </Button>
        </Box>
      </Modal>

      <Box mt="auto"><BuyerFooter /></Box>
    </Box>
  );
};

export default BuyerOrders;
