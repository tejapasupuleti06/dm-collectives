import React from "react";
import { Home, User, Search, Star, ShoppingBag, Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function MobileBottomNav() {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    navigateToHome,
    navigateToCollection,
    currentPage
  } = useShop();

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        "Hi DM Collectives! I am browsing your jewellery collection and would love some styling assistance."
      )}`,
      "_blank"
    );
  };

  return (
    <nav className="mobile-bottom-navigation" aria-label="Mobile Bottom Navigation">
      <button
        className={`bottom-nav-item ${currentPage !== "collection" ? "active" : ""}`}
        onClick={navigateToHome}
        title="Home"
      >
        <Home size={19} />
        <span>Home</span>
      </button>

      <button
        className={`bottom-nav-item ${currentPage === "collection" ? "active" : ""}`}
        onClick={() => navigateToCollection("All")}
        title="Explore All Jewellery"
      >
        <Search size={19} />
        <span>Vault</span>
      </button>

      <button
        className="bottom-nav-item relative"
        onClick={() => setIsWishlistOpen(true)}
        title="Wishlist"
      >
        <div className="bottom-nav-icon-wrap">
          <Heart size={19} />
          {wishlistCount > 0 && (
            <span className="bottom-nav-badge">{wishlistCount}</span>
          )}
        </div>
        <span>Wishlist</span>
      </button>

      <button
        className="bottom-nav-item relative"
        onClick={() => setIsCartOpen(true)}
        title="Shopping Bag"
      >
        <div className="bottom-nav-icon-wrap">
          <ShoppingBag size={19} />
          {cartCount > 0 && (
            <span className="bottom-nav-badge">{cartCount}</span>
          )}
        </div>
        <span>Bag</span>
      </button>

      <button className="bottom-nav-item" onClick={handleWhatsApp} title="Stylist Concierge">
        <User size={19} />
        <span>Stylist</span>
      </button>
    </nav>
  );
}

