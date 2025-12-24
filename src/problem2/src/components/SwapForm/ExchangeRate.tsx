import { useStore } from "./store";

export default function ExchangeRate() {
  const { fromToken, toToken, exchangeRate } = useStore();

  return (
    <div className="mt-4 p-4 bg-white/5 rounded-lg border border-white/10">
      <div className="flex justify-between items-center text-sm">
        <span className="text-white/60">Rate</span>
        <span className="text-white font-medium">
          {
            !fromToken || !toToken ?
              'Loading...' :
              `1 ${fromToken.currency} = ${exchangeRate} ${toToken.currency}`
          }

        </span>
      </div>
    </div>
  )
}