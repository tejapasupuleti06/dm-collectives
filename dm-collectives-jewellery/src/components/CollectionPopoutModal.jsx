import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  X,
  Search,
  SlidersHorizontal,
  Gem,
  ChevronDown,
  ArrowUpDown
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";
import ProductCard from "./ProductCard";

export default function CollectionPopoutModal() {
  const {
    isPopoutOpen,
    closeCollectionPopout,
    popoutFilter,
    activeCategory,
    setActiveCategory,
    activeCraft,
    setActiveCraft
  } = useShop();

  const [sortOption, setSortOption] = useState("recommended");
  const [internalSearch, setInternalSearch] = useState("");
  const [selectedSubCraft, setSelectedSubCraft] = useState("All");

  // Prevent background scrolling when popout is open
  useEffect(() => {
    if (isPopoutOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isPopoutOpen]);

  // Reset filters when popout opens with new category
  useEffect(() => {
    if (isPopoutOpen) {
      setInternalSearch("");
      setSelectedSubCraft("All");
      setSortOption("recommended");
    }
  }, [isPopoutOpen, popoutFilter]);

  // Filter products according to category, craft, search, and sort
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // 1. Category Filter
    if (activeCategory && activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // 2. Craft Filter
    if (activeCraft && activeCraft !== "All") {
      list = list.filter((p) => p.craft === activeCraft);
    } else if (selectedSubCraft !== "All") {
      list = list.filter((p) => p.craft === selectedSubCraft);
    }

    // 3. Internal Search
    if (internalSearch.trim()) {
      const q = internalSearch.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.craft && p.craft.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // 4. Sorting
    if (sortOption === "price-low") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high") {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "discount") {
      list.sort((a, b) => {
        const discA = a.originalPrice ? a.originalPrice - a.price : 0;
        const discB = b.originalPrice ? b.originalPrice - b.price : 0;
        return discB - discA;
      });
    }

    return list;
  }, [activeCategory, activeCraft, selectedSubCraft, internalSearch, sortOption]);

  if (!isPopoutOpen) return null;

  const CATEGORY_TABS = [
    { label: "All Items", val: "All" },
    { label: "Necklaces & Chokers", val: "Neck sets" },
    { label: "Earrings & Jhumkas", val: "Jumkas" },
    { label: "Bangles & Kadas", val: "Bangles" },
    { label: "Vaddanams (Hip Belts)", val: "Vadanam" },
    { label: "Tikka & Mathapatti", val: "Tikka" },
    { label: "Imperial Rings", val: "Rings" },
    { label: "Bracelets & Cuffs", val: "Braclets" },
    { label: "22K Micro Chains", val: "Chains" },
    { label: "Mangalsutra", val: "Blckbeads" }
  ];

  const CRAFT_TABS = [
    "All",
    "Kundan Jadau",
    "Temple Antique",
    "Polki & Meenakari",
    "22K Gold Polish",
    "Zirconia & Diamond"
  ];

  return (
    <div
      className="collection-popout-overlay"
      role="dialog"
      aria-modal="true"
      onClick={closeCollectionPopout}
    >
      <div className="popout-window" onClick={(e) => e.stopPropagation()}>
        {/* Sticky Popout Header */}
        <div className="popout-sticky-header">
          <div className="popout-header-top">
            {/* Back Button */}
            <button className="btn-popout-back" onClick={closeCollectionPopout}>
              <ArrowLeft size={16} />
              <span>Back to Showcase</span>
            </button>

            {/* Title & Count in Center */}
            <div className="popout-title-block">
              <span className="popout-eyebrow">
                <Gem size={11} className="text-gold" />
                <span>DM COLLECTIVES VAULT</span>
              </span>
              <h2 className="popout-heading">
                {popoutFilter?.title || (activeCategory === "All" ? "All Creations" : activeCategory)}
              </h2>
              <p className="popout-count-sub">
                Showing <strong>{filteredProducts.length}</strong> creations • Multi-angle photography active
              </p>
            </div>

            {/* Right Actions: Close */}
            <div className="popout-header-right">
              <button
                className="btn-popout-close"
                onClick={closeCollectionPopout}
                aria-label="Close Popout"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Filter & Category Navigation Ribbon */}
          <div className="popout-filter-bar">
            {/* Category Quick Pills */}
            <div className="popout-category-pills">
              {CATEGORY_TABS.map((cat) => (
                <button
                  key={cat.val}
                  className={`category-pill-btn ${activeCategory === cat.val ? "active" : ""}`}
                  onClick={() => {
                    setActiveCategory(cat.val);
                    setActiveCraft("All");
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search & Sort Controls */}
            <div className="popout-controls-row">
              <div className="popout-search-wrap">
                <Search size={14} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search in this collection..."
                  value={internalSearch}
                  onChange={(e) => setInternalSearch(e.target.value)}
                  className="popout-search-input"
                />
                {internalSearch && (
                  <button
                    className="clear-search-btn"
                    onClick={() => setInternalSearch("")}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <div className="popout-sort-wrap">
                <ArrowUpDown size={13} className="sort-icon" />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="popout-sort-select"
                >
                  <option value="recommended">Featured / Curated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                  <option value="discount">Biggest Savings</option>
                </select>
              </div>
            </div>

            {/* Craft Filter Pills */}
            <div className="popout-craft-ribbon">
              <span className="craft-ribbon-label">Craft:</span>
              {CRAFT_TABS.map((craft) => (
                <button
                  key={craft}
                  className={`craft-tag-btn ${
                    (activeCraft === craft) || (activeCraft === "All" && selectedSubCraft === craft)
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    if (activeCraft !== "All") {
                      setActiveCraft(craft);
                    } else {
                      setSelectedSubCraft(craft);
                    }
                  }}
                >
                  {craft}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popout Products Grid Body */}
        <div className="popout-body-content">
          {filteredProducts.length > 0 ? (
            <div className="popout-products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="popout-empty-state">
              <div className="empty-icon-circle">
                <Search size={28} />
              </div>
              <h3>No items match your criteria</h3>
              <p>Try resetting the search or exploring another category or craft.</p>
              <button
                className="btn-reset-filters"
                onClick={() => {
                  setActiveCategory("All");
                  setActiveCraft("All");
                  setSelectedSubCraft("All");
                  setInternalSearch("");
                }}
              >
                View Complete 90+ Pieces Vault
              </button>
            </div>
          )}

          {/* Bottom Return Bar */}
          <div className="popout-bottom-bar">
            <button className="btn-popout-return-bottom" onClick={closeCollectionPopout}>
              <ArrowLeft size={16} />
              <span>Return to Showcase</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
