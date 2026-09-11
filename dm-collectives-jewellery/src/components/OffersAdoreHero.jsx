import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Gem, Truck, Check, Copy, ArrowDown } from "lucide-react";

export default function OffersAdoreHero() {
  const { applyCoupon, appliedCoupon, showToast, openCollectionPopout } = useShop();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyOffer = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).catch(() => {});
    }
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`Code "${code}" copied & applied for checkout!`, "success");
    setTimeout(() => {
      setCopiedCode(null);
    }, 3500);
  };

  const handleShopNow = () => {
    openCollectionPopout("category", "All", "All Collections (90+ Pieces)");
  };

  return (
    <section className="offers-adore-hero" id="top">
      {/* Decorative Gold Festive Watermarks */}
      <div className="hero-ribbon-curl curl-left"></div>
      <div className="hero-ribbon-curl curl-right"></div>
      <div className="hero-mandala-watermark"></div>

      <div className="adore-hero-container">
        {/* Title Header */}
        <div className="adore-header">
          <h1 className="adore-main-title">Offers You’ll Adore</h1>
          <p className="adore-subtitle">Timeless Offers for Timeless Beauty</p>
        </div>

        {/* 3 Offers Privilege Cards (Matching Kruthika Reference) */}
        <div className="adore-cards-grid">
          {/* Card 1: Flat 5% */}
          <div
            className={`adore-card ${appliedCoupon?.code === "FLAT5" ? "active-offer" : ""}`}
            onClick={() => handleCopyOffer("FLAT5")}
          >
            <div className="adore-card-body">
              <h3 className="adore-discount-text">Flat 5%</h3>
              <span className="adore-off-label">OFF</span>
              <p className="adore-condition">on orders above</p>
              <div className="adore-price-pill">₹1,999</div>
            </div>
            <button className="adore-copy-btn">
              {copiedCode === "FLAT5" || appliedCoupon?.code === "FLAT5" ? (
                <>
                  <Check size={11} />
                  <span>APPLIED</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>TAP TO APPLY</span>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Flat 8% */}
          <div
            className={`adore-card ${appliedCoupon?.code === "FLAT8" ? "active-offer" : ""}`}
            onClick={() => handleCopyOffer("FLAT8")}
          >
            <div className="adore-card-body">
              <h3 className="adore-discount-text">Flat 8%</h3>
              <span className="adore-off-label">OFF</span>
              <p className="adore-condition">on orders above</p>
              <div className="adore-price-pill">₹2,999</div>
            </div>
            <button className="adore-copy-btn">
              {copiedCode === "FLAT8" || appliedCoupon?.code === "FLAT8" ? (
                <>
                  <Check size={11} />
                  <span>APPLIED</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>TAP TO APPLY</span>
                </>
              )}
            </button>
          </div>

          {/* Card 3: Flat 10% */}
          <div
            className={`adore-card ${appliedCoupon?.code === "WELCOME10" ? "active-offer" : ""}`}
            onClick={() => handleCopyOffer("WELCOME10")}
          >
            <div className="adore-card-body">
              <h3 className="adore-discount-text">Flat 10%</h3>
              <span className="adore-off-label">OFF</span>
              <p className="adore-condition">on orders above</p>
              <div className="adore-price-pill">₹4,999</div>
            </div>
            <button className="adore-copy-btn">
              {copiedCode === "WELCOME10" || appliedCoupon?.code === "WELCOME10" ? (
                <>
                  <Check size={11} />
                  <span>APPLIED</span>
                </>
              ) : (
                <>
                  <Copy size={11} />
                  <span>TAP TO APPLY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Free Shipping & SHOP NOW CTA Row */}
        <div className="adore-shipping-row">
          <div className="adore-shipping-pill">
            <Truck size={14} className="adore-truck-icon" />
            <span>Free shipping anywhere in India on orders above <strong>₹999</strong></span>
          </div>

          <button className="adore-shop-now-btn" onClick={handleShopNow}>
            <span>SHOP NOW</span>
            <ArrowDown size={14} />
          </button>

          <p className="adore-urgency-note">
            <span>•</span> Hurry Up! Don’t miss these <strong>Exclusive Offers!</strong> <span>•</span>
          </p>
        </div>
      </div>
    </section>
  );
}
