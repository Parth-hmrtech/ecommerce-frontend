import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  CircularProgress
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.product);

  const [visibleCount, setVisibleCount] = useState(9);
  const [imageIndices, setImageIndices] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const handlePrevImage = (productId) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]: Math.max((prev[productId] || 0) - 1, 0),
    }));
  };

  const handleNextImage = (productId, images) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % images.length,
    }));
  };

  const visibleProducts = products.slice(0, visibleCount);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <Grid container spacing={3}>
        {visibleProducts.map((product) => {
          let images = [];

          try {
            const parsed = JSON.parse(product.image_url);
            images = Array.isArray(parsed)
              ? parsed.map((img) => img.image_url)
              : [product.image_url];
          } catch {
            images = [product.image_url];
          }

          const currentIndex = imageIndices[product.id] || 0;

          return (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card elevation={3}>
                {images.length > 0 ? (
                  <Box position="relative">
                    <CardMedia
                      component="img"
                      image={images[currentIndex]}
                      alt={product.product_name}
                      height="200"
                      sx={{ objectFit: 'contain' }}
                    />
                    {images.length > 1 && (
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        position="absolute"
                        top="50%"
                        width="100%"
                        px={1}
                        sx={{ transform: 'translateY(-50%)' }}
                      >
                        <Button
                          size="small"
                          onClick={() => handlePrevImage(product.id)}
                          variant="contained"
                          color="primary"
                        >
                          &lt;
                        </Button>
                        <Button
                          size="small"
                          onClick={() => handleNextImage(product.id, images)}
                          variant="contained"
                          color="primary"
                        >
                          &gt;
                        </Button>
                      </Stack>
                    )}
                  </Box>
                ) : (
                  <Box
                    height="200px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="grey.200"
                  >
                    <Typography>No Image</Typography>
                  </Box>
                )}

                <CardContent>
                  <Typography variant="h6">{product.product_name}</Typography>
                  <Typography color="text.secondary">
                    ₹{product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {visibleCount < products.length && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Button variant="outlined" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}

      {visibleProducts.length === 0 && (
        <Box mt={4} textAlign="center">
          <Typography>No products available.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
