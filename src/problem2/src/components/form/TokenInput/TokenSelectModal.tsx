import { useState } from "react";
import GlassModal from "../../GlassModal";
import type { PriceData } from "../../../interfaces/ApiInterface";
import { tokenNameImageMapper } from "../../../helpers/ImageHelper";

interface TokenSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: PriceData) => void;
  currentToken: PriceData | null;
  tokens: PriceData[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}


export default function TokenSelectModal({
  isOpen,
  onClose,
  onSelect,
  currentToken,
  tokens,
  isLoading,
  error,
  onRetry
}: TokenSelectModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTokens = tokens.filter((token) =>
    token.currency.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <div className="pb-4 mb-4">
        <input
          type="text"
          placeholder="Search token..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 transition-colors"
        />
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-400">
            <p>{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-sm text-white/70 hover:text-white underline"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && filteredTokens.length === 0 && (
          <div className="text-center py-8 text-white/50">
            No tokens found
          </div>
        )}

        {!isLoading && !error && filteredTokens.map((token, i) => (
          <button
            key={i}
            onClick={() => {
              onSelect(token);
              onClose();
            }}
            className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${currentToken?.currency === token.currency
              ? "bg-white/20 border border-white/30"
              : "bg-white/5 hover:bg-white/10 border border-transparent"
              }`}
          >
            
              <img
                className="w-10"
                src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${tokenNameImageMapper(token.currency)}.svg`}
                alt={token.currency}
                onError={(e) => {
                  // Prevent infinite loop if fallback also fails
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/assets/images/no-image.svg"; // fallback from public/
                }}
              />
 
            <div className="flex-1 text-left">
              <div className="text-white font-semibold">{token.currency}</div>
              <div className="text-white/50 text-sm">{Number(token.price).toFixed(8)}</div>
            </div>

            {currentToken?.currency === token.currency && (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </GlassModal>
  )
}