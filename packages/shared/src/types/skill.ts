import type { SkillName } from './player';

export interface SkillDefinition {
  name: SkillName;
  displayName: string;
  description: string;
  icon: string;
  maxLevel: number;
  category: 'gathering' | 'production' | 'combat' | 'support';
  xpCurve: XpCurve;
  actions: SkillAction[];
  achievements: SkillAchievement[];
}

export interface XpCurve {
  type: 'polynomial' | 'exponential' | 'custom';
  baseXp: number;
  multiplier: number;
  exponent: number;
}

export interface SkillAction {
  id: string;
  name: string;
  requiredLevel: number;
  xpPerAction: number;
  actionTimeTicks: number;
  requiredTool?: string;
  requiredResource?: string;
  outputItemId?: string;
  outputQuantity?: number | [number, number]; // fixed or [min, max]
  requiredBuilding?: string;
  successRate?: number; // 0-1
}

export interface SkillAchievement {
  id: string;
  name: string;
  description: string;
  requirement: number; // level, xp, or action count
  requirementType: 'level' | 'xp' | 'actions';
  reward?: AchievementReward;
}

export interface AchievementReward {
  xp?: number;
  itemId?: string;
  itemQuantity?: number;
  title?: string;
}
