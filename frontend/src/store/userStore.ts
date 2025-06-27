import { create } from 'zustand';

interface UserState {
  token: string | null;
  username: string | null;
  setUser: (u: { token: string; username: string }) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: null,
  username: null,
  setUser: ({ token, username }) => set({ token, username }),
  logout: () => set({ token: null, username: null }),
}));
