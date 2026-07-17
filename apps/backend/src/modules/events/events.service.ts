import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { randomInt, weightedRandom } from '@ai-kingdoms/shared';
import { GuildsService } from '../guilds/guilds.service';

@Injectable()
export class EventsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly guildsService: GuildsService,
  ) {}

  async listEvents() {
    return this.prisma.worldEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 100 });
  }

  async maybeTriggerWorldEvent(tick: number) {
    if (Math.random() > 0.08) return null;

    const type = weightedRandom([
      ['DROUGHT', 2],
      ['FLOOD', 1],
      ['BLIZZARD', 1],
      ['PLAGUE', 1],
      ['WILDFIRE', 1],
      ['BANDIT_RAID', 2],
      ['DRAGON_ATTACK', 1],
      ['RESOURCE_BOOM', 2],
      ['ECONOMIC_RECESSION', 1],
    ]);

    const event = await this.prisma.worldEvent.create({
      data: {
        type: type as never,
        title: String(type).replace(/_/g, ' '),
        description: `World event ${type} occurred at tick ${tick}`,
        tick,
        duration: randomInt(20, 120),
        severity: randomInt(1, 5),
        affectedMapIdsJson: ['world_overworld'],
        affectedSettlementIdsJson: [],
        effectsJson: [{ type: 'resource_modifier', magnitude: randomInt(-20, 35), duration: randomInt(10, 50) }],
        isActive: true,
      },
    });

    await this.guildsService.maybeCreateNpcGuild(tick);
    return event;
  }
}
