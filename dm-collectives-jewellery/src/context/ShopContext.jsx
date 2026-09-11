import React, { createContext, useContext, useState, useEffect } from "react";
import { STORE_CONFIG } from "../data/config";

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Page Routing State ('home' | 'collection')
  const [currentPage, setCurrentPage] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("page") === "collection" || params.get("collection") ? "collection" : "home";
    } catch {
      return "home";
    }
  });

  // Dedicated Collection Page Filter States
  const [collectionCategory, setCollectionCategory] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get("collection") || "All";
    } catch {
      return "All";
    }
  });
  const [selectedSubTypes, setSelectedSubTypes] = useState([]);
  const [selectedPlatings, setSelectedPlatings] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCrafts, setSelectedCrafts] = useState([]);
  const [collectionSort, setCollectionSort] = useState("recommended");

  // Navigation helpers with browser history sync
  const navigateToCollection = (category = "All", filters = {}) => {
    setCurrentPage("collection");
    setCollectionCategory(category);
    setActiveCategory(category);

    // Apply optional pre-filters
    if (filters.craft) {
      setSelectedCrafts([filters.craft]);
    } else if (!filters.keepFilters) {
      setSelectedCrafts([]);
    }

    if (filters.priceRange) {
      setSelectedPriceRanges([filters.priceRange]);
    } else if (!filters.keepFilters) {
      setSelectedPriceRanges([]);
    }

    if (filters.subType) {
      setSelectedSubTypes([filters.subType]);
    } else if (!filters.keepFilters) {
      setSelectedSubTypes([]);
    }

    if (filters.plating) {
      setSelectedPlatings([filters.plating]);
    } else if (!filters.keepFilters) {
      setSelectedPlatings([]);
    }

    try {
      const newUrl = category === "All" ? "?page=collection" : `?page=collection&collection=${encodeURIComponent(category)}`;
      window.history.pushState({ page: "collection", category }, "", newUrl);
    } catch (e) {}

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    try {
      window.history.pushState({ page: "home" }, "", window.location.pathname);
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Listen to browser Back / Forward buttons
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.page === "collection") {
        setCurrentPage("collection");
        if (e.state.category) {
          setCollectionCategory(e.state.category);
          setActiveCategory(e.state.category);
        }
      } else {
        setCurrentPage("home");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Filter toggle functions
  const toggleSubType = (subType) => {
    setSelectedSubTypes((prev) =>
      prev.includes(subType) ? prev.filter((t) => t !== subType) : [...prev, subType]
    );
  };

  const togglePlating = (plating) => {
    setSelectedPlatings((prev) =>
      prev.includes(plating) ? prev.filter((p) => p !== plating) : [...prev, plating]
    );
  };

  const togglePriceRange = (range) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  const toggleCraft = (craft) => {
    setSelectedCrafts((prev) =>
      prev.includes(craft) ? prev.filter((c) => c !== craft) : [...prev, craft]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubTypes([]);
    setSelectedPlatings([]);
    setSelectedPriceRanges([]);
    setSelectedCrafts([]);
  };

  // Cart state persisted in localStorage with defensive validation
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("dm_cart");
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(
        (item) =>
          item &&
          item.product &&
          typeof item.product.id !== "undefined" &&
          typeof item.product.price === "number"
      );
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage with defensive validation
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("dm_wishlist");
      if (!saved) return [1, 3];
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [1, 3];
      return parsed.filter((id) => typeof id === "number" || typeof id === "string");
    } catch {
      return [1, 3];
    }
  });

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Modals & UI drawers state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isBridalOpen, setIsBridalOpen] = useState(false);
  const [isOutfitMatcherOpen, setIsOutfitMatcherOpen] = useState(false);
  const [isTrousseauBuilderOpen, setIsTrousseauBuilderOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Customer Delivery Details State (persisted across sessions)
  const [customerAddress, setCustomerAddress] = useState(() => {
    try {
      const saved = localStorage.getItem("dm_customer_address");
      return saved ? JSON.parse(saved) : {
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      };
    } catch {
      return {
        fullName: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
      };
    }
  });

  const saveCustomerAddress = (addr) => {
    setCustomerAddress(addr);
    try {
      localStorage.setItem("dm_customer_address", JSON.stringify(addr));
    } catch (e) {}
  };

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeCraft, setActiveCraft] = useState("All");
  const [activeWeddingEvent, setActiveWeddingEvent] = useState("All");
  const [activeBudget, setActiveBudget] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dedicated Collection Popout Modal State
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const [popoutFilter, setPopoutFilter] = useState({
    type: "category",
    value: "All",
    title: "All Collections"
  });

  const openCollectionPopout = (type = "category", value = "All", title = null) => {
    // Instead of only a modal, this now navigates directly to the dedicated collection page!
    navigateToCollection(value === "All" ? "All" : value, {
      craft: type === "craft" ? value : null
    });
  };

  const closeCollectionPopout = () => {
    setIsPopoutOpen(false);
  };

  // Toast notifications state
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem("dm_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("dm_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, selectedSwatch = null) => {
    if (!product || !product.id) return;
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item?.product?.id === product.id &&
          item?.selectedSwatch?.name === selectedSwatch?.name
      );
      if (existing) {
        return prev.map((item) =>
          item?.product?.id === product.id &&
          item?.selectedSwatch?.name === selectedSwatch?.name
            ? { ...item, quantity: (item.quantity || 1) + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedSwatch }];
    });
    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const updateQuantity = (productId, quantity, swatchName = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, swatchName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        const matches =
          item?.product?.id === productId &&
          (!swatchName || item?.selectedSwatch?.name === swatchName);
        return matches ? { ...item, quantity } : item;
      })
    );
  };

  const removeFromCart = (productId, swatchName = null) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item?.product?.id === productId &&
            (!swatchName || item?.selectedSwatch?.name === swatchName)
          )
      )
    );
    showToast("Item removed from your bag.", "info");
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const toggleWishlist = (product) => {
    if (!product || !product.id) return;
    const id = product.id;
    if (wishlist.includes(id)) {
      setWishlist((prev) => prev.filter((item) => item !== id));
      showToast(`Removed from your wishlist.`, "info");
    } else {
      setWishlist((prev) => [...prev, id]);
      showToast(`Saved "${product.name}" to your wishlist.`, "success");
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart Calculations with safe fallbacks
  const cartCount = cart.reduce((sum, item) => sum + (item?.quantity || 1), 0);
  const subtotal = cart.reduce(
    (sum, item) => sum + (item?.product?.price || 0) * (item?.quantity || 1),
    0
  );

  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountPercent) {
      discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
    } else if (appliedCoupon.discountFixed) {
      discountAmount = Math.min(subtotal, appliedCoupon.discountFixed);
    }
  }

  const freeShippingThreshold = STORE_CONFIG.freeShippingThreshold;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee =
    cart.length === 0 || subtotal >= freeShippingThreshold
      ? 0
      : STORE_CONFIG.standardShippingFee;

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  // Helper function to build exact user-specified WhatsApp order template
  const generateWhatsAppOrderText = (overrideCustomer = null) => {
    const cust = overrideCustomer || customerAddress;
    const itemsText = cart
      .map((item, i) => {
        const price = item.product.price;
        const sub = price * item.quantity;
        return `${i + 1}. ${item.product.name}\n   Quantity: ${item.quantity}\n   Price: ₹${price.toLocaleString("en-IN")}\n   Subtotal: ₹${sub.toLocaleString("en-IN")}`;
      })
      .join("\n\n");

    const addressLines = [
      cust?.address || "",
      cust?.city ? `${cust.city}${cust?.state ? `, ${cust.state}` : ""}` : "",
      cust?.pincode || ""
    ].filter(Boolean).join("\n");

    return `NEW ORDER — DM COLLECTIVES

Hello! I’d like to place an order.

🛍️ ORDER DETAILS
━━━━━━━━━━━━━━━━━━

${itemsText}

━━━━━━━━━━━━━━━━━━
💰 TOTAL: ₹${finalTotal.toLocaleString("en-IN")}

👤 CUSTOMER DETAILS
Name: ${cust?.fullName || "Patron"}
Phone: ${cust?.phone || ""}

📍 DELIVERY ADDRESS
${addressLines || "Address provided upon confirmation"}

📝 NOTE
Please confirm the availability and order details.

Thank you! 
— DM Collectives`;
  };

  // Coupon application logic
  const applyCoupon = (code) => {
    if (!code) return { success: false, message: "Please enter a coupon code." };
    const cleanCode = code.trim().toUpperCase();
    const couponObj = STORE_CONFIG.coupons[cleanCode];

    if (!couponObj) {
      return { success: false, message: "Invalid coupon code. Try WELCOME10 or BRIDAL15" };
    }

    if (couponObj.minOrder && subtotal < couponObj.minOrder) {
      return {
        success: false,
        message: `This coupon requires a minimum order of ₹${couponObj.minOrder.toLocaleString(
          "en-IN"
        )}.`
      };
    }

    setAppliedCoupon(couponObj);
    showToast(`Coupon "${cleanCode}" applied successfully!`, "success");
    return { success: true, message: "Coupon applied successfully!" };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed.", "info");
  };

  return (
    <ShopContext.Provider
      value={{
        // Page Routing
        currentPage,
        setCurrentPage,
        navigateToCollection,
        navigateToHome,

        // Collection Page Sidebar Filters
        collectionCategory,
        setCollectionCategory,
        selectedSubTypes,
        toggleSubType,
        selectedPlatings,
        togglePlating,
        selectedPriceRanges,
        togglePriceRange,
        selectedCrafts,
        toggleCraft,
        clearAllFilters,
        collectionSort,
        setCollectionSort,

        // Cart
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        cartTotal: finalTotal,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        shippingFee,
        finalTotal,
        freeShippingThreshold,
        freeShippingRemaining,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,

        // Toasts
        toasts,
        showToast,
        removeToast,

        // Drawers & Modals
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isQuizOpen,
        setIsQuizOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isBridalOpen,
        setIsBridalOpen,
        isOutfitMatcherOpen,
        setIsOutfitMatcherOpen,
        isTrousseauBuilderOpen,
        setIsTrousseauBuilderOpen,
        selectedProduct,
        setSelectedProduct,

        // Customer details & WhatsApp order template
        customerAddress,
        setCustomerAddress,
        saveCustomerAddress,
        generateWhatsAppOrderText,

        // Global states
        activeCategory,
        setActiveCategory,
        activeCraft,
        setActiveCraft,
        activeWeddingEvent,
        setActiveWeddingEvent,
        activeBudget,
        setActiveBudget,
        searchQuery,
        setSearchQuery,

        // Popout state
        isPopoutOpen,
        setIsPopoutOpen,
        popoutFilter,
        openCollectionPopout,
        closeCollectionPopout
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
