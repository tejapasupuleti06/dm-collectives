import React from "react";
import {
  X,
  Heart,
  ShoppingBag,
  Trash2,
  Share2,
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setIsCartOpen,
    setSelectedProduct,
    setActiveCategory
  } = useShop();

  if (!isWishlistOpen) return null;

  const savedProducts = products.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product) => {
    addToCart(product, 1);
    toggleWishlist(product);
  };

  const handleShareWishlist = () => {
    if (savedProducts.length === 0) return;
    const itemsList = savedProducts
      .map((p, i) => `${i + 1}. ${p.name} - ₹${p.price.toLocaleString("en-IN")}`)
      .join("\n");
    const text = `*My DM Collectives Jewellery Wishlist* 🤍\n\n${itemsList}\n\nCheck them out at: ${window.location.origin}`;

    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div
      className="drawer-overlay-backdrop"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        className="luxury-wishlist-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-title-wrap">
            <Heart size={19} className="gold-heart" />
            <h3>Your Saved Wishlist</h3>
            <span className="drawer-count-chip">{savedProducts.length} pieces</span>
          </div>
          <button
            className="drawer-close-btn"
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-items-container">
          {savedProducts.length > 0 ? (
            savedProducts.map((product) => (
              <div className="wishlist-item-card" key={product.id}>
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="wishlist-item-img"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                  }}
                  onClick={() => {
                    setIsWishlistOpen(false);
                    setSelectedProduct(product);
                  }}
                />
                <div className="wishlist-item-details">
                  <span className="wishlist-item-cat">{product.category}</span>
                  <h4
                    className="wishlist-item-name"
                    onClick={() => {
                      setIsWishlistOpen(false);
                      setSelectedProduct(product);
                    }}
                  >
                    {product.name}
                  </h4>
                  <p className="wishlist-item-price">
                    ₹{product.price.toLocaleString("en-IN")}
                  </p>

                  <div className="wishlist-item-actions">
                    <button
                      className="btn-move-to-bag"
                      onClick={() => handleMoveToBag(product)}
                    >
                      <ShoppingBag size={13} />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      className="btn-remove-wishlist"
                      onClick={() => toggleWishlist(product)}
                      title="Remove from wishlist"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="cart-empty-view">
              <Heart size={48} className="empty-heart-icon" />
              <h4>Your wishlist is empty</h4>
              <p>Save pieces you love to build your dream bridal or festive wardrobe.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveCategory("All");
                  const coll = document.getElementById("collections");
                  if (coll) coll.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Collection
              </button>
            </div>
          )}
        </div>

        {savedProducts.length > 0 && (
          <div className="drawer-footer">
            <button
              className="btn btn-outline share-wishlist-btn"
              onClick={handleShareWishlist}
            >
              <Share2 size={15} />
              <span>Share Wishlist via WhatsApp</span>
            </button>
            <button
              className="btn btn-primary move-all-btn"
              onClick={() => {
                savedProducts.forEach((p) => addToCart(p, 1));
                setIsWishlistOpen(false);
                setIsCartOpen(true);
              }}
            >
              <span>Move All to Shopping Bag</span>
              <ArrowRight size={15} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
