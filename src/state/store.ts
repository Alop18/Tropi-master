import { create } from 'zustand'
import { Car, Product } from "../types/types";
type Actions = {
    setProducts: (listProduct: Product[]) => void;
    setTotal: (total: number) => void;
};

const useCarStore = create<Actions & Car>((set) => ({
    listProduct: [],
    total: 0,
    setProducts: (listProduct: Product[]) => set({ listProduct }),
    setTotal: (total: number) => set({ total }),
}));

export default useCarStore;