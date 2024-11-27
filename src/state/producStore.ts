import { create } from 'zustand';
import { Product } from "../types/types";

type ProductStore = {
    allProducts: Product[];
    listProducts: Product[];
    setProducts: (products: Product[]) => void;
    filterProducts: (category: string) => void;
    restoreProducts: () => void;
};

const useProductStore = create<ProductStore>((set, get) => ({
    allProducts: [],
    listProducts: [],
    setProducts: (products: Product[]) => set({ allProducts: products, listProducts: products }),
    filterProducts: (category: string) => {
        const { allProducts } = get();
        const filteredProducts = allProducts.filter(product => product.category === category);
        set({ listProducts: filteredProducts });
    },
    restoreProducts: () => {
        const { allProducts } = get();
        set({ listProducts: allProducts });
    }
}));

export default useProductStore;