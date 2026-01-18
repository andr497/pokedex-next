import { create } from "zustand";

interface FilterState {
    variety: string;
    setVariety: (variety: string) => void;
}

export const useVarietyStore = create<FilterState>((set) => ({
    variety: "",
    setVariety: (variety) => set({ variety }),
}));

export const selectVariety = (state: FilterState) => state.variety;
export const selectSetVariety = (state: FilterState) => state.setVariety;
