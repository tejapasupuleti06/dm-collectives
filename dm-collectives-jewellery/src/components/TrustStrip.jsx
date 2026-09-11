import React from "react";
import { ShieldCheck, Truck, RefreshCw, MessageSquare, Gem, Award } from "lucide-react";
import { STORE_CONFIG } from "../data/config";

export default function TrustStrip() {
  const items = [
    {
      icon: <Award size={24} className="trust-icon" />,
      title: "18K Gold Micron Finish",
      desc: "Anti-tarnish protective lacquer, 100% skin-safe & hypoallergenic"
    },
    {
      icon: <Truck size={24} className="trust-icon" />,
      title: "Express 48h Dispatch",
      desc: "Free Pan-India delivery on all orders above ₹1,999"
    },
    {
      icon: <RefreshCw size={24} className="trust-icon" />,
      title: "48-Hour Easy Exchange",
      desc: "Hassle-free sizing & exchange for complete peace of mind"
    },
    {
      icon: <MessageSquare size={24} className="trust-icon" />,
      title: "WhatsApp Stylist Desk",
      desc: "Send your lehenga/saree photo for personalized matching"
    }
  ];

  return (
    <section className="trust-strip-section">
      <div className="trust-strip-container">
        {items.map((item, idx) => (
          <div className="trust-card" key={idx}>
            <div className="trust-icon-box">{item.icon}</div>
            <div className="trust-text">
              <h4 className="trust-title">{item.title}</h4>
              <p className="trust-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
