import React, { useState, useRef } from "react";
import {
  X,
  Gem,
  Upload,
  ShoppingBag,
  MessageCircle,
  Share2,
  Check,
  Crown,
  Layers,
  ArrowRight,
  Eye,
  Camera
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";

const OUTFIT_PALETTES = [
  {
    id: "maroon",
    name: "Deep Velvet Maroon",
    hex: "#800020",
    fabric: "Bridal Velvet & Zardozi",
    pairingTitle: "Imperial Mughal 22K Jadau & Emerald Drops",
    pairingDesc:
      "Deep crimson velvet creates the ultimate royal contrast with uncut Kundan and radiant emerald green drop beads, inspired by ancestral Sabyasachi bridal aesthetics.",
    productIds: [1, 5, 25, 41] // Choker, Jhumkas, Tikka, Bangles
  },
  {
    id: "emerald",
    name: "Emerald Raw Silk",
    hex: "#0E4D34",
    fabric: "Kanjeevaram & Banarasi",
    pairingTitle: "South Indian Temple Gold with Ruby Kemp",
    pairingDesc:
      "Rich forest green raw silk demands luminous 24K temple nakshi gold with contrasting pigeon-blood Kemp ruby accents and white pearls.",
    productIds: [2, 6, 26, 42]
  },
  {
    id: "pink",
    name: "Rani Pink & Fuchsia",
    hex: "#BE185D",
    fabric: "Jaipur Gota Patti & Bandhani",
    pairingTitle: "22K Filigree Gold with Basra Pearl Cascades",
    pairingDesc:
      "Vibrant festive pink harmonizes exquisitely with yellow gold openwork filigree and multi-tiered pearl drop tassels for Sangeet revelry.",
    productIds: [3, 7, 27, 43]
  },
  {
    id: "haldi",
    name: "Mustard & Haldi Gold",
    hex: "#EAB308",
    fabric: "Chanderi & Organza",
    pairingTitle: "Antique Dual-Tone Floral & Sapphire Accents",
    pairingDesc:
      "Warm turmeric yellow is elevated by oxidised silver-gold dual polish or antique polki studs with subtle sapphire highlights.",
    productIds: [4, 8, 28, 44]
  },
  {
    id: "pastel",
    name: "Pastel Mint & Organza",
    hex: "#99F6E4",
    fabric: "Contemporary Cocktail Tulle",
    pairingTitle: "Modern Solitaire CZ & Micro Rose-Gold Plating",
    pairingDesc:
      "Airy pastels demand understated, featherlight micro-chain necklaces and brilliant American Diamond solitaire cocktail sets.",
    productIds: [9, 10, 29, 45]
  },
  {
    id: "ivory",
    name: "Ivory & Champagne Zari",
    hex: "#FDF8F0",
    fabric: "Tissue Silk & Chikankari",
    pairingTitle: "Noor Uncut Kundan & Fresh Water Pearls",
    pairingDesc:
      "Neutral ivory allows uncut Polki Jadau to take center stage, reflecting luminous golden chandelier reflections from every angle.",
    productIds: [1, 7, 25, 42]
  },
  {
    id: "navy",
    name: "Royal Navy & Sapphire",
    hex: "#1E3A8A",
    fabric: "Velvet Reception Couture",
    pairingTitle: "Brilliant Polki Choker with White Hydro Gems",
    pairingDesc:
      "Dramatic midnight sapphire fabric creates a celestial backdrop for high-contrast white Kundan chandeliers and diamond-finish cuffs.",
    productIds: [2, 5, 27, 41]
  },
  {
    id: "plum",
    name: "Midnight Plum & Wine",
    hex: "#4A0E2E",
    fabric: "Rich Brocade & Satin",
    pairingTitle: "Antique 22K Kalasha Nakshi with Ruby Drops",
    pairingDesc:
      "Deep wine and plum tones provide a brooding, aristocratic canvas that makes 22K antique gold medallions glow with golden warmth.",
    productIds: [3, 6, 26, 44]
  }
];

export default function OutfitMatcherModal() {
  const {
    isOutfitMatcherOpen,
    setIsOutfitMatcherOpen,
    addToCart,
    setIsCartOpen,
    setSelectedProduct,
    showToast
  } = useShop();

  const [selectedPaletteId, setSelectedPaletteId] = useState("maroon");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [extractedHex, setExtractedHex] = useState(null);
  const [analyzingPhoto, setAnalyzingPhoto] = useState(false);
  const [selectedNeckline, setSelectedNeckline] = useState("sweetheart"); // sweetheart | highneck | boatneck

  const fileInputRef = useRef(null);

  if (!isOutfitMatcherOpen) return null;

  const currentPalette =
    OUTFIT_PALETTES.find((p) => p.id === selectedPaletteId) ||
    OUTFIT_PALETTES[0];

  // Retrieve curated product items
  const curatedProducts = currentPalette.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const totalBundleOriginal = curatedProducts.reduce(
    (sum, p) => sum + (p.originalPrice || p.price),
    0
  );
  const totalBundlePrice = curatedProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = totalBundleOriginal - totalBundlePrice;

  // Handle Photo Upload and Color Extraction
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAnalyzingPhoto(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target.result;
      setUploadedImage(imgUrl);

      // Create an offscreen image to sample colors via Canvas
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);

        const imgData = ctx.getImageData(0, 0, 50, 50).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < imgData.length; i += 16) {
          r += imgData[i];
          g += imgData[i + 1];
          b += imgData[i + 2];
          count++;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
        setExtractedHex(hex);

        // Find closest preset palette
        let closestPalette = OUTFIT_PALETTES[0];
        let minDiff = Infinity;
        OUTFIT_PALETTES.forEach((palette) => {
          const pr = parseInt(palette.hex.slice(1, 3), 16);
          const pg = parseInt(palette.hex.slice(3, 5), 16);
          const pb = parseInt(palette.hex.slice(5, 7), 16);
          const diff = Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb);
          if (diff < minDiff) {
            minDiff = diff;
            closestPalette = palette;
          }
        });

        setSelectedPaletteId(closestPalette.id);
        setAnalyzingPhoto(false);
        showToast(`Matched outfit tone to ${closestPalette.name}!`);
      };
      img.src = imgUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleAddEntireSet = () => {
    curatedProducts.forEach((prod) => {
      addToCart(prod, 1, null);
    });
    showToast(`Added complete 4-piece ${currentPalette.name} ensemble to bag!`);
    setIsOutfitMatcherOpen(false);
    setIsCartOpen(true);
  };

  const handleShareToWhatsApp = () => {
    const itemsList = curatedProducts
      .map((p, i) => `${i + 1}. *${p.name}* (₹${p.price.toLocaleString("en-IN")})`)
      .join("\n");

    const text = `*👑 DM COLLECTIVES — OUTFIT JEWELLERY STYLING*\n` +
      `----------------------------------------\n` +
      `*My Outfit Color:* ${currentPalette.name} (${currentPalette.fabric})\n` +
      `*Curated Look:* ${currentPalette.pairingTitle}\n\n` +
      `*Recommended 4-Piece Suite:*\n` +
      `${itemsList}\n` +
      `----------------------------------------\n` +
      `*Bundle Total:* ₹${totalBundlePrice.toLocaleString("en-IN")}\n\n` +
      `Hi DM Collectives Stylist! I matched this jewelry set to my outfit on your website. Can you confirm if this pairing suits my neckline?`;

    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setIsOutfitMatcherOpen(false)}
    >
      <div
        className="luxury-outfit-matcher-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setIsOutfitMatcherOpen(false)}
          aria-label="Close outfit matcher"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="matcher-header">
          <div className="matcher-eyebrow">
            <Gem size={14} className="text-gold" />
            <span>AI BRIDAL &amp; FESTIVE STYLING SUITE</span>
          </div>
          <h2>Match My Outfit</h2>
          <p>
            Upload a photo of your saree/lehenga or tap your outfit hue below. Our algorithm instantly coordinates the ideal 22K gold &amp; Kundan ensemble.
          </p>
        </div>

        {/* Photo Upload & Live Palette Row */}
        <div className="matcher-input-row">
          <div className="upload-box-wrap">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
            <button
              className="btn-upload-outfit"
              onClick={() => fileInputRef.current?.click()}
            >
              {uploadedImage ? (
                <div className="uploaded-preview-badge">
                  <img src={uploadedImage} alt="Uploaded Outfit" />
                  <span>Change Photo</span>
                </div>
              ) : (
                <div className="upload-placeholder-content">
                  <Camera size={20} className="text-gold" />
                  <div>
                    <strong>Upload Saree / Lehenga Photo</strong>
                    <span>Auto-extract fabric colors &amp; zari</span>
                  </div>
                </div>
              )}
            </button>
            {analyzingPhoto && (
              <span className="analyzing-pill">Scanning fabric tones...</span>
            )}
            {extractedHex && !analyzingPhoto && (
              <div className="extracted-color-tag">
                <span
                  className="extracted-dot"
                  style={{ backgroundColor: extractedHex }}
                />
                <span>Sampled Hue: {extractedHex}</span>
              </div>
            )}
          </div>

          {/* Neckline Silhouette Filter */}
          <div className="neckline-filter-group">
            <span className="control-label">Your Neckline:</span>
            <div className="neckline-pills-row">
              {[
                { id: "sweetheart", label: "Sweetheart / Deep V" },
                { id: "highneck", label: "High Royal Collar" },
                { id: "boatneck", label: "Classic Round / Boat" }
              ].map((nl) => (
                <button
                  key={nl.id}
                  className={`neckline-pill ${selectedNeckline === nl.id ? "active" : ""}`}
                  onClick={() => setSelectedNeckline(nl.id)}
                >
                  {nl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 8 Preset Royal Color Pills */}
        <div className="color-presets-wrapper">
          <span className="control-label">Or Pick Your Fabric Shade:</span>
          <div className="color-swatches-grid">
            {OUTFIT_PALETTES.map((pal) => {
              const isSelected = pal.id === selectedPaletteId;
              return (
                <button
                  key={pal.id}
                  className={`outfit-color-swatch ${isSelected ? "selected" : ""}`}
                  onClick={() => {
                    setSelectedPaletteId(pal.id);
                    setExtractedHex(null);
                  }}
                  title={pal.name}
                >
                  <span
                    className="swatch-color-circle"
                    style={{ backgroundColor: pal.hex }}
                  />
                  <span className="swatch-name">{pal.name}</span>
                  {isSelected && <Check size={13} className="selected-check" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Curated Jewelry Suite Display */}
        <div className="curated-suite-stage">
          <div className="suite-header-meta">
            <div className="suite-title-block">
              <Crown size={16} className="text-gold" />
              <h4>{currentPalette.pairingTitle}</h4>
            </div>
            <p className="suite-editorial-note">{currentPalette.pairingDesc}</p>
          </div>

          <div className="curated-products-grid">
            {curatedProducts.map((prod, idx) => {
              const roles = ["Choker / Short Haar", "Matching Jhumkas", "Maang Tikka", "Royal Bangles"];
              return (
                <div
                  key={prod.id}
                  className="matcher-product-card"
                  onClick={() => {
                    setSelectedProduct(prod);
                  }}
                >
                  <div className="card-role-badge">{roles[idx] || "Ornaments"}</div>
                  <div className="matcher-img-wrap">
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699";
                      }}
                    />
                  </div>
                  <div className="matcher-prod-info">
                    <h5 className="prod-title">{prod.name}</h5>
                    <div className="price-row">
                      <strong className="current-price">
                        ₹{prod.price.toLocaleString("en-IN")}
                      </strong>
                      {prod.originalPrice && (
                        <span className="original-price">
                          ₹{prod.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bundle Footer & Actions */}
          <div className="matcher-bundle-footer">
            <div className="bundle-totals-summary">
              <span className="bundle-label">Complete 4-Piece Curated Look:</span>
              <div className="bundle-prices-row">
                <span className="bundle-total-price">
                  ₹{totalBundlePrice.toLocaleString("en-IN")}
                </span>
                {bundleDiscount > 0 && (
                  <span className="bundle-discount-badge">
                    Save ₹{bundleDiscount.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            <div className="bundle-action-buttons">
              <button
                className="btn btn-add-entire-look"
                onClick={handleAddEntireSet}
              >
                <ShoppingBag size={17} />
                <span>Add Entire 4-Piece Set to Bag</span>
              </button>

              <button
                className="btn btn-share-look-wa"
                onClick={handleShareToWhatsApp}
              >
                <MessageCircle size={17} />
                <span>Verify with Stylist on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
