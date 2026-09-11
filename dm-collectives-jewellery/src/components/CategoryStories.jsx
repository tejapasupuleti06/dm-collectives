import React, { useRef, useState, useMemo } from "react";
import { CATEGORY_STORIES } from "../data/categories";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";
import ProductCard from "./ProductCard";
import {
  Gem,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  ChevronLeft,
  X
} from "lucide-react";

export default function CategoryStories() {
  const {
    activeCategory,
    setActiveCategory,
    setActiveCraft,
    setActiveBudget,
    setSearchQuery,
    setIsQuizOpen
  } = useShop();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const showcaseRef = useRef(null);

  // Products belonging to the selected category (10+ items)
  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activeCategoryStory = useMemo(() => {
    if (!selectedCategory) return null;
    return CATEGORY_STORIES.find(
      (s) => s.name === selectedCategory || s.filterCategory === selectedCategory
    );
  }, [selectedCategory]);

  const handleSelectCategoryPill = (catName) => {
    if (!catName || catName === "All") {
      setSelectedCategory(null);
      setActiveCategory("All");
    } else {
      setSelectedCategory(catName);
      setActiveCategory(catName);
      setActiveCraft("All");
      setActiveBudget("all");
      setSearchQuery("");
      if (showcaseRef.current) {
        showcaseRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleOpenCategory = (catName) => {
    setSelectedCategory(catName);
    setActiveCategory(catName || "All");
    setActiveCraft("All");
    setActiveBudget("all");
    setSearchQuery("");
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="category-showcase-section" id="categories-section" ref={showcaseRef}>
      {/* 1. Top Category Filter Pills Strip (Matching Reference Image Header) */}
      <div className="category-filter-pills-bar">
        <div className="pills-scroll-track">
          <button
            className={`category-pill-btn ${!selectedCategory ? "active-pill" : ""}`}
            onClick={() => handleSelectCategoryPill(null)}
          >
            <Gem size={13} className="gold-sparkle" />
            <span>All Categories</span>
          </button>

          {CATEGORY_STORIES.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat.id}
                className={`category-pill-btn ${isSelected ? "active-pill" : ""}`}
                onClick={() => handleSelectCategoryPill(cat.name)}
              >
                <span className="pill-emoji">{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        <button
          className="style-finder-header-pill"
          onClick={() => setIsQuizOpen(true)}
          title="Launch Jewellery Style Finder Quiz"
        >
          <Gem size={13} />
          <span>Style Finder</span>
        </button>
      </div>

      {/* 2. Main Content: Either 4-Column Card Grid (When All) OR Complete Items Visibility View (When Category Selected) */}
      <div className="category-showcase-content-wrapper">
        {selectedCategory ? (
          /* ==========================================================================
             COMPLETE ITEMS VISIBILITY VIEW (When clicked, items are completely visible!)
             ========================================================================== */
          <div className="category-vault-expanded-view">
            <div className="vault-view-top-header">
              <div className="vault-title-group">
                <button
                  className="btn-back-to-categories"
                  onClick={() => handleOpenCategory(null)}
                >
                  <ChevronLeft size={16} />
                  <span>All Categories</span>
                </button>
                <div className="vault-heading-wrap">
                  <span className="vault-eyebrow">
                    {activeCategoryStory?.emoji} {activeCategoryStory?.tagBadge || "CURATED VAULT"}
                  </span>
                  <h2 className="vault-main-title">
                    {activeCategoryStory?.title || selectedCategory}
                  </h2>
                  <p className="vault-subtitle">
                    {activeCategoryStory?.subtitle} •{" "}
                    <strong>{categoryProducts.length} Exclusive Creations</strong> completely visible
                  </p>
                </div>
              </div>

              <div className="vault-header-actions">
                <a
                  href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                    activeCategoryStory?.waMessage ||
                      `Hi DM Collectives! I would like to explore all designs in ${selectedCategory}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-vault-wa"
                >
                  <PhoneCall size={14} />
                  <span>Stylist Consultation</span>
                </a>
                <button
                  className="btn-close-vault"
                  onClick={() => handleOpenCategory(null)}
                  title="Close and return to all categories"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Complete Items Grid */}
            <div className="vault-products-grid">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom Return Bar */}
            <div className="vault-bottom-return-bar">
              <p className="return-text">
                Viewing all <strong>{categoryProducts.length}</strong> handcrafted designs in{" "}
                <strong>{selectedCategory}</strong>
              </p>
              <button
                className="btn-return-to-grid"
                onClick={() => handleOpenCategory(null)}
              >
                <ChevronLeft size={15} />
                <span>Explore Other Categories</span>
              </button>
            </div>
          </div>
        ) : (
          /* ==========================================================================
             REFERENCE-MATCHED 4-COLUMN CARDS GRID (Exact match to uploaded media screenshot)
             ========================================================================== */
          <div className="reference-cards-grid-wrapper">
            <div className="reference-cards-grid">
              {CATEGORY_STORIES.map((story) => (
                <div
                  key={story.id}
                  className="reference-category-card"
                  onClick={() => handleOpenCategory(story.name)}
                >
                  {/* Photo Background & Dark Luxury Gradient */}
                  <div className="ref-card-media">
                    <img
                      src={story.image}
                      alt={story.name}
                      className="ref-card-bg-img"
                      loading="lazy"
                    />
                    <div className="ref-card-gradient-overlay"></div>
                  </div>

                  {/* Card Content Container */}
                  <div className="ref-card-inner-body">
                    {/* Top Pill Row */}
                    <div className="ref-card-top-pills">
                      <span className="ref-tag-badge">
                        <span className="badge-emoji">{story.emoji}</span>
                        <span>{story.tagBadge}</span>
                      </span>
                      <span className="ref-price-badge">{story.startingPrice}</span>
                    </div>

                    {/* Middle Title & Description */}
                    <div className="ref-card-text-block">
                      <h3 className="ref-card-title">{story.name}</h3>
                      <p className="ref-card-subtitle">{story.subtitle}</p>
                    </div>

                    {/* 3 Checkmark Craftsmanship Bullets */}
                    <ul className="ref-card-bullets-list">
                      {story.bullets &&
                        story.bullets.map((bullet, idx) => (
                          <li key={idx} className="ref-bullet-item">
                            <CheckCircle2 size={13} className="ref-check-icon" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                    </ul>

                    {/* Bottom Action Row: Explore Button + WhatsApp Button */}
                    <div className="ref-card-action-row">
                      <button
                        className="btn-ref-explore"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenCategory(story.name);
                        }}
                      >
                        <span>{story.btnText || `Explore ${story.name}`}</span>
                        <ArrowRight size={14} className="explore-arrow" />
                      </button>

                      <a
                        href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                          story.waMessage
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-ref-wa-icon"
                        title={`Enquire on WhatsApp about ${story.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <PhoneCall size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
