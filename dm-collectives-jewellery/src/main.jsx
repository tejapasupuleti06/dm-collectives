import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ShopProvider } from "./context/ShopContext";
import "./styles.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F1E7",
          color: "#2B211C",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: "24px",
          textAlign: "center"
        }}>
          <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "26px", color: "#3A2921", marginBottom: "12px" }}>
            DM Collectives — Refreshing Vault
          </h2>
          <p style={{ color: "#8B7355", maxWidth: "480px", marginBottom: "24px", fontSize: "14px" }}>
            We've just updated the luxury collection experience. Tap below to reload the site.
          </p>
          <button
            onClick={() => {
              try { localStorage.clear(); } catch(e) {}
              window.location.reload();
            }}
            style={{
              background: "#3A2921",
              color: "#FFFDF9",
              border: "none",
              padding: "12px 28px",
              borderRadius: "8px",
              fontWeight: "700",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(58,41,33,0.18)"
            }}
          >
            Reload Website
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <ShopProvider>
          <App />
        </ShopProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
