import React, { useState } from "react";
import { Heart, ShoppingBag, Eye, Star, MessageCircle } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setSelectedProduct
  } = useShop();

  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState(
    product.swatches && product.swatches.length > 0 ? product.swatches[0] : null
  );

  const isLiked = isInWishlist(product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const swatchText = selectedSwatch ? ` (Color/Stone: ${selectedSwatch.name})` : "";
    const text = `Hi DM Collectives! I would like to order the *${product.name}*${swatchText} (Price: ₹${product.price.toLocaleString(
      "en-IN"
    )}).\nIs this piece currently in stock?`;
    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
  };

  const images = product.images && product.images.length > 0 ? product.images : [
    "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
  ];

  return (
    <article className="luxury-product-card" id={`product-${product.id}`}>
      {/* Product Image Container with Multi-View Angle Controls */}
      <div
        className="card-media-wrapper"
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={images[imageIndex] || images[0]}
          alt={`${product.name} - View ${imageIndex + 1}`}
          className="card-image"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
          }}
        />

        {/* Single Minimal Discount/Bestseller Badge on Top-Left */}
        <div className="card-badge-container">
          {discountPercent > 0 ? (
            <span className="discount-pill-tag">-{discountPercent}%</span>
          ) : product.tag ? (
            <span className="card-tag">{product.tag}</span>
          ) : null}
        </div>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${isLiked ? "liked" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={15}
            fill={isLiked ? "#B4533C" : "none"}
            stroke={isLiked ? "#B4533C" : "currentColor"}
          />
        </button>

        {/* Kushal's-Style Multi-View Angle Switcher Dots (...) */}
        <div className="kushals-card-dots-bar" onClick={(e) => e.stopPropagation()}>
          {images.map((img, idx) => (
            <button
              key={idx}
              className={`kushals-dot-pill ${imageIndex === idx ? "active" : ""}`}
              onClick={() => setImageIndex(idx)}
              title={idx === 0 ? "Front View" : idx === 1 ? "Side Angle" : "Detail View"}
              aria-label={`View angle ${idx + 1}`}
            />
          ))}
        </div>

        {/* Hover Action Overlay */}
        <div className="card-hover-actions">
          <button
            className="card-overlay-btn primary"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1, selectedSwatch);
            }}
          >
            <ShoppingBag size={14} />
            <span>Add to Bag</span>
          </button>
          <button
            className="card-overlay-btn secondary"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="card-info" onClick={() => setSelectedProduct(product)}>
        <div className="card-meta-row">
          <span className="card-category">{product.category}</span>
          <div className="card-rating">
            <Star size={11} fill="#C5A059" stroke="#C5A059" />
            <span>{product.rating}</span>
            <span className="review-count">({product.reviewCount})</span>
          </div>
        </div>

        <h4 className="card-product-name" title={product.name}>
          {product.name}
        </h4>

        {/* Price Row */}
        <div className="card-price-row">
          <span className="current-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          <span className="original-price">
            ₹{product.originalPrice.toLocaleString("en-IN")}
          </span>
          <span className="savings-badge">
            Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Action Row */}
        <div className="card-bottom-actions-row">
          <button
            className="btn-card-add-bag"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1, selectedSwatch);
            }}
          >
            <ShoppingBag size={13} />
            <span>Add to Bag</span>
          </button>

          <button
            className="btn-card-wa"
            onClick={handleWhatsAppOrder}
            title="Order directly on WhatsApp"
          >
            <MessageCircle size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
