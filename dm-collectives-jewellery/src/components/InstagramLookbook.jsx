import React from "react";
import { Instagram, ShoppingBag, ArrowRight, Gem } from "lucide-react";
import { STORE_CONFIG } from "../data/config";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

const LOOKBOOK_ITEMS = [
  {
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699",
    productId: 1, // Jaalique Short Necklace Set
    tagText: "Shop Jaalique Choker Set"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46683_CS.jpg?v=1788865699",
    productId: 2, // Noor Short Necklace Set
    tagText: "Shop Noor Temple Necklace"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46434_CS.jpg?v=1775898413",
    productId: 41, // Phulwari Kamalmitra Jhumka
    tagText: "Shop Kamalmitra Jhumka"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46270_MS.jpg?v=1766240134",
    productId: 51, // Queens of Rajasthan Veeraya Maang Tikka
    tagText: "Shop Veeraya Maang Tikka"
  },
  {
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/apsara-bridal-traditional-kamarbandh-vmjai80058-ms-20220510-1926-sq8jwi.jpg?v=1653675433",
    productId: 61, // Apsara Bridal Traditional Kamarbandh
    tagText: "Shop Bridal Kamarbandh"
  }
];

export default function InstagramLookbook() {
  const { setSelectedProduct } = useShop();

  const handleShopLook = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <section className="lookbook-section" id="lookbook">
      <div className="lookbook-container">
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">
              <Instagram size={14} className="gold-sparkle" />
              <span>{STORE_CONFIG.instagramHandle}</span>
            </div>
            <h2 className="section-heading-editorial">
              Seen on <em>Instagram</em>
            </h2>
          </div>
          <div className="lookbook-cta-right">
            <a
              href={STORE_CONFIG.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
            >
              <Instagram size={15} />
              <span>Follow Our Daily Stories</span>
            </a>
          </div>
        </div>

        <div className="lookbook-grid">
          {LOOKBOOK_ITEMS.map((item, idx) => (
            <div
              className={`lookbook-tile tile-${idx}`}
              key={idx}
              onClick={() => handleShopLook(item.productId)}
            >
              <img src={item.image} alt="DM Collectives Instagram styling" />
              <div className="lookbook-tile-overlay">
                <button
                  className="shop-look-pill"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShopLook(item.productId);
                  }}
                >
                  <ShoppingBag size={13} />
                  <span>{item.tagText}</span>
                </button>
                <div className="insta-glyph-corner">
                  <Instagram size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
