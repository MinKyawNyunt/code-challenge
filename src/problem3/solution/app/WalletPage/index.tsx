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

  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100
      case 'Ethereum':
        return 50
      case 'Arbitrum':
        return 30
      case 'Zilliqa':
        return 20
      case 'Neo':
        return 20
      default:
        return -99
    }
  }

  const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
      const balancePriority = getPriority(balance.blockchain);
      if (balancePriority > -99 && balance.amount > 0) {
        return true;
      }
      return false
    }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
      const leftPriority = getPriority(lhs.blockchain);
      const rightPriority = getPriority(rhs.blockchain);
      if (leftPriority > rightPriority) {
        return -1;
      } else if (rightPriority > leftPriority) {
        return 1;
      }

      return 0;
    });
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
        key={index}
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