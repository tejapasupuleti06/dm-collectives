import React, { useState } from "react";
import {
  X,
  ShoppingBag,
  Trash2,
  ArrowRight,
  Gift,
  Tag,
  MessageCircle,
  Truck,
  CheckCircle2
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    shippingFee,
    finalTotal,
    freeShippingRemaining,
    freeShippingThreshold,
    setIsCheckoutOpen,
    setActiveCategory,
    customerAddress,
    generateWhatsAppOrderText
  } = useShop();

  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftNote, setGiftNote] = useState("");

  if (!isCartOpen) return null;

  // Calculate percentage toward free shipping
  const shippingProgress = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  );

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    if (!couponInput.trim()) return;

    const result = applyCoupon(couponInput);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput("");
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    // Check if customer address is already entered
    if (!customerAddress?.fullName || !customerAddress?.address || !customerAddress?.pincode) {
      setIsCartOpen(false);
      setIsCheckoutOpen(true);
      return;
    }

    const message = generateWhatsAppOrderText();
    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="drawer-overlay-backdrop"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="luxury-cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <ShoppingBag size={19} />
            <h3>Your Shopping Bag</h3>
            <span className="drawer-count-chip">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Dynamic Free Shipping Bar */}
        <div className="shipping-progress-banner">
          {freeShippingRemaining > 0 ? (
            <>
              <p className="shipping-progress-text">
                Add <strong>₹{freeShippingRemaining.toLocaleString("en-IN")}</strong>{" "}
                more to unlock <strong>FREE Express Pan-India Shipping</strong>!
              </p>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${shippingProgress}%` }}
                ></div>
              </div>
            </>
          ) : (
            <div className="free-shipping-unlocked">
              <CheckCircle2 size={15} />
              <span>
                <strong>Unlocked!</strong> You qualify for FREE Express Pan-India
                Delivery.
              </span>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="drawer-items-container">
          {cart.length > 0 ? (
            cart.map(({ product, quantity }) => (
              <div className="cart-item-card" key={product.id}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="cart-item-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                  }}
                />
                <div className="cart-item-details">
                  <div className="cart-item-top">
                    <span className="cart-item-cat">{product.category}</span>
                    <button
                      className="cart-item-remove-btn"
                      onClick={() => removeFromCart(product.id)}
                      title="Remove item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <h4 className="cart-item-name">{product.name}</h4>
                  <p className="cart-item-price">
                    ₹{(product.price * quantity).toLocaleString("en-IN")}
                  </p>

                  <div className="cart-item-stepper">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                    >
                      -
                    </button>
                    <span>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty-view">
              <ShoppingBag size={48} className="empty-bag-icon" />
              <h4>Your bag is currently empty</h4>
              <p>Explore our latest handcrafted jewellery to find your signature look.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveCategory("All");
                  const coll = document.getElementById("collections");
                  if (coll) coll.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Discover Collection
              </button>
            </div>
          )}
        </div>

        {/* Cart Footer / Checkout Actions */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Gift Wrapping Accordion */}
            <div className="gift-wrap-option">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setIsGiftWrap(e.target.checked)}
                />
                <span className="checkbox-label">
                  <Gift size={14} /> Complimentary Luxury Gift Box & Note
                </span>
              </label>
              {isGiftWrap && (
                <input
                  type="text"
                  placeholder="Enter recipient note (e.g. Happy Wedding Ananya!)"
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="gift-note-input"
                />
              )}
            </div>

            {/* Coupon Code Section */}
            <div className="drawer-coupon-box">
              {appliedCoupon ? (
                <div className="applied-coupon-pill">
                  <div className="coupon-info">
                    <Tag size={13} />
                    <span>
                      Coupon: <strong>{appliedCoupon.code}</strong> (
                      {appliedCoupon.description})
                    </span>
                  </div>
                  <button
                    className="remove-coupon-btn"
                    onClick={removeCoupon}
                    title="Remove coupon"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <input
                    type="text"
                    placeholder="Promo Code (Try WELCOME10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="coupon-input"
                  />
                  <button type="submit" className="coupon-apply-btn">
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="coupon-error-msg">{couponError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="cart-totals-breakdown">
              <div className="totals-row">
                <span>Subtotal:</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div className="totals-row discount">
                  <span>Discount ({appliedCoupon?.code}):</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="totals-row">
                <span>Pan-India Shipping:</span>
                <span>
                  {shippingFee === 0 ? (
                    <strong className="free-tag">FREE</strong>
                  ) : (
                    `₹${shippingFee}`
                  )}
                </span>
              </div>
              <div className="totals-row grand-total">
                <span>Estimated Total:</span>
                <span className="total-amount">
                  ₹{finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* WhatsApp Exclusive Checkout Buttons */}
            <div className="drawer-actions">
              <button
                className="btn btn-whatsapp-primary-checkout"
                onClick={handleWhatsAppCheckout}
              >
                <MessageCircle size={18} />
                <span>
                  {customerAddress?.fullName ? "Place Order on WhatsApp" : "Enter Delivery Address & Order"}
                </span>
              </button>

              <button
                className="btn btn-outline-address-checkout"
                onClick={handleProceedToCheckout}
              >
                <span>
                  {customerAddress?.fullName ? "Edit Delivery Address" : "Add Delivery Address First"}
                </span>
                <ArrowRight size={15} />
              </button>
            </div>

            <p className="drawer-whatsapp-exclusive-note">
              🔒 Orders accepted exclusively via official WhatsApp Concierge. Direct stylist sizing &amp; verification.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
