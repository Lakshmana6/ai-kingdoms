export interface Player {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  lastLoginAt: Date;
  role: PlayerRole;
  characterId: string | null;
}

export type PlayerRole = 'player' | 'moderator' | 'admin';

export interface Character {
  id: string;
  playerId: string;
  name: string;
  x: number;
  y: number;
  mapId: string;
  skills: Record<SkillName, SkillData>;
  inventory: InventorySlot[];
  equipment: Equipment;
  health: number;
  maxHealth: number;
  mana: number;
  maxMana: number;
  stamina: number;
  maxStamina: number;
  gold: number;
  totalWealth: number;
  guildId: string | null;
  questLog: QuestEntry[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillData {
  level: number;
  xp: number;
}

export type SkillName =
  | 'mining' | 'woodcutting' | 'fishing' | 'hunting' | 'farming'
  | 'herbalism' | 'smithing' | 'crafting' | 'cooking' | 'tailoring'
  | 'fletching' | 'alchemy' | 'construction' | 'jewelcrafting'
  | 'melee' | 'ranged' | 'magic' | 'defense' | 'trading'
  | 'leadership' | 'sailing' | 'thieving';

export interface InventorySlot {
  slotIndex: number;
  itemId: string;
  quantity: number;
  metadata?: Record<string, unknown>;
}

export interface Equipment {
  head: string | null;
  chest: string | null;
  legs: string | null;
  feet: string | null;
  hands: string | null;
  mainHand: string | null;
  offHand: string | null;
  ring1: string | null;
  ring2: string | null;
  necklace: string | null;
  cape: string | null;
  ammo: string | null;
}

export interface QuestEntry {
  questId: string;
  status: 'active' | 'completed' | 'failed';
  progress: Record<string, number>;
  startedAt: Date;
  completedAt?: Date;
}
