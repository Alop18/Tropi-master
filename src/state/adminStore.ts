import { create } from 'zustand'
import { Product } from "../types/types";
type AdminState = {
    listProduct: Product[];
    setProducts: (listProduct: Product[]) => void;
};

const useAdminStore = create<AdminState>((set) => ({
    listProduct: [],
    setProducts: (listProduct) => set({ listProduct }),
}));

export default useAdminStore;