import { describe, expect, it } from 'vitest';
import { xpForLevel, levelForXp } from '@ai-kingdoms/shared';

describe('xp math', () => {
  it('should increase xp requirement with levels', () => {
    const curve = { type: 'polynomial' as const, baseXp: 83, multiplier: 1, exponent: 1.3 };
    expect(xpForLevel(10, curve)).toBeGreaterThan(xpForLevel(5, curve));
  });

  it('should map xp back to a valid level', () => {
    const curve = { type: 'polynomial' as const, baseXp: 83, multiplier: 1, exponent: 1.3 };
    const xp = xpForLevel(25, curve);
    expect(levelForXp(xp, curve)).toBeGreaterThanOrEqual(25);
  });
});
