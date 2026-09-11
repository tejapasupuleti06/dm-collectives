import React, { useState } from "react";
import {
  X,
  Gem,
  ArrowRight,
  Check,
  ShoppingBag,
  RotateCcw,
  MessageCircle
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import { STORE_CONFIG } from "../data/config";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "What is your celebration occasion?",
    options: [
      { label: "The Bride (Main Wedding Day)", category: "Bridal", occasion: "Bridal" },
      { label: "Sangeet / Reception Night", category: "Chokers", occasion: "Sangeet" },
      { label: "Wedding Guest / Festive Puja", category: "Earrings", occasion: "Festive" },
      { label: "Everyday Luxury & Office Chic", category: "Everyday", occasion: "Everyday" }
    ]
  },
  {
    id: 2,
    title: "What is your neckline or outfit styling?",
    options: [
      { label: "Deep V / Sweetheart Neckline", prefer: "Chokers" },
      { label: "Classic Silk Saree / Round Neck", prefer: "Bridal" },
      { label: "High Collar / High Neck Blouse", prefer: "Earrings" },
      { label: "Western Dress / Minimal Blouse", prefer: "Everyday" }
    ]
  },
  {
    id: 3,
    title: "Which craft aesthetic speaks to you most?",
    options: [
      { label: "Antique Matte Temple Gold", craft: "Temple" },
      { label: "Regal Uncut Jadau Kundan & Pearls", craft: "Kundan" },
      { label: "Vibrant Emerald & Ruby Meenakari", craft: "Meenakari" },
      { label: "Clean Sparkling Diamond (CZ) Solitaires", craft: "CZ" }
    ]
  }
];

export default function StyleQuizModal() {
  const { isQuizOpen, setIsQuizOpen, addToCart, setIsCartOpen, setSelectedProduct } = useShop();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!isQuizOpen) return null;

  const handleSelectOption = (option) => {
    const updated = { ...answers, [currentStep]: option };
    setAnswers(updated);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  // Compute recommendations
  const getRecommendations = () => {
    const occ = answers[0]?.occasion || "Bridal";
    const prefCat = answers[1]?.prefer || "Bridal";

    let matches = products.filter(
      (p) => p.occasion === occ || p.category === prefCat
    );

    if (matches.length < 3) {
      matches = products.slice(0, 3);
    }
    return matches.slice(0, 3);
  };

  const recommendations = showResults ? getRecommendations() : [];

  const handleWhatsAppConsult = () => {
    const summary = `Hi DM Collectives! 💎\nI took your Style Quiz for my upcoming event:\n• Occasion: ${answers[0]?.label || "Bridal"}\n• Outfit Neckline: ${answers[1]?.label || "Saree"}\n• Craft Preference: ${answers[2]?.label || "Kundan"}\n\nCould you suggest matching pieces from your collection?`;
    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        summary
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setIsQuizOpen(false)}
    >
      <div
        className="luxury-quiz-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setIsQuizOpen(false)}
          aria-label="Close quiz"
        >
          <X size={20} />
        </button>

        {!showResults ? (
          <div className="quiz-flow-card">
            <div className="quiz-progress-indicator">
              <span className="step-label">
                Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <div className="quiz-bar-track">
                <div
                  className="quiz-bar-fill"
                  style={{
                    width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>

            <div className="quiz-prompt-header">
              <Gem size={20} className="gold-sparkle" />
              <h3>{QUIZ_QUESTIONS[currentStep].title}</h3>
              <p>Select the option that best matches your upcoming event look.</p>
            </div>

            <div className="quiz-options-list">
              {QUIZ_QUESTIONS[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  className="quiz-option-btn"
                  onClick={() => handleSelectOption(opt)}
                >
                  <span className="opt-number">0{i + 1}</span>
                  <span className="opt-title">{opt.label}</span>
                  <ArrowRight size={16} className="opt-arrow" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="quiz-results-card">
            <div className="results-header">
              <div className="curation-badge">
                <Gem size={14} />
                <span>YOUR BESPOKE CURATION</span>
              </div>
              <h3>Your Perfect Jewellery Matches</h3>
              <p>
                Based on your {answers[0]?.label} styling, here are our master
                stylist's top recommendations:
              </p>
            </div>

            <div className="recommendations-grid">
              {recommendations.map((item) => (
                <div className="recommendation-item-card" key={item.id}>
                  <img src={item.images[0]} alt={item.name} />
                  <div className="rec-info">
                    <span className="rec-cat">{item.category}</span>
                    <h5>{item.name}</h5>
                    <p className="rec-price">₹{item.price.toLocaleString("en-IN")}</p>
                    <div className="rec-actions">
                      <button
                        className="btn-quick-add"
                        onClick={() => addToCart(item, 1)}
                      >
                        <ShoppingBag size={13} />
                        <span>Add to Bag</span>
                      </button>
                      <button
                        className="btn-inspect"
                        onClick={() => {
                          setIsQuizOpen(false);
                          setSelectedProduct(item);
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-results-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                  recommendations.forEach((p) => addToCart(p, 1));
                  setIsQuizOpen(false);
                  setIsCartOpen(true);
                }}
              >
                <span>Add Complete Curation to Bag</span>
                <ArrowRight size={15} />
              </button>

              <button
                className="btn btn-whatsapp-quiz"
                onClick={handleWhatsAppConsult}
              >
                <MessageCircle size={16} />
                <span>Discuss with Stylist on WhatsApp</span>
              </button>

              <button className="retake-quiz-btn" onClick={handleReset}>
                <RotateCcw size={13} />
                <span>Retake Quiz</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
