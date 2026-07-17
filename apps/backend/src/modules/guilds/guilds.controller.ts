import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GuildsService } from './guilds.service';

@ApiTags('guilds')
@Controller('guilds')
export class GuildsController {
  constructor(private readonly guilds: GuildsService) {}

  @Get()
  listGuilds() {
    return this.guilds.listGuilds();
  }
}
