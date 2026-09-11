import React, { useState } from "react";
import {
  Instagram,
  MessageCircle,
  Mail,
  ShieldCheck,
  Truck,
  Heart,
  ArrowRight,
  Gem
} from "lucide-react";
import { STORE_CONFIG } from "../data/config";
import { useShop } from "../context/ShopContext";

export default function Footer() {
  const {
    setIsQuizOpen,
    setIsSizeGuideOpen,
    setIsBridalOpen,
    setActiveCategory,
    showToast
  } = useShop();

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      showToast("Thank you for subscribing! Use promo code WELCOME10 for 10% off.");
      setNewsletterEmail("");
    }
  };

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    const coll = document.getElementById("collections");
    if (coll) coll.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="luxury-site-footer" id="contact">
      {/* Brand Ethos & Newsletter Strip */}
      <div className="footer-top-strip">
        <div className="footer-container">
          <div className="footer-newsletter-wrap">
            <div className="newsletter-text">
              <span className="newsletter-eyebrow">
                <Gem size={13} className="gold-sparkle" /> THE INSIDER CIRCLE
              </span>
              <h3>Receive 10% Off Your First Order</h3>
              <p>
                Be the first to preview new bridal edits, limited drops, and
                styling secrets.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-submit-btn">
                <span>Join Edit</span>
                <ArrowRight size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="footer-main">
        <div className="footer-container footer-grid">
          {/* Column 1: Brand & Heritage */}
          <div className="footer-col brand-col" id="story">
            <div className="footer-brand-header">
              <img
                src="/dm-logo-transparent.png"
                alt="DM Collectives"
                className="footer-logo-img"
              />
              <div>
                <h4 className="footer-brand-title">DM COLLECTIVES</h4>
                <p className="footer-brand-tagline">HAUTE JOAILLERIE</p>
              </div>
            </div>
            <p className="footer-story-text">
              DM Collectives curates timeless artificial jewellery designed to
              celebrate Indian craft, regal silhouettes, and modern elegance.
              Every piece is hand-finished with 18K/22K gold micron polish,
              anti-tarnish lacquer, and hypoallergenic settings.
            </p>
            <div className="footer-social-links">
              <a
                href={STORE_CONFIG.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="social-icon-btn"
              >
                <Instagram size={17} />
              </a>
              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="social-icon-btn"
              >
                <MessageCircle size={17} />
              </a>
              <a
                href={`mailto:${STORE_CONFIG.email}`}
                aria-label="Email"
                className="social-icon-btn"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Column 2: Collections Quick Links */}
          <div className="footer-col">
            <h5 className="footer-heading">Collections</h5>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => handleCategoryClick("Bridal")}>
                  Bridal &amp; Heritage Sets
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Chokers")}>
                  Jadau &amp; Meenakari Chokers
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Earrings")}>
                  Chandbalis &amp; Jhumkas
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Bangles")}>
                  Antique Temple Kadas
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Maang Tikka")}>
                  Maang Tikka &amp; Passa
                </button>
              </li>
              <li>
                <button onClick={() => handleCategoryClick("Everyday")}>
                  Everyday Minimal Solitaires
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Experience & Concierge */}
          <div className="footer-col">
            <h5 className="footer-heading">Client Concierge</h5>
            <ul className="footer-links-list">
              <li>
                <button onClick={() => setIsBridalOpen(true)}>
                  VIP Bridal Styling WhatsApp
                </button>
              </li>
              <li>
                <button onClick={() => setIsQuizOpen(true)}>
                  Find Your Look (Style Quiz)
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)}>
                  Jewellery Sizing Guide
                </button>
              </li>
              <li>
                <button onClick={() => setIsSizeGuideOpen(true)}>
                  Jewellery Care Instructions
                </button>
              </li>
              <li>
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    "Hi! I need help with an order/tracking."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Order Tracking &amp; Inquiries
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Reassurance */}
          <div className="footer-col">
            <h5 className="footer-heading">Direct Assistance</h5>
            <div className="footer-contact-box">
              <p>
                <strong>WhatsApp Concierge:</strong>
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {STORE_CONFIG.whatsappDisplay}
                </a>
              </p>
              <p>
                <strong>Instagram:</strong>
                <a
                  href={STORE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {STORE_CONFIG.instagramHandle}
                </a>
              </p>
              <p>
                <strong>Pan-India Courier:</strong> Express 48-Hour Dispatch via
                Insured Air Courier.
              </p>
              <div className="footer-tag-strip">
                <span>✦ COD Available</span>
                <span>✦ Easy Exchange</span>
                <span>✦ Velvet Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="footer-bottom-bar">
        <div className="footer-container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} DM Collectives. All rights reserved. Handcrafted
            for the moments that matter.
          </p>
          <div className="footer-legal-links">
            <span>Shipping Policy</span>
            <span>·</span>
            <span>Exchange &amp; Returns</span>
            <span>·</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
