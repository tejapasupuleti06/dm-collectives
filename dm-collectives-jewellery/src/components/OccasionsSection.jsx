import React from "react";
import { ArrowRight, Gem } from "lucide-react";
import { useShop } from "../context/ShopContext";

const OCCASION_EDITS = [
  {
    id: "bridal",
    number: "01",
    title: "The Main Character: The Bride",
    subtitle: "Heritage Temple Haars & Royal Jadau Kundan",
    desc: "Heirloom-grade craftsmanship designed for the grand wedding day, mandap rituals, and eternal portraits.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/VMJAI46708_CS.jpg?v=1788865695",
    category: "Neck sets"
  },
  {
    id: "sangeet",
    number: "02",
    title: "The Sangeet & Cocktail Night",
    subtitle: "Emerald Chokers & Dramatic Chandbalis",
    desc: "Vibrant stone accents and kinetic pearl drops that catch every beam of light on the dance floor.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/SLCCU20031_CS.jpg?v=1702044372",
    category: "Neck sets"
  },
  {
    id: "guest",
    number: "03",
    title: "The Distinguished Wedding Guest",
    subtitle: "Polished Layers & Crescent Jhumkis",
    desc: "Effortless festive refinement that complements pastel lehengas, silk sarees, and modern anarkalis.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/files/JAJAI20030_CS.jpg?v=1786524364",
    category: "Jumkas"
  },
  {
    id: "everyday",
    number: "04",
    title: "The Everyday Luxe Edit",
    subtitle: "Anti-Tarnish Snake Chains & Minimal Solitaires",
    desc: "Tarnish-resistant daily companions for boardroom meetings, coffee catch-ups, and effortless dressing.",
    image: "https://cdn.shopify.com/s/files/1/0610/9472/3750/products/BCJAI20103_CS.jpg?v=1702732623",
    category: "Chains"
  }
];

export default function OccasionsSection() {
  const { setActiveCategory } = useShop();

  const handleOccasionClick = (cat) => {
    setActiveCategory(cat);
    const catalog = document.getElementById("catalog") || document.getElementById("collections");
    if (catalog) {
      catalog.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="occasions-section" id="occasions">
      <div className="occasions-container">
        <div className="section-header-split">
          <div>
            <div className="section-eyebrow">
              <Gem size={13} className="gold-sparkle" />
              <span>CURATED CELEBRATIONS</span>
            </div>
            <h2 className="section-heading-editorial">
              One Collection. <br />
              <em>Every Celebration.</em>
            </h2>
          </div>
          <p className="section-lead-text">
            Every celebration carries its own mood and memory. Choose your event
            vibe, and let handcrafted artistry complete your story.
          </p>
        </div>

        <div className="occasions-grid">
          {OCCASION_EDITS.map((item) => (
            <div
              className="occasion-card"
              key={item.id}
              onClick={() => handleOccasionClick(item.category)}
            >
              <div className="occasion-img-wrap">
                <img src={item.image} alt={item.title} />
                <div className="occasion-overlay"></div>
                <span className="occasion-num-tag">{item.number}</span>
              </div>

              <div className="occasion-content">
                <span className="occasion-subtitle">{item.subtitle}</span>
                <h3 className="occasion-title">{item.title}</h3>
                <p className="occasion-desc">{item.desc}</p>
                <div className="occasion-action-link">
                  <span>Explore {item.category} Pieces</span>
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
