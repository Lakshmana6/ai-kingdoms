import type { SkillName, SkillData, InventorySlot, Equipment } from './player';

export type Personality = 'aggressive' | 'peaceful' | 'greedy' | 'generous' | 'curious' | 'cautious' | 'ambitious' | 'lazy';
export type Morality = 'good' | 'neutral' | 'evil';
export type Profession = 'miner' | 'woodcutter' | 'fisherman' | 'hunter' | 'farmer' | 'herbalist' | 'smith' | 'crafter' | 'cook' | 'tailor' | 'fletcher' | 'alchemist' | 'builder' | 'jewelcrafter' | 'warrior' | 'archer' | 'mage' | 'merchant' | 'sailor' | 'thief' | 'guard' | 'adventurer' | 'guild_leader';

export interface AICitizen {
  id: string;
  name: string;
  personality: Personality;
  mood: number;          // -100 to 100
  morality: Morality;
  intelligence: number;  // 1-100
  riskTolerance: number; // 1-100
  hunger: number;        // 0-100 (100 = starving)
  fatigue: number;       // 0-100 (100 = exhausted)
  wealth: number;
  reputation: number;    // -1000 to 1000
  relationships: Relationship[];
  familyIds: string[];
  guildId: string | null;
  profession: Profession;
  inventory: InventorySlot[];
  equipment: Equipment;
  skills: Record<SkillName, SkillData>;
  x: number;
  y: number;
  mapId: string;
  health: number;
  maxHealth: number;
  homeId: string | null;
  cityId: string | null;
  currentGoal: AIGoal | null;
  goalQueue: AIGoal[];
  memories: AIMemory[];
  longTermAmbitions: string[];
  dailyRoutine: DailyRoutineEntry[];
  isAlive: boolean;
  age: number;
  birthTick: number;
  lastActionTick: number;
}

export interface Relationship {
  targetId: string;
  type: 'friend' | 'rival' | 'partner' | 'apprentice' | 'master' | 'spouse' | 'sibling' | 'parent' | 'child' | 'employer' | 'employee' | 'neutral';
  affinity: number; // -100 to 100
  interactions: number;
}

export interface AIGoal {
  id: string;
  type: AIGoalType;
  priority: number;
  targetId?: string;
  targetX?: number;
  targetY?: number;
  data?: Record<string, unknown>;
  startedAt: number;
  expiresAt?: number;
}

export type AIGoalType =
  | 'mine_ore' | 'chop_tree' | 'fish' | 'hunt' | 'farm' | 'cook' | 'smith'
  | 'craft' | 'brew_potion' | 'build' | 'repair' | 'explore' | 'trade'
  | 'buy_item' | 'sell_item' | 'form_guild' | 'hire_worker' | 'escort_caravan'
  | 'fight_monster' | 'pvp' | 'defend_city' | 'raid' | 'gather_rare'
  | 'rest' | 'eat' | 'sleep' | 'socialize' | 'travel' | 'patrol'
  | 'recruit' | 'invest' | 'learn_skill' | 'seek_shelter';

export interface AIMemory {
  id: string;
  type: 'event' | 'trade' | 'combat' | 'social' | 'discovery' | 'loss';
  description: string;
  importance: number; // 1-10
  tick: number;
  data?: Record<string, unknown>;
}

export interface DailyRoutineEntry {
  hourStart: number; // 0-23
  hourEnd: number;
  activity: AIGoalType;
  locationId?: string;
}
