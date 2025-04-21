"use client";

import { createContext, useContext } from "react";

export type ToastData = {
  id?: number;
  message: string;
  onUndo?: () => void;
  duration?: number;
};

type ToastContextType = {
  showToast: (toast: ToastData) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
