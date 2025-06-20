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
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';
import {
  fetchBuyerWishlistAction,
  deleteFromBuyerWishlistAction,
} from '../../store/actions/buyerWishlistAction';
import { fetchProductsAction } from '../../store/actions/productActions';

const BuyerWishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: wishlist = [], loading, error } = useSelector((state) => state.buyerWishlist);
  const { products = [] } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchBuyerWishlistAction());
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteFromBuyerWishlistAction(id)).then(() => dispatch(fetchBuyerWishlistAction()));
  };

  const handleCardClick = (productId) => {
    navigate(`/buyer-dashboard/product-details/${productId}`);
  };

  // Remove duplicates based on product_id
  const uniqueWishlist = Array.from(
    new Map(wishlist.map((item) => [item.product_id, item])).values()
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
      <BuyerHeader />

      <Container sx={{ mt: 5, mb: 5, flex: 1 }}>
        <Typography variant="h5" gutterBottom>
          My Wishlist
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : uniqueWishlist.length === 0 ? (
          <Typography>No items in wishlist.</Typography>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            }}
            gap={3}
          >
            {uniqueWishlist.map((item) => {
              const product = products.find((p) => p.id === item.product_id);
              if (!product) return null;

              let imageUrl = '/default-product.jpg';
              try {
                const parsed = JSON.parse(product.image_url || '[]');
                if (Array.isArray(parsed) && parsed.length > 0) {
                  imageUrl = parsed[0]?.image_url || imageUrl;
                }
              } catch {}

              return (
                <Card
                  key={item.product_id}
                  onClick={() => handleCardClick(product.id)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'box-shadow 0.3s ease-in-out',
                    '&:hover': {
                      boxShadow: '0 0 20px rgba(0, 123, 255, 0.4)',
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    image={imageUrl}
                    alt={product?.product_name || 'Product Image'}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontSize={16} gutterBottom>
                      {product?.product_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₹{Number(product?.price).toLocaleString()}
                    </Typography>
                    <Box display="flex" justifyContent="flex-end">
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item.product_id);
                        }}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}
      </Container>

      <Box mt="auto">
        <BuyerFooter />
      </Box>
    </Box>
  );
};

export default BuyerWishlist;
