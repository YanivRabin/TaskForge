"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  onUndo: () => void;
  onClose: () => void;
};

export default function Toast({ message, onUndo, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000); // auto-close after 4s
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50">
      <span>{message}</span>
      <button
        onClick={onUndo}
        className="text-blue-300 font-semibold hover:underline"
      >
        Undo
      </button>
    </div>
  );
}
