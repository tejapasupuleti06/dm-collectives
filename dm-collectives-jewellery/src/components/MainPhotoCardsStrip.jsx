import React from "react";
import { useShop } from "../context/ShopContext";
import { ArrowRight, Crown } from "lucide-react";

const PHOTO_CARDS = [
  {
    id: "necklaces",
    category: "Neck sets",
    title: "Necklace Sets",
    sub: "Bridal Chokers & Haarams",
    count: "16 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699"
  },
  {
    id: "earrings",
    category: "Jumkas",
    title: "Earrings & Jhumkas",
    sub: "Chandbalis & Temple Bells",
    count: "14 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46434_CS.jpg?v=1775898413"
  },
  {
    id: "rings",
    category: "Rings",
    title: "Imperial Rings",
    sub: "Solitaire & Cocktail",
    count: "10 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46710_CS.jpg?v=1788865702"
  },
  {
    id: "bangles",
    category: "Bangles",
    title: "Bangles & Kadas",
    sub: "Screw-Lock Victorian Kadas",
    count: "12 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/SEBOM20072_CS.jpg?v=1787218277"
  },
  {
    id: "chains",
    category: "Chains",
    title: "22K Micro Chains",
    sub: "Anti-Tarnish Daily Chains",
    count: "10 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/BCJAI20103_CS.jpg?v=1702732623"
  },
  {
    id: "mangalsutra",
    category: "Blckbeads",
    title: "Mangalsutra",
    sub: "Auspicious Sacred Beads",
    count: "10 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46683_CS.jpg?v=1788865699"
  },
  {
    id: "vaddanam",
    category: "Vadanam",
    title: "Vaddanams (Hip Belts)",
    sub: "Temple Antique Kamarbandhs",
    count: "8 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/apsara-bridal-traditional-kamarbandh-vmjai80058-ms-20220510-1926-sq8jwi.jpg?v=1653675433"
  },
  {
    id: "tikka",
    category: "Tikka",
    title: "Maang Tikka",
    sub: "Forehead Borlas & Passas",
    count: "8 Designs",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46270_MS.jpg?v=1766240134"
  }
];

export default function MainPhotoCardsStrip() {
  const { navigateToCollection } = useShop();

  return (
    <section className="main-photo-strip-section" id="categories-strip">
      <div className="photo-strip-container">
        <div className="photo-strip-header">
          <div>
            <span className="photo-strip-eyebrow">
              <Crown size={12} className="text-gold" />
              <span>EXPLORE BY CATEGORY</span>
            </span>
            <h2 className="photo-strip-title">Curated Jewellery Vaults</h2>
          </div>
          <p className="photo-strip-desc">
            Tap any creation to enter the dedicated vault with live type, craft, and price filters.
          </p>
        </div>

        {/* Horizontal Visual Photo Cards Grid */}
        <div className="photo-cards-grid">
          {PHOTO_CARDS.map((item) => (
            <div
              key={item.id}
              className="photo-card-tile"
              onClick={() => navigateToCollection(item.category)}
            >
              <div className="photo-card-img-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="photo-card-img"
                  loading="lazy"
                />
                <div className="photo-card-overlay">
                  <span className="photo-card-view-btn">
                    <span>View Collection</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
              <div className="photo-card-info">
                <h3 className="photo-card-name">{item.title}</h3>
                <span className="photo-card-count">{item.count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
