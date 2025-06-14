import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  CardActions,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom arrow components
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'block',
        position: 'absolute',
        right: 10,
        top: '40%',
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: '30px',
        boxShadow: 2,
        cursor: 'pointer',
      }}
    >
      ❯
    </Box>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'block',
        position: 'absolute',
        left: 10,
        top: '40%',
        zIndex: 1,
        backgroundColor: '#fff',
        borderRadius: '50%',
        width: 30,
        height: 30,
        textAlign: 'center',
        lineHeight: '30px',
        boxShadow: 2,
        cursor: 'pointer',
      }}
    >
      ❮
    </Box>
  );
};

const ProductList = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((state) => state.product);

  const [visibleCount, setVisibleCount] = useState(9);
  const [expandedCards, setExpandedCards] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
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
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card sx={{ maxWidth: 345, mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ width: '100%', position: 'relative' }}>
                    {images.length > 1 ? (
                      <Slider
                        dots={true}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        nextArrow={<NextArrow />}
                        prevArrow={<PrevArrow />}
                      >
                        {images.map((img, idx) => (
                          <Box key={idx}>
                            <CardMedia
                              component="img"
                              image={img || '/default-product.jpg'}
                              alt={`Product image ${idx + 1}`}
                              sx={{
                                width: '100%',
                                height: 400,
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
                    <Typography gutterBottom variant="h6" component="div">
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
              </Grid>
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
