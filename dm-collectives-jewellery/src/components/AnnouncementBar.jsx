import React, { useState, useEffect } from "react";
import { Gem, ArrowRight, ShieldCheck } from "lucide-react";
import { STORE_CONFIG } from "../data/config";

const messages = [
  "💎 Use code WELCOME10 for 10% OFF your first order",
  "🚚 Free Express Pan-India Shipping on orders above ₹1,999",
  "👑 Bespoke Bridal & Occasion Concierge Available via WhatsApp",
  "💎 100% Anti-Tarnish & Hypoallergenic Handcrafted Jewellery"
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar">
      <div className="announcement-inner">
        <span className="announcement-brand">DM COLLECTIVES</span>
        <div className="announcement-ticker">
          <p className="ticker-text">{messages[index]}</p>
        </div>
        <a
          href={STORE_CONFIG.instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="announcement-link"
        >
          <span>Instagram Edit</span>
          <ArrowRight size={13} />
        </a>
      </div>
    </div>
  );
}
