import { create } from 'zustand';
import { calculateExchangeRate, convertAmount, formatAmount } from '../../helpers/ExchangeRateHelper';
import type { PriceData } from '../../interfaces/ApiInterface';

interface SwapState {
  fromAmount: string;
  toAmount: string;
  fromToken: PriceData;
  toToken: PriceData;
  exchangeRate: number;
  isProcessing: boolean;
  showSuccess: boolean;
  
  setFromAmount: (amount: string) => void;
  setToAmount: (amount: string) => void;
  setFromToken: (token: PriceData) => void;
  setToToken: (token: PriceData) => void;
  setExchangeRate: () => void;
  setIsProcessing: (processing: boolean) => void;
  setShowSuccess: (show: boolean) => void;
  swapDirection: () => void;
  submitSwap: () => Promise<void>;
}

export const useStore = create<SwapState>((set, get) => ({
  fromAmount: "",
  toAmount: "",
  fromToken: {
    currency: '',
    date: '',
    price: 0,
    balance: 0
  },
  toToken: {
    currency: '',
    date: '',
    price: 0,
    balance: 0
  },
  exchangeRate: 0,
  isProcessing: false,
  showSuccess: false,

  setFromAmount: (amount) => {
    set({ fromAmount: amount });
    const { exchangeRate } = get();
    const calculatedToAmount = convertAmount(amount, exchangeRate);
    set({ toAmount: formatAmount(calculatedToAmount) });
  },
  
  setToAmount: (amount) => {
    set({ toAmount: amount });
    const { fromToken, toToken } = get();
    if(!fromToken || !toToken) {
      return;
    }

    const exchangeRate = calculateExchangeRate(toToken.price, fromToken.price) ?? 0;

    const calculatedToAmount = convertAmount(amount, exchangeRate);
    set({ fromAmount: formatAmount(calculatedToAmount) });
  },
  
  setFromToken: (token) => {
    set({ fromToken: token });
    const {fromAmount} = get();
    get().setFromAmount(fromAmount)
    get().setExchangeRate();
  },
  
  setToToken: (token) => {
    set({ toToken: token });
    get().setExchangeRate();
  },
  
  setExchangeRate: () => {
    const { fromToken, toToken, fromAmount } = get();
    if (fromToken && toToken) {
      const rate = calculateExchangeRate(fromToken.price, toToken.price);
      set({ exchangeRate: parseFloat(formatAmount(rate ?? 0)) ?? 0 });
      
      // Recalculate toAmount when exchange rate changes
      if (fromAmount && rate) {
        const calculatedToAmount = parseFloat(fromAmount) * rate;
        set({ toAmount: formatAmount(calculatedToAmount) });
      }
    }
  },
  
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setShowSuccess: (show) => set({ showSuccess: show }),

  swapDirection: () => {
    const { fromToken, toToken, fromAmount, toAmount } = get();
    set({
      fromToken: toToken,
      toToken: fromToken,
      fromAmount: toAmount,
      toAmount: fromAmount,
    });
    get().setExchangeRate();
  },

  submitSwap: async () => {
    const { fromAmount, fromToken, toAmount, toToken } = get();
    set({ isProcessing: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Swap:", { fromAmount, fromToken, toAmount, toToken });
    set({ isProcessing: false, showSuccess: true });
  },
}));
