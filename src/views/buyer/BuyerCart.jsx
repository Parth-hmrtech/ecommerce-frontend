import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  CircularProgress,
  Grid,
  Button,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';
import {
  fetchBuyerCart,
  updateBuyerCart,
  deleteBuyerCart,
} from '../../store/actions/buyerCartAction';

const BuyerCart = () => {
  const dispatch = useDispatch();

  // ✅ Fix: Include loading and error
  const { cart = [], loading, error } = useSelector((state) => state.buyerCart);

  useEffect(() => {
    dispatch(fetchBuyerCart());
  }, [dispatch]);

  const handleUpdateQuantity = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    dispatch(updateBuyerCart({ ...item, quantity: newQty }));
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteBuyerCart(id));
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.quantity * (item.product?.price || 0),
      0
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <BuyerHeader />

      <Container sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          My Cart
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : cart.length === 0 ? (
          <Typography>No items in cart.</Typography>
        ) : (
          <>
            <Grid container spacing={3}>
              {cart.map((item) => {
                let imageUrl = '/default-product.jpg';
                try {
                  const parsedImages = JSON.parse(item.product?.image_url || '[]');
                  if (Array.isArray(parsedImages) && parsedImages.length > 0) {
                    imageUrl = parsedImages[0];
                  }
                } catch {
                  // default image will be used
                }

                return (
                  <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={imageUrl}
                        alt={item.product?.product_name || 'Product Image'}
                      />
                      <CardContent>
                        <Typography variant="h6" fontSize={16}>
                          {item.product?.product_name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ₹{item.product?.price}
                        </Typography>

                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="space-between"
                          mt={2}
                        >
                          <IconButton
                            onClick={() => handleUpdateQuantity(item, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Remove />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton onClick={() => handleUpdateQuantity(item, 1)}>
                            <Add />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteItem(item.id)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>

            <Box mt={4} textAlign="right">
              <Typography variant="h6">Total: ₹{calculateTotal()}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Proceed to Checkout
              </Button>
            </Box>
          </>
        )}
      </Container>

      <BuyerFooter />
    </Box>
  );
};

export default BuyerCart;
