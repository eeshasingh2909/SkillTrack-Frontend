import { create } from 'zustand';
import { generateId } from '../utils/helpers';

// ─── Types ───────────────────────────────────────────────────────────────────
export type ToastSeverity = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  message: string;
  severity: ToastSeverity;
}

interface ToastState {
  toasts: Toast[];
  showToast: (message: string, severity: ToastSeverity) => void;
  removeToast: (id: string) => void;
}

// ─── Store ───────────────────────────────────────────────────────────────────
// Global snackbar/toast notification system
// Use showToast() from anywhere in the app to display a notification

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],

  showToast(message, severity) {
    const id = generateId();
    set((state) => ({
      toasts: [...state.toasts, { id, message, severity }],
    }));

    // Auto-dismiss after 5s
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 5000);
  },

  removeToast(id) {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
