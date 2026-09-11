import React, { useState } from "react";
import {
  Crown,
  Gem,
  ArrowRight,
  Eye,
  Check,
  Copy,
  Truck,
  ShieldCheck
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";

export default function ModernHero() {
  const {
    openCollectionPopout,
    applyCoupon,
    appliedCoupon,
    showToast,
    setSelectedProduct
  } = useShop();

  const [copiedCode, setCopiedCode] = useState(null);
  const signaturePiece = products[0]; // Jaalique Choker

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
    <section className="modern-hero-section" id="top">
      {/* Background Ambient Mesh Glows */}
      <div className="hero-mesh-glow glow-1"></div>
      <div className="hero-mesh-glow glow-2"></div>

      <div className="modern-hero-container">
        {/* Left Column: Modern Editorial Story & Conversion CTAs */}
        <div className="modern-hero-content">
          <div className="modern-hero-pill-badge">
            <Crown size={13} className="gold-sparkle-icon" />
            <span>2026 BRIDAL &amp; FESTIVE COUTURE</span>
          </div>

          <h1 className="modern-hero-headline">
            Jewellery crafted for <br />
            <em>unforgettable</em> moments.
          </h1>

          <p className="modern-hero-lead">
            Heirloom temple artistry, radiant uncut Kundan, and contemporary statement
            silhouettes. Hand-finished with 22K antique gold micron plating and sealed with
            hydrophobic anti-tarnish lacquer.
          </p>

          {/* Primary & Secondary Modern CTAs */}
          <div className="modern-hero-actions">
            <button
              className="btn-modern-primary"
              onClick={() => openCollectionPopout("category", "All", "All Collections (90+ Pieces)")}
            >
              <span>Explore Collection Vault</span>
              <ArrowRight size={15} />
            </button>

            <a
              href="#bestsellers"
              className="btn-modern-glass"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Gem size={14} className="text-gold" />
              <span>Coveted Heirlooms</span>
            </a>
          </div>

          {/* Integrated Modern Privilege Coupons */}
          <div className="modern-privileges-block">
            <div className="privilege-header-row">
              <span className="privilege-eyebrow">EXCLUSIVE PRIVILEGES (TAP TO APPLY)</span>
              <span className="shipping-tag">
                <Truck size={12} />
                <span>Free shipping &gt; ₹999</span>
              </span>
            </div>

            <div className="privileges-cards-row">
              {/* Card 1: Flat 5% */}
              <div
                className={`privilege-glass-card ${
                  appliedCoupon?.code === "FLAT5" ? "active-privilege" : ""
                }`}
                onClick={() => handleCopyOffer("FLAT5")}
              >
                <div className="privilege-card-top">
                  <span className="privilege-percent">5% OFF</span>
                  <span className="privilege-code">FLAT5</span>
                </div>
                <span className="privilege-min">Orders &gt; ₹1,999</span>
                <span className="privilege-tap-hint">
                  {copiedCode === "FLAT5" || appliedCoupon?.code === "FLAT5" ? "Applied ✓" : "Tap to Apply"}
                </span>
              </div>

              {/* Card 2: Flat 8% */}
              <div
                className={`privilege-glass-card ${
                  appliedCoupon?.code === "FLAT8" ? "active-privilege" : ""
                }`}
                onClick={() => handleCopyOffer("FLAT8")}
              >
                <div className="privilege-card-top">
                  <span className="privilege-percent">8% OFF</span>
                  <span className="privilege-code">FLAT8</span>
                </div>
                <span className="privilege-min">Orders &gt; ₹2,999</span>
                <span className="privilege-tap-hint">
                  {copiedCode === "FLAT8" || appliedCoupon?.code === "FLAT8" ? "Applied ✓" : "Tap to Apply"}
                </span>
              </div>

              {/* Card 3: Flat 10% */}
              <div
                className={`privilege-glass-card ${
                  appliedCoupon?.code === "WELCOME10" ? "active-privilege" : ""
                }`}
                onClick={() => handleCopyOffer("WELCOME10")}
              >
                <div className="privilege-card-top">
                  <span className="privilege-percent">10% OFF</span>
                  <span className="privilege-code">WELCOME10</span>
                </div>
                <span className="privilege-min">Orders &gt; ₹4,999</span>
                <span className="privilege-tap-hint">
                  {copiedCode === "WELCOME10" || appliedCoupon?.code === "WELCOME10" ? "Applied ✓" : "Tap to Apply"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: High-Fashion Visual Showcase & Floating Feature Card */}
        <div className="modern-hero-visual-col">
          <div className="visual-media-wrapper">
            <img
              src="https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
              alt="DM Collectives Royal Signature Jewellery"
              className="visual-main-image"
            />
            <div className="visual-image-sheen"></div>

            {/* Floating Glass Editorial Badge */}
            <div className="visual-floating-badge">
              <span className="floating-eyebrow">SIGNATURE PIECE</span>
              <h3 className="floating-title">Jaalique Choker Set</h3>
              <div className="floating-price-row">
                <span className="floating-price">₹2,499</span>
                <span className="floating-original">₹3,999</span>
                <span className="floating-discount-tag">38% OFF</span>
              </div>
              <button
                className="floating-quick-btn"
                onClick={() => setSelectedProduct(signaturePiece)}
              >
                <Eye size={13} />
                <span>Quick View Studio Angles</span>
              </button>
            </div>

            {/* Orbitals */}
            <div className="luxury-orbital orbital-outer"></div>
            <div className="luxury-orbital orbital-inner"></div>
          </div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="modern-marquee-strip">
        <div className="marquee-content-track">
          <span>100% ANTI-TARNISH SEAL</span>
          <span className="star-divider">✦</span>
          <span>22K GOLD MICRON POLISH</span>
          <span className="star-divider">✦</span>
          <span>48-HOUR PAN-INDIA DISPATCH</span>
          <span className="star-divider">✦</span>
          <span>AUTHENTIC KUNDAN JADAU</span>
          <span className="star-divider">✦</span>
          <span>ROYAL TEMPLE HEIRLOOMS</span>
          <span className="star-divider">✦</span>
          <span>VELVET KEEPSAKE BOX</span>
          <span className="star-divider">✦</span>
          <span>100% ANTI-TARNISH SEAL</span>
          <span className="star-divider">✦</span>
          <span>22K GOLD MICRON POLISH</span>
          <span className="star-divider">✦</span>
          <span>48-HOUR PAN-INDIA DISPATCH</span>
          <span className="star-divider">✦</span>
        </div>
      </div>
    </section>
  );
}
