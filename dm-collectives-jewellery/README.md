# DM Collectives — Luxury Jewellery E-Commerce Rebuild

A luxury, high-converting e-commerce web application for **DM Collectives Haute Joaillerie**, crafted to maximize sales, increase Average Order Value (AOV), and deliver a boutique shopping experience.

---

## 💎 Features & Sales Optimization Highlights

### 1. Dual High-Converting Checkout Funnels
- **⚡ WhatsApp 1-Click Concierge Order**: Pre-formats full itemized order details (product names, SKUs, quantities, prices, delivery address, and coupon code) directly into a WhatsApp chat message with DM Collectives sales desk.
- **🛍️ Seamless On-Site Checkout**: Instant checkout modal with customer details, delivery address, payment method selection (UPI/QR, COD, Cards), generated Order ID (e.g. `#DMC-984210`), and printable receipt.

### 2. Average Order Value (AOV) Boosters
- **Dynamic Free Shipping Progress Bar**: Real-time progress tracker (*"Add ₹301 more to unlock FREE Express Pan-India Shipping!"*).
- **"Complete The Look" Bundle Cross-Sells**: Intelligent product pair suggestions inside product modals offering a 10% combo discount with 1-click add.
- **Promo Coupon Engine**: Configured with instant coupons like `WELCOME10` (10% off), `BRIDAL15` (15% off bridal), and `FESTIVE500`.

### 3. Trust & Scarcity Signals
- **Pincode Delivery Estimator**: Instant dispatch timeline checker.
- **Scarcity & Urgency Badges**: *"Only 2 left in stock"*, *"2026 Bridal Edit"*, *"Bestseller"*.
- **Verified Buyer Reviews Carousel**: 4.9★ rating aggregate with verified buyer badges.
- **4-Pillar Quality Reassurances**: 18K/22K Gold Micron Polish, Anti-Tarnish Coating, 48h Express Dispatch, Velvet Keepsake Packaging.

### 4. Interactive Discovery Tools
- **"Find Your Look" Style Quiz**: 3-step consultation matching occasion, neckline, and aesthetic to curated jewellery sets.
- **Jewellery Sizing & Care Handbook**: Visual necklace length chart and bangle wrist sizing table (2.4, 2.6, 2.8).
- **Dedicated Wishlist Drawer**: Shortlist favorites and share with family or the stylist via WhatsApp.
- **Shoppable Instagram Lookbook**: Tagged lifestyle looks with 1-click buy.
- **Mobile Bottom Navigation Bar**: Fixed thumb-friendly bar on mobile screens.

---

## 🛠️ How to Customize Store Settings & Products

### 1. Store Phone, WhatsApp, and Coupons
Open:
`src/data/config.js`

Edit:
- `whatsappNumber`: Set to your WhatsApp Business number (e.g. `"919876543210"` without `+` or spaces).
- `whatsappDisplay`: Formatted number for display (e.g. `"+91 98765 43210"`).
- `freeShippingThreshold`: Threshold in rupees (e.g. `1999`).
- `coupons`: Add or adjust discount codes and percentages.

### 2. Product Catalog & Photography
Open:
`src/data/products.js`

Each product item includes:
- `name`, `category`, `price`, `originalPrice`, `tag`, `occasion`, `stockLeft`
- `images`: Array of image URLs (supports multiple angles & zoom)
- `specs`: Material, plating, stone type, closure, weight, care guide
- `pairingId`: ID of the paired product for the bundle cross-sell card

### 3. Customer Testimonials
Open:
`src/data/reviews.js` to add real client testimonials and photos.

---

## 🚀 Running Locally & Building for Production

### Run locally:
```bash
npm install
npm run dev
```

### Build for deployment:
```bash
npm run build
```
Production assets are generated in `dist/`, ready for hosting on Vercel, Netlify, Cloudflare Pages, or AWS S3.
