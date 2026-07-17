import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { WORLD_CONFIG } from '@ai-kingdoms/shared';

@Injectable()
export class WorldService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorldState() {
    const [settlements, buildings, monsters, activeEvents] = await Promise.all([
      this.prisma.settlement.findMany(),
      this.prisma.building.findMany(),
      this.prisma.monster.findMany(),
      this.prisma.worldEvent.findMany({ where: { isActive: true } }),
    ]);

    return {
      config: WORLD_CONFIG,
      settlements,
      buildings,
      monsters,
      activeEvents,
    };
  }
}
