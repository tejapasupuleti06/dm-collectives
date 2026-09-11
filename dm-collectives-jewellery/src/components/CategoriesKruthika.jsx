import React, { useState, useMemo, useRef } from "react";
import { CATEGORY_STORIES } from "../data/categories";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import { ChevronLeft, Gem, X, PhoneCall } from "lucide-react";
import { STORE_CONFIG } from "../data/config";

export default function CategoriesKruthika() {
  const { activeCategory, setActiveCategory, setActiveCraft, setSearchQuery } = useShop();
  const [selectedCat, setSelectedCat] = useState(null);
  const sectionRef = useRef(null);

  // Elegant category tiles matching reference image
  const CATEGORY_TILES = [
    {
      id: "necklaces",
      label: "Necklaces",
      sub: "Chokers & Haarams",
      filterCategory: "Neck sets",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
    },
    {
      id: "earrings",
      label: "Earrings",
      sub: "Jumkas & Chandbalis",
      filterCategory: "Jumkas",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46434_CS.jpg?v=1775898413"
    },
    {
      id: "bangles",
      label: "Bangles",
      sub: "Kadas & Choodis",
      filterCategory: "Bangles",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/SEBOM20072_CS.jpg?v=1787218277"
    },
    {
      id: "vaddanams",
      label: "Vaddanams (Hip Belts)",
      sub: "Temple Waist Belts",
      filterCategory: "Vadanam",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/apsara-bridal-traditional-kamarbandh-vmjai80058-ms-20220510-1926-sq8jwi.jpg?v=1653675433"
    },
    {
      id: "tikka",
      label: "Tikka & Mathapatti",
      sub: "Forehead Crowns & Borlas",
      filterCategory: "Tikka",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46270_MS.jpg?v=1766240134"
    },
    {
      id: "bridal",
      label: "Premium Bridal",
      sub: "Complete Bridal Sets",
      filterCategory: "Neck sets",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46683_CS.jpg?v=1788865699"
    },
    {
      id: "rings",
      label: "Rings & Solitaires",
      sub: "Cocktail Statements",
      filterCategory: "Rings",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46710_CS.jpg?v=1788865702"
    },
    {
      id: "bracelets",
      label: "Bracelets & Cuffs",
      sub: "Openable Screw Kadas",
      filterCategory: "Braclets",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/VMJAI45284_CS.jpg?v=1698657934"
    },
    {
      id: "chains",
      label: "22K Micro Chains",
      sub: "Anti-Tarnish Link Chains",
      filterCategory: "Chains",
      image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/BCJAI20103_CS.jpg?v=1702732623"
    }
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCat(cat.filterCategory);
    setActiveCategory(cat.filterCategory);
    setActiveCraft("All");
    setSearchQuery("");
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBackToGrid = () => {
    setSelectedCat(null);
    setActiveCategory("All");
  };

  const categoryProducts = useMemo(() => {
    if (!selectedCat) return [];
    return products.filter((p) => p.category === selectedCat);
  }, [selectedCat]);

  return (
    <section className="kruthika-categories-section" id="categories-section" ref={sectionRef}>
      <div className="kruthika-categories-container">
        {selectedCat ? (
          /* Complete Items Visibility View when clicked */
          <div className="kruthika-vault-expanded">
            <div className="vault-header-row">
              <button className="btn-vault-back" onClick={handleBackToGrid}>
                <ChevronLeft size={16} />
                <span>All Categories</span>
              </button>

              <div className="vault-title-center">
                <span className="vault-category-pill">{selectedCat} Vault</span>
                <h2 className="vault-category-title">{selectedCat}</h2>
                <p className="vault-count-text">
                  Showing <strong>{categoryProducts.length}</strong> studio creations with Front, Side &amp; Detail views
                </p>
              </div>

              <a
                href={`https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                  `Hi DM Collectives! I would like to see all designs in ${selectedCat}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-vault-whatsapp"
              >
                <PhoneCall size={14} />
                <span>Chat with Stylist</span>
              </a>
            </div>

            {/* Products Grid with multi-view controls */}
            <div className="kruthika-products-grid">
              {categoryProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>

            <div className="vault-footer-return">
              <button className="btn-vault-back-bottom" onClick={handleBackToGrid}>
                <ChevronLeft size={15} />
                <span>Back to Categories Grid</span>
              </button>
            </div>
          </div>
        ) : (
          /* Clean Categories Grid Matching Kruthika Reference */
          <>
            <h2 className="kruthika-section-title">Categories</h2>

            <div className="kruthika-categories-grid">
              {CATEGORY_TILES.map((cat) => (
                <div
                  key={cat.id}
                  className="kruthika-category-card"
                  onClick={() => handleCategoryClick(cat)}
                >
                  <div className="category-img-box">
                    <img src={cat.image} alt={cat.label} loading="lazy" />
                    <span className="category-card-watermark">DM</span>
                  </div>
                  <h3 className="category-card-label">{cat.label}</h3>
                  <span className="category-card-sub">{cat.sub}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
