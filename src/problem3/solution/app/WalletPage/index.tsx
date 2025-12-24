import { useMemo } from "react";
import WalletRow from "./WalletRow";
import type { BoxProps } from "./props";
import { useWalletBalances, usePrices } from "./hooks";

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface Props extends BoxProps {

}

export const WalletPage: React.FC<Props> = () => {
  const balances = useWalletBalances();
  const prices = usePrices();

  const PRIORITY_MAP: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string) => PRIORITY_MAP[blockchain] ?? -99;

  const sortedBalances = useMemo(() => {
    return balances
      .map(balance => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .filter(b => b.priority > -99 && b.amount > 0)
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);

  const classes = {
    row: "flex flex-col items-left justify-between py-2 px-4 bg-zinc-800 rounded-lg mb-2 shadow hover:bg-zinc-700 transition-colors"
  };

  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = (prices[balance.currency as keyof typeof prices] ?? 0) * balance.amount;
    return (
      <WalletRow
        currency={balance.currency}
        className={classes.row}
        key={balance.currency}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    )
  })

  return (
    <div>
      {rows}
    </div>
  )
}