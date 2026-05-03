"use client";

import { create } from "zustand";

interface UiState {
  mobileMenuOpen: boolean;
  authModalOpen: boolean;
  checkoutStep: 1 | 2 | 3;
  setCheckoutStep: (step: 1 | 2 | 3) => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  authModalOpen: false,
  checkoutStep: 1,
  setCheckoutStep: (step) => set({ checkoutStep: step }),
  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),
  openAuthModal: () => set({ authModalOpen: true }),
  closeAuthModal: () => set({ authModalOpen: false }),
}));
