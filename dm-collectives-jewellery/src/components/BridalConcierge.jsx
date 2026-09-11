import React, { useState } from "react";
import {
  X,
  Gem,
  PhoneCall,
  Calendar,
  MessageCircle,
  ShieldCheck,
  Check
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function BridalConcierge() {
  const { isBridalOpen, setIsBridalOpen } = useShop();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    eventDate: "",
    outfitColor: "",
    preferredStyle: "Kundan Polki",
    notes: ""
  });

  if (!isBridalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const text =
      `*DM COLLECTIVES - VIP BRIDAL STYLING CONSULTATION INQUIRY* 👑\n\n` +
      `*Bride's Name:* ${formData.name}\n` +
      `*WhatsApp Phone:* ${formData.phone}\n` +
      `*Wedding / Event Date:* ${formData.eventDate || "Upcoming"}\n` +
      `*Outfit Colour Palette:* ${formData.outfitColor || "To be decided"}\n` +
      `*Jewellery Style:* ${formData.preferredStyle}\n` +
      `Hi! I would like to book a complimentary WhatsApp bridal styling consultation with a DM Collectives senior stylist.`;

    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        text
      )}`,
      "_blank"
    );
    setIsBridalOpen(false);
  };

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setIsBridalOpen(false)}
    >
      <div
        className="luxury-concierge-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setIsBridalOpen(false)}
          aria-label="Close bridal consultation"
        >
          <X size={20} />
        </button>

        <div className="concierge-header">
          <div className="section-eyebrow-center">
            <Gem size={14} className="gold-sparkle" />
            <span>VIP BRIDAL CONCIERGE</span>
          </div>
          <h2>Bespoke Bridal Jewellery Styling</h2>
          <p>
            Connect 1-on-1 with our head stylist on WhatsApp for personalized lehenga
            matching, live video previews, and custom dori fittings.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="concierge-form">
          <div className="form-row-two">
            <div className="form-group">
              <label>Bride / Client Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Isha Ambani"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>WhatsApp Number *</label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row-two">
            <div className="form-group">
              <label>Wedding / Function Date</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label>Outfit Colour / Fabric</label>
              <input
                type="text"
                placeholder="e.g. Deep Crimson, Pastel Rose, Ivory"
                value={formData.outfitColor}
                onChange={(e) =>
                  setFormData({ ...formData, outfitColor: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label>Preferred Jewellery Silhouette</label>
            <select
              value={formData.preferredStyle}
              onChange={(e) =>
                setFormData({ ...formData, preferredStyle: e.target.value })
              }
            >
              <option value="Kundan Polki">Regal Jadau Kundan & Pearls</option>
              <option value="Antique Temple">24K Matte Antique Temple Gold</option>
              <option value="Meenakari Choker">Vibrant Enamelled Meenakari</option>
              <option value="Contemporary Solitaire">Austrian Crystals / American Diamond</option>
              <option value="Need Guidance">I would love recommendations based on my lehenga</option>
            </select>
          </div>

          <div className="form-group">
            <label>Special Requests / Outfit Notes</label>
            <textarea
              rows={3}
              placeholder="Tell us about your neckline, blouse design, or if you wish to upload photos on WhatsApp..."
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary concierge-submit-btn">
            <MessageCircle size={17} />
            <span>Connect on WhatsApp for VIP Bridal Styling</span>
          </button>
        </form>

        <div className="concierge-features-strip">
          <div className="concierge-feature">
            <Gem size={15} />
            <span>Dedicated Bridal Stylist</span>
          </div>
          <div className="concierge-feature">
            <Gem size={15} />
            <span>Lehenga Colour Matching</span>
          </div>
          <div className="concierge-feature">
            <ShieldCheck size={15} />
            <span>Custom Dori & Sizing Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
