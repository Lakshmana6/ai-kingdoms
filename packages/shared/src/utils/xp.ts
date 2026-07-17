import type { XpCurve } from '../types/skill';

/**
 * Calculate the XP required to reach a given level.
 * Uses a formula inspired by OSRS XP tables.
 */
export function xpForLevel(level: number, curve: XpCurve): number {
  if (level <= 1) return 0;
  let xp = 0;
  for (let i = 1; i < level; i++) {
    xp += Math.floor(i + curve.baseXp * Math.pow(curve.multiplier * i, curve.exponent));
  }
  return Math.floor(xp / 4);
}

/**
 * Calculate the level for a given XP amount.
 */
export function levelForXp(xp: number, curve: XpCurve, maxLevel = 99): number {
  for (let level = maxLevel; level >= 1; level--) {
    if (xp >= xpForLevel(level, curve)) return level;
  }
  return 1;
}

/**
 * Progress percentage to the next level (0-1).
 */
export function progressToNextLevel(xp: number, curve: XpCurve, maxLevel = 99): number {
  const currentLevel = levelForXp(xp, curve, maxLevel);
  if (currentLevel >= maxLevel) return 1;
  const currentLevelXp = xpForLevel(currentLevel, curve);
  const nextLevelXp = xpForLevel(currentLevel + 1, curve);
  return (xp - currentLevelXp) / (nextLevelXp - currentLevelXp);
}

/**
 * Build a full XP table array for levels 1-99.
 */
export function buildXpTable(curve: XpCurve, maxLevel = 99): number[] {
  return Array.from({ length: maxLevel + 1 }, (_, i) => xpForLevel(i, curve));
}
