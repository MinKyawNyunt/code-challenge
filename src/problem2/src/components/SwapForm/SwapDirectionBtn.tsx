import { useStore } from "./store";

export default function SwapDirectionBtn() {
  const { swapDirection, isProcessing } = useStore();

  return (
    <div className="flex justify-center -my-2 relative z-10">
      <button
        type="button"
        onClick={swapDirection}
        disabled={isProcessing}
        className="p-2 bg-white/10 hover:bg-white/20 border-4 border-black rounded-xl transition-all hover:rotate-180 duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:rotate-0"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      </button>
    </div>
  )
}