"use client";

import { useCallback, useState } from "react";
import { ToastContext, ToastData } from "./ToastContext";
import Toast from "@/components/toast/Toast";
import { AnimatePresence } from "framer-motion";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((toast: ToastData) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const closeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleUndo = (id: number, onUndo?: () => void) => {
    if (onUndo) onUndo();
    closeToast(id);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <AnimatePresence>
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            id={toast.id!}
            message={toast.message}
            onUndo={() => handleUndo(toast.id!, toast.onUndo)}
            onClose={closeToast}
            offset={24 + (toasts.length - 1 - index) * 72}
            duration={toast.duration}
          />
        ))}
      </AnimatePresence>
    </ToastContext.Provider>
  );
}
