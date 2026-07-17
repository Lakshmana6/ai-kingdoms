import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { randomInt } from '@ai-kingdoms/shared';

@Injectable()
export class GuildsService {
  constructor(private readonly prisma: PrismaService) {}

  async listGuilds() {
    return this.prisma.guild.findMany({ orderBy: { reputation: 'desc' } });
  }

  async maybeCreateNpcGuild(tick: number) {
    if (Math.random() > 0.02) return null;

    return this.prisma.guild.create({
      data: {
        name: `Guild of ${randomInt(100, 999)}`,
        tag: `G${randomInt(10, 99)}`,
        description: 'An AI-formed guild with shared ambition.',
        leaderId: 'system',
        guildHallId: null,
        storageInventoryJson: {},
        wealth: randomInt(500, 5000),
        level: 1,
        xp: 0,
        reputation: randomInt(0, 20),
        alliancesJson: [],
        founded: tick,
        isPlayerGuild: false,
        maxMembers: randomInt(10, 40),
        recruitmentOpen: true,
        charter: 'Mutual prosperity and protection.',
        memberIdsJson: [],
        officerIdsJson: [],
        ranksJson: [],
        warsJson: [],
      },
    });
  }
}
