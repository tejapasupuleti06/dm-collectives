import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, Gem } from "lucide-react";
import { REVIEWS } from "../data/reviews";

export default function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const review = REVIEWS[currentIndex];

  return (
    <section className="reviews-section" id="reviews">
      <div className="reviews-container">
        <div className="section-eyebrow-center">
          <Gem size={13} className="gold-sparkle" />
          <span>VERIFIED CLIENT PRAISE</span>
        </div>
        <h2 className="section-title-center">
          Loved by Brides &amp; <em>Connoisseurs</em>
        </h2>

        {/* Aggregate Social Proof Counter */}
        <div className="aggregate-score-badge">
          <div className="stars-row">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={15} fill="#BDB76B" stroke="#BDB76B" />
            ))}
          </div>
          <span className="aggregate-text">
            <strong>4.9 / 5.0</strong> Rating based on 450+ verified orders across India
          </span>
        </div>

        {/* Testimonial Card Slider */}
        <div className="testimonial-slider-wrap">
          <button
            className="slider-nav-btn prev"
            onClick={prevReview}
            aria-label="Previous review"
          >
            <ChevronLeft size={22} />
          </button>

          <div className="testimonial-card">
            <Quote size={42} className="quote-watermark" />

            <div className="review-stars-strip">
              {[...Array(review.rating)].map((_, i) => (
                <Star key={i} size={16} fill="#BDB76B" stroke="#BDB76B" />
              ))}
            </div>

            <p className="review-comment">"{review.comment}"</p>

            <div className="review-author-meta">
              <img
                src={review.avatar}
                alt={review.author}
                className="review-author-avatar"
              />
              <div className="author-details">
                <div className="author-name-row">
                  <h4>{review.author}</h4>
                  {review.verified && (
                    <span className="verified-chip">
                      <CheckCircle2 size={12} /> Verified Buyer
                    </span>
                  )}
                </div>
                <p className="author-sub">
                  {review.location} · Purchased: <em>{review.productName}</em>
                </p>
              </div>
            </div>
          </div>

          <button
            className="slider-nav-btn next"
            onClick={nextReview}
            aria-label="Next review"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Carousel Dots */}
        <div className="slider-dots">
          {REVIEWS.map((_, idx) => (
            <button
              key={idx}
              className={`slider-dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to review ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
