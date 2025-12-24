
# Problem3 Issues & Solutions

This document summarizes the main issues found in the original implementation and how they were fixed for better correctness, readability, and performance.

---

## 1. Missing `blockchain` Property in WalletBalance
**Problem:**
The `WalletBalance` interface was missing the `blockchain` property, which is required for sorting and filtering.

**Before:**
```ts
interface WalletBalance {
  currency: string;
  amount: number;
}
```
**After:**
```ts
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
```

---

## 2. inEfficient getPriority function
**Problem:**
The original getPriority function used a switch statement to assign priorities to blockchains. This approach is verbose and less efficient, especially as the list grows. Using a lookup object (map) provides constant-time (O(1)) access and makes the code cleaner and easier to maintain.

**Before:**
```ts
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
```
**After:**
```ts
const PRIORITY_MAP: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20,
};

const getPriority = (blockchain: string) => PRIORITY_MAP[blockchain] ?? -99;
```

---

## 2. Incorrect Variable Name in Filtering
**Problem:**
Used `lhsPriority` (undefined) instead of the correct `balancePriority` variable.

**Before:**
```ts
const balancePriority = getPriority(balance.blockchain);
if (lhsPriority > -99) {
  // ...
}
```
**After:**
```ts
const balancePriority = getPriority(balance.blockchain);
if (balancePriority > -99) {
  // ...
}
```

---

## 3. Filtering Logic: Showing Only Positive Balances
**Problem:**
The filter was keeping balances with `amount <= 0`. It should only show positive balances.

**Before:**
```ts
if (balance.amount <= 0) {
  return true;
}
```
**After:**
```ts
if (balance.amount > 0) {
  return true;
}
```

---

## 4. Sorting Function Missing Return Value
**Problem:**
The sort function did not return `0` when priorities were equal, causing ESLint errors.

**Before:**
```ts
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
// missing return 0
```
**After:**
```ts
if (leftPriority > rightPriority) {
  return -1;
} else if (rightPriority > leftPriority) {
  return 1;
}
return 0;
```

---


## 5. getPriority calling multiple time
**Problem:**
In the original code, the getPriority function was called multiple times for each balance. Once during filtering and again during sorting. This is inefficient, especially if the list is large, as it repeats the same calculation.

**Before:**
```ts
const sortedBalances = useMemo(() => {
    return balances.filter((balance: WalletBalance) => {
		  // ...
		}).sort((lhs: WalletBalance, rhs: WalletBalance) => {
			const leftPriority = getPriority(lhs.blockchain);
		  const rightPriority = getPriority(rhs.blockchain);
		  // ...
    });
  }, [balances, prices]);
```
**After:**
```ts
const sortedBalances = useMemo(() => {
    return balances
      .map(balance => ({
        ...balance,
        priority: getPriority(balance.blockchain),
      }))
      .filter(b => b.priority > -99 && b.amount > 0)
      .sort((a, b) => b.priority - a.priority);
  }, [balances]);
```

---

## 6. Unnecessary Dependency in useMemo
**Problem:**
`prices` was included as a dependency in `useMemo`, causing unnecessary recalculations.

**Before:**
```ts
const sortedBalances = useMemo(() => { /* ... */ }, [balances, prices]);
```
**After:**
```ts
const sortedBalances = useMemo(() => { /* ... */ }, [balances]);
```

---

## 7. Incorrect Mapping for Display Rows
**Problem:**
The code created a `formattedBalances` array but then mapped over `sortedBalances` for rendering, missing the formatted values.

**Before:**
```ts
const formattedBalances = sortedBalances.map(...);
const rows = sortedBalances.map(...); // should use formattedBalances
```
**After:**
```ts
const formattedBalances = sortedBalances.map(...);
const rows = formattedBalances.map(...);
```

---

## 8. formattedBalances and sortedBalances can be combine
**Problem:**
The original code first created a formattedBalances array to add formatted values, then separately mapped over sortedBalances to render rows. This resulted in unnecessary extra mapping and intermediate data structures, making the code less efficient and harder to maintain. Both formatting and rendering can be done in a single map operation.

**Before:**
```ts
const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow 
        className={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    )
  })
```
**After:**
```ts
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
```

---



## 9. Type Safety for Price Lookup
**Problem:**
Accessing `prices[balance.currency]` without type safety can cause ESLint/type errors.

**Before:**
```ts
const usdValue = prices[balance.currency] * balance.amount;
```
**After:**
```ts
const usdValue = (prices[balance.currency as keyof typeof prices] ?? 0) * balance.amount;
```

---

## 10. using array index as WalletRow Key
**Problem:**
Using the array index as the key prop in React lists can lead to rendering bugs, especially when the list changes (items are added, removed, or reordered). This can cause React to incorrectly associate components with data, resulting in unexpected UI behavior. It's better to use a unique and stable identifier, such as currency, for the key.

**Before:**
```ts
<WalletRow 
  key={index}
  // ...
/>
```
**After:**
```ts
<WalletRow
  key={balance.currency}
  // ...
/>
```

---

## 11. Missing Definition for classes.row
**Problem:**
In the original code, classes.row was used as a prop for WalletRow, but the classes object itself was not defined. This would cause a runtime error. The fix is to define the classes object before using it, ensuring the component receives the correct styling.

**Before:**
```ts
<WalletRow 
  className={classes.row}
  // ...
/>
```
**After:**
```ts
const classes = {
    row: "flex flex-col items-left justify-between py-2 px-4 bg-zinc-800 rounded-lg mb-2 shadow hover:bg-zinc-700 transition-colors"
  };
<WalletRow 
  className={classes.row}
  // ...
/>
```

---

[### Complete Working Code can be check inside /src/problem3/solution/app/WalletPage/index.tsx](https://github.com/MinKyawNyunt/code-challenge/blob/main/src/problem3/solution/app/WalletPage/index.tsx)






