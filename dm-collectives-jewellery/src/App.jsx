import React from "react";
import { useShop } from "./context/ShopContext";

// Navigation & Global Header
import HeaderMegaNav from "./components/HeaderMegaNav";

// Homepage (Main Page) Sections
import EditorialPosterHero from "./components/EditorialPosterHero";
import MainPhotoCardsStrip from "./components/MainPhotoCardsStrip";
import BestsellersSpotlight from "./components/BestsellersSpotlight";
import WhyTrustUs from "./components/WhyTrustUs";

// Dedicated Collection Page (with Left-Side Filter Sidebar)
import CollectionPage from "./components/CollectionPage";

// Luxury Footer
import Footer from "./components/Footer";

// Global Modals, Drawers & Utilities
import CollectionPopoutModal from "./components/CollectionPopoutModal";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import WishlistDrawer from "./components/WishlistDrawer";
import StyleQuizModal from "./components/StyleQuizModal";
import SizeGuideModal from "./components/SizeGuideModal";
import OutfitMatcherModal from "./components/OutfitMatcherModal";
import TrousseauBuilderModal from "./components/TrousseauBuilderModal";
import MobileBottomNav from "./components/MobileBottomNav";
import Toast from "./components/Toast";

export default function App() {
  const { currentPage } = useShop();

  return (
    <div className="site-wrapper">
      {/* 1. Global Header with Logo & Voylla-Style Mega Menu under WOMEN */}
      <HeaderMegaNav />

      {/* 2. Dynamic Main Content Area: Home Page vs Dedicated Collection Page */}
      <main id="main-content">
        {currentPage === "collection" ? (
          /* Dedicated Collection Page with Left-Side Filter Sidebar (Category sub-types, gold/silver plating, price range, crafts) */
          <CollectionPage />
        ) : (
          /* Main Page: Big Editorial Poster -> Photo Cards Strip -> Skiper49 3D Showcase -> Trust */
          <>
            {/* Cinematic Big Editorial Hero Poster */}
            <EditorialPosterHero />

            {/* Scroll Down Visual Photo Cards Strip (Image 2 reference) */}
            <MainPhotoCardsStrip />

            {/* Most Coveted Heirlooms: Skiper49 3D Inverted Perspective Carousel */}
            <BestsellersSpotlight />

            {/* Trust & Craftsmanship Guarantees */}
            <WhyTrustUs />
          </>
        )}
      </main>

      {/* 3. Luxury Brand Footer */}
      <Footer />

      {/* 4. Global Modals & Drawers */}
      <CollectionPopoutModal />
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <StyleQuizModal />
      <SizeGuideModal />
      <OutfitMatcherModal />
      <TrousseauBuilderModal />
      <MobileBottomNav />
      <Toast />
    </div>
  );
}
