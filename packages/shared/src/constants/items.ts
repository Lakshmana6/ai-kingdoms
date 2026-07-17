import type { ItemTemplate } from '../types/item';

export const ITEM_TEMPLATES: ItemTemplate[] = [
  // Ores
  { id: 'copper_ore', name: 'Copper Ore', description: 'A chunk of copper ore.', category: 'resource', rarity: 'common', weight: 2, baseValue: 5, stackable: true, maxStack: 1000, sprite: 'item_copper_ore', craftable: false },
  { id: 'iron_ore', name: 'Iron Ore', description: 'A chunk of iron ore.', category: 'resource', rarity: 'common', weight: 3, baseValue: 10, stackable: true, maxStack: 1000, sprite: 'item_iron_ore', craftable: false },
  { id: 'coal', name: 'Coal', description: 'A lump of coal, used for smelting.', category: 'resource', rarity: 'common', weight: 2, baseValue: 8, stackable: true, maxStack: 1000, sprite: 'item_coal', craftable: false },
  { id: 'gold_ore', name: 'Gold Ore', description: 'A chunk of gold ore.', category: 'resource', rarity: 'uncommon', weight: 3, baseValue: 40, stackable: true, maxStack: 1000, sprite: 'item_gold_ore', craftable: false },
  { id: 'mithril_ore', name: 'Mithril Ore', description: 'A rare mithril ore, lighter than steel.', category: 'resource', rarity: 'rare', weight: 2, baseValue: 100, stackable: true, maxStack: 1000, sprite: 'item_mithril_ore', craftable: false },
  { id: 'adamant_ore', name: 'Adamantite Ore', description: 'An incredibly hard ore.', category: 'resource', rarity: 'epic', weight: 4, baseValue: 250, stackable: true, maxStack: 500, sprite: 'item_adamant_ore', craftable: false },
  { id: 'runite_ore', name: 'Runite Ore', description: 'The rarest of all ores.', category: 'resource', rarity: 'legendary', weight: 5, baseValue: 1000, stackable: true, maxStack: 100, sprite: 'item_runite_ore', craftable: false },
  // Bars
  { id: 'bronze_bar', name: 'Bronze Bar', description: 'A smelted bronze bar.', category: 'material', rarity: 'common', weight: 3, baseValue: 15, stackable: true, maxStack: 500, sprite: 'item_bronze_bar', craftable: true },
  { id: 'iron_bar', name: 'Iron Bar', description: 'A smelted iron bar.', category: 'material', rarity: 'common', weight: 4, baseValue: 30, stackable: true, maxStack: 500, sprite: 'item_iron_bar', craftable: true },
  { id: 'steel_bar', name: 'Steel Bar', description: 'A smelted steel bar.', category: 'material', rarity: 'uncommon', weight: 4, baseValue: 75, stackable: true, maxStack: 500, sprite: 'item_steel_bar', craftable: true },
  { id: 'mithril_bar', name: 'Mithril Bar', description: 'A smelted mithril bar.', category: 'material', rarity: 'rare', weight: 3, baseValue: 250, stackable: true, maxStack: 200, sprite: 'item_mithril_bar', craftable: true },
  { id: 'adamant_bar', name: 'Adamant Bar', description: 'A smelted adamant bar.', category: 'material', rarity: 'epic', weight: 5, baseValue: 750, stackable: true, maxStack: 100, sprite: 'item_adamant_bar', craftable: true },
  { id: 'runite_bar', name: 'Runite Bar', description: 'A smelted runite bar.', category: 'material', rarity: 'legendary', weight: 6, baseValue: 3000, stackable: true, maxStack: 50, sprite: 'item_runite_bar', craftable: true },
  // Logs
  { id: 'logs', name: 'Logs', description: 'Regular wooden logs.', category: 'resource', rarity: 'common', weight: 4, baseValue: 6, stackable: true, maxStack: 500, sprite: 'item_logs', craftable: false },
  { id: 'oak_logs', name: 'Oak Logs', description: 'Oak logs, used for construction.', category: 'resource', rarity: 'common', weight: 4, baseValue: 15, stackable: true, maxStack: 500, sprite: 'item_oak_logs', craftable: false },
  { id: 'willow_logs', name: 'Willow Logs', description: 'Willow logs.', category: 'resource', rarity: 'common', weight: 4, baseValue: 25, stackable: true, maxStack: 500, sprite: 'item_willow_logs', craftable: false },
  { id: 'maple_logs', name: 'Maple Logs', description: 'Dense maple logs.', category: 'resource', rarity: 'uncommon', weight: 4, baseValue: 50, stackable: true, maxStack: 500, sprite: 'item_maple_logs', craftable: false },
  { id: 'yew_logs', name: 'Yew Logs', description: 'Yew logs, prized by fletchers.', category: 'resource', rarity: 'rare', weight: 5, baseValue: 150, stackable: true, maxStack: 300, sprite: 'item_yew_logs', craftable: false },
  { id: 'magic_logs', name: 'Magic Logs', description: 'Logs from a magical tree.', category: 'resource', rarity: 'epic', weight: 5, baseValue: 500, stackable: true, maxStack: 100, sprite: 'item_magic_logs', craftable: false },
  // Fish
  { id: 'raw_shrimp', name: 'Raw Shrimp', description: 'A raw shrimp.', category: 'food', rarity: 'common', weight: 0.5, baseValue: 3, stackable: true, maxStack: 500, sprite: 'item_raw_shrimp', craftable: false },
  { id: 'raw_trout', name: 'Raw Trout', description: 'A raw trout.', category: 'food', rarity: 'common', weight: 1, baseValue: 20, stackable: true, maxStack: 200, sprite: 'item_raw_trout', craftable: false },
  { id: 'raw_salmon', name: 'Raw Salmon', description: 'A raw salmon.', category: 'food', rarity: 'common', weight: 1, baseValue: 30, stackable: true, maxStack: 200, sprite: 'item_raw_salmon', craftable: false },
  { id: 'raw_lobster', name: 'Raw Lobster', description: 'A raw lobster.', category: 'food', rarity: 'uncommon', weight: 2, baseValue: 80, stackable: true, maxStack: 100, sprite: 'item_raw_lobster', craftable: false },
  { id: 'raw_swordfish', name: 'Raw Swordfish', description: 'A raw swordfish.', category: 'food', rarity: 'uncommon', weight: 2, baseValue: 100, stackable: true, maxStack: 100, sprite: 'item_raw_swordfish', craftable: false },
  { id: 'raw_shark', name: 'Raw Shark', description: 'A raw shark.', category: 'food', rarity: 'rare', weight: 3, baseValue: 300, stackable: true, maxStack: 50, sprite: 'item_raw_shark', craftable: false },
  // Cooked Food
  { id: 'cooked_shrimp', name: 'Cooked Shrimp', description: 'Heals 3 health.', category: 'food', rarity: 'common', weight: 0.5, baseValue: 5, stackable: true, maxStack: 500, sprite: 'item_cooked_shrimp', craftable: true, stats: { healAmount: 3 } },
  { id: 'cooked_trout', name: 'Cooked Trout', description: 'Heals 7 health.', category: 'food', rarity: 'common', weight: 1, baseValue: 30, stackable: true, maxStack: 200, sprite: 'item_cooked_trout', craftable: true, stats: { healAmount: 7 } },
  { id: 'cooked_salmon', name: 'Cooked Salmon', description: 'Heals 9 health.', category: 'food', rarity: 'common', weight: 1, baseValue: 45, stackable: true, maxStack: 200, sprite: 'item_cooked_salmon', craftable: true, stats: { healAmount: 9 } },
  { id: 'cooked_lobster', name: 'Cooked Lobster', description: 'Heals 12 health.', category: 'food', rarity: 'uncommon', weight: 2, baseValue: 120, stackable: true, maxStack: 100, sprite: 'item_cooked_lobster', craftable: true, stats: { healAmount: 12 } },
  { id: 'cooked_swordfish', name: 'Cooked Swordfish', description: 'Heals 14 health.', category: 'food', rarity: 'uncommon', weight: 2, baseValue: 150, stackable: true, maxStack: 100, sprite: 'item_cooked_swordfish', craftable: true, stats: { healAmount: 14 } },
  { id: 'cooked_shark', name: 'Cooked Shark', description: 'Heals 20 health.', category: 'food', rarity: 'rare', weight: 3, baseValue: 500, stackable: true, maxStack: 50, sprite: 'item_cooked_shark', craftable: true, stats: { healAmount: 20 } },
  // Tools
  { id: 'bronze_pickaxe', name: 'Bronze Pickaxe', description: 'A basic pickaxe.', category: 'tool', rarity: 'common', weight: 5, baseValue: 50, stackable: false, maxStack: 1, sprite: 'item_bronze_pickaxe', craftable: true },
  { id: 'iron_pickaxe', name: 'Iron Pickaxe', description: 'A sturdy iron pickaxe.', category: 'tool', rarity: 'common', weight: 6, baseValue: 200, stackable: false, maxStack: 1, sprite: 'item_iron_pickaxe', craftable: true },
  { id: 'mithril_pickaxe', name: 'Mithril Pickaxe', description: 'A fast mithril pickaxe.', category: 'tool', rarity: 'rare', weight: 5, baseValue: 1500, stackable: false, maxStack: 1, sprite: 'item_mithril_pickaxe', craftable: true },
  { id: 'adamant_pickaxe', name: 'Adamant Pickaxe', description: 'An extremely powerful pickaxe.', category: 'tool', rarity: 'epic', weight: 5, baseValue: 5000, stackable: false, maxStack: 1, sprite: 'item_adamant_pickaxe', craftable: true },
  { id: 'runite_pickaxe', name: 'Runite Pickaxe', description: 'The finest mining tool.', category: 'tool', rarity: 'legendary', weight: 4, baseValue: 20000, stackable: false, maxStack: 1, sprite: 'item_runite_pickaxe', craftable: true },
  { id: 'bronze_axe', name: 'Bronze Axe', description: 'A basic woodcutting axe.', category: 'tool', rarity: 'common', weight: 4, baseValue: 40, stackable: false, maxStack: 1, sprite: 'item_bronze_axe', craftable: true },
  { id: 'iron_axe', name: 'Iron Axe', description: 'A standard iron axe.', category: 'tool', rarity: 'common', weight: 5, baseValue: 150, stackable: false, maxStack: 1, sprite: 'item_iron_axe', craftable: true },
  { id: 'mithril_axe', name: 'Mithril Axe', description: 'A fast mithril axe.', category: 'tool', rarity: 'rare', weight: 4, baseValue: 1200, stackable: false, maxStack: 1, sprite: 'item_mithril_axe', craftable: true },
  { id: 'dragon_axe', name: 'Dragon Axe', description: 'A legendary dragon-forged axe.', category: 'tool', rarity: 'legendary', weight: 5, baseValue: 50000, stackable: false, maxStack: 1, sprite: 'item_dragon_axe', craftable: false },
  { id: 'small_net', name: 'Small Net', description: 'For catching small fish.', category: 'tool', rarity: 'common', weight: 1, baseValue: 5, stackable: false, maxStack: 1, sprite: 'item_small_net', craftable: true },
  { id: 'fishing_rod', name: 'Fishing Rod', description: 'A standard fishing rod.', category: 'tool', rarity: 'common', weight: 2, baseValue: 10, stackable: false, maxStack: 1, sprite: 'item_fishing_rod', craftable: true },
  { id: 'fly_fishing_rod', name: 'Fly Fishing Rod', description: 'For catching trout and salmon.', category: 'tool', rarity: 'common', weight: 2, baseValue: 30, stackable: false, maxStack: 1, sprite: 'item_fly_fishing_rod', craftable: true },
  { id: 'harpoon', name: 'Harpoon', description: 'For catching large ocean fish.', category: 'tool', rarity: 'uncommon', weight: 4, baseValue: 100, stackable: false, maxStack: 1, sprite: 'item_harpoon', craftable: true },
  { id: 'lobster_pot', name: 'Lobster Pot', description: 'A pot for catching lobsters.', category: 'tool', rarity: 'common', weight: 3, baseValue: 25, stackable: false, maxStack: 1, sprite: 'item_lobster_pot', craftable: true },
];

export const ITEM_MAP = new Map(ITEM_TEMPLATES.map((item) => [item.id, item]));
