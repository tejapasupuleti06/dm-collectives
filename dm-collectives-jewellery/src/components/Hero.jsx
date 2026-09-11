import React from "react";
import { ArrowRight, Gem, ShieldCheck, Heart, ShoppingBag, Eye } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";

export default function Hero() {
  const { setSelectedProduct, addToCart, setIsQuizOpen, setActiveCategory } = useShop();
  const signaturePiece = products[0]; // Temple Bloom

  return (
    <section className="hero-section" id="top">
      <div className="hero-container">
        {/* Left Column: Editorial Headline & Conversion CTAs */}
        <div className="hero-content">
          <div className="hero-badge">
            <Gem size={14} className="gold-sparkle" />
            <span>2026 Festive & Bridal Collection</span>
          </div>

          <h1 className="hero-heading">
            Jewellery crafted for <br />
            <em>unforgettable</em> moments.
          </h1>

          <p className="hero-subheading">
            Heirloom temple artistry, radiant uncut Kundan, and contemporary statement
            silhouettes. Hand-finished with 18K/22K gold micron plating and protective
            anti-tarnish lacquer for a lifetime of lustre.
          </p>

          <div className="hero-cta-group">
            <a
              href="#collections"
              className="btn btn-primary"
              onClick={() => setActiveCategory("All")}
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} />
            </a>

            <button
              className="btn btn-outline"
              onClick={() => setIsQuizOpen(true)}
            >
              <Gem size={15} />
              <span>Find Your Look (Style Quiz)</span>
            </button>
          </div>

          <div className="hero-trust-chips">
            <div className="trust-chip">
              <span className="dot"></span>
              <span>18K/22K Gold Micron Polish</span>
            </div>
            <div className="trust-chip">
              <span className="dot"></span>
              <span>48-Hour Pan-India Dispatch</span>
            </div>
            <div className="trust-chip">
              <span className="dot"></span>
              <span>Velvet Keepsake Packaging</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Showcase & Floating Feature Card */}
        <div className="hero-visual">
          <div className="hero-image-wrapper">
            <img
              src="https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
              alt="DM Collectives Royal Heritage Jewellery"
              className="hero-main-image"
            />
            <div className="hero-image-overlay"></div>

            {/* Floating Editorial Badge */}
            <div className="editorial-floating-badge">
              <span className="floating-badge-eyebrow">THE SIGNATURE EDIT</span>
              <h3 className="floating-badge-title">Jaalique Choker Set</h3>
              <p className="floating-badge-price">₹2,499 <span>₹3,999</span></p>
              <button
                className="floating-badge-btn"
                onClick={() => setSelectedProduct(signaturePiece)}
              >
                <Eye size={13} />
                <span>Quick View Piece</span>
              </button>
            </div>

            {/* Luxury Orbitals */}
            <div className="orbital-ring orbital-one"></div>
            <div className="orbital-ring orbital-two"></div>
          </div>
        </div>
      </div>

      {/* Marquee Banner */}
      <div className="luxury-marquee">
        <div className="marquee-track">
          <span>ROYAL BRIDAL HAARS</span>
          <span className="star">✦</span>
          <span>JADAU KUNDAN CHOKERS</span>
          <span className="star">✦</span>
          <span>ANTIQUE TEMPLE KADAS</span>
          <span className="star">✦</span>
          <span>CHANDBALIS & JHUMKAS</span>
          <span className="star">✦</span>
          <span>MINIMAL CZ SOLITAIRES</span>
          <span className="star">✦</span>
          <span>BESPOKE OCCASION WEAR</span>
          <span className="star">✦</span>
          <span>ROYAL BRIDAL HAARS</span>
          <span className="star">✦</span>
          <span>JADAU KUNDAN CHOKERS</span>
          <span className="star">✦</span>
          <span>ANTIQUE TEMPLE KADAS</span>
          <span className="star">✦</span>
          <span>CHANDBALIS & JHUMKAS</span>
          <span className="star">✦</span>
        </div>
      </div>
    </section>
  );
}
