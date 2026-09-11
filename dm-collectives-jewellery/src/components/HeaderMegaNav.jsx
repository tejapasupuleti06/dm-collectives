import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  Gem,
  ArrowRight,
  Truck,
  Clock,
  ChevronDown,
  Flame,
  Crown
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function HeaderMegaNav() {
  const {
    currentPage,
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsQuizOpen,
    setIsOutfitMatcherOpen,
    setIsTrousseauBuilderOpen,
    navigateToCollection,
    navigateToHome,
    showToast
  } = useShop();

  const [womenMenuOpen, setWomenMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [trackOrderOpen, setTrackOrderOpen] = useState(false);
  const [orderIdInput, setOrderIdInput] = useState("");
  const [orderTrackStatus, setOrderTrackStatus] = useState(null);

  const megaMenuRef = useRef(null);
  const womenBtnRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close mega-menu on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(e.target) &&
        womenBtnRef.current &&
        !womenBtnRef.current.contains(e.target)
      ) {
        setWomenMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isScrolled, setIsScrolled] = useState(false);

  // Shrink header and hide announcement bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto focus search input when search bar opens
  useEffect(() => {
    if (searchBarOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchBarOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    navigateToCollection("All");
    setSearchBarOpen(false);
    showToast(`Showing results for "${searchInput}"`);
  };

  const handleTrackOrderSubmit = (e) => {
    e.preventDefault();
    if (!orderIdInput.trim()) return;
    setOrderTrackStatus({
      id: orderIdInput.trim(),
      status: "Crafted & In Transit via BlueDart Express",
      eta: "Expected in 48-72 Hours",
      origin: "DM Collectives Jaipur Atelier"
    });
  };

  const handleNavClick = (category, filters = {}) => {
    setWomenMenuOpen(false);
    setMobileMenuOpen(false);
    navigateToCollection(category, filters);
  };

  return (
    <header
      className={`voylla-style-header ${isScrolled ? "header-scrolled" : ""}`}
      id="header-top"
    >
      {/* 1. Top Luxury Announcement Strip - PRESENT ONLY ON MAIN/HOME PAGE AND WHEN MENUS ARE CLOSED */}
      {currentPage === "home" && !womenMenuOpen && !mobileMenuOpen && (
        <div className="header-announcement-strip">
          <div className="announcement-container">
            <div className="announcement-text">
              <span>Festive Privileges — Extra 10% OFF Orders with code <strong>WELCOME10</strong></span>
              <span className="dot-sep">•</span>
              <span>Free Express Pan-India Shipping over ₹999</span>
            </div>

            <div className="announcement-right-links hide-mobile">
              <button className="announcement-highlight-btn" onClick={() => setIsOutfitMatcherOpen(true)}>
                <Gem size={11} className="text-gold" />
                <span>Match My Outfit</span>
              </button>
              <span className="bar-sep">|</span>
              <button className="announcement-highlight-btn" onClick={() => setIsTrousseauBuilderOpen(true)}>
                <Crown size={11} className="text-gold" />
                <span>Royal Trousseau Box</span>
              </button>
              <span className="bar-sep">|</span>
              <button className="announcement-btn" onClick={() => setTrackOrderOpen(true)}>
                <Clock size={11} />
                <span>Track Order</span>
              </button>
              <span className="bar-sep">|</span>
              <button className="announcement-btn" onClick={() => setIsQuizOpen(true)}>
                <Gem size={11} />
                <span>Find Your Look</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Luxury Header Row */}
      <div className="header-main-row">
        <div className="header-main-container">
          {/* Left: Hamburger (Mobile) */}
          <button
            className="header-hamburger-btn hide-desktop"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? (
              <X size={26} color="#E5C378" strokeWidth={2.2} />
            ) : (
              <Menu size={26} color="#E5C378" strokeWidth={2.2} />
            )}
          </button>

          {/* Brand Logo & Name */}
          <div className="header-brand-block" onClick={navigateToHome} title="DM Collectives Home">
            <div className="header-logo-crest">
              <img
                src="/dm-logo-transparent.png"
                alt="DM Collectives Royal Insignia"
                className="brand-logo-img"
              />
            </div>
            <div className="header-brand-typography">
              <span className="brand-name-text">DM Collectives</span>
              <span className="brand-tagline-text">ROYAL HERITAGE JEWELLERY</span>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar with Mega-Dropdown on WOMEN */}
          <nav className="header-nav-menu hide-mobile" aria-label="Main Navigation">
            {/* WOMEN with Voylla-style Mega Dropdown */}
            <div
              className="nav-menu-item-wrap"
              onMouseEnter={() => setWomenMenuOpen(true)}
              onMouseLeave={() => setWomenMenuOpen(false)}
            >
              <button
                ref={womenBtnRef}
                className={`nav-menu-link women-link ${womenMenuOpen ? "active" : ""}`}
                onClick={() => setWomenMenuOpen(!womenMenuOpen)}
              >
                <span>WOMEN</span>
                <ChevronDown size={13} className={`chevron-indicator ${womenMenuOpen ? "open" : ""}`} />
              </button>

              {/* The Voylla-Inspired Multi-Column Mega Dropdown Panel */}
              {womenMenuOpen && (
                <div
                  ref={megaMenuRef}
                  className="mega-menu-dropdown-panel"
                  onMouseEnter={() => setWomenMenuOpen(true)}
                  onMouseLeave={() => setWomenMenuOpen(false)}
                >
                  <div className="mega-menu-grid">
                    {/* Column 1: SHOP BY CATEGORY */}
                    <div className="mega-menu-col">
                      <h4 className="mega-col-title">SHOP BY CATEGORY</h4>
                      <ul className="mega-links-list">
                        <li>
                          <button onClick={() => handleNavClick("Jumkas")}>Earrings &amp; Jhumkas</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Neck sets")}>Necklace Sets</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Neck sets", { subType: "choker" })}>Chokers &amp; Haarams</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Rings")}>Imperial Rings</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Bangles")}>Bangles &amp; Kadas</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Braclets")}>Bracelets &amp; Cuffs</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Vadanam")}>Vaddanams (Hip Belts)</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Tikka")}>Maang Tikka &amp; Borla</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Chains")}>22K Micro Chains</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("Blckbeads")}>Auspicious Mangalsutra</button>
                        </li>
                        <li className="highlight-all">
                          <button onClick={() => handleNavClick("All")}>
                            <strong>View All Jewellery (90+ Pieces)</strong>
                          </button>
                        </li>
                      </ul>
                    </div>

                    {/* Column 2: SHOP BY STYLE / CRAFT */}
                    <div className="mega-menu-col">
                      <h4 className="mega-col-title">SHOP BY STYLE</h4>
                      <ul className="mega-links-list">
                        <li>
                          <button onClick={() => handleNavClick("All", { craft: "22K Gold Polish" })}>22K Gold Radiance</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { plating: "oxidised" })}>Oxidised Silver Jewels</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { craft: "Temple Antique" })}>Temple Nakshi Jewellery</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { plating: "silver" })}>Silver &amp; Rhodium Plated</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { craft: "Kundan Jadau" })}>Royal Kundan Jadau</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { craft: "Polki & Meenakari" })}>Polki &amp; Meenakari</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { plating: "micron" })}>Contemporary Anti-Tarnish</button>
                        </li>
                      </ul>
                    </div>

                    {/* Column 3: SHOP BY PRICE */}
                    <div className="mega-menu-col">
                      <h4 className="mega-col-title">SHOP BY PRICE</h4>
                      <ul className="mega-links-list">
                        <li>
                          <button onClick={() => handleNavClick("All", { priceRange: "under-999" })}>Under ₹999</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { priceRange: "999-1499" })}>₹999 - ₹1,499</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { priceRange: "1499-2499" })}>₹1,499 - ₹2,499</button>
                        </li>
                        <li>
                          <button onClick={() => handleNavClick("All", { priceRange: "2500-above" })}>₹2,500 &amp; Above</button>
                        </li>
                      </ul>
                    </div>

                    {/* Column 4: NEW LAUNCH SPOTLIGHT */}
                    <div className="mega-menu-col new-launch-col">
                      <h4 className="mega-col-title">NEW ARRIVALS</h4>
                      <div
                        className="mega-promo-card"
                        onClick={() => handleNavClick("Neck sets")}
                      >
                        <img
                          src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=600&q=85"
                          alt="Dastaan Noor Edit"
                          className="promo-card-img"
                        />
                        <div className="promo-card-details">
                          <span className="promo-badge">NEW LAUNCH</span>
                          <h5 className="promo-title">DASTAAN NOOR EDIT</h5>
                          <p className="promo-sub">Hand-finished 22K antique gold &amp; uncut Kundan.</p>
                          <span className="promo-link">
                            <span>Shop The Edit</span>
                            <ArrowRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bestsellers Tab */}
            <button
              className="nav-menu-link bestsellers-link"
              onClick={() => {
                const el = document.getElementById("bestsellers");
                if (el) el.scrollIntoView({ behavior: "smooth" });
                else handleNavClick("All");
              }}
            >
              <Flame size={13} className="text-orange" />
              <span>BEST SELLERS</span>
            </button>

            {/* Match My Outfit Viral Feature */}
            <button
              className="nav-menu-link highlight-gold-link"
              onClick={() => setIsOutfitMatcherOpen(true)}
            >
              <Gem size={13} className="text-gold" />
              <span>MATCH MY OUTFIT</span>
            </button>

            {/* Bespoke Trousseau Box */}
            <button
              className="nav-menu-link highlight-gold-link"
              onClick={() => setIsTrousseauBuilderOpen(true)}
            >
              <Crown size={13} className="text-gold" />
              <span>TROUSSEAU BOX</span>
              <span className="hot-pill">15% OFF</span>
            </button>

            {/* Collections Tab */}
            <button
              className="nav-menu-link"
              onClick={() => handleNavClick("All")}
            >
              <span>COLLECTIONS</span>
            </button>
          </nav>

          {/* Right: Search, Wishlist, Cart Actions */}
          <div className="header-actions-group">
            {/* Search Button */}
            <button
              className="header-icon-action-btn"
              onClick={() => setSearchBarOpen(!searchBarOpen)}
              aria-label="Search"
              title="Search"
            >
              <Search size={19} />
            </button>

            {/* Wishlist Button */}
            <button
              className="header-icon-action-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              title="Saved Wishlist"
            >
              <Heart size={19} />
              {wishlistCount > 0 && <span className="action-counter-badge">{wishlistCount}</span>}
            </button>

            {/* Bag Button */}
            <button
              className="header-icon-action-btn bag-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
              title="View Cart"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && <span className="action-counter-badge gold">{cartCount}</span>}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Search Bar Overlay */}
      {searchBarOpen && (
        <div className="header-search-tray">
          <div className="search-tray-container">
            <form onSubmit={handleSearchSubmit} className="search-tray-form">
              <Search size={18} className="search-form-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search chokers, jhumkas, rings, mangalsutras, 22K gold chains..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-tray-input"
              />
              {searchInput && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={() => setSearchInput("")}
                >
                  <X size={16} />
                </button>
              )}
              <button type="submit" className="search-submit-btn">
                Search
              </button>
            </form>
            <button
              className="search-tray-close"
              onClick={() => setSearchBarOpen(false)}
              aria-label="Close Search"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* 4. Mobile Drawer Menu (Portaled to body for clean full-screen overlay) */}
      {mobileMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="voylla-mobile-drawer">
            <div className="mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="mobile-drawer-pane">
            <div className="mobile-drawer-head">
              <div className="mobile-drawer-brand">
                <img src="/dm-logo-transparent.png" alt="DM Collectives" className="mobile-logo-img" />
                <div>
                  <h4 className="mobile-brand-title">DM Collectives</h4>
                  <p className="mobile-brand-sub">ROYAL HERITAGE JEWELLERY</p>
                </div>
              </div>
              <button
                className="mobile-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Drawer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-drawer-links-scroll">
              <div className="mobile-group-title">SHOP BY CATEGORY</div>
              <button className="mobile-link-row" onClick={() => handleNavClick("Jumkas")}>
                <span>Earrings &amp; Jhumkas</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Neck sets")}>
                <span>Necklaces &amp; Chokers</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Rings")}>
                <span>Imperial Statement Rings</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Bangles")}>
                <span>Bangles &amp; Kadas</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Vadanam")}>
                <span>Vaddanams (Hip Belts)</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Tikka")}>
                <span>Tikka &amp; Mathapatti</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Chains")}>
                <span>22K Micro Chains</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row" onClick={() => handleNavClick("Blckbeads")}>
                <span>Auspicious Mangalsutra</span>
                <ArrowRight size={14} />
              </button>
              <button className="mobile-link-row highlight" onClick={() => handleNavClick("All")}>
                <span>All Jewellery (90+ Pieces)</span>
                <ArrowRight size={14} />
              </button>

              <div className="mobile-group-title">VIRAL EXPERIENCES</div>
              <button
                className="mobile-link-row highlight-gold-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsOutfitMatcherOpen(true);
                }}
              >
                <span>💎 Match My Outfit (Color Matcher)</span>
                <ArrowRight size={14} />
              </button>
              <button
                className="mobile-link-row highlight-gold-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsTrousseauBuilderOpen(true);
                }}
              >
                <span>🎁 Build Royal Trousseau Box (15% OFF)</span>
                <ArrowRight size={14} />
              </button>

              <div className="mobile-group-title">FEATURED EDITS</div>
              <button
                className="mobile-link-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const el = document.getElementById("bestsellers");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span>🔥 Most Loved Bestsellers</span>
                <ArrowRight size={14} />
              </button>
              <button
                className="mobile-link-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsQuizOpen(true);
                }}
              >
                <span>💎 Find Your Bridal Look (Quiz)</span>
                <ArrowRight size={14} />
              </button>
              <button
                className="mobile-link-row"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setTrackOrderOpen(true);
                }}
              >
                <span>🚚 Track My Order</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 5. Track Order Modal */}
      {trackOrderOpen && (
        <div className="modal-backdrop" onClick={() => setTrackOrderOpen(false)}>
          <div className="modal-container track-order-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Truck size={20} className="text-gold" />
                <h3>Track Express Delivery</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setTrackOrderOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <p className="track-desc">
                Enter your DM Collectives Order ID (e.g. <strong>DMC-849201</strong>) to view live courier dispatch updates.
              </p>

              <form onSubmit={handleTrackOrderSubmit} className="track-form">
                <input
                  type="text"
                  placeholder="e.g. DMC-719342"
                  value={orderIdInput}
                  onChange={(e) => setOrderIdInput(e.target.value)}
                  className="track-input"
                  required
                />
                <button type="submit" className="btn-track-submit">
                  Track Order
                </button>
              </form>

              {orderTrackStatus && (
                <div className="track-result-card">
                  <div className="track-status-badge">
                    <span className="pulse-dot"></span>
                    <span>{orderTrackStatus.status}</span>
                  </div>
                  <div className="track-detail-line">
                    <span>Tracking ID:</span>
                    <strong>{orderTrackStatus.id}</strong>
                  </div>
                  <div className="track-detail-line">
                    <span>Courier Partner:</span>
                    <strong>{orderTrackStatus.carrier}</strong>
                  </div>
                  <div className="track-detail-line">
                    <span>Status:</span>
                    <strong>{orderTrackStatus.estDelivery}</strong>
                  </div>
                  <div className="track-velvet-note">
                    <Crown size={14} className="text-gold" />
                    <span>{orderTrackStatus.velvetBox}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
