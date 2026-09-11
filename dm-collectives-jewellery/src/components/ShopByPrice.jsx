import React from "react";
import { Gem, ArrowRight, Tag } from "lucide-react";
import { useShop } from "../context/ShopContext";

const BUDGET_TILES = [
  {
    id: "under999",
    title: "Under ₹999",
    subtitle: "Everyday Solitaires & Minimal Glamour",
    badge: "Pocket Friendly",
    bgClass: "tile-tier-1",
    filterVal: "under1000"
  },
  {
    id: "1000to2500",
    title: "₹1,000 – ₹2,499",
    subtitle: "Festive Jhumkas, Chandbalis & Chokers",
    badge: "Most Popular",
    bgClass: "tile-tier-2",
    filterVal: "1000to2500"
  },
  {
    id: "above2500",
    title: "₹2,500 – ₹3,499",
    subtitle: "Statement Kundan & Antique Temple Sets",
    badge: "Wedding Guest",
    bgClass: "tile-tier-3",
    filterVal: "above2500"
  },
  {
    id: "luxury",
    title: "Above ₹3,500",
    subtitle: "Royal Heirloom Bridal Haars & Sets",
    badge: "The Bride",
    bgClass: "tile-tier-4",
    filterVal: "above2500"
  }
];

export default function ShopByPrice() {
  const { setActiveBudget, setActiveCategory } = useShop();

  const handleBudgetSelect = (filterVal) => {
    setActiveBudget(filterVal);
    setActiveCategory("All");
    const coll = document.getElementById("collections");
    if (coll) coll.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="budget-store-section">
      <div className="budget-container">
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">
              <Tag size={13} className="gold-sparkle" />
              <span>THE BUDGET BOUTIQUE</span>
            </div>
            <h2 className="section-heading-editorial">
              Shop by <em>Price Range</em>
            </h2>
          </div>
          <p className="section-lead-text">
            Exquisite craftsmanship at every budget. Discover curated pieces that
            deliver maximum sparkle without compromising quality.
          </p>
        </div>

        <div className="budget-tiles-grid">
          {BUDGET_TILES.map((tile) => (
            <div
              className={`budget-card ${tile.bgClass}`}
              key={tile.id}
              onClick={() => handleBudgetSelect(tile.filterVal)}
            >
              <div className="budget-card-top">
                <span className="budget-tag">{tile.badge}</span>
                <ArrowRight size={18} className="budget-arrow" />
              </div>
              <h3 className="budget-price-label">{tile.title}</h3>
              <p className="budget-desc">{tile.subtitle}</p>
              <span className="budget-cta-link">Explore Pieces</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
