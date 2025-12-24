export function calculateExchangeRate(
  fromPrice: number,
  toPrice: number,
) {

  if (!fromPrice || !toPrice || toPrice === 0) {
    return null;
  }

  return fromPrice / toPrice;
}

export function convertAmount(
  amount: string,
  exchangeRate: number,
): string {

  if (!amount || !exchangeRate) {
    return '';
  }

  const calculatedToAmount = (parseFloat(amount) * exchangeRate).toString();
  return calculatedToAmount.toString();
}

export function formatAmount(amount: number | string) {
  
  if(!amount) {
    return '';
  }

  if(typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  console.log(amount);
  return parseFloat((amount).toFixed(8)).toString();
}