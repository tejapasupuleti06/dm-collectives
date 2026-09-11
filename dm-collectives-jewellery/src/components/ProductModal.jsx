import React, { useState } from "react";
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Eye,
  Layers,
  Gem,
  Check,
  Crown,
  Video
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";

export default function ProductModal() {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCartOpen
  } = useShop();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSwatch, setSelectedSwatch] = useState(null);
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [modalTab, setModalTab] = useState("details"); // "details" | "realbrides"

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isLiked = isInWishlist(product.id);

  const images = product.images && product.images.length > 0 ? product.images : [
    "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
  ];

  const ANGLE_LABELS = [
    { label: "Front View", icon: Eye },
    { label: "Side Angle", icon: Layers },
    { label: "Detail View", icon: Gem }
  ];

  const activeSwatch =
    selectedSwatch ||
    (product.swatches && product.swatches.length > 0 ? product.swatches[0] : null);

  const handlePincodeCheck = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus({
        valid: true,
        message: `Express Delivery available to ${pincode}! Expected dispatch within 24-48 hours with Keepsake Velvet Box.`
      });
    } else {
      setPincodeStatus({
        valid: false,
        message: "Please enter a valid 6-digit Indian PIN code."
      });
    }
  };

  const handleWhatsAppOrder = () => {
    const currentAngle = ANGLE_LABELS[activeImageIndex]?.label || "Front View";
    const swatchStr = activeSwatch ? `\n• Stone/Color: ${activeSwatch.name}` : "";
    const message = `Hi DM Collectives! 💎\nI would like to order the *${product.name}*.\n• Price: ₹${product.price.toLocaleString(
      "en-IN"
    )}\n• Category: ${product.category} (${product.craft} Collection)${swatchStr}\n• Viewing: ${currentAngle}\n• Quantity: ${quantity}\n\nPlease confirm availability and dispatch!`;

    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className="luxury-product-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setSelectedProduct(null)}
          aria-label="Close product preview"
        >
          <X size={20} />
        </button>

        <div className="product-modal-grid">
          {/* Left: Studio Multi-View Inspection Gallery */}
          <div className="modal-gallery">
            {/* Interactive Angle Switcher Tabs */}
            <div className="modal-angle-tabs-bar">
              {images.map((img, idx) => {
                const angleInfo = ANGLE_LABELS[idx] || { label: `View ${idx + 1}`, icon: Eye };
                const IconComp = angleInfo.icon;
                return (
                  <button
                    key={idx}
                    className={`modal-angle-tab-btn ${activeImageIndex === idx ? "active" : ""}`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <IconComp size={13} />
                    <span>{angleInfo.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Image Wrap with Magnifier Hint */}
            <div
              className={`modal-main-image-wrap ${isZoomed ? "zoomed" : ""}`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              <img
                src={images[activeImageIndex] || images[0]}
                alt={`${product.name} - ${ANGLE_LABELS[activeImageIndex]?.label || "View"}`}
                className="modal-main-image"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                }}
              />

              <div className="modal-badges-left">
                {product.tag && (
                  <span className="modal-image-tag">{product.tag}</span>
                )}
                {product.craft && (
                  <span className="modal-craft-tag">{product.craft} Collection</span>
                )}
              </div>

              <div className="modal-zoom-hint">
                <Eye size={12} />
                <span>Hover to inspect setting</span>
              </div>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="modal-thumbnail-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`modal-thumb-btn ${
                      activeImageIndex === idx ? "active" : ""
                    }`}
                    onClick={() => setActiveImageIndex(idx)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                      }}
                    />
                    <span className="thumb-angle-label">
                      {ANGLE_LABELS[idx]?.label.split(" ")[0] || `V${idx + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Controls */}
          <div className="modal-details-pane">
            <div className="modal-meta-top">
              <span className="modal-category-chip">
                {product.category} · {product.craft} Craft
              </span>
              <div className="modal-rating-pill">
                <Star size={12} fill="#C5A059" stroke="#C5A059" />
                <span>{product.rating}</span>
                <span className="rating-divider">·</span>
                <span className="review-num">{product.reviewCount} reviews</span>
              </div>
            </div>

            <h2 className="modal-product-title">{product.name}</h2>

            {/* Pricing Strip */}
            <div className="modal-price-strip">
              <span className="modal-price-current">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="modal-price-original">
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
              {discountPercent > 0 && (
                <span className="modal-discount-tag">
                  {discountPercent}% OFF
                </span>
              )}
              <span className="tax-inclusive-note">(Inclusive of all taxes)</span>
            </div>

            {/* Modal Detail Tabs: Specifications vs Styled by Real Brides */}
            <div className="modal-inner-tabs-row">
              <button
                className={`modal-inner-tab-btn ${modalTab === "details" ? "active" : ""}`}
                onClick={() => setModalTab("details")}
              >
                Specifications &amp; Details
              </button>
              <button
                className={`modal-inner-tab-btn ${modalTab === "realbrides" ? "active" : ""}`}
                onClick={() => setModalTab("realbrides")}
              >
                <Crown size={13} className="text-gold" />
                <span>Styled by Real Brides</span>
              </button>
            </div>

            {modalTab === "realbrides" ? (
              <div className="modal-realbrides-pane">
                <div className="realbrides-header">
                  <h5>Real Brides, Real Heirlooms</h5>
                  <p>See how our patrons styled the {product.name} on their celebratory days.</p>
                </div>
                <div className="realbrides-cards-list">
                  <div className="realbride-review-card">
                    <div className="realbride-meta">
                      <strong>Pooja Singhania</strong>
                      <span className="bride-loc">Mumbai • Sangeet Ceremony</span>
                      <div className="star-row">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="#C5A059" stroke="#C5A059" />
                        ))}
                      </div>
                    </div>
                    <p className="bride-quote">
                      "Wore this for my sangeet and it looked absolutely identical to ancestral 22K gold jewelry. The weight is balanced and the pearl fringe didn't tangle!"
                    </p>
                  </div>
                  <div className="realbride-review-card">
                    <div className="realbride-meta">
                      <strong>Ananya Reddy</strong>
                      <span className="bride-loc">Hyderabad • Muhurtham</span>
                      <div className="star-row">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} fill="#C5A059" stroke="#C5A059" />
                        ))}
                      </div>
                    </div>
                    <p className="bride-quote">
                      "The micro matte gold polish has zero brassy glare in studio photography. Everyone thought this was an heirloom passed down through generations."
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <p className="modal-description">{product.description}</p>

                {/* Specifications Box */}
                {product.specs && (
                  <div className="modal-specs-box">
                    <h4 className="specs-heading">Product Details &amp; Specifications</h4>
                    <div className="specs-list">
                      <div className="spec-item">
                        <span className="spec-label">Metal Core:</span>
                        <span className="spec-value">{product.specs.material}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Gold Plating:</span>
                        <span className="spec-value">{product.specs.plating}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Stone Facet:</span>
                        <span className="spec-value">{product.specs.stoneType}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">Closure Type:</span>
                        <span className="spec-value">{product.specs.closure}</span>
                      </div>
                      <div className="spec-item full-width">
                        <span className="spec-label">Dimension:</span>
                        <span className="spec-value">{product.specs.dimension}</span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Pincode Estimator */}
            <div className="modal-pincode-section">
              <label className="pincode-label">
                <Truck size={14} />
                <span>Check Express Delivery &amp; Cash On Delivery:</span>
              </label>
              <form onSubmit={handlePincodeCheck} className="pincode-form">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="pincode-input"
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>
              {pincodeStatus && (
                <p
                  className={`pincode-result ${
                    pincodeStatus.valid ? "success" : "error"
                  }`}
                >
                  {pincodeStatus.message}
                </p>
              )}
            </div>

            {/* Action Row: Quantity + Add to Bag + Wishlist */}
            <div className="modal-action-row">
              <div className="quantity-stepper">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="step-btn"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="step-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary modal-add-btn"
                onClick={() => {
                  addToCart(product, quantity, activeSwatch);
                  setIsCartOpen(true);
                  setSelectedProduct(null);
                }}
              >
                <ShoppingBag size={16} />
                <span>Add to Bag</span>
              </button>

              <button
                className={`modal-wishlist-toggle ${isLiked ? "active" : ""}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Add to Wishlist"
              >
                <Heart
                  size={18}
                  fill={isLiked ? "#B4533C" : "none"}
                  stroke={isLiked ? "#B4533C" : "currentColor"}
                />
              </button>
            </div>

            {/* Direct WhatsApp Order & Live Video Call */}
            <div className="modal-stylist-actions-row">
              <button
                className="whatsapp-direct-btn"
                onClick={handleWhatsAppOrder}
              >
                <MessageCircle size={17} />
                <span>Order via WhatsApp</span>
              </button>
              <button
                className="whatsapp-live-call-btn"
                onClick={() => {
                  window.open(
                    `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                      `Hi DM Collectives! I'd like to book a 15-minute Live Video Shopping session to inspect ${product.name} (SKU: ${product.sku || product.id}).`
                    )}`,
                    "_blank"
                  );
                }}
              >
                <Video size={16} />
                <span>Book Live Video Call</span>
              </button>
            </div>

            {/* Assurances */}
            <div className="modal-assurances">
              <div className="assurance-item">
                <ShieldCheck size={14} className="gold-check" />
                <span>Anti-Tarnish Seal</span>
              </div>
              <div className="assurance-item">
                <Truck size={14} className="gold-check" />
                <span>48h Pan-India Dispatch</span>
              </div>
              <div className="assurance-item">
                <RefreshCw size={14} className="gold-check" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
