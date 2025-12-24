import Image from "next/image";
import { WalletPage } from "./WalletPage";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-zinc-800 to-gray-900">
      <div className="max-w-xl w-full p-6 bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Wallet Balances</h2>
        <WalletPage/>
      </div>
    </div>
  );
}
