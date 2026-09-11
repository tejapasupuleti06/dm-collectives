import React from "react";
import { Gem, ArrowRight } from "lucide-react";
import { useShop } from "../context/ShopContext";

const CRAFT_COLLECTIONS = [
  {
    id: "temple",
    craftName: "Temple",
    title: "Antique Temple Heritage",
    subtitle: "Divine Motifs & Kemp Stones",
    desc: "Sculpted with traditional Nakshi craftsmanship and finished with 24K matte gold polish.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46683_CS.jpg?v=1788865699",
    accent: "#DA9E1A"
  },
  {
    id: "kundan",
    craftName: "Kundan",
    title: "Royal Jadau Kundan",
    subtitle: "Uncut Stones & Meenakari Enamel",
    desc: "Mughal and Rajasthani artistry with foil-set glass kundan and reversible floral Meenakari.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46684_CS.jpg?v=1788865699",
    accent: "#E2C38C"
  },
  {
    id: "zircon",
    craftName: "Zircon",
    title: "Zircon & Diamond Brilliance",
    subtitle: "Swiss CZ in Platinum & Rose Gold",
    desc: "High-refraction AAA Austrian crystals set with jeweler's precision for evening drama.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/SLCCU20031_CS.jpg?v=1702044372",
    accent: "#E2E7E1"
  },
  {
    id: "oxidised",
    craftName: "Oxidised",
    title: "Artisan Dual-Tone & Silver",
    subtitle: "Boho Chic & Heritage Patina",
    desc: "Tribal textures, ghungroo drops, and blackened silver polish for festive sarees.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46434_CS.jpg?v=1775898413",
    accent: "#969C94"
  }
];

export default function CraftSpotlight() {
  const { setActiveCraft, setActiveCategory } = useShop();

  const handleCraftClick = (craft) => {
    setActiveCraft(craft);
    setActiveCategory("All");
    const coll = document.getElementById("collections");
    if (coll) coll.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="craft-spotlight-section">
      <div className="craft-container">
        <div className="section-eyebrow-center">
          <Gem size={13} className="gold-sparkle" />
          <span>SIGNATURE ARTISAN COLLECTIONS</span>
        </div>
        <h2 className="section-title-center">
          Shop by <em>Jewellery Craft</em>
        </h2>

        <div className="craft-grid">
          {CRAFT_COLLECTIONS.map((c) => (
            <div
              className="craft-card"
              key={c.id}
              onClick={() => handleCraftClick(c.craftName)}
            >
              <div className="craft-image-wrap">
                <img src={c.image} alt={c.title} />
                <div className="craft-overlay"></div>
                <span className="craft-badge">{c.craftName} Collection</span>
              </div>

              <div className="craft-content">
                <span className="craft-subtitle">{c.subtitle}</span>
                <h3 className="craft-title">{c.title}</h3>
                <p className="craft-desc">{c.desc}</p>
                <div className="craft-explore-link">
                  <span>Explore {c.craftName} Creations</span>
                  <ArrowRight size={15} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
