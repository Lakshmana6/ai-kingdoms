export interface EconomySnapshot {
  tick: number;
  timestamp: Date;
  totalWealth: number;
  averageWealth: number;
  wealthGini: number;         // 0-1 inequality coefficient
  inflationRate: number;
  unemploymentRate: number;
  totalTransactions: number;
  totalTradedValue: number;
  itemPrices: Record<string, number>;
  resourceAvailability: Record<string, number>;
  activeTradeRoutes: number;
  activeShops: number;
  activeMerchants: number;
}

export interface PriceEntry {
  itemId: string;
  currentPrice: number;
  basePrice: number;
  supply: number;
  demand: number;
  lastUpdatedTick: number;
  priceHistory: number[];
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  itemId: string;
  quantity: number;
  pricePerUnit: number;
  totalPrice: number;
  marketId: string;
  tick: number;
  timestamp: Date;
}

export interface Shop {
  id: string;
  ownerId: string;
  name: string;
  buildingId: string;
  settlementId: string;
  inventory: ShopItem[];
  capital: number;
  specialization?: string;
  reputation: number;
  totalSales: number;
}

export interface ShopItem {
  itemId: string;
  quantity: number;
  buyPrice: number;
  sellPrice: number;
  restockRate: number;
}
