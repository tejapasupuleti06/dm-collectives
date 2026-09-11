import React, { useState, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import ProductCard from "./ProductCard";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  X,
  ArrowLeft,
  Crown,
  Gem,
  Check,
  RotateCcw,
  Ruler
} from "lucide-react";

// Sub-type dictionary based on category
const SUB_TYPES_BY_CATEGORY = {
  "Jumkas": [
    { id: "jhumki", label: "Grand Jhumkis" },
    { id: "chandbali", label: "Chand Bali" },
    { id: "stud", label: "Stud Earrings" },
    { id: "hoop", label: "Hoop Earrings" },
    { id: "drop", label: "Dangles & Drops" }
  ],
  "Rings": [
    { id: "solitaire", label: "Solitaire Rings" },
    { id: "cocktail", label: "Cocktail Rings" },
    { id: "filigree", label: "Ornate Filigree" },
    { id: "band", label: "Adjustable Bands" }
  ],
  "Neck sets": [
    { id: "choker", label: "Bridal Chokers" },
    { id: "haaram", label: "Rani Haarams" },
    { id: "collar", label: "Collar Sets" },
    { id: "short", label: "Short Necklaces" }
  ],
  "Bangles": [
    { id: "kada", label: "Screw-Lock Kadas" },
    { id: "rhodium", label: "Rhodium Bangles" },
    { id: "cuff", label: "Openable Cuffs" }
  ],
  "Braclets": [
    { id: "cuff", label: "Imperial Cuffs" },
    { id: "openable", label: "Openable Bracelets" },
    { id: "chain-bracelet", label: "Chain Bracelets" }
  ],
  "Chains": [
    { id: "snake", label: "Snake Link Chains" },
    { id: "stack", label: "Layered Chains" },
    { id: "charm", label: "Charm Pendants" }
  ],
  "Blckbeads": [
    { id: "traditional", label: "Traditional Sacred Beads" },
    { id: "cz", label: "CZ Diamond Mangalsutra" },
    { id: "gold-pendant", label: "22K Gold Plated Pendant" }
  ],
  "Vadanam": [
    { id: "nakshi", label: "Temple Nakshi Vaddanam" },
    { id: "kalasha", label: "Lakshmi Kalasha Motifs" },
    { id: "antique", label: "Bridal Kamarbandh" }
  ],
  "Tikka": [
    { id: "maang-tikka", label: "Maang Tikka" },
    { id: "passa", label: "Side Passa" },
    { id: "borla", label: "Rajasthani Borla" }
  ]
};

// Plating options
const PLATING_OPTIONS = [
  { id: "gold", label: "22K Antique Gold Plated" },
  { id: "silver", label: "Silver / White Rhodium Plated" },
  { id: "oxidised", label: "Dual-Tone Oxidised" },
  { id: "micron", label: "22K Yellow Gold Micron" }
];

// Price range options
const PRICE_RANGE_OPTIONS = [
  { id: "under-999", label: "Under ₹999", min: 0, max: 999 },
  { id: "999-1499", label: "₹999 - ₹1,499", min: 999, max: 1499 },
  { id: "1499-2499", label: "₹1,499 - ₹2,499", min: 1499, max: 2499 },
  { id: "2500-above", label: "₹2,500 & Above", min: 2500, max: 999999 }
];

// Artisanal crafts
const CRAFT_OPTIONS = [
  { id: "Temple Antique", label: "Temple Antique" },
  { id: "Kundan Jadau", label: "Kundan Jadau" },
  { id: "Polki & Meenakari", label: "Polki & Meenakari" },
  { id: "22K Gold Polish", label: "22K Gold Polish" }
];

// Occasions for Royal Fine Jewellery
const OCCASION_OPTIONS = [
  { id: "Bridal", label: "Bridal & Muhurtham" },
  { id: "Festive", label: "Festive & Sangeet" },
  { id: "Cocktail", label: "Cocktail & Reception" },
  { id: "Daily", label: "Daily & Office Luxury" }
];

