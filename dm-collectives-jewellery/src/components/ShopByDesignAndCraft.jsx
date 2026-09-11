import React, { useState } from "react";
import { useShop } from "../context/ShopContext";
import { Crown, ArrowRight, Layers, Gem } from "lucide-react";

export default function ShopByDesignAndCraft() {
  const { openCollectionPopout } = useShop();
  const [activeTab, setActiveTab] = useState("categories"); // 'categories' | 'crafts'

  // 9 Curated Categories with High-Res Studio Photography
  const CATEGORIES_DATA = [
    {
      id: "necklaces",
      filterValue: "Neck sets",
      title: "Necklaces & Chokers",
      sub: "Bridal Haarams & Chokers",
      count: "16 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
    },
    {
      id: "earrings",
      filterValue: "Jumkas",
      title: "Earrings & Jhumkas",
      sub: "Grand Chandbalis & Jhumkas",
      count: "14 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46434_CS.jpg?v=1775898413"
    },
    {
      id: "bangles",
      filterValue: "Bangles",
      title: "Bangles & Kadas",
      sub: "Screw-Lock Temple Kadas",
      count: "12 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/SEBOM20072_CS.jpg?v=1787218277"
    },
    {
      id: "vaddanams",
      filterValue: "Vadanam",
      title: "Vaddanams (Hip Belts)",
      sub: "Royal Temple Kamarbandhs",
      count: "8 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/apsara-bridal-traditional-kamarbandh-vmjai80058-ms-20220510-1926-sq8jwi.jpg?v=1653675433"
    },
    {
      id: "tikka",
      filterValue: "Tikka",
      title: "Tikka & Mathapatti",
      sub: "Forehead Borlas & Passas",
      count: "6 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46270_MS.jpg?v=1766240134"
    },
    {
      id: "rings",
      filterValue: "Rings",
      title: "Imperial Statement Rings",
      sub: "Adjustable Solitaire & Cocktail",
      count: "9 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46710_CS.jpg?v=1788865702"
    },
    {
      id: "bracelets",
      filterValue: "Braclets",
      title: "Bracelets & Cuffs",
      sub: "Contemporary Openable Cuffs",
      count: "8 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/VMJAI45284_CS.jpg?v=1698657934"
    },
    {
      id: "chains",
      filterValue: "Chains",
      title: "22K Micro Polish Chains",
      sub: "Anti-Tarnish Daily Chains",
      count: "9 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/BCJAI20103_CS.jpg?v=1702732623"
    },
    {
      id: "mangalsutra",
      filterValue: "Blckbeads",
      title: "Auspicious Mangalsutra",
      sub: "22K Gold Plated Sacred Beads",
      count: "8 Designs",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46683_CS.jpg?v=1788865699"
    }
  ];

  // 5 Signature Indian Crafts
  const CRAFTS_DATA = [
    {
      id: "temple",
      filterValue: "Temple Antique",
      title: "Antique Temple Craft",
      sub: "Devotional Nakshi & Idol Motifs",
      desc: "Inspired by ancient Chola & Vijayanagara sanctums, finished in rich 22K matte antique patina.",
      count: "24 Pieces",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/apsara-bridal-traditional-kamarbandh-vmjai80058-ms-20220510-1926-sq8jwi.jpg?v=1653675433"
    },
    {
      id: "kundan",
      filterValue: "Kundan Jadau",
      title: "Royal Kundan Jadau",
      sub: "Uncut Glass Kundan & Enamel Inlay",
      desc: "Heirloom Rajasthani court jewellery featuring precision foil-backed uncut stones and lustrous pearl drops.",
      count: "26 Pieces",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
    },
    {
      id: "polki",
      filterValue: "Polki & Meenakari",
      title: "Polki & Meenakari",
      sub: "Vibrant Hand-Painted Reverse Enamel",
      desc: "Exquisite front-facing polki shimmer combined with reverse meenakari miniature artistry.",
      count: "16 Pieces",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46434_CS.jpg?v=1775898413"
    },
    {
      id: "gold-micron",
      filterValue: "22K Gold Polish",
      title: "22K Gold Micron Polish",
      sub: "100% Anti-Tarnish Daily Luxury",
      desc: "Layered with genuine 22-karat gold electro-deposition and sealed with an invisible hydrophobic lacquer.",
      count: "14 Pieces",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/BCJAI20103_CS.jpg?v=1702732623"
    },
    {
      id: "zirconia",
      filterValue: "Zirconia & Diamond",
      title: "Zirconia & CZ Solitaires",
      sub: "Flawless Sparkle for Evening Gala",
      desc: "5A-grade cubic zirconia cut with diamond precision for brilliant fire and cocktail glamour.",
      count: "10 Pieces",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46710_CS.jpg?v=1788865702"
    }
  ];

  return (
    <section className="shop-design-craft-section" id="collections">
      <div className="design-craft-container">
        {/* Section Header */}
        <div className="section-header-compact">
          <span className="section-eyebrow">
            <Crown size={12} className="text-gold" />
            <span>DISCOVER THE ATELIER</span>
          </span>
          <h2 className="section-title-main">Shop by Design &amp; Craft</h2>
          <p className="section-subtext">
            Select any category or artisanal heritage to instantly launch the full collection vault.
          </p>

          {/* Interactive Mode Switcher Tabs */}
          <div className="mode-switcher-pills">
            <button
              className={`mode-pill ${activeTab === "categories" ? "active" : ""}`}
              onClick={() => setActiveTab("categories")}
            >
              <Layers size={14} />
              <span>Shop by Category (9 Vaults)</span>
            </button>
            <button
              className={`mode-pill ${activeTab === "crafts" ? "active" : ""}`}
              onClick={() => setActiveTab("crafts")}
            >
              <Gem size={14} />
              <span>Shop by Artisanal Craft (5 Styles)</span>
            </button>
          </div>
        </div>

        {/* 1. Shop by Category Grid */}
        {activeTab === "categories" && (
          <div className="craft-tiles-grid categories-grid-layout">
            {CATEGORIES_DATA.map((cat) => (
              <div
                key={cat.id}
                className="craft-tile-card"
                onClick={() => openCollectionPopout("category", cat.filterValue, cat.title)}
              >
                <div className="tile-image-box">
                  <img src={cat.image} alt={cat.title} loading="lazy" />
                  <span className="tile-count-badge">{cat.count}</span>
                  <div className="tile-hover-overlay">
                    <span className="hover-explore-btn">
                      <span>View All Items</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

                <div className="tile-info">
                  <h3 className="tile-title">{cat.title}</h3>
                  <p className="tile-sub">{cat.sub}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 2. Shop by Artisanal Craft Grid */}
        {activeTab === "crafts" && (
          <div className="craft-tiles-grid crafts-grid-layout">
            {CRAFTS_DATA.map((craft) => (
              <div
                key={craft.id}
                className="craft-tile-card craft-detailed-card"
                onClick={() => openCollectionPopout("craft", craft.filterValue, craft.title)}
              >
                <div className="tile-image-box">
                  <img src={craft.image} alt={craft.title} loading="lazy" />
                  <span className="tile-count-badge gold">{craft.count}</span>
                  <div className="tile-hover-overlay">
                    <span className="hover-explore-btn">
                      <span>Explore Craft Vault</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>

                <div className="tile-info">
                  <span className="craft-tagline-eyebrow">{craft.sub}</span>
                  <h3 className="tile-title">{craft.title}</h3>
                  <p className="craft-tile-desc">{craft.desc}</p>
                  <span className="tile-action-link">
                    <span>Explore All Pieces</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Direct One-Click Complete Vault Launcher */}
        <div className="section-cta-wrap">
          <button
            className="btn-open-full-vault"
            onClick={() => openCollectionPopout("category", "All", "Complete Jewellery Vault (90+ Pieces)")}
          >
            <Gem size={16} />
            <span>Open Complete 90+ Pieces Jewellery Vault in Popout</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
