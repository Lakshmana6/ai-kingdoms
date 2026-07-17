import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SimulationService } from './simulation.service';

@ApiTags('simulation')
@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulation: SimulationService) {}

  @Get('state')
  getState() {
    return this.simulation.getState();
  }

  @Post('pause')
  pause() {
    this.simulation.pause();
    return { ok: true };
  }

  @Post('resume')
  resume() {
    this.simulation.resume();
    return { ok: true };
  }

  @Post('speed')
  setSpeed(@Body() body: { speed: number }) {
    this.simulation.setSpeed(body.speed);
    return { ok: true, speed: body.speed };
  }
}
