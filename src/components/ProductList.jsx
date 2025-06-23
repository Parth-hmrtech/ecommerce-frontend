import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  CardActions,
} from '@mui/material';

import { Grid } from "@mui/material";



import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsAction } from '../store/actions/productActions';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      right: -10,
      transform: 'translateY(-50%)',
      width: 36,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'white',
      borderTopLeftRadius: '30px',
      borderBottomLeftRadius: '30px',
      boxShadow: 3,
      cursor: 'pointer',
      zIndex: 1,
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 0 20px rgba(0, 123, 255, 0.4)',
      },
    }}
  >
    ❯
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      top: '50%',
      left: -10,
      transform: 'translateY(-50%)',
      width: 36,
      height: 60,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      bgcolor: 'white',
      borderTopRightRadius: '30px',
      borderBottomRightRadius: '30px',
      boxShadow: 3,
      cursor: 'pointer',
      zIndex: 1,
      transition: 'box-shadow 0.3s ease-in-out',
      '&:hover': {
        boxShadow: '0 0 20px rgba(0, 123, 255, 0.4)',
      },
    }}
  >
    ❮
  </Box>
);


const ProductList = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.product);

  const [visibleCount, setVisibleCount] = useState(9);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const handleToggleExpand = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const maxFullRows = Math.floor(visibleCount / 3) * 3;
  const visibleProducts = products.slice(0, maxFullRows);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <Box sx={{ mt: 4, maxWidth: 1200, mx: 'auto', px: 2 }}>
        <Grid container spacing={3}>
          {visibleProducts.map((product) => {
            let images = [];

            try {
              const parsed = JSON.parse(product.image_url);
              if (Array.isArray(parsed)) {
                images = parsed.map((img) => img.image_url || img);
              } else if (parsed?.image_url) {
                images = [parsed.image_url];
              } else if (typeof parsed === 'string') {
                images = [parsed];
              }
            } catch {
              images = [product.image_url || '/default-product.jpg'];
            }

            const isExpanded = expandedCards[product.id];

            return (
              <Box key={product.id}>
                <Card
                  sx={{
                    maxWidth: 345,
                    mx: 'auto',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Box sx={{ width: '100%', position: 'relative' }}>
                    {images.length > 1 ? (
                      <Slider
                        dots
                        infinite
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                      >
                        {images.map((img, idx) => (
                          <Box key={`${product.id}-${idx}`}>
                            <CardMedia
                              component="img"
                              image={img || '/default-product.jpg'}
                              alt={`Product image ${idx + 1}`}
                              sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderBottom: '1px solid #eee',
                              }}
                            />
                          </Box>
                        ))}
                      </Slider>
                    ) : (
                      <CardMedia
                        component="img"
                        image={images[0] || '/default-product.jpg'}
                        alt="Product image"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderBottom: '1px solid #eee',
                        }}
                      />
                    )}
                  </Box>

                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {product.product_name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      ₹{product.price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {isExpanded
                        ? product.description || 'No description available.'
                        : (product.description?.slice(0, 80) || 'No description available.') +
                        (product.description?.length > 80 ? '...' : '')}
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ mt: 'auto' }}>
                    {product.description?.length > 80 && (
                      <Button size="small" onClick={() => handleToggleExpand(product.id)}>
                        {isExpanded ? 'Less' : 'More'}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Box>
            );
          })}
        </Grid>

        {visibleProducts.length < products.length && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Button variant="outlined" onClick={handleLoadMore}>
              Load More
            </Button>
          </Box>
        )}

        {products.length === 0 && (
          <Box mt={4} textAlign="center">
            <Typography>No products available.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductList;
