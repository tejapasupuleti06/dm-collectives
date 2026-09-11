import React, { useState, useEffect } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Printer,
  MessageCircle,
  Truck,
  CreditCard,
  QrCode,
  DollarSign
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { STORE_CONFIG } from "../data/config";

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    subtotal,
    discountAmount,
    shippingFee,
    finalTotal,
    appliedCoupon,
    customerAddress,
    saveCustomerAddress
  } = useShop();

  const [step, setStep] = useState("form"); // "form" or "confirmed"
  const [orderData, setOrderData] = useState(null);

  const [formData, setFormData] = useState({
    fullName: customerAddress?.fullName || "",
    phone: customerAddress?.phone || "",
    email: customerAddress?.email || "",
    address: customerAddress?.address || "",
    city: customerAddress?.city || "",
    state: customerAddress?.state || "",
    pincode: customerAddress?.pincode || ""
  });

  // Sync if customerAddress changes in context
  useEffect(() => {
    if (customerAddress?.fullName) {
      setFormData((prev) => ({
        ...prev,
        ...customerAddress
      }));
    }
  }, [customerAddress]);

  if (!isCheckoutOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address || !formData.pincode) {
      alert("Please fill in your name, mobile number, delivery address, and PIN code.");
      return;
    }

    // Persist address in session & localStorage
    saveCustomerAddress(formData);

    const orderId = `DMC-${Math.floor(100000 + Math.random() * 900000)}`;
    const confirmedOrder = {
      orderId,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      customer: { ...formData },
      items: [...cart],
      subtotal,
      discountAmount,
      shippingFee,
      finalTotal,
      coupon: appliedCoupon?.code
    };

    setOrderData(confirmedOrder);
    setStep("confirmed");
    clearCart();

    // Exact WhatsApp Order Template specified by user
    const itemsListText = cart
      .map(
        (item, i) =>
          `${i + 1}. ${item.product.name}\n   Quantity: ${item.quantity}\n   Price: ₹${item.product.price.toLocaleString("en-IN")}\n   Subtotal: ₹${(item.product.price * item.quantity).toLocaleString("en-IN")}`
      )
      .join("\n\n");

    const addressLines = [
      formData.address,
      formData.city ? `${formData.city}${formData.state ? `, ${formData.state}` : ""}` : "",
      formData.pincode
    ].filter(Boolean).join("\n");

    const message = `NEW ORDER — DM COLLECTIVES

Hello! I’d like to place an order.

🛍️ ORDER DETAILS
━━━━━━━━━━━━━━━━━━

${itemsListText}

━━━━━━━━━━━━━━━━━━
💰 TOTAL: ₹${finalTotal.toLocaleString("en-IN")}

👤 CUSTOMER DETAILS
Name: ${formData.fullName}
Phone: ${formData.phone}

📍 DELIVERY ADDRESS
${addressLines}

📝 NOTE
Please confirm the availability and order details.

Thank you! 
— DM Collectives`;

    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppConfirm = () => {
    if (!orderData) return;
    const itemsListText = orderData.items
      .map(
        (item, i) =>
          `${i + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₹${(
            item.product.price * item.quantity
          ).toLocaleString("en-IN")}`
      )
      .join("\n");

    const message = `*DM COLLECTIVES - ORDER STATUS CHECK: #${orderData.orderId}*\n\n` +
      `Hello! I placed this order:\n` +
      `*Name:* ${orderData.customer.fullName}\n` +
      `*Total:* ₹${orderData.finalTotal.toLocaleString("en-IN")}\n` +
      `*Address:* ${orderData.customer.address}, ${orderData.customer.city} (${orderData.customer.pincode})\n\n` +
      `Please confirm tracking updates!`;

    window.open(
      `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="modal-overlay-backdrop"
      onClick={() => setIsCheckoutOpen(false)}
    >
      <div
        className="luxury-checkout-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="modal-close-icon"
          onClick={() => setIsCheckoutOpen(false)}
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {step === "form" ? (
          <div className="checkout-layout">
            {/* Left: Customer Information & Delivery Form */}
            <div className="checkout-form-column">
              <div className="checkout-header">
                <h3>Express Checkout</h3>
                <p>Complete your order for expedited velvet box dispatch.</p>
              </div>

              <form onSubmit={handleSubmitOrder} className="checkout-fields-form">
                <div className="form-section-title">
                  <span>1</span>
                  <h4>Contact & Notification</h4>
                </div>

                <div className="form-row-two">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="10-digit mobile number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="For order tracking & invoice"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-section-title">
                  <span>2</span>
                  <h4>Delivery Address</h4>
                </div>

                <div className="form-group">
                  <label>Flat / House No. & Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="Apartment, building, street, landmark"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row-three">
                  <div className="form-group">
                    <label>PIN Code *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      maxLength={6}
                      placeholder="6 digits"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-section-title">
                  <span>3</span>
                  <h4>Order Channel: Direct WhatsApp Concierge</h4>
                </div>

                <div className="whatsapp-only-order-box">
                  <div className="whatsapp-box-header">
                    <MessageCircle size={22} className="text-whatsapp-green" />
                    <div>
                      <strong>100% WhatsApp Verified Ordering</strong>
                      <span>Direct verification &amp; custom sizing confirmation</span>
                    </div>
                  </div>
                  <p className="whatsapp-box-note">
                    All orders are accepted and verified exclusively via our official WhatsApp concierge. When you click below, your delivery address and selected pieces are automatically prepared into a WhatsApp message sent to DM Collectives!
                  </p>
                  <div className="whatsapp-box-checklist">
                    <span>✓ Pre-filled items &amp; delivery address</span>
                    <span>✓ Direct video inspection &amp; size check</span>
                    <span>✓ Official UPI / Bank transfer on WhatsApp</span>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary submit-order-btn btn-whatsapp-order-cta">
                  <MessageCircle size={18} />
                  <span>Send Order via WhatsApp (₹{finalTotal.toLocaleString("en-IN")})</span>
                </button>
              </form>
            </div>

            {/* Right: Order Review & Trust Signals */}
            <div className="checkout-summary-column">
              <h4>Order Summary</h4>
              <div className="checkout-items-list">
                {cart.map(({ product, quantity }) => (
                  <div className="checkout-item-row" key={product.id}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="checkout-item-thumb"
                    />
                    <div className="checkout-item-desc">
                      <span className="name">{product.name}</span>
                      <span className="qty">Qty: {quantity}</span>
                    </div>
                    <span className="price">
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-bill-box">
                <div className="bill-row">
                  <span>Subtotal:</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="bill-row discount">
                    <span>Coupon ({appliedCoupon?.code}):</span>
                    <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="bill-row">
                  <span>Shipping:</span>
                  <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
                </div>
                <div className="bill-row total">
                  <span>Total Amount:</span>
                  <span>₹{finalTotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="checkout-guarantee-box">
                <div className="guarantee-row">
                  <ShieldCheck size={16} />
                  <span>100% Anti-Tarnish & Hypoallergenic Quality</span>
                </div>
                <div className="guarantee-row">
                  <Truck size={16} />
                  <span>Insured Express Courier with SMS Tracking</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Order Confirmation Receipt */
          <div className="order-confirmed-view">
            <div className="confirmation-header">
              <div className="success-badge-wrap">
                <CheckCircle2 size={48} className="success-check-icon" />
              </div>
              <h2>Thank You for Your Order!</h2>
              <p className="order-id-display">
                Order ID: <strong>#{orderData.orderId}</strong>
              </p>
              <p className="order-status-msg">
                We have received your order details and are hand-packing your
                jewellery in our velvet keepsake box.
              </p>
            </div>

            <div className="confirmed-receipt-card">
              <div className="receipt-meta-grid">
                <div>
                  <span className="label">Order Date:</span>
                  <strong>{orderData.date}</strong>
                </div>
                <div>
                  <span className="label">Deliver To:</span>
                  <strong>{orderData.customer.fullName}</strong>
                  <p className="subtext">
                    {orderData.customer.address}, {orderData.customer.city} (
                    {orderData.customer.pincode})
                  </p>
                </div>
                <div>
                  <span className="label">Phone:</span>
                  <strong>{orderData.customer.phone}</strong>
                </div>
                <div>
                  <span className="label">Order Channel:</span>
                  <strong className="uppercase text-whatsapp-green">
                    WhatsApp Verified
                  </strong>
                </div>
              </div>

              <div className="receipt-items-table">
                {orderData.items.map(({ product, quantity }) => (
                  <div className="receipt-item-row" key={product.id}>
                    <span>
                      {product.name} × {quantity}
                    </span>
                    <strong>
                      ₹{(product.price * quantity).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="receipt-total-row">
                <span>Final Paid Amount:</span>
                <span className="total">
                  ₹{orderData.finalTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="confirmed-actions-row">
              <button
                className="btn btn-primary"
                onClick={handleWhatsAppConfirm}
              >
                <MessageCircle size={16} />
                <span>Confirm on WhatsApp for Fast Dispatch</span>
              </button>
              <button className="btn btn-outline" onClick={handlePrint}>
                <Printer size={16} />
                <span>Print Receipt</span>
              </button>
              <button
                className="btn-text-link"
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep("form");
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
