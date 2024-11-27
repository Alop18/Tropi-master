import { create } from 'zustand';
import { Category } from '../types/types';

type CategoryState = {
    categories: Category[];
    setCategories: (usuario: Category[]) => void;
    category: Category | null;
    setCategory: (category: Category) => void;

};

const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    setCategories: (categories) => set({ categories }),
    category: null,
    setCategory: (category) => set({ category })
}));

export default useCategoryStore;