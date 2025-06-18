import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuyerProductById } from '../../store/actions/buyerProductAction';

import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Container,
    IconButton,
    Button,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';

// Custom Arrows
const NextArrow = ({ onClick }) => (
    <Box
        onClick={onClick}
        sx={{
            position: 'absolute',
            top: '50%',
            right: -20,
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
            fontSize: 22,
            color: '#333',
            zIndex: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
                bgcolor: '#f0f0f0',
                transform: 'translateY(-50%) scale(1.05)',
                boxShadow: '0 0 20px rgba(0, 140, 255, 0.6)',
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
            left: -20,
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
            fontSize: 22,
            color: '#333',
            zIndex: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
                bgcolor: '#f0f0f0',
                transform: 'translateY(-50%) scale(1.05)',
                boxShadow: '0 0 20px rgba(0, 140, 255, 0.6)',
            },
        }}
    >
        ❮
    </Box>
);

const BuyerProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.buyerProduct);

    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        if (productId) {
            dispatch(fetchBuyerProductById(productId));
        }
    }, [dispatch, productId]);

    const getImages = (imageString) => {
        try {
            const parsed = JSON.parse(imageString);
            return Array.isArray(parsed) ? parsed.map((img) => img.image_url || img) : [];
        } catch {
            return [];
        }
    };

    const handleQuantityChange = (delta) => {
        setQuantity((prev) => Math.max(0, prev + delta));
    };

    const handleAddToCart = () => {
        alert(`Added ${quantity} item(s) to cart for: ${product.product_name}`);
        // TODO: Add to cart API or Redux dispatch here
    };

    const images = getImages(product?.image_url);
    const totalPrice = product?.price * quantity;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
            <BuyerHeader />

            <Container sx={{ mt: 5, mb: 5, flex: 1 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">Error: {error}</Typography>
                ) : !product || !product.image_url ? (
                    <Typography>No product found.</Typography>
                ) : (
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', md: 'row' }}
                        gap={4}
                        justifyContent="center"
                    >
                        {/* Product Image Slider */}
                        <Card sx={{ flex: 1, p: 2, overflow: 'hidden' }}>
                            {images.length > 0 ? (
                                <Slider {...sliderSettings}>
                                    {images.map((url, index) => (
                                        <Box key={index} sx={{ px: 2 }}>
                                            <img
                                                src={url}
                                                alt={`product-${index}`}
                                                style={{
                                                    width: '100%',
                                                    height: '320px',
                                                    objectFit: 'contain',
                                                    borderRadius: '12px',
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Slider>
                            ) : (
                                <Box>
                                    <img
                                        src="https://via.placeholder.com/300"
                                        alt="placeholder"
                                        style={{
                                            width: '100%',
                                            height: '320px',
                                            objectFit: 'contain',
                                            borderRadius: '12px',
                                        }}
                                    />
                                </Box>
                            )}
                        </Card>

                        {/* Product Info */}
                        <Card sx={{ flex: 1, p: 2 }}>
                            <CardContent>
                                <Typography variant="h4" fontWeight="bold" gutterBottom>
                                    {product.product_name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {product.description}
                                </Typography>
                                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                                    <strong>Category:</strong> {product.category?.category_name || 'N/A'}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Subcategory:</strong> {product.subCategory?.sub_category_name || 'N/A'}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>Available:</strong> {product.quantity}
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                                    ₹{product.price}
                                </Typography>

                                {/* Quantity & Cart Controls */}
                                <Box display="flex" alignItems="center" mt={3}>
                                    <IconButton
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity === 0}
                                        color="primary"
                                    >
                                        <Remove />
                                    </IconButton>
                                    <Typography variant="body1" sx={{ mx: 2 }}>
                                        {quantity}
                                    </Typography>
                                    <IconButton onClick={() => handleQuantityChange(1)} color="primary">
                                        <Add />
                                    </IconButton>
                                </Box>

                                {/* Total Price Display */}
                                {quantity > 0 && (
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        <strong>Total:</strong> ₹{totalPrice}
                                    </Typography>
                                )}

                                {quantity > 0 && (
                                    <Button
                                        onClick={handleAddToCart}
                                        sx={{
                                            mt: 2,
                                            borderRadius: '20px',
                                            border: '1px solid #e0e0e0',
                                            boxShadow: 'none',
                                            transition: 'all 0.3s ease',
                                            '&:hover': {
                                                boxShadow: '0 0 20px rgba(0, 140, 255, 0.6)',
                                            },
                                        }}
                                    >
                                        Add to Cart
                                    </Button>

                                )}
                            </CardContent>
                        </Card>
                    </Box>
                )}
            </Container>

            <BuyerFooter />
        </Box>
    );
};

export default BuyerProductDetail;
