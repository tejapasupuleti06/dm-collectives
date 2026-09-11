import React from "react";
import { Users, Star, ShieldCheck, Award } from "lucide-react";

export default function WhyTrustUs() {
  const TRUST_ITEMS = [
    {
      id: 1,
      icon: Users,
      metric: "45,000+",
      label: "Happy Customers",
      sub: "Pan-India & Global Delivery"
    },
    {
      id: 2,
      icon: Star,
      metric: "4.8 / 5",
      label: "Customer Rating",
      sub: "Over 8,500+ Verified Reviews"
    },
    {
      id: 3,
      icon: ShieldCheck,
      metric: "100% Anti-Tarnish",
      label: "22K Micro Gold Polish",
      sub: "Hydrophobic Lacquer Seal"
    },
    {
      id: 4,
      icon: Award,
      metric: "Heirloom Quality",
      label: "Trusted Heritage",
      sub: "Velvet Keepsake Box with Every Order"
    }
  ];

  return (
    <section className="why-trust-us-section" id="trust">
      <div className="trust-us-container">
        <h2 className="trust-us-title">Why Trust Us?</h2>

        <div className="trust-us-grid">
          {TRUST_ITEMS.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="trust-us-card">
                <div className="trust-icon-circle">
                  <IconComponent size={22} className="trust-icon" />
                </div>
                <h4 className="trust-metric">{item.metric}</h4>
                <span className="trust-label">{item.label}</span>
                <p className="trust-sub">{item.sub}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
