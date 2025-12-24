interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

export default function WalletRow({ className, amount, usdValue, formattedAmount }: WalletRowProps) {
  return (
    <div className={className}>
      <div>Amount: {amount}</div>
      <div>Formatted Amount: {formattedAmount}</div>
      <div>USD Value: ${usdValue.toFixed(2)}</div>
    </div>
  );
}