import { create } from 'zustand';
import { Usuario } from '../types/types';

type userState = {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
    usuario: Usuario | null;
    setUsuario: (usuario: Usuario) => void;
};

const useUserStore = create<userState>((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    usuario: null,
    setUsuario: (usuario) => set({ usuario }),
}));

export default useUserStore;