export type DamageType = 'melee' | 'ranged' | 'magic' | 'fire' | 'ice' | 'poison' | 'holy' | 'shadow' | 'true';
export type StatusEffect = 'poisoned' | 'burning' | 'frozen' | 'stunned' | 'bleeding' | 'cursed' | 'blessed' | 'hasted' | 'slowed' | 'invisible' | 'protected';

export interface CombatEntity {
  id: string;
  name: string;
  x: number;
  y: number;
  mapId: string;
  health: number;
  maxHealth: number;
  attackPower: number;
  defensePower: number;
  speed: number;
  level: number;
  team: 'player' | 'ai_friendly' | 'ai_hostile' | 'monster' | 'neutral';
  statusEffects: ActiveStatusEffect[];
  aggro: Map<string, number>;
  isAlive: boolean;
}

export interface ActiveStatusEffect {
  type: StatusEffect;
  duration: number; // ticks remaining
  power: number;
  sourceId: string;
}

export interface CombatAction {
  type: 'attack' | 'defend' | 'flee' | 'use_item' | 'cast_spell' | 'shoot';
  attackerId: string;
  targetId: string;
  damage?: number;
  damageType?: DamageType;
  isCritical?: boolean;
  isBlocked?: boolean;
  isDodged?: boolean;
  itemUsed?: string;
  spellId?: string;
  tick: number;
}

export interface Monster {
  id: string;
  templateId: string;
  name: string;
  level: number;
  x: number;
  y: number;
  mapId: string;
  health: number;
  maxHealth: number;
  attackPower: number;
  defensePower: number;
  speed: number;
  aggression: number;
  territoryRadius: number;
  lootTable: LootEntry[];
  drops: string[];
  isBoss: boolean;
  behavior: 'passive' | 'defensive' | 'aggressive' | 'pack' | 'territorial';
  packLeaderId?: string;
  packMemberIds: string[];
  lastCombatTick: number;
  spawnX: number;
  spawnY: number;
}

export interface LootEntry {
  itemId: string;
  chance: number;  // 0-1
  minQuantity: number;
  maxQuantity: number;
}
