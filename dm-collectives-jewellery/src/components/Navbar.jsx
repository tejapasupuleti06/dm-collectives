import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Gem,
  HelpCircle,
  PhoneCall
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsQuizOpen,
    setIsSizeGuideOpen,
    setIsBridalOpen,
    searchQuery,
    setSearchQuery,
    setActiveCategory
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleNavClick = (category = null, anchor = null) => {
    setMobileMenuOpen(false);
    if (category) {
      setActiveCategory(category);
    }
    if (anchor) {
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Mobile Menu Trigger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Identity */}
        <a
          href="#top"
          className="brand-link"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="brand-monogram">DM</span>
          <div className="brand-text-wrap">
            <span className="brand-title">DM COLLECTIVES</span>
            <span className="brand-subtitle">HAUTE JOAILLERIE</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <a
            href="#collections"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("All", "collections");
            }}
          >
            Collections
          </a>
          <a
            href="#bridal"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("Bridal", "collections");
            }}
          >
            Bridal Edit
          </a>
          <a
            href="#occasions"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(null, "occasions");
            }}
          >
            Occasions
          </a>
          <button
            type="button"
            className="nav-action-link quiz-highlight"
            onClick={() => setIsQuizOpen(true)}
          >
            <Gem size={13} />
            <span>Style Quiz</span>
          </button>
          <button
            type="button"
            className="nav-action-link"
            onClick={() => setIsSizeGuideOpen(true)}
          >
            <HelpCircle size={13} />
            <span>Size & Care</span>
          </button>
          <a
            href="#story"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(null, "story");
            }}
          >
            Our Story
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          {/* Search Trigger / Input */}
          <div className={`search-container ${searchOpen ? "open" : ""}`}>
            <button
              className="action-icon-btn search-toggle"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
            >
              <Search size={18} />
            </button>
            <input
              type="text"
              className="search-input"
              placeholder="Search necklace, kundan, earrings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                const coll = document.getElementById("collections");
                if (coll) coll.scrollIntoView({ behavior: "smooth" });
              }}
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Bridal Concierge CTA (Desktop) */}
          <button
            className="header-consult-btn"
            onClick={() => setIsBridalOpen(true)}
          >
            <PhoneCall size={13} />
            <span>Bridal Styling</span>
          </button>

          {/* Wishlist Button with Badge */}
          <button
            className="action-icon-btn wishlist-btn"
            onClick={() => setIsWishlistOpen(true)}
            aria-label="View saved wishlist"
          >
            <Heart size={19} />
            {wishlistCount > 0 && (
              <span className="badge-count">{wishlistCount}</span>
            )}
          </button>

          {/* Shopping Bag Button with Badge */}
          <button
            className="action-icon-btn bag-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="View shopping bag"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 && (
              <span className="badge-count bag-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-links">
            <a
              href="#collections"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("All", "collections");
              }}
            >
              All Collections
            </a>
            <a
              href="#bridal"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("Bridal", "collections");
              }}
            >
              Bridal & Heritage Sets
            </a>
            <a
              href="#chokers"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("Chokers", "collections");
              }}
            >
              Chokers & Collars
            </a>
            <a
              href="#earrings"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("Earrings", "collections");
              }}
            >
              Earrings & Jhumkas
            </a>
            <a
              href="#occasions"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(null, "occasions");
              }}
            >
              Shop By Occasion
            </a>
            <button
              className="mobile-drawer-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsQuizOpen(true);
              }}
            >
              <Gem size={16} /> Find Your Look (Style Quiz)
            </button>
            <button
              className="mobile-drawer-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSizeGuideOpen(true);
              }}
            >
              <HelpCircle size={16} /> Jewellery Sizing & Care Guide
            </button>
            <button
              className="mobile-drawer-btn highlight"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBridalOpen(true);
              }}
            >
              <PhoneCall size={16} /> VIP Bridal Styling WhatsApp
            </button>
          </div>
          <div className="mobile-nav-footer">
            <p>Direct WhatsApp Order & Enquiries</p>
            <a
              href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                "Hi DM Collectives! I'd like to enquire about your jewellery collection."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mobile-wa-btn"
            >
              Chat on WhatsApp {STORE_CONFIG.whatsappDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
