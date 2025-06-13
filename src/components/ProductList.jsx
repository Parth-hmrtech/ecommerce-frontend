import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/actions/productActions';
import '../assets/styles/ProductCardList.css';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-container">
      <h2 className="product-heading">Products</h2>

      <div className="product-grid">
        {visibleProducts.length > 0 && visibleProducts.map((product) => {
          
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
            
            <div key={product.id} className="product-card">
            
              <div className="product-image-box">
               
                {images.length > 0 && (
                  <>
                    <img src={images[currentIndex]} alt={product.product_name} className="product-image" />

                    {images.length > 1 && (
                      <div className="image-arrows">
                        <button className="arrow-btn" onClick={() => handlePrevImage(product.id)}>&lt;</button>
                        <button className="arrow-btn" onClick={() => handleNextImage(product.id, images)}>&gt;</button>
                      </div>
                    )}

                  </>
                )}

                {images.length === 0 && (
                  <span className="no-image-text">No Image</span>
                )}

              </div>

              <h3 className="product-title">{product.product_name}</h3>
              <p className="product-price">₹{product.price}</p>
            </div>
          );
        })}
        {visibleProducts.length === 0 && <p>No products available.</p>}


      </div>
      {visibleCount < products.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
