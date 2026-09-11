import React, { useState, useMemo } from "react";
import { useShop } from "../context/ShopContext";
import { products, CATEGORIES, CRAFTS, OCCASIONS } from "../data/products";
import { CATEGORY_EDITORIAL_INFO } from "../data/categories";
import ProductCard from "./ProductCard";
import { SlidersHorizontal, ArrowUpDown, X, Search, Gem } from "lucide-react";

export default function ProductCatalog() {
  const {
    activeCategory,
    setActiveCategory,
    activeCraft,
    setActiveCraft,
    activeBudget,
    setActiveBudget,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Multi-facet filtering logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category filter
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;

      // Craft filter
      const matchesCraft =
        activeCraft === "All" || item.craft === activeCraft;

      // Occasion filter
      const matchesOccasion =
        selectedOccasion === "All" || item.occasion === selectedOccasion;

      // Search Query filter (Name, Category, Craft, Specs)
      const queryLower = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !queryLower ||
        item.name.toLowerCase().includes(queryLower) ||
        item.category.toLowerCase().includes(queryLower) ||
        (item.craft && item.craft.toLowerCase().includes(queryLower)) ||
        item.description.toLowerCase().includes(queryLower) ||
        (item.specs && item.specs.material.toLowerCase().includes(queryLower));

      // Budget filter
      let matchesPrice = true;
      if (activeBudget === "under1000") {
        matchesPrice = item.price < 1000;
      } else if (activeBudget === "1000to2500") {
        matchesPrice = item.price >= 1000 && item.price <= 2500;
      } else if (activeBudget === "above2500") {
        matchesPrice = item.price > 2500;
      }

      return (
        matchesCategory &&
        matchesCraft &&
        matchesOccasion &&
        matchesSearch &&
        matchesPrice
      );
    });
  }, [activeCategory, activeCraft, selectedOccasion, searchQuery, activeBudget]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "priceAsc") {
      return list.sort((a, b) => a.price - b.price);
    }
    if (sortBy === "priceDesc") {
      return list.sort((a, b) => b.price - a.price);
    }
    if (sortBy === "rating") {
      return list.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "bestseller") {
      return list.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }
    return list;
  }, [filteredProducts, sortBy]);

  const hasActiveFilters =
    activeCategory !== "All" ||
    activeCraft !== "All" ||
    selectedOccasion !== "All" ||
    activeBudget !== "all" ||
    searchQuery !== "";

  const handleResetFilters = () => {
    setActiveCategory("All");
    setActiveCraft("All");
    setSelectedOccasion("All");
    setActiveBudget("all");
    setSearchQuery("");
  };

  return (
    <section className="catalog-section" id="catalog">
      <div id="collections" style={{ position: "relative", top: "-20px" }}></div>
      <div className="catalog-container">
        {/* Header with Title and Search/Counters */}
        <div className="catalog-header-wrap">
          <div>
            <div className="section-eyebrow">
              <Gem size={13} className="gold-sparkle" />
              <span>THE COMPLETE CATALOG</span>
            </div>
            <h2 className="catalog-title">
              Shop by <em>Design &amp; Craft</em>
            </h2>
          </div>

          <div className="catalog-search-summary">
            {searchQuery && (
              <div className="active-search-chip">
                <span>Searching: "{searchQuery}"</span>
                <button onClick={() => setSearchQuery("")}>
                  <X size={13} />
                </button>
              </div>
            )}
            {activeCraft !== "All" && (
              <div className="active-search-chip">
                <span>Craft: {activeCraft}</span>
                <button onClick={() => setActiveCraft("All")}>
                  <X size={13} />
                </button>
              </div>
            )}
            <span className="results-count">
              Showing <strong>{sortedProducts.length}</strong> creations
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="catalog-filter-bar">
          {/* Category Tabs */}
          <div className="filter-category-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`filter-tab-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Craft, Occasion, Budget, Sort */}
          <div className="filter-controls-right">
            {/* Craft Dropdown */}
            <div className="filter-select-group">
              <label htmlFor="craftSelect">Craft:</label>
              <select
                id="craftSelect"
                value={activeCraft}
                onChange={(e) => setActiveCraft(e.target.value)}
                className="filter-select"
              >
                {CRAFTS.map((craft) => (
                  <option key={craft} value={craft}>
                    {craft === "All" ? "All Crafts" : `${craft} Jewellery`}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Dropdown */}
            <div className="filter-select-group">
              <label htmlFor="budgetSelect">Price:</label>
              <select
                id="budgetSelect"
                value={activeBudget}
                onChange={(e) => setActiveBudget(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Prices</option>
                <option value="under1000">Under ₹1,000</option>
                <option value="1000to2500">₹1,000 – ₹2,500</option>
                <option value="above2500">Above ₹2,500</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="filter-select-group">
              <label htmlFor="sortSelect">
                <ArrowUpDown size={12} /> Sort:
              </label>
              <select
                id="sortSelect"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="featured">Featured Edit</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="rating">Top Rated (5★)</option>
                <option value="bestseller">Best Sellers</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                className="filter-reset-btn"
                onClick={handleResetFilters}
                title="Reset all filters"
              >
                <X size={13} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Category Editorial Hero Banner */}
        {activeCategory !== "All" && CATEGORY_EDITORIAL_INFO[activeCategory] && (
          <div className="category-editorial-banner">
            <div className="editorial-banner-content">
              <span className="editorial-badge">
                <Gem size={12} className="gold-sparkle" />
                {CATEGORY_EDITORIAL_INFO[activeCategory].badge}
              </span>
              <h3 className="editorial-title">
                {CATEGORY_EDITORIAL_INFO[activeCategory].title}
              </h3>
              <p className="editorial-subtitle">
                {CATEGORY_EDITORIAL_INFO[activeCategory].subtitle}
              </p>
              <div className="editorial-tip-box">
                <span className="tip-lead">✦ Styling Advice:</span> {CATEGORY_EDITORIAL_INFO[activeCategory].tip}
              </div>
            </div>
            <div className="editorial-banner-media">
              <img
                src={CATEGORY_EDITORIAL_INFO[activeCategory].bannerImg}
                alt={activeCategory}
              />
              <span className="editorial-count-chip">
                {filteredProducts.length} curated designs
              </span>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {sortedProducts.length > 0 ? (
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <div className="empty-icon-wrap">
              <Search size={32} />
            </div>
            <h3>No jewellery matched your selection</h3>
            <p>
              Try widening your price range or clearing search keywords to explore
              our signature pieces.
            </p>
            <button className="btn btn-outline" onClick={handleResetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
