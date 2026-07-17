export type WorldEventType =
  | 'drought' | 'flood' | 'blizzard' | 'plague' | 'wildfire'
  | 'earthquake' | 'meteor_strike' | 'bandit_raid' | 'dragon_attack'
  | 'economic_recession' | 'resource_boom' | 'monster_invasion'
  | 'war_declaration' | 'peace_treaty' | 'city_founded' | 'city_destroyed'
  | 'artifact_discovered' | 'portal_opened';

export interface WorldEvent {
  id: string;
  type: WorldEventType;
  title: string;
  description: string;
  tick: number;
  duration: number;       // ticks the event lasts
  severity: 1 | 2 | 3 | 4 | 5;
  affectedMapIds: string[];
  affectedSettlementIds: string[];
  effects: EventEffect[];
  isActive: boolean;
  resolvedAt?: number;
}

export interface EventEffect {
  type: 'resource_modifier' | 'population_modifier' | 'price_modifier' | 'spawn_monsters' | 'weather_change' | 'building_damage' | 'disease_spread';
  target?: string;
  magnitude: number;
  duration: number;
}

export interface DynamicQuest {
  id: string;
  title: string;
  description: string;
  type: 'kill' | 'gather' | 'escort' | 'build' | 'trade' | 'explore' | 'diplomatic';
  giverNpcId: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  requiredLevel?: number;
  timeLimit?: number;  // ticks
  isRepeatable: boolean;
  lore?: string;
  generatedFromEvent?: string; // world event ID
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'kill_count' | 'item_collect' | 'location_reach' | 'npc_talk' | 'item_deliver' | 'survive_time';
  target: string;
  required: number;
  current: number;
}

export interface QuestReward {
  type: 'xp' | 'item' | 'gold' | 'reputation' | 'skill_xp';
  value: number;
  skillName?: string;
  itemId?: string;
  quantity?: number;
}
