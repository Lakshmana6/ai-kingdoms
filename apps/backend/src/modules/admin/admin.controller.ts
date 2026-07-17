import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/prisma/prisma.service';
import { SimulationService } from '../simulation/simulation.service';
import { EventsService } from '../events/events.service';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly simulation: SimulationService,
    private readonly events: EventsService,
  ) {}

  @Get('dashboard')
  async getDashboard() {
    const [citizens, settlements, guilds, listings, snapshots, events] = await Promise.all([
      this.prisma.aICitizen.count(),
      this.prisma.settlement.findMany(),
      this.prisma.guild.findMany(),
      this.prisma.marketListing.findMany({ take: 50, orderBy: { createdAt: 'desc' } }),
      this.prisma.economySnapshot.findMany({ take: 20, orderBy: { tick: 'desc' } }),
      this.events.listEvents(),
    ]);

    return {
      simulation: this.simulation.getState(),
      citizens,
      settlements,
      guilds,
      listings,
      snapshots,
      events,
    };
  }

  @Post('trigger-event')
  triggerEvent(@Body() body: { tick?: number }) {
    return this.events.maybeTriggerWorldEvent(body.tick ?? Date.now());
  }
}
