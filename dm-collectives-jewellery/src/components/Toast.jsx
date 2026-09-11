import React from "react";
import { CheckCircle2, Info, X } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-notification-container" aria-live="polite">
      {toasts.map((toast) => (
        <div className={`toast-notification-card ${toast.type}`} key={toast.id}>
          <div className="toast-icon-wrap">
            {toast.type === "info" ? (
              <Info size={16} />
            ) : (
              <CheckCircle2 size={16} />
            )}
          </div>
          <p className="toast-message">{toast.message}</p>
          <button
            className="toast-dismiss-btn"
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss notification"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
