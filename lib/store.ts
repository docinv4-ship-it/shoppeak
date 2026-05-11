import { create } from "zustand";
import { Product } from "./mock-data";

interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sortBy: "relevance" | "price-low" | "price-high" | "rating" | "trending";
}

interface StoreState {
  filters: SearchFilters;
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  clickedProducts: Set<string>;
  recordClick: (productId: string) => void;
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const defaultFilters: SearchFilters = {
  query: "",
  category: "",
  minPrice: 0,
  maxPrice: 10000,
  minRating: 0,
  sortBy: "relevance",
};

export const useStore = create<StoreState>((set) => ({
  filters: defaultFilters,
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  resetFilters: () => set({ filters: defaultFilters }),
  clickedProducts: new Set(),
  recordClick: (productId) =>
    set((state) => {
      const updated = new Set(state.clickedProducts);
      updated.add(productId);
      return { clickedProducts: updated };
    }),
  cartItems: [],
  addToCart: (product) =>
    set((state) => ({
      cartItems: [...state.cartItems, product],
    })),
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== productId),
    })),
  clearCart: () => set({ cartItems: [] }),
}));
