export function useWalletBalances() {
  return [
    { currency: "ETH", amount: 1.23, blockchain: "Ethereum" },
    { currency: "OSMO", amount: 0, blockchain: "Osmosis" },
    { currency: "ARB", amount: 5.5, blockchain: "Arbitrum" },
    { currency: "NEO", amount: 2, blockchain: "Neo" },
    { currency: "ZIL", amount: 0, blockchain: "Zilliqa" },
  ];
}

export function usePrices() {
  return {
    ETH: 2200,
    OSMO: 1.2,
    ARB: 1.8,
    NEO: 12,
    ZIL: 0.02,
  };
}