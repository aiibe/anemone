import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  setToken: (username: string, password: string) => void;
  clear: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      token: null,
      setToken: (username: string, password: string) =>
        set({ token: btoa(`${username}:${password}`) }),
      clear: () => set({ token: null }),
    }),
    { name: "anemone-auth" }
  )
);
