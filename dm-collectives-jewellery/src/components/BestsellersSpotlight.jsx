import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import {
  Crown,
  Gem,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Eye,
  Star,
  Heart,
  Flame
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Import Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Individual 3D Perspective Card with multi-view switcher
function HeirloomSlideCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist, setSelectedProduct } = useShop();
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  const images = product.images && product.images.length > 0 ? product.images : [
    "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
  ];
  const isLiked = isInWishlist(product.id);
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="skiper49-card" onClick={() => setSelectedProduct(product)}>
      {/* Visual Image Container */}
      <div className="skiper49-media-wrapper">
        <img
          src={images[activeImgIdx] || images[0]}
          alt={`${product.name} - Angle ${activeImgIdx + 1}`}
          className="skiper49-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
          }}
        />

        {/* Floating Category & Craft Badge */}
        <div className="skiper49-badges-row">
          <span className="skiper49-craft-badge">
            <Crown size={11} className="badge-icon" />
            <span>{product.craft || product.category}</span>
          </span>
          {discountPercent > 0 && (
            <span className="skiper49-discount-badge">{discountPercent}% OFF</span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          className={`skiper49-wishlist-btn ${isLiked ? "liked" : ""}`}
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

        {/* Multi-Angle Switcher Tabs (Front, Side, Detail) */}
        <div className="skiper49-angle-switcher" onClick={(e) => e.stopPropagation()}>
          <button
            className={`skiper49-angle-pill ${activeImgIdx === 0 ? "active" : ""}`}
            onClick={() => setActiveImgIdx(0)}
            title="Front View"
          >
            Front
          </button>
          <button
            className={`skiper49-angle-pill ${activeImgIdx === 1 ? "active" : ""}`}
            onClick={() => setActiveImgIdx(1)}
            title="Side Angle"
          >
            Side
          </button>
          {images.length > 2 && (
            <button
              className={`skiper49-angle-pill ${activeImgIdx === 2 ? "active" : ""}`}
              onClick={() => setActiveImgIdx(2)}
              title="Detail View"
            >
              Detail
            </button>
          )}
        </div>
      </div>

      {/* Card Details & Quick Buy */}
      <div className="skiper49-body">
        <div className="skiper49-meta-row">
          <span className="skiper49-category-name">{product.category}</span>
          <div className="skiper49-rating">
            <Star size={12} fill="#C5A059" stroke="#C5A059" />
            <span>{product.rating}</span>
            <span className="skiper49-review-count">({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="skiper49-item-title" title={product.name}>
          {product.name}
        </h3>

        <div className="skiper49-price-row">
          <span className="skiper49-curr-price">₹{product.price.toLocaleString("en-IN")}</span>
          {product.originalPrice && (
            <span className="skiper49-orig-price">
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
          {product.originalPrice && (
            <span className="skiper49-savings">
              Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="skiper49-actions-row">
          <button
            className="skiper49-btn-add"
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, 1);
            }}
          >
            <ShoppingBag size={14} />
            <span>Add to Bag</span>
          </button>

          <button
            className="skiper49-btn-view"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            title="Quick View Details"
          >
            <Eye size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BestsellersSpotlight() {
  const { openCollectionPopout, navigateToCollection } = useShop();

  // Curated diverse showcase featuring User's star item (93) and reference pieces
  const HEIRLOOM_IDS = [93, 91, 41, 92, 94, 95, 81, 1, 62, 21];
  const heirloomProducts = HEIRLOOM_IDS
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section className="bestsellers-spotlight-section" id="bestsellers">
      <div className="spotlight-container">
        {/* Section Header */}
        <div className="spotlight-header-row">
          <div>
            <div className="spotlight-badge">
              <Crown size={13} className="text-gold" />
              <span>SIGNATURE BESTSELLERS &amp; HEIRLOOMS</span>
            </div>
            <h2 className="spotlight-title">Most Coveted Signature Pieces</h2>
            <p className="spotlight-subtitle">
              Experience the Gota Patti Surkhphool heirloom, floral oxidised danglers, and royal bridal sets in high-definition focus.
            </p>
          </div>

          <button
            className="btn-view-all-popout"
            onClick={() => navigateToCollection("All")}
          >
            <span>Explore All 95+ Pieces</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Clean Responsive Bestsellers Carousel (100% Full Card Visibility) */}
        <div className="skiper47-carousel-wrapper">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            grabCursor={true}
            loop={true}
            spaceBetween={24}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28
              }
            }}
            autoplay={{
              delay: 4200,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }}
            pagination={{
              el: ".skiper47-pagination",
              clickable: true,
              dynamicBullets: true
            }}
            navigation={{
              nextEl: ".skiper47-next-btn",
              prevEl: ".skiper47-prev-btn"
            }}
            className="skiper47-swiper-instance"
          >
            {heirloomProducts.map((product) => (
              <SwiperSlide key={product.id} className="skiper47-slide">
                <HeirloomSlideCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Controls: Left Arrow, Pagination Dots, Right Arrow */}
          <div className="skiper47-controls-row">
            <button
              className="skiper47-nav-arrow skiper47-prev-btn"
              aria-label="Previous Heirloom"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="skiper47-pagination"></div>

            <button
              className="skiper47-nav-arrow skiper47-next-btn"
              aria-label="Next Heirloom"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Quick Category Pills */}
        <div className="spotlight-quick-tabs">
          <span className="quick-tab-label">Quick Vault Navigation:</span>
          <button
            className="quick-tab-pill"
            onClick={() => openCollectionPopout("category", "Jumkas", "Earrings & Jhumkas Vault")}
          >
            Best Earrings &amp; Jhumkas
          </button>
          <button
            className="quick-tab-pill"
            onClick={() =>
              openCollectionPopout("category", "Blckbeads", "Auspicious Mangalsutra Vault")
            }
          >
            Sacred Mangalsutra
          </button>
          <button
            className="quick-tab-pill"
            onClick={() =>
              openCollectionPopout("category", "Neck sets", "Chokers & Haarams Vault")
            }
          >
            Bridal Chokers
          </button>
          <button
            className="quick-tab-pill"
            onClick={() =>
              openCollectionPopout("category", "Vadanam", "Imperial Vaddanams Vault")
            }
          >
            Temple Vaddanams
          </button>
        </div>
      </div>
    </section>
  );
}
