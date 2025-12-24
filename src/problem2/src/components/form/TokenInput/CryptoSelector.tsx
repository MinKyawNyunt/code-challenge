import { useEffect, useState } from "react";
import TokenSelectModal from "./TokenSelectModal";
import { useTokenStore } from "../../../store/tokenStore";
import { tokenNameImageMapper } from "../../../helpers/ImageHelper";
import type { PriceData } from "../../../interfaces/ApiInterface";


interface CryptoSelectorProps {
  onTokenSelect: (token: PriceData) => void;
  disabled: boolean;
  selectedToken: PriceData | null;
}

export default function CryptoSelector({ disabled, selectedToken, onTokenSelect }: CryptoSelectorProps) {

  const { tokens, isLoading, error, fetchTokens } = useTokenStore();

  useEffect(() => {
    if (tokens.length === 0 && !isLoading) {
      fetchTokens()
    }
  }, []);

  useEffect(() => {
    if (tokens.length > 0 && !selectedToken?.currency) {
      const randomIndex = Math.floor(Math.random() * tokens.length);
      onTokenSelect(tokens[randomIndex]);
    }
  }, [tokens.length, selectedToken, onTokenSelect, tokens]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTokenSelect = (token: PriceData) => {
    onTokenSelect(token);
  };
  
  if(isLoading || !selectedToken) {
    return (
      <button
        type="button"
        disabled
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 rounded-full transition-all flex-shrink-0 cursor-not-allowed"
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0">
          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        <span className="text-white/70 font-semibold text-xs sm:text-sm">Loading...</span>
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        disabled={disabled || isLoading}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/10 hover:bg-white/20 rounded-full transition-all flex-shrink-0 disabled:cursor-not-allowed disabled:hover:bg-white/10"
      >
        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex-shrink-0">
          <img
            className="w-5"
            src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${tokenNameImageMapper(selectedToken.currency)}.svg`}
            alt={selectedToken.currency}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/assets/images/no-image.svg";
            }}
          />
        </div>
        <span className="text-white font-semibold text-xs sm:text-sm">
          {selectedToken.currency}
        </span>
        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <TokenSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleTokenSelect}
        currentToken={selectedToken}
        tokens={tokens}
        isLoading={isLoading}
        error={error}
        onRetry={fetchTokens}
      />
    </>

  )
}
