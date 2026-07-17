import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorldService } from './world.service';

@ApiTags('world')
@Controller('world')
export class WorldController {
  constructor(private readonly worldService: WorldService) {}

  @Get()
  getWorldState() {
    return this.worldService.getWorldState();
  }
}
