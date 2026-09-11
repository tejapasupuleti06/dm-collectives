import React, { useState } from "react";
import {
  X,
  Crown,
  Gift,
  CheckCircle2,
  Gem,
  ShoppingBag,
  MessageCircle,
  Plus,
  Trash2,
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";

const TROUSSEAU_SLOTS = [
  {
    id: "choker",
    title: "1. Short Choker / Haar",
    categoryFilter: "Neck sets",
    desc: "Collarbones & Sweetheart neckline centerpiece",
    icon: Crown
  },
  {
    id: "ranihaar",
    title: "2. Grand Long Haaram",
    categoryFilter: "Neck sets",
    desc: "Layered royal length with pearl tassels",
    icon: Gem
  },
  {
    id: "jhumkas",
    title: "3. Imperial Jhumkas",
    categoryFilter: "Jumkas",
    desc: "Matching chandelier or dome ear ornaments",
    icon: Gift
  },
  {
    id: "tikka",
    title: "4. Royal Maang Tikka",
    categoryFilter: "Tikka",
    desc: "Sacred forehead ornament with kundan crest",
    icon: Crown
  },
  {
    id: "vaddanam",
    title: "5. Vaddanam or Kada Pair",
    categoryFilter: "Vadanam",
    altCategory: "Bangles",
    desc: "Sculpted waist ornament or 22K openable cuffs",
    icon: Gem
  }
];

export default function TrousseauBuilderModal() {
  const {
    isTrousseauBuilderOpen,
    setIsTrousseauBuilderOpen,
    addToCart,
    setIsCartOpen,
    showToast,
    applyCoupon
  } = useShop();

  // State: selected product per slot { choker: product, ranihaar: product, ... }
  const [selectedSlots, setSelectedSlots] = useState({});
  // Active drawer for choosing items for a specific slot
  const [activeSlotDrawer, setActiveSlotDrawer] = useState(null);

  if (!isTrousseauBuilderOpen) return null;

  const filledCount = Object.keys(selectedSlots).filter(
    (k) => selectedSlots[k] !== undefined && selectedSlots[k] !== null
  ).length;
  const isComplete = filledCount === 5;

  // Calculate totals
  const selectedProductsList = Object.values(selectedSlots).filter(Boolean);
  const rawSubtotal = selectedProductsList.reduce((sum, p) => sum + p.price, 0);
  const discountRate = isComplete ? 0.15 : 0;
  const savingsAmount = Math.round(rawSubtotal * discountRate);
  const finalTrousseauPrice = rawSubtotal - savingsAmount;

  const handleSelectProductForSlot = (slotId, product) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [slotId]: product
    }));
    setActiveSlotDrawer(null);
    showToast(`Added ${product.name} to your Trousseau Vault!`);
  };

  const handleRemoveSlot = (slotId) => {
    setSelectedSlots((prev) => {
      const copy = { ...prev };
      delete copy[slotId];
      return copy;
    });
  };

  const handleAddAllToCart = () => {
    if (selectedProductsList.length === 0) return;

    selectedProductsList.forEach((prod) => {
      addToCart(prod, 1, null);
    });

    if (isComplete) {
      applyCoupon("BRIDAL15");
      showToast("15% Royal Trousseau Savings + Velvet Vault Box applied!");
    } else {
      showToast(`Added ${selectedProductsList.length} Trousseau pieces to bag!`);
    }

    setIsTrousseauBuilderOpen(false);
    setIsCartOpen(true);
  };

  const handleOrderOnWhatsApp = () => {
    if (selectedProductsList.length === 0) return;

    const itemsText = selectedProductsList
      .map(
        (p, i) =>
          `${i + 1}. *${p.name}* (${p.category}) - ₹${p.price.toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = `*👑 DM COLLECTIVES — BESPOKE 5-PIECE TROUSSEAU VAULT*\n` +
      `----------------------------------------\n` +
      `*Selected Heirloom Suite (${filledCount}/5 Pieces):*\n` +
      `${itemsText}\n` +
      `----------------------------------------\n` +
      `*Catalogue Total:* ₹${rawSubtotal.toLocaleString("en-IN")}\n` +
      (isComplete
        ? `*15% Royal Trousseau Savings:* -₹${savingsAmount.toLocaleString("en-IN")}\n*Complimentary Crimson Velvet Vault Box:* INCLUDED (Worth ₹1,499)\n`
        : "") +
      `*FINAL PAYABLE:* ₹${finalTrousseauPrice.toLocaleString("en-IN")}\n\n` +
      `Hello DM Collectives! I curated this bespoke 5-Piece Bridal Trousseau Box on your website. Please confirm availability and dispatch timeline!`;

    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // Filter products for the active slot drawer
  const getDrawerProducts = () => {
    if (!activeSlotDrawer) return [];
    const slotDef = TROUSSEAU_SLOTS.find((s) => s.id === activeSlotDrawer);
    if (!slotDef) return [];

    let filtered = products.filter(
      (p) =>
        p.category === slotDef.categoryFilter ||
        (slotDef.altCategory && p.category === slotDef.altCategory)
    );

    // If long ranihaar slot, prefer items with 'haar', 'long', 'necklace' or price > 2500
    if (slotDef.id === "ranihaar") {
      filtered = products.filter(
        (p) =>
          p.category === "Neck sets" ||
          p.category === "Chains" ||
          p.name.toLowerCase().includes("haar") ||
          p.name.toLowerCase().includes("long")
      );
    }

    return filtered.slice(0, 16);
  };

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setIsTrousseauBuilderOpen(false)}
    >
      <div
        className="luxury-trousseau-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setIsTrousseauBuilderOpen(false)}
          aria-label="Close trousseau builder"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="trousseau-header">
          <div className="trousseau-eyebrow">
            <Crown size={14} className="text-gold" />
            <span>BESPOKE HEIRLOOM CONCIERGE</span>
          </div>
          <h2>Build Your Royal Trousseau Box</h2>
          <p>
            Curate your 5-piece royal bridal suite in our plush Crimson Velvet Vault. Fill all 5 slots to unlock <strong>15% Trousseau Savings</strong> and a <strong>Complimentary Velvet Keepsake Vault Box</strong>.
          </p>

          {/* Progress Pill */}
          <div className="trousseau-progress-bar-wrap">
            <div className="progress-info-row">
              <span className="slots-count">
                Vault Status: <strong>{filledCount} of 5 Slots Filled</strong>
              </span>
              <span className="discount-status">
                {isComplete
                  ? "🎉 15% BUNDLE DISCOUNT UNLOCKED!"
                  : `Add ${5 - filledCount} more piece${5 - filledCount === 1 ? "" : "s"} for 15% OFF`}
              </span>
            </div>
            <div className="trousseau-progress-track">
              <div
                className="trousseau-progress-fill"
                style={{ width: `${(filledCount / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Complete Unlock Milestone Banner */}
        {isComplete && (
          <div className="trousseau-milestone-banner">
            <Gem size={20} className="text-gold" />
            <div className="milestone-text">
              <strong>Royal Heirloom Milestone Unlocked!</strong>
              <span>
                15% Trousseau Savings Applied • Free Crimson Velvet Vault Keepsake Box (Worth ₹1,499) • Wax-Sealed Authenticity Certificate
              </span>
            </div>
          </div>
        )}

        {/* 5-Slot Crimson Velvet Vault Layout */}
        <div className="trousseau-vault-grid">
          {TROUSSEAU_SLOTS.map((slot) => {
            const product = selectedSlots[slot.id];
            const Icon = slot.icon;

            return (
              <div
                key={slot.id}
                className={`vault-slot-card ${product ? "filled" : "empty"}`}
                onClick={() => {
                  if (!product) setActiveSlotDrawer(slot.id);
                }}
              >
                <div className="slot-card-header">
                  <div className="slot-title-wrap">
                    <Icon size={14} className="text-gold" />
                    <span className="slot-title">{slot.title}</span>
                  </div>
                  {product && (
                    <button
                      className="btn-remove-slot"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSlot(slot.id);
                      }}
                      title="Remove piece"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>

                {product ? (
                  <div className="slot-filled-content">
                    <div className="slot-product-img">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                        }}
                      />
                    </div>
                    <div className="slot-product-details">
                      <strong className="name">{product.name}</strong>
                      <span className="craft">{product.craft || product.category}</span>
                      <strong className="price">
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>
                    </div>
                    <button
                      className="btn-change-slot-piece"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveSlotDrawer(slot.id);
                      }}
                    >
                      Change Piece
                    </button>
                  </div>
                ) : (
                  <div className="slot-empty-placeholder">
                    <div className="empty-slot-circle">
                      <Plus size={18} />
                    </div>
                    <span className="select-piece-text">Select {slot.title.split(".")[1]}</span>
                    <p className="slot-desc">{slot.desc}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vault Summary & Action Footer */}
        <div className="trousseau-footer-summary">
          <div className="pricing-breakdown">
            <div className="pricing-item">
              <span>Selected Pieces:</span>
              <strong>{filledCount} of 5</strong>
            </div>
            <div className="pricing-item">
              <span>Vault Subtotal:</span>
              <span>₹{rawSubtotal.toLocaleString("en-IN")}</span>
            </div>
            {isComplete && (
              <div className="pricing-item highlight">
                <span>15% Trousseau Savings:</span>
                <strong className="text-gold">-₹{savingsAmount.toLocaleString("en-IN")}</strong>
              </div>
            )}
            <div className="pricing-item grand">
              <span>Total Payable:</span>
              <strong className="grand-price">
                ₹{finalTrousseauPrice.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <div className="trousseau-actions-group">
            <button
              className="btn btn-primary btn-add-trousseau-bag"
              disabled={filledCount === 0}
              onClick={handleAddAllToCart}
            >
              <ShoppingBag size={17} />
              <span>Add {filledCount} Pieces to Bag</span>
            </button>

            <button
              className="btn btn-whatsapp-trousseau"
              disabled={filledCount === 0}
              onClick={handleOrderOnWhatsApp}
            >
              <MessageCircle size={17} />
              <span>Order Trousseau on WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Slide-in Selection Drawer for a specific slot */}
        {activeSlotDrawer && (
          <div
            className="slot-picker-drawer-overlay"
            onClick={() => setActiveSlotDrawer(null)}
          >
            <div
              className="slot-picker-drawer"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawer-head">
                <div>
                  <h4>
                    Select {TROUSSEAU_SLOTS.find((s) => s.id === activeSlotDrawer)?.title}
                  </h4>
                  <p>Choose an authentic 22K handcrafted heirloom piece for your velvet vault.</p>
                </div>
                <button
                  className="drawer-close-btn"
                  onClick={() => setActiveSlotDrawer(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="drawer-products-scroll-grid">
                {getDrawerProducts().map((prod) => (
                  <div
                    key={prod.id}
                    className="drawer-product-card"
                    onClick={() => handleSelectProductForSlot(activeSlotDrawer, prod)}
                  >
                    <div className="drawer-img-wrap">
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                        }}
                      />
                    </div>
                    <div className="drawer-prod-body">
                      <h6>{prod.name}</h6>
                      <span className="craft-tag">{prod.craft || prod.category}</span>
                      <strong className="price">₹{prod.price.toLocaleString("en-IN")}</strong>
                      <button className="btn-select-slot-item">
                        <span>Select Piece</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
