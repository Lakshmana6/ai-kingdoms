import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { randomInt } from '@ai-kingdoms/shared';

@Injectable()
export class CombatService {
  constructor(private readonly prisma: PrismaService) {}

  async resolveNpcSkirmish(attackerId: string, attackerName: string, tick: number) {
    if (Math.random() < 0.6) {
      return {
        attackerId,
        attackerName,
        outcome: 'victory',
        damage: randomInt(3, 18),
        tick,
      };
    }

    if (Math.random() < 0.2) {
      await this.prisma.worldEvent.create({
        data: {
          type: 'BANDIT_RAID',
          title: 'Bandit Clash',
          description: `${attackerName} reported armed conflict outside the walls.`,
          tick,
          duration: 40,
          severity: 2,
          affectedMapIdsJson: ['world_overworld'],
          affectedSettlementIdsJson: [],
          effectsJson: [{ type: 'population_modifier', magnitude: -1, duration: 20 }],
          isActive: true,
        },
      });
    }

    return {
      attackerId,
      attackerName,
      outcome: 'retreat',
      damage: randomInt(0, 8),
      tick,
    };
  }
}