export default function CollectionPage() {
  const {
    collectionCategory,
    setCollectionCategory,
    selectedSubTypes,
    toggleSubType,
    selectedPlatings,
    togglePlating,
    selectedPriceRanges,
    togglePriceRange,
    selectedCrafts,
    toggleCraft,
    clearAllFilters,
    collectionSort,
    setCollectionSort,
    navigateToHome,
    setIsSizeGuideOpen
  } = useShop();

  // Mobile filter drawer state
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Quick metal toggle pill (all, gold, silver)
  const [quickMetal, setQuickMetal] = useState("all");

  // Out of stock toggle
  const [hideOutOfStock, setHideOutOfStock] = useState(false);

  // Occasion filter state
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const toggleOccasion = (id) => {
    setSelectedOccasions((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // Kushal's accordion section collapse state
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    occasion: true,
    subcategory: true,
    craftsmanship: true,
    plating: true
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  // Available sub-types for active category
  const activeSubTypes = SUB_TYPES_BY_CATEGORY[collectionCategory] || [];

  // Filter products based on sidebar criteria
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (collectionCategory && collectionCategory !== "All") {
      list = list.filter((p) => p.category === collectionCategory);
    }

    // 2. Quick Metal Filter
    if (quickMetal === "gold") {
      list = list.filter((p) => {
        const plat = (p.specs?.plating || "").toLowerCase();
        return plat.includes("gold");
      });
    } else if (quickMetal === "silver") {
      list = list.filter((p) => {
        const plat = (p.specs?.plating || "").toLowerCase();
        return plat.includes("silver") || plat.includes("oxid") || plat.includes("rhodium");
      });
    }

    // 3. Out of stock filter
    if (hideOutOfStock) {
      list = list.filter((p) => p.stockLeft > 0);
    }

    // 4. Sub-Type Filter
    if (selectedSubTypes.length > 0) {
      list = list.filter((p) => {
        const pName = p.name.toLowerCase();
        const pDesc = (p.description || "").toLowerCase();
        return selectedSubTypes.some((typeId) => {
          if (typeId === "jhumki" || typeId === "jhumka") return pName.includes("jhumk") || pDesc.includes("jhumk");
          if (typeId === "chandbali") return pName.includes("chandbali") || pDesc.includes("chandbali") || pName.includes("phulwari");
          if (typeId === "stud") return pName.includes("stud") || pDesc.includes("stud");
          if (typeId === "hoop") return pName.includes("hoop") || pDesc.includes("hoop");
          if (typeId === "drop") return pName.includes("drop") || pDesc.includes("drop") || pDesc.includes("dangle");
          if (typeId === "choker") return pName.includes("choker") || pName.includes("short");
          if (typeId === "haaram") return pName.includes("haar") || pDesc.includes("long");
          if (typeId === "collar") return pName.includes("collar") || pName.includes("set");
          if (typeId === "solitaire") return pName.includes("solitaire") || pDesc.includes("solitaire");
          if (typeId === "cocktail") return pName.includes("cocktail") || pDesc.includes("cocktail");
          if (typeId === "filigree") return pName.includes("filigree") || pDesc.includes("filigree");
          if (typeId === "kada") return pName.includes("kada") || pDesc.includes("kada") || pName.includes("screw");
          if (typeId === "rhodium") return pName.includes("rhodium") || pDesc.includes("rhodium");
          if (typeId === "cuff") return pName.includes("cuff") || pDesc.includes("cuff");
          return pName.includes(typeId);
        });
      });
    }

    // 5. Plating Filter (Gold plated vs Silver / Rhodium plated vs Oxidised)
    if (selectedPlatings.length > 0) {
      list = list.filter((p) => {
        const plating = (p.specs?.plating || "").toLowerCase();
        const pName = p.name.toLowerCase();
        return selectedPlatings.some((platingId) => {
          if (platingId === "gold") return plating.includes("gold") || pName.includes("gold");
          if (platingId === "silver") return plating.includes("silver") || plating.includes("rhodium") || pName.includes("rhodium") || pName.includes("silver");
          if (platingId === "oxidised") return plating.includes("oxid") || pName.includes("oxid");
          if (platingId === "micron") return plating.includes("micron") || pDesc.includes("micron");
          return true;
        });
      });
    }

    // 6. Price Range Filter
    if (selectedPriceRanges.length > 0) {
      list = list.filter((p) => {
        return selectedPriceRanges.some((rangeId) => {
          const config = PRICE_RANGE_OPTIONS.find((r) => r.id === rangeId);
          if (!config) return true;
          return p.price >= config.min && p.price <= config.max;
        });
      });
    }

    // 7. Craft Filter
    if (selectedCrafts.length > 0) {
      list = list.filter((p) => selectedCrafts.includes(p.craft));
    }

    // 8. Occasion Filter
    if (selectedOccasions.length > 0) {
      list = list.filter((p) => {
        const occStr = (p.occasion || "").toLowerCase();
        const tagStr = (p.tag || "").toLowerCase();
        const descStr = (p.description || "").toLowerCase();
        return selectedOccasions.some((occ) => {
          const target = occ.toLowerCase();
          return occStr.includes(target) || tagStr.includes(target) || descStr.includes(target);
        });
      });
    }

    // 9. Sorting
    if (collectionSort === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (collectionSort === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (collectionSort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (collectionSort === "discount") {
      list.sort((a, b) => {
        const discA = a.originalPrice ? a.originalPrice - a.price : 0;
        const discB = b.originalPrice ? b.originalPrice - b.price : 0;
        return discB - discA;
      });
    }

    return list;
  }, [
    collectionCategory,
    quickMetal,
    hideOutOfStock,
    selectedSubTypes,
    selectedPlatings,
    selectedPriceRanges,
    selectedCrafts,
    selectedOccasions,
    collectionSort
  ]);

  const activeFiltersCount =
    selectedSubTypes.length +
    selectedPlatings.length +
    selectedPriceRanges.length +
    selectedCrafts.length +
    selectedOccasions.length +
    (quickMetal !== "all" ? 1 : 0);

  const categoryDisplayName =
    collectionCategory === "All"
      ? "All Jewellery Collections"
      : collectionCategory === "Neck sets"
      ? "Necklaces & Chokers"
      : collectionCategory === "Jumkas"
      ? "Earrings & Jhumkas"
      : collectionCategory === "Blckbeads"
      ? "Auspicious Mangalsutra"
      : collectionCategory === "Vadanam"
      ? "Vaddanams (Hip Belts)"
      : collectionCategory;

  return (
    <div className="collection-page-layout">
      {/* 1. Header Breadcrumbs & Action Bar */}
      <div className="collection-breadcrumbs-bar">
        <div className="collection-breadcrumbs-container">
          <div className="breadcrumbs-trail">
            <button className="trail-home-link" onClick={navigateToHome}>
              Home
            </button>
            <span className="trail-sep">/</span>
            <span className="trail-root">Women</span>
            <span className="trail-sep">/</span>
            <span className="trail-current">{categoryDisplayName}</span>
          </div>

          <div className="breadcrumbs-right-actions">
            {/* Direct Size Guide Trigger */}
            <button
              className="btn-open-size-guide-pill"
              onClick={() => setIsSizeGuideOpen(true)}
              title="Open Jewellery Sizing & Fit Guide"
            >
              <Ruler size={14} className="text-gold" />
              <span>Size Guide</span>
            </button>

            <button className="btn-back-home" onClick={navigateToHome}>
              <ArrowLeft size={15} />
              <span>Back to Main Page</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Kushal's 2-Column E-Commerce Layout (Left Accordion Sidebar + Right Spacious Grid) */}
      <div className="collection-main-container kushals-layout">
        {/* Mobile Filter Backdrop */}
        {mobileFilterOpen && (
          <div
            className="mobile-filter-backdrop"
            onClick={() => setMobileFilterOpen(false)}
          />
        )}

        {/* LEFT COLUMN: Kushal's Collapsible Accordion Sidebar */}
        <aside className={`kushals-filter-sidebar ${mobileFilterOpen ? "mobile-open" : ""}`}>
          {/* Sidebar Top: Out of Stock Toggle & Reset */}
          <div className="sidebar-top-utility">
            <div className="out-of-stock-toggle-row">
              <span className="stock-toggle-label">Out of stock</span>
              <div className="stock-btn-group">
                <button
                  className={`stock-toggle-btn ${!hideOutOfStock ? "active" : ""}`}
                  onClick={() => setHideOutOfStock(false)}
                >
                  Show
                </button>
                <button
                  className={`stock-toggle-btn ${hideOutOfStock ? "active" : ""}`}
                  onClick={() => setHideOutOfStock(true)}
                >
                  Hide
                </button>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <button className="btn-sidebar-reset" onClick={clearAllFilters}>
                <RotateCcw size={12} />
                <span>Reset All</span>
              </button>
            )}

            <button
              className="btn-mobile-sidebar-close hide-desktop"
              onClick={() => setMobileFilterOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Accordion 1: Category */}
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => toggleSection("category")}
            >
              <span>Category</span>
              {openSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSections.category && (
              <div className="accordion-body">
                {[
                  { id: "All", label: "All Jewellery" },
                  { id: "Jumkas", label: "Earrings & Jhumkas" },
                  { id: "Neck sets", label: "Necklaces & Chokers" },
                  { id: "Rings", label: "Imperial Rings" },
                  { id: "Bangles", label: "Bangles & Kadas" },
                  { id: "Blckbeads", label: "Mangalsutra" },
                  { id: "Vadanam", label: "Vaddanams" },
                  { id: "Chains", label: "22K Micro Chains" },
                  { id: "Tikka", label: "Maang Tikka" }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    className={`kushals-cat-item ${
                      collectionCategory === cat.id ? "selected" : ""
                    }`}
                    onClick={() => setCollectionCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                    {collectionCategory === cat.id && <Check size={14} className="text-gold" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Accordion 2: Price */}
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => toggleSection("price")}
            >
              <span>Price</span>
              {openSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSections.price && (
              <div className="accordion-body">
                {PRICE_RANGE_OPTIONS.map((price) => {
                  const isChecked = selectedPriceRanges.includes(price.id);
                  return (
                    <label key={price.id} className="kushals-checkbox-row">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePriceRange(price.id)}
                      />
                      <span className="kushals-check-box">
                        {isChecked && <Check size={11} />}
                      </span>
                      <span className="kushals-check-text">{price.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accordion 3: Occasion (Bridal, Festive, Cocktail, Daily) */}
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => toggleSection("occasion")}
            >
              <span>Occasion</span>
              {openSections.occasion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSections.occasion && (
              <div className="accordion-body">
                {OCCASION_OPTIONS.map((occ) => {
                  const isChecked = selectedOccasions.includes(occ.id);
                  return (
                    <label key={occ.id} className="kushals-checkbox-row">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleOccasion(occ.id)}
                      />
                      <span className="kushals-check-box">
                        {isChecked && <Check size={11} />}
                      </span>
                      <span className="kushals-check-text">{occ.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accordion 4: Style / Subcategory */}
          {activeSubTypes.length > 0 && (
            <div className="accordion-section">
              <button
                className="accordion-header"
                onClick={() => toggleSection("subcategory")}
              >
                <span>Style / Subcategory</span>
                {openSections.subcategory ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openSections.subcategory && (
                <div className="accordion-body">
                  {activeSubTypes.map((sub) => {
                    const isChecked = selectedSubTypes.includes(sub.id);
                    return (
                      <label key={sub.id} className="kushals-checkbox-row">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSubType(sub.id)}
                        />
                        <span className="kushals-check-box">
                          {isChecked && <Check size={11} />}
                        </span>
                        <span className="kushals-check-text">{sub.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Accordion 4: Craftsmanship */}
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => toggleSection("craftsmanship")}
            >
              <span>Craftsmanship</span>
              {openSections.craftsmanship ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSections.craftsmanship && (
              <div className="accordion-body">
                {CRAFT_OPTIONS.map((craft) => {
                  const isChecked = selectedCrafts.includes(craft.id);
                  return (
                    <label key={craft.id} className="kushals-checkbox-row">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleCraft(craft.id)}
                      />
                      <span className="kushals-check-box">
                        {isChecked && <Check size={11} />}
                      </span>
                      <span className="kushals-check-text">{craft.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Accordion 5: Polish & Plating */}
          <div className="accordion-section">
            <button
              className="accordion-header"
              onClick={() => toggleSection("plating")}
            >
              <span>Polish / Plating</span>
              {openSections.plating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {openSections.plating && (
              <div className="accordion-body">
                {PLATING_OPTIONS.map((plat) => {
                  const isChecked = selectedPlatings.includes(plat.id);
                  return (
                    <label key={plat.id} className="kushals-checkbox-row">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglePlating(plat.id)}
                      />
                      <span className="kushals-check-box">
                        {isChecked && <Check size={11} />}
                      </span>
                      <span className="kushals-check-text">{plat.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Live Video Shopping Booking Card */}
          <div className="sidebar-video-shopping-card">
            <div className="video-card-header">
              <span className="live-dot" />
              <span>1-on-1 Live Video Call</span>
            </div>
            <p>Inspect uncut Kundan &amp; 22K finish in real-time with our master stylist on WhatsApp.</p>
            <button
              className="btn-book-video-call"
              onClick={() => {
                window.open(
                  `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    "Hi DM Collectives! I'd like to schedule a 15-minute Live Video Shopping call to inspect bridal jewelry."
                  )}`,
                  "_blank"
                );
              }}
            >
              Book 15-Min Live Session
            </button>
          </div>

          {/* Trust Seal in Sidebar */}
          <div className="kushals-trust-banner">
            <Crown size={18} className="text-gold" />
            <h6>22K Micron Gold Polish</h6>
            <p>100% Skin-safe anti-tarnish shield • 1-Year Free Re-polishing Certificate • Velvet Vault Packaging.</p>
          </div>
        </aside>

        {/* RIGHT COLUMN: Products Grid Area (Spacious 4-Column on Desktop) */}
        <main className="kushals-products-column">
          {/* Top Kushal's Filter Status & Sort Bar */}
          <div className="kushals-top-control-bar">
            {/* Left: Filter Status & Quick Metal Pills */}
            <div className="kushals-top-left-status">
              {/* Mobile Filter Button & Item Count */}
              <div className="mobile-filter-bar-group hide-desktop">
                <button
                  className="btn-mobile-filter-trigger"
                  onClick={() => setMobileFilterOpen(true)}
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ""}</span>
                </button>
                <span className="mobile-products-count">
                  {filteredProducts.length} Designs
                </span>
              </div>

              <div className="kushals-filter-summary hide-mobile">
                <SlidersHorizontal size={15} className="text-burgundy" />
                <span className="filter-count-txt">
                  Filter {activeFiltersCount > 0 ? `${activeFiltersCount} Applied` : ""}
                </span>
                <span className="filter-summary-sep">&gt;</span>
                <span className="products-found-txt">
                  <strong>{filteredProducts.length}</strong> Products Found
                </span>
              </div>

              {/* Quick Metal Pills (Matching Kushal's Brass / Silver toggles) */}
              <div className="kushals-metal-pills-row">
                <button
                  className={`metal-pill ${quickMetal === "all" ? "active" : ""}`}
                  onClick={() => setQuickMetal("all")}
                >
                  All Metals
                </button>
                <button
                  className={`metal-pill ${quickMetal === "gold" ? "active" : ""}`}
                  onClick={() => setQuickMetal(quickMetal === "gold" ? "all" : "gold")}
                >
                  22K Gold
                </button>
                <button
                  className={`metal-pill ${quickMetal === "silver" ? "active" : ""}`}
                  onClick={() => setQuickMetal(quickMetal === "silver" ? "all" : "silver")}
                >
                  Silver / Oxidised
                </button>
              </div>
            </div>

            {/* Right: Sort By Dropdown */}
            <div className="kushals-top-right-sort">
              <span className="sort-by-label">Sort by:</span>
              <div className="kushals-select-wrap">
                <select
                  value={collectionSort}
                  onChange={(e) => setCollectionSort(e.target.value)}
                  className="kushals-sort-dropdown"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Customer Rating</option>
                  <option value="discount">Highest Discount</option>
                </select>
                <ChevronDown size={14} className="sort-chevron-icon" />
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="kushals-active-chips-bar">
              <span className="active-chips-title">Active:</span>
              {selectedSubTypes.map((t) => (
                <span key={t} className="kushals-chip">
                  <span>{t}</span>
                  <button onClick={() => toggleSubType(t)}>×</button>
                </span>
              ))}
              {selectedPlatings.map((p) => {
                const label = PLATING_OPTIONS.find((x) => x.id === p)?.label || p;
                return (
                  <span key={p} className="kushals-chip">
                    <span>{label}</span>
                    <button onClick={() => togglePlating(p)}>×</button>
                  </span>
                );
              })}
              {selectedPriceRanges.map((r) => {
                const label = PRICE_RANGE_OPTIONS.find((x) => x.id === r)?.label || r;
                return (
                  <span key={r} className="kushals-chip">
                    <span>{label}</span>
                    <button onClick={() => togglePriceRange(r)}>×</button>
                  </span>
                );
              })}
              {selectedCrafts.map((c) => (
                <span key={c} className="kushals-chip">
                  <span>{c}</span>
                  <button onClick={() => toggleCraft(c)}>×</button>
                </span>
              ))}
              {selectedOccasions.map((o) => {
                const label = OCCASION_OPTIONS.find((x) => x.id === o)?.label || o;
                return (
                  <span key={o} className="kushals-chip">
                    <span>{label}</span>
                    <button onClick={() => toggleOccasion(o)}>×</button>
                  </span>
                );
              })}
              <button
                className="kushals-clear-btn"
                onClick={() => {
                  clearAllFilters();
                  setSelectedOccasions([]);
                }}
              >
                Clear All
              </button>
            </div>
          )}

          {/* Spacious Products Grid (4 Columns on Desktop, 2 on Mobile) */}
          {filteredProducts.length > 0 ? (
            <div className="kushals-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="collection-empty-state">
              <Crown size={42} className="empty-icon text-gold" />
              <h3>No creations matched these specific filters</h3>
              <p>Try clearing some filters or exploring our complete jewellery vault.</p>
              <button className="btn-reset-filters" onClick={clearAllFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
