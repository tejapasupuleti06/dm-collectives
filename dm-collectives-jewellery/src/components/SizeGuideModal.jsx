import React, { useState } from "react";
import { X, Ruler, Gem, ShieldCheck, Heart } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function SizeGuideModal() {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useShop();
  const [activeTab, setActiveTab] = useState("necklace"); // "necklace", "bangles", "rings", "care", "screensizer"

  // Live Screen Sizer State
  const [sizerType, setSizerType] = useState("ring"); // "ring" | "bangle"
  const [sizerMm, setSizerMm] = useState(17.2);

  const calculatedSize = sizerType === "ring"
    ? (sizerMm < 16.2
        ? { ind: "Size 10", us: "US 5", fit: "Petite / Pinky" }
        : sizerMm < 16.9
        ? { ind: "Size 12", us: "US 6", fit: "Small-Medium" }
        : sizerMm < 17.5
        ? { ind: "Size 14", us: "US 7", fit: "Most Popular / Middle Finger" }
        : sizerMm < 18.2
        ? { ind: "Size 16", us: "US 8", fit: "Standard Medium" }
        : sizerMm < 18.8
        ? { ind: "Size 18", us: "US 9", fit: "Medium-Large" }
        : sizerMm < 19.5
        ? { ind: "Size 20", us: "US 10", fit: "Statement Large" }
        : { ind: "Size 22+", us: "US 11+", fit: "Extra Large" })
    : (sizerMm < 55.5
        ? { ind: "Size 2.2", dia: "54.0 mm", fit: "Petite Wrist (2-2/16\")" }
        : sizerMm < 58.7
        ? { ind: "Size 2.4", dia: "57.2 mm", fit: "Small Wrist (2-4/16\")" }
        : sizerMm < 61.9
        ? { ind: "Size 2.6", dia: "60.3 mm", fit: "Standard Indian (2-6/16\") • Most Popular" }
        : sizerMm < 65.1
        ? { ind: "Size 2.8", dia: "63.5 mm", fit: "Medium-Large (2-8/16\")" }
        : { ind: "Size 2.10", dia: "66.7 mm", fit: "Comfort Large (2-10/16\")" });

  if (!isSizeGuideOpen) return null;

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setIsSizeGuideOpen(false)}
    >
      <div
        className="luxury-guide-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setIsSizeGuideOpen(false)}
          aria-label="Close size guide"
        >
          <X size={20} />
        </button>

        <div className="guide-header">
          <div className="section-eyebrow">
            <Ruler size={14} className="gold-sparkle" />
            <span>EXPERT FIT &amp; SIZING</span>
          </div>
          <h2>Jewellery Sizing &amp; Care Handbook</h2>
          <p>Find your ideal silhouette and preserve your jewellery's heirloom lustre.</p>
        </div>

        {/* Tab Switcher */}
        <div className="guide-tabs-nav">
          <button
            className={`guide-tab-btn ${activeTab === "screensizer" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("screensizer");
              setSizerMm(sizerType === "ring" ? 17.2 : 60.3);
            }}
          >
            <Gem size={13} className="text-gold" />
            <span>Live Screen Sizer</span>
          </button>
          <button
            className={`guide-tab-btn ${activeTab === "necklace" ? "active" : ""}`}
            onClick={() => setActiveTab("necklace")}
          >
            Necklace Lengths
          </button>
          <button
            className={`guide-tab-btn ${activeTab === "bangles" ? "active" : ""}`}
            onClick={() => setActiveTab("bangles")}
          >
            Bangles Chart
          </button>
          <button
            className={`guide-tab-btn ${activeTab === "rings" ? "active" : ""}`}
            onClick={() => setActiveTab("rings")}
          >
            Rings Chart
          </button>
          <button
            className={`guide-tab-btn ${activeTab === "care" ? "active" : ""}`}
            onClick={() => setActiveTab("care")}
          >
            Care
          </button>
        </div>

        <div className="guide-tab-content">
          {/* Interactive Smart Screen Sizer */}
          {activeTab === "screensizer" && (
            <div className="live-screen-sizer-pane">
              <div className="sizer-type-toggle">
                <button
                  className={`sizer-toggle-btn ${sizerType === "ring" ? "active" : ""}`}
                  onClick={() => {
                    setSizerType("ring");
                    setSizerMm(17.2);
                  }}
                >
                  Ring Sizer
                </button>
                <button
                  className={`sizer-toggle-btn ${sizerType === "bangle" ? "active" : ""}`}
                  onClick={() => {
                    setSizerType("bangle");
                    setSizerMm(60.3);
                  }}
                >
                  Bangle Sizer
                </button>
              </div>

              <p className="sizer-instructions">
                Place your physical {sizerType} directly flat against the circle on your screen. Adjust the slider until the glowing golden circle matches the <strong>inner diameter</strong> of your jewellery.
              </p>

              {/* Glowing Interactive Circle */}
              <div className="live-circle-viewport">
                <div
                  className="interactive-sizing-circle"
                  style={{
                    width: `${sizerMm * 3.78}px`,
                    height: `${sizerMm * 3.78}px`
                  }}
                >
                  <span className="circle-center-marker" />
                  <span className="circle-dimension-label">{sizerMm.toFixed(1)} mm</span>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="sizer-slider-wrap">
                <div className="slider-row">
                  <button
                    className="btn-step-sizer"
                    onClick={() => setSizerMm((prev) => Math.max(sizerType === "ring" ? 14 : 50, Number((prev - 0.2).toFixed(1))))}
                  >
                    -
                  </button>
                  <input
                    type="range"
                    min={sizerType === "ring" ? 14.5 : 52}
                    max={sizerType === "ring" ? 21.5 : 68}
                    step="0.1"
                    value={sizerMm}
                    onChange={(e) => setSizerMm(parseFloat(e.target.value))}
                    className="sizer-range-slider"
                  />
                  <button
                    className="btn-step-sizer"
                    onClick={() => setSizerMm((prev) => Math.min(sizerType === "ring" ? 22 : 70, Number((prev + 0.2).toFixed(1))))}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Result Readout Card */}
              <div className="sizer-result-card">
                <div className="result-metric-item primary">
                  <span className="metric-title">Calculated Indian Size</span>
                  <strong className="metric-val">{calculatedSize.ind}</strong>
                </div>
                <div className="result-metric-item">
                  <span className="metric-title">Inner Diameter</span>
                  <span className="metric-val">{sizerMm.toFixed(1)} mm</span>
                </div>
                <div className="result-metric-item">
                  <span className="metric-title">Recommended Fit</span>
                  <span className="metric-val">{calculatedSize.fit}</span>
                </div>
              </div>

              <div className="guide-highlight-box sizer-note">
                <ShieldCheck size={16} />
                <p>
                  <strong>100% Fit Guarantee:</strong> If the size isn't a flawless fit upon arrival, DM Collectives provides <strong>free size exchanges</strong> and complimentary custom ring sizing bands.
                </p>
              </div>
            </div>
          )}

          {activeTab === "necklace" && (
            <div className="necklace-guide-pane">
              <div className="guide-table-wrap">
                <table className="guide-table">
                  <thead>
                    <tr>
                      <th>Style</th>
                      <th>Length</th>
                      <th>Position on Body</th>
                      <th>Best Paired With</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Choker</strong></td>
                      <td>14 – 16 inches</td>
                      <td>Rests snugly along the collarbone</td>
                      <td>Deep V, Sweetheart necklines, Lehengas</td>
                    </tr>
                    <tr>
                      <td><strong>Princess</strong></td>
                      <td>17 – 19 inches</td>
                      <td>Rests just below collarbone</td>
                      <td>Boat necks, round neck kurtas & sarees</td>
                    </tr>
                    <tr>
                      <td><strong>Matinee</strong></td>
                      <td>20 – 24 inches</td>
                      <td>Rests at bust level</td>
                      <td>High-neck blouses, collar shirts, gowns</td>
                    </tr>
                    <tr>
                      <td><strong>Rani Haar / Opera</strong></td>
                      <td>28 – 36 inches</td>
                      <td>Falls below bust line</td>
                      <td>Layered with chokers for bridal grandeur</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="guide-highlight-box">
                <Gem size={16} />
                <p>
                  <strong>Universal Fit Note:</strong> All DM Collectives necklaces
                  come with an authentic hand-braided Silk Zari Dori (cord) or 3-inch
                  extender chain, allowing you to easily adjust the height to match
                  your blouse neckline.
                </p>
              </div>
            </div>
          )}

          {activeTab === "bangles" && (
            <div className="bangles-guide-pane">
              <div className="guide-table-wrap">
                <table className="guide-table">
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Inner Diameter</th>
                      <th>Inner Circumference</th>
                      <th>Wrist Fit Guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>2.4</strong> (Small)</td>
                      <td>2.25 inches (57.2 mm)</td>
                      <td>7.06 inches</td>
                      <td>Petite wrists / Teen fit</td>
                    </tr>
                    <tr>
                      <td><strong>2.6</strong> (Medium)</td>
                      <td>2.375 inches (60.3 mm)</td>
                      <td>7.46 inches</td>
                      <td>Most popular Indian wrist size (80% of clients)</td>
                    </tr>
                    <tr>
                      <td><strong>2.8</strong> (Large)</td>
                      <td>2.50 inches (63.5 mm)</td>
                      <td>7.85 inches</td>
                      <td>Comfortable & relaxed fit for broader wrists</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="guide-highlight-box">
                <ShieldCheck size={16} />
                <p>
                  <strong>Easy Screw-Pin Feature:</strong> DM Collectives antique
                  temple kadas feature side screw-locks or openable spring hinges,
                  making them effortless to wear without needing to squeeze over your
                  hand!
                </p>
              </div>
            </div>
          )}

          {activeTab === "rings" && (
            <div className="rings-guide-pane">
              <div className="guide-table-wrap">
                <table className="guide-table">
                  <thead>
                    <tr>
                      <th>Indian Size</th>
                      <th>US / Standard</th>
                      <th>Inner Diameter (mm)</th>
                      <th>Typical Fit Guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>10 – 11</strong></td>
                      <td>Size 5 – 5.5</td>
                      <td>15.7 – 16.1 mm</td>
                      <td>Petite fingers / Pinky ring fit</td>
                    </tr>
                    <tr>
                      <td><strong>12 – 14</strong></td>
                      <td>Size 6 – 7</td>
                      <td>16.5 – 17.3 mm</td>
                      <td>Standard ring finger (Most popular Indian size)</td>
                    </tr>
                    <tr>
                      <td><strong>16 – 18</strong></td>
                      <td>Size 7.5 – 8.5</td>
                      <td>17.7 – 18.5 mm</td>
                      <td>Middle / Index finger statement rings</td>
                    </tr>
                    <tr>
                      <td><strong>20 – 22</strong></td>
                      <td>Size 9 – 10</td>
                      <td>19.4 – 20.2 mm</td>
                      <td>Broader finger fit / Thumb ring placement</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="guide-highlight-box">
                <Gem size={16} />
                <p>
                  <strong>Universal Adjustable Comfort Band:</strong> Over 90% of DM
                  Collectives imperial cocktail rings and jadau solitaires are crafted
                  with our signature hidden adjustable shank, allowing you to easily
                  custom-contour the ring to fit any finger seamlessly!
                </p>
              </div>
            </div>
          )}

          {activeTab === "care" && (
            <div className="care-guide-pane">
              <div className="care-rules-grid">
                <div className="care-rule-card">
                  <span className="rule-number">01</span>
                  <h5>Perfume First, Jewels Last</h5>
                  <p>
                    Always put your jewellery on after applying perfume, hairspray,
                    and cosmetics. Alcohol and chemicals can strip the lacquer seal.
                  </p>
                </div>
                <div className="care-rule-card">
                  <span className="rule-number">02</span>
                  <h5>Keep Away From Moisture</h5>
                  <p>
                    Do not wear while bathing, swimming, or working out. If exposed to
                    perspiration, gently dab dry with a soft microfiber cloth.
                  </p>
                </div>
                <div className="care-rule-card">
                  <span className="rule-number">03</span>
                  <h5>Air-Tight Velvet Storage</h5>
                  <p>
                    Store each piece individually in the complimentary DM Collectives
                    velvet pouch or zip-lock bag to avoid air oxidation and scratching.
                  </p>
                </div>
                <div className="care-rule-card">
                  <span className="rule-number">04</span>
                  <h5>Gentle Dry Cleaning Only</h5>
                  <p>
                    Never immerse Kundan or Temple jewellery in water or liquid cleaners.
                    Lightly dust stones with a soft dry cosmetic brush.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
