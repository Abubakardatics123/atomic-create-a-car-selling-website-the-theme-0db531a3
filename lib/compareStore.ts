"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CompareStore {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      compareIds: [],
      addToCompare: (id: string) => {
        const { compareIds } = get();
        if (compareIds.length < 3 && !compareIds.includes(id)) {
          set({ compareIds: [...compareIds, id] });
        }
      },
      removeFromCompare: (id: string) => {
        set({ compareIds: get().compareIds.filter((cid) => cid !== id) });
      },
      clearCompare: () => set({ compareIds: [] }),
      isInCompare: (id: string) => get().compareIds.includes(id),
    }),
    { name: "aurum-compare" }
  )
);
