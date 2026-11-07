"use client";

import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div
        aria-live="polite"
        className="fixed right-4 bottom-4 z-[100] flex flex-col items-end gap-2 sm:right-6 sm:bottom-6"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-toast flex max-w-[19rem] items-center gap-3 rounded-lg border bg-surface px-4 py-3 shadow-2xl shadow-black/60 ${
              toast.type === "error" ? "border-red-500/50" : "border-accent/50"
            }`}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${
                toast.type === "error" ? "bg-red-500" : "bg-accent"
              }`}
            />
            <p className="text-sm text-white">{toast.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}
