import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { giniCoefficient, ITEM_TEMPLATES, randomInt } from '@ai-kingdoms/shared';

@Injectable()
export class EconomyService {
  constructor(private readonly prisma: PrismaService) {}

  async getMarketState() {
    const [listings, snapshots, transactions] = await Promise.all([
      this.prisma.marketListing.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
      this.prisma.economySnapshot.findMany({ orderBy: { tick: 'desc' }, take: 50 }),
      this.prisma.transaction.findMany({ orderBy: { createdAt: 'desc' }, take: 100 }),
    ]);

    return { listings, snapshots, transactions };
  }

  async performNpcPurchase(npcId: string, wealth: number) {
    const listing = await this.prisma.marketListing.findFirst({ where: { pricePerUnit: { lte: Math.max(5, wealth) } } });
    if (!listing) return null;

    await this.prisma.transaction.create({
      data: {
        buyerId: npcId,
        sellerId: listing.sellerId,
        itemId: listing.itemTemplateId,
        quantity: 1,
        pricePerUnit: listing.pricePerUnit,
        totalPrice: listing.pricePerUnit,
        marketId: listing.marketId,
        tick: Date.now(),
      },
    });

    return listing;
  }

  async performNpcSale(npcId: string, sellerName: string, inventory: { itemId: string; quantity: number }[]) {
    const item = inventory.find((entry) => entry.quantity > 0);
    if (!item) return null;

    const template = ITEM_TEMPLATES.find((t) => t.id === item.itemId);
    if (!template) return null;

    return this.prisma.marketListing.create({
      data: {
        sellerId: npcId,
        sellerName,
        itemTemplateId: item.itemId,
        quantity: 1,
        pricePerUnit: Math.max(1, template.baseValue + randomInt(-3, 8)),
        listedAtTick: Date.now(),
        expiresAtTick: Date.now() + 3600,
        marketId: 'global_market',
      },
    });
  }

  async recordSnapshot(tick: number, citizens: { wealth: number; inventory: { itemId: string; quantity: number }[] }[]) {
    const wealths = citizens.map((c) => c.wealth);
    const totalWealth = wealths.reduce((sum, w) => sum + w, 0);
    const averageWealth = wealths.length ? totalWealth / wealths.length : 0;
    const activeListings = await this.prisma.marketListing.count();
    const totalTransactions = await this.prisma.transaction.count();
    const transactions = await this.prisma.transaction.findMany({ take: 200, orderBy: { createdAt: 'desc' } });
    const totalTradedValue = transactions.reduce((sum, tx) => sum + tx.totalPrice, 0);

    const itemPricesJson = Object.fromEntries(
      ITEM_TEMPLATES.slice(0, 20).map((item) => [item.id, item.baseValue + randomInt(-5, 15)]),
    );

    const resourceAvailabilityJson = Object.fromEntries(
      ['wood', 'stone', 'iron_ore', 'fish', 'food', 'coal'].map((resource) => [resource, randomInt(50, 2000)]),
    );

    return this.prisma.economySnapshot.upsert({
      where: { tick },
      update: {
        totalWealth,
        averageWealth,
        wealthGini: giniCoefficient(wealths),
        inflationRate: Number((randomInt(-3, 8) / 100).toFixed(2)),
        unemploymentRate: Number((randomInt(1, 20) / 100).toFixed(2)),
        totalTransactions,
        totalTradedValue,
        itemPricesJson,
        resourceAvailabilityJson,
        activeTradeRoutes: randomInt(3, 25),
        activeShops: activeListings,
        activeMerchants: randomInt(10, 140),
      },
      create: {
        tick,
        totalWealth,
        averageWealth,
        wealthGini: giniCoefficient(wealths),
        inflationRate: Number((randomInt(-3, 8) / 100).toFixed(2)),
        unemploymentRate: Number((randomInt(1, 20) / 100).toFixed(2)),
        totalTransactions,
        totalTradedValue,
        itemPricesJson,
        resourceAvailabilityJson,
        activeTradeRoutes: randomInt(3, 25),
        activeShops: activeListings,
        activeMerchants: randomInt(10, 140),
      },
    });
  }
}
