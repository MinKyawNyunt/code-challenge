import { type PriceData } from "../interfaces/ApiInterface";
import { get } from "./service";

export async function fetchLatestPrices(): Promise<PriceData[]> {
  const data: PriceData[] = await get("prices.json");

  // Keep only the entry with the latest date for each currency
  const latestByCurrency = new Map<string, PriceData>();
  for (const item of data) {
    const existing = latestByCurrency.get(item.currency);
    if (!existing || new Date(item.date) > new Date(existing.date)) {
      latestByCurrency.set(item.currency, item);
    }
  }

  // Sort A → Z by currency and add mock balance values
  return Array.from(latestByCurrency.values())
    .sort((a, b) => a.currency.localeCompare(b.currency))
    .map(item => ({
      ...item,
      balance: parseFloat((Math.random() * 9900 + 100).toFixed(2)) // Random value between 100 and 10000
    }));

}
