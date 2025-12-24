import { create } from 'zustand';
import { fetchLatestPrices } from '../services/tokenService';
import type { PriceData } from '../interfaces/ApiInterface';

interface TokenState {
  tokens: PriceData[];
  isLoading: boolean;
  error: string | null;
  
  fetchTokens: () => Promise<void>;
}

export const useTokenStore = create<TokenState>((set) => ({
  tokens: [],
  isLoading: false,
  error: null,

  fetchTokens: async () => {
    set({ isLoading: true, error: null });
    try {
      const tokens = await fetchLatestPrices();
      set({ tokens, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch tokens",
        isLoading: false 
      });
    }
  },
}));
