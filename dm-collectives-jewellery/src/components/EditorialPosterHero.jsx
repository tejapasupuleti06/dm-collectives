import React, { useState, useEffect } from "react";
import { useShop } from "../context/ShopContext";
import { ArrowRight, ChevronLeft, ChevronRight, Crown, Gem } from "lucide-react";

const HERO_SLIDES = [
  {
    id: 1,
    tag: "FESTIVE COUTURE",
    ornamentName: "Surkhphool Necklace Set",
    ornamentSub: "22K Antique Gold with Hexagonal Medallions & Pearl Tassels",
    title: "SURKHPHOOL",
    image: "/products/user_surkhphool_model.jpg",
    targetCategory: "Neck sets",
    objectPosition: "center 72%",
    captionPositionMobile: "top-left"
  },
  {
    id: 2,
    tag: "ROYAL BRIDAL",
    ornamentName: "Noor Jadau Choker & Tikka",
    ornamentSub: "Uncut Kundan with Radiant Emerald Drops",
    title: "DASTAAN",
    image: "/posters/poster-1-kundan.jpg",
    targetCategory: "Neck sets",
    captionPositionMobile: "top-left"
  },
  {
    id: 3,
    tag: "TEMPLE HERITAGE",
    ornamentName: "Virasat Lakshmi Vaddanam",
    ornamentSub: "South Indian 22K Kalasha Nakshi Gold",
    title: "VIRASAT",
    image: "/posters/poster-3-temple.jpg",
    targetCategory: "Vadanam",
    captionPositionMobile: "top-left"
  },
  {
    id: 4,
    tag: "ARTISANAL SILVER",
    ornamentName: "Phulwari Floral Jhumkis",
    ornamentSub: "Antique Dual-Tone Silver & Sapphire Drops",
    title: "PHULWARI",
    image: "/posters/poster-2-oxidised.jpg",
    targetCategory: "Jumkas",
    captionPositionMobile: "bottom-right"
  },
  {
    id: 5,
    tag: "MODERN HEIRLOOM",
    ornamentName: "Aura Solitaire Cocktail Rings",
    ornamentSub: "Anti-Tarnish 22K Gold Statement Bands",
    title: "AURA",
    image: "/posters/poster-4-rings.jpg",
    targetCategory: "Rings",
    captionPositionMobile: "top-left"
  }
];

export default function EditorialPosterHero() {
  const { navigateToCollection } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      className="editorial-poster-hero full-bleed-poster"
      id="top"
      onClick={() => navigateToCollection(slide.targetCategory)}
      title="Click to explore collection"
      style={{ cursor: "pointer" }}
    >
      {/* Full-Size Edge-to-Edge Poster Image */}
      <div className="full-poster-media-wrap">
        <img
          key={slide.id}
          src={slide.image}
          alt={slide.ornamentName || slide.title}
          className={`full-poster-img fade-in-scale slide-${slide.id}`}
          style={{ objectPosition: slide.objectPosition || "center 25%" }}
        />
        <div className="full-poster-subtle-vignette" />
      </div>

      {/* Very Minimal Short & Sweet Caption */}
      <div
        key={`caption-${slide.id}`}
        className={`poster-minimal-caption pos-${slide.captionPositionMobile || "top-left"}`}
        onClick={(e) => {
          e.stopPropagation();
          navigateToCollection(slide.targetCategory);
        }}
      >
        <div className="caption-tag-badge">
          <Gem size={10} className="caption-sparkle-icon" />
          <span>{slide.tag}</span>
        </div>
        <h2 className="caption-ornament-title">{slide.ornamentName}</h2>
        <p className="caption-ornament-sub">{slide.ornamentSub}</p>
        <div className="caption-explore-link">
          <span>Explore Design</span>
          <ArrowRight size={13} />
        </div>
      </div>

      {/* Hero Carousel Navigation Arrows */}
      <button
        className="poster-arrow-btn prev"
        onClick={handlePrev}
        aria-label="Previous Slide"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        className="poster-arrow-btn next"
        onClick={handleNext}
        aria-label="Next Slide"
      >
        <ChevronRight size={28} />
      </button>

      {/* Minimal Bottom Gold Pagination Dots */}
      <div className="full-poster-dots-row" onClick={(e) => e.stopPropagation()}>
        {HERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            className={`full-poster-dot ${idx === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(idx)}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
