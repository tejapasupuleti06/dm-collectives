import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Copy, Check, Gift, Flame } from "lucide-react";

export default function FestiveOffersRibbon() {
  const { applyCoupon, appliedCoupon, showToast } = useShop();
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

  return (
    <section className="offers-ribbon-bar" id="festive-privileges">
      <div className="offers-ribbon-container">
        <div className="offers-ribbon-head">
          <div className="offers-ribbon-title-col">
            <span className="ribbon-tag-pill">
              <Flame size={13} /> FESTIVE PRIVILEGES
            </span>
            <h3 className="ribbon-headline">
              Unlock Exclusive Client Offers
            </h3>
          </div>
          <p className="ribbon-subtext">
            Apply coupon at checkout or click to copy. Free Pan-India Express Delivery &amp; Velvet Keepsake Box with all orders.
          </p>
        </div>

        <div className="offers-tickets-grid">
          {/* Offer 1: WELCOME10 */}
          <div
            className={`offer-ticket-card ${
              appliedCoupon?.code === "WELCOME10" ? "applied-card" : ""
            }`}
            onClick={() => handleCopyOffer("WELCOME10")}
          >
            <div className="ticket-cutout ticket-left"></div>
            <div className="ticket-cutout ticket-right"></div>
            <div className="ticket-content">
              <div className="ticket-badge-row">
                <span className="ticket-type">FIRST ORDER</span>
                <span className="ticket-code-pill">WELCOME10</span>
              </div>
              <h4 className="ticket-discount">FLAT 10% OFF</h4>
              <p className="ticket-desc">
                Instant 10% discount on your first luxury order. No min spend.
              </p>
              <button
                className="ticket-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyOffer("WELCOME10");
                }}
              >
                {copiedCode === "WELCOME10" || appliedCoupon?.code === "WELCOME10" ? (
                  <>
                    <Check size={13} />
                    <span>COPIED &amp; APPLIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>TAP TO APPLY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Offer 2: FESTIVE500 */}
          <div
            className={`offer-ticket-card ${
              appliedCoupon?.code === "FESTIVE500" ? "applied-card" : ""
            }`}
            onClick={() => handleCopyOffer("FESTIVE500")}
          >
            <div className="ticket-cutout ticket-left"></div>
            <div className="ticket-cutout ticket-right"></div>
            <div className="ticket-content">
              <div className="ticket-badge-row">
                <span className="ticket-type">ROYAL CART</span>
                <span className="ticket-code-pill">FESTIVE500</span>
              </div>
              <h4 className="ticket-discount">FLAT ₹500 OFF</h4>
              <p className="ticket-desc">
                Save ₹500 instantly on bridal &amp; gala orders above ₹2,999.
              </p>
              <button
                className="ticket-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyOffer("FESTIVE500");
                }}
              >
                {copiedCode === "FESTIVE500" || appliedCoupon?.code === "FESTIVE500" ? (
                  <>
                    <Check size={13} />
                    <span>COPIED &amp; APPLIED</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>TAP TO APPLY</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Offer 3: FREE SHIPPING & VELVET BOX */}
          <div className="offer-ticket-card complimentary-card">
            <div className="ticket-cutout ticket-left"></div>
            <div className="ticket-cutout ticket-right"></div>
            <div className="ticket-content">
              <div className="ticket-badge-row">
                <span className="ticket-type">COMPLIMENTARY</span>
                <span className="ticket-code-pill auto">AUTO-APPLIED</span>
              </div>
              <h4 className="ticket-discount">FREE EXPRESS SHIPPING</h4>
              <p className="ticket-desc">
                Free Pan-India 48h delivery over ₹1,999 + Heirloom Keepsake Box.
              </p>
              <div className="ticket-auto-badge">
                <Gift size={13} />
                <span>INCLUDED ON CHECKOUT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
