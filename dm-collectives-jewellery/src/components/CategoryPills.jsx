import React from "react";
import { useShop } from "../context/ShopContext";
import { CATEGORIES } from "../data/products";
import { Gem } from "lucide-react";

export default function CategoryPills() {
  const { activeCategory, setActiveCategory } = useShop();

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    const catalogEl = document.getElementById("collections");
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="category-pills-section">
      <div className="category-pills-container">
        <div className="section-eyebrow-center">
          <Gem size={13} className="gold-sparkle" />
          <span>CURATED CATEGORIES</span>
        </div>
        <h2 className="section-title-center">
          Explore by <em>Design Silhouette</em>
        </h2>

        <div className="pills-scroll-wrapper">
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                className={`category-pill-btn ${isActive ? "active" : ""}`}
                onClick={() => handleCategorySelect(category)}
              >
                <span>{category}</span>
                {category === "Bridal" && <span className="pill-dot">✦</span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
