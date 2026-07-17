export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'unique';
export type ItemCategory = 'weapon' | 'armor' | 'tool' | 'resource' | 'food' | 'potion' | 'material' | 'gem' | 'misc' | 'quest' | 'currency';
export type MaterialType = 'wood' | 'stone' | 'iron' | 'steel' | 'gold' | 'mithril' | 'adamant' | 'runite' | 'leather' | 'cloth' | 'bone' | 'crystal' | 'dragonhide';

export interface ItemTemplate {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  rarity: ItemRarity;
  weight: number;
  baseValue: number;
  stackable: boolean;
  maxStack: number;
  sprite: string;
  craftable: boolean;
  recipe?: CraftingRecipe;
  stats?: ItemStats;
  requirements?: ItemRequirements;
}

export interface ItemInstance {
  instanceId: string;
  templateId: string;
  quality: number;      // 1-100
  durability: number;   // 0-maxDurability
  maxDurability: number;
  creatorId?: string;   // citizen/player who crafted it
  materials?: MaterialType[];
  enchantments?: string[];
  customName?: string;
  createdTick: number;
}

export interface ItemStats {
  attackBonus?: number;
  defenseBonus?: number;
  rangedBonus?: number;
  magicBonus?: number;
  strengthBonus?: number;
  prayerBonus?: number;
  speedBonus?: number;
  healAmount?: number;
  manaBonus?: number;
}

export interface ItemRequirements {
  melee?: number;
  ranged?: number;
  magic?: number;
  defense?: number;
  smithing?: number;
  crafting?: number;
}

export interface CraftingRecipe {
  id: string;
  outputItemId: string;
  outputQuantity: number;
  requiredSkill: string;
  requiredLevel: number;
  xpReward: number;
  materials: RecipeMaterial[];
  toolRequired?: string;
  buildingRequired?: string;
  craftingTime: number; // ticks
}

export interface RecipeMaterial {
  itemId: string;
  quantity: number;
}

export interface MarketListing {
  id: string;
  sellerId: string;
  sellerName: string;
  itemTemplateId: string;
  itemInstanceId?: string;
  quantity: number;
  pricePerUnit: number;
  listedAt: number;
  expiresAt: number;
  marketId: string;
}

export interface AuctionListing extends MarketListing {
  currentBid: number;
  highestBidderId: string | null;
  minBidIncrement: number;
  buyoutPrice?: number;
}
