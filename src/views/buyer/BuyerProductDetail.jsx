// src/views/buyer/BuyerProductDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    fetchBuyerCartAction,
    addToBuyerCartAction,
    updateBuyerCartAction,
    deleteBuyerCartAction,
} from '../../store/actions/buyer/buyerCartAction';
import { fetchBuyerProductByIdAction } from '../../store/actions/buyer/buyerProductAction';
import {
    fetchBuyerWishlistAction,
    addToBuyerWishlistAction,
} from '../../store/actions/buyer/buyerWishlistAction';
import {
    fetchBuyerReviewByProductIdAction,
    updateBuyerReviewAction,
    deleteBuyerReviewAction,
} from '../../store/actions/buyer/buyerReviewAction';

import {
    Box,
    Typography,
    CircularProgress,
    Card,
    CardContent,
    Container,
    IconButton,
    Snackbar,
    Alert,
    Rating,
    Button,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Add, Remove } from '@mui/icons-material';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import BuyerHeader from '../../components/common/BuyerHeader';
import BuyerFooter from '../../components/common/BuyerFooter';
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


const BuyerProductDetail = () => {
    const { productId } = useParams();
    const dispatch = useDispatch();

    const { product, loading, error } = useSelector((state) => state.buyerProduct);
    const { cart = [] } = useSelector((state) => state.buyerCart);
    const { items: wishlist = [] } = useSelector((state) => state.buyerWishlist);
    const { items: reviewResponses = [] } = useSelector((state) => state.buyerReview);

    const [wishlisted, setWishlisted] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [editingReviewId, setEditingReviewId] = useState(null);
    const [editedRating, setEditedRating] = useState(0);
    const [editedComment, setEditedComment] = useState('');

    useEffect(() => {
        if (productId) {
            dispatch(fetchBuyerProductByIdAction(productId));
            dispatch(fetchBuyerCartAction());
            dispatch(fetchBuyerWishlistAction());
        }
    }, [dispatch, productId]);

    useEffect(() => {
        if (product?.id) {
            dispatch(fetchBuyerReviewByProductIdAction(product.id));
        }
    }, [dispatch, product?.id]);

    useEffect(() => {
        const alreadyWishlisted = wishlist.some((item) => item.product_id === product?.id);
        setWishlisted(alreadyWishlisted);
    }, [wishlist, product]);

    const getImages = (imageString) => {
        try {
            const parsed = JSON.parse(imageString);
            return Array.isArray(parsed)
                ? parsed.map((img) => img.image_url || img)
                : typeof parsed === 'object' && parsed.image_url
                    ? [parsed.image_url]
                    : typeof parsed === 'string'
                        ? [parsed]
                        : [];
        } catch {
            return [];
        }
    };

    const handleUpdateQuantity = (item, delta) => {
        const newQty = item.quantity + delta;

        if (newQty < 1) {
            dispatch(deleteBuyerCartAction(item.id)).then(() =>
                dispatch(fetchBuyerCartAction())
            );
        } else {
            dispatch(updateBuyerCartAction({ id: item.id, quantity: newQty })).then(() =>
                dispatch(fetchBuyerCartAction())
            );
        }
    };

    const handleAddToCart = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.id && product?.id) {
            dispatch(addToBuyerCartAction({
                buyer_id: user.id,
                product_id: product.id,
                quantity: 1,
            })).then(() => dispatch(fetchBuyerCartAction()));
        }
    };

    const handleWishlistClick = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        const buyer_id = user?.id;

        if (product && buyer_id) {
            dispatch(addToBuyerWishlistAction({ buyer_id, product_id: product.id })).then(() => {
                setWishlisted(true);
                setSnackbarOpen(true);
            });
        }
    };

    const handleEditClick = (review) => {
        setEditingReviewId(review.id);
        setEditedRating(review.rating);
        setEditedComment(review.comment);
    };

    const handleUpdateReview = (reviewId) => {
        dispatch(
            updateBuyerReviewAction({
                id: reviewId,
                rating: editedRating,
                comment: editedComment,
            })
        ).then(() => {
            setEditingReviewId(null);
            dispatch(fetchBuyerReviewByProductIdAction(product.id));
        });
    };

    const handleDeleteReview = (reviewId) => {
        dispatch(deleteBuyerReviewAction(reviewId)).then(() => {
            dispatch(fetchBuyerReviewByProductIdAction(product.id));
        });
    };

    const images = getImages(product?.image_urls || product?.image_url);
    const cartItem = cart.find((item) => item.product_id === product?.id);
    const quantity = cartItem?.quantity || 0;
    const totalPrice = (product?.price || 0) * quantity;

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

            <Container sx={{ mt: 5, flex: 1 }}>
                {loading ? (
                    <Box display="flex" justifyContent="center" mt={4}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">Error: {error}</Typography>
                ) : !product ? (
                    <Typography>No product found.</Typography>
                ) : (
                    <>
                        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center">
                            <Card sx={{ flex: 1, p: 2, overflow: 'hidden', position: 'relative' }}>
                                <IconButton
                                    onClick={handleWishlistClick}
                                    sx={{
                                        position: 'absolute',
                                        top: 12,
                                        right: 12,
                                        zIndex: 2,
                                        bgcolor: '#fff',
                                        '&:hover': { bgcolor: '#ffe6e6' },
                                        boxShadow: 2,
                                    }}
                                >
                                    {wishlisted ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                                </IconButton>

                                {images.length > 1 ? (
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
                                ) : images.length === 1 ? (
                                    <Box sx={{ px: 2 }}>
                                        <img
                                            src={images[0]}
                                            alt="product-single"
                                            style={{
                                                width: '100%',
                                                height: '320px',
                                                objectFit: 'contain',
                                                borderRadius: '12px',
                                            }}
                                        />
                                    </Box>
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

                            <Card sx={{ flex: 1 }}>
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

                                    <Box display="flex" alignItems="center" mt={3}>
                                        <IconButton
                                            onClick={() => {
                                                if (cartItem) {
                                                    handleUpdateQuantity(cartItem, -1);
                                                }
                                            }}
                                        >
                                            <Remove />
                                        </IconButton>

                                        <Typography>{quantity}</Typography>

                                        <IconButton
                                            onClick={() => {
                                                if (cartItem) {
                                                    handleUpdateQuantity(cartItem, 1);
                                                } else {
                                                    handleAddToCart();
                                                }
                                            }}
                                        >
                                            <Add />
                                        </IconButton>
                                    </Box>

                                    {quantity > 0 && (
                                        <Typography variant="body1" sx={{ mt: 2 }}>
                                            <strong>Total:</strong> ₹{totalPrice}
                                        </Typography>
                                    )}
                                </CardContent>
                            </Card>
                        </Box>

                        {reviewResponses.length > 0 && (
                            <Box
                                sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    p: 2,
                                    backgroundColor: '#fafafa',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {reviewResponses.map((review) => {
                                        const user = JSON.parse(localStorage.getItem('user'));
                                        const isOwnReview = user?.id === review.buyer_id;
                                        const isEditing = editingReviewId === review.id;

                                        return (
                                            <Box
                                                key={`review-${review.id}`}
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: isOwnReview ? 'flex-end' : 'flex-start',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: isOwnReview ? '#d1ffd6' : '#e0e0e0',
                                                        px: 2,
                                                        py: 1.5,
                                                        borderRadius: 3,
                                                        borderBottomRightRadius: isOwnReview ? 0 : 12,
                                                        borderBottomLeftRadius: isOwnReview ? 12 : 0,
                                                        maxWidth: '75%',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                                        {isOwnReview ? 'You' : `Buyer: ${review.buyer_id}`}
                                                    </Typography>

                                                    {isEditing ? (
                                                        <>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                                <Rating
                                                                    value={editedRating}
                                                                    onChange={(_, val) => setEditedRating(val)}
                                                                    precision={0.5}
                                                                />
                                                                <Typography variant="body2" sx={{ ml: 1 }}>
                                                                    ({editedRating}/5)
                                                                </Typography>
                                                            </Box>
                                                            <textarea
                                                                value={editedComment}
                                                                onChange={(e) => setEditedComment(e.target.value)}
                                                                style={{
                                                                    width: '100%',
                                                                    padding: '8px',
                                                                    marginTop: '10px',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #ccc',
                                                                    resize: 'vertical',
                                                                }}
                                                                rows={3}
                                                            />
                                                            <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                                <Button
                                                                    variant="contained"
                                                                    color="success"
                                                                    size="small"
                                                                    onClick={() => handleUpdateReview(review.id)}
                                                                >
                                                                    Save
                                                                </Button>
                                                                <Button
                                                                    variant="outlined"
                                                                    size="small"
                                                                    onClick={() => setEditingReviewId(null)}
                                                                >
                                                                    Cancel
                                                                </Button>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                                                                <Rating value={review.rating} readOnly precision={0.5} size="small" />
                                                                <Typography variant="body1">{review.comment}</Typography>
                                                            </Box>

                                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                                                {new Date(review.created_at).toLocaleString('en-IN')}
                                                            </Typography>

                                                            {isOwnReview && (
                                                                <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                                                                    <Button variant="text" size="small" onClick={() => handleEditClick(review)}>
                                                                        Edit
                                                                    </Button>
                                                                    <Button
                                                                        variant="text"
                                                                        size="small"
                                                                        color="error"
                                                                        onClick={() => handleDeleteReview(review.id)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Box>
                                                            )}
                                                        </>
                                                    )}
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        )}
                    </>
                )}
            </Container>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
                    Added to wishlist!
                </Alert>
            </Snackbar>

            <BuyerFooter />
        </Box>
    );
};

export default BuyerProductDetail;
