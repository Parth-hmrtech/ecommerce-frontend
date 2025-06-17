import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Card,
  CardMedia,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { fetchProducts } from '../store/actions/productActions';

const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: 'absolute',
      right: 8,
      top: '45%',
      zIndex: 2,
      bgcolor: 'background.paper',
      borderRadius: '50%',
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 2,
      cursor: 'pointer',
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
      left: 8,
      top: '45%',
      zIndex: 2,
      bgcolor: 'background.paper',
      borderRadius: '50%',
      width: 30,
      height: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 2,
      cursor: 'pointer',
    }}
  >
    ❮
  </Box>
);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

export default function SellerProductUploadImage() {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useSelector((s) => s.product);

  // take only first 25 products
  const displayProducts = products.slice(0, 25);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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
    <Box sx={{ mx: 'auto', mt: 4, maxWidth: 1200 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Products
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 2,
        }}
      >
        {displayProducts.map((product) => {
          let images = [];
          try {
            const parsed = JSON.parse(product.image_url || '[]');
            images = Array.isArray(parsed)
              ? parsed.map((i) => i.image_url || i)
              : [parsed];
          } catch {
            images = [product.image_url];
          }

          return (
            <Card key={product.id} sx={{ position: 'relative' }}>
              {images.length > 1 ? (
                <Slider {...sliderSettings}>
                  {images.map((url, idx) => (
                    <Box key={idx} sx={{ height: 150 }}>
                      <CardMedia
                        component="img"
                        image={url}
                        alt={`Product ${idx}`}
                        sx={{ height: 150, objectFit: 'cover' }}
                      />
                    </Box>
                  ))}
                </Slider>
              ) : (
                <CardMedia
                  component="img"
                  image={images[0]}
                  alt="Product"
                  sx={{ height: 150, objectFit: 'cover' }}
                />
              )}
              <Box sx={{ p: 1 }}>
                <Typography variant="subtitle1" noWrap>
                  {product.product_name}
                </Typography>
              </Box>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
