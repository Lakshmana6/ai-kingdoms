import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CombatService } from './combat.service';

@ApiTags('combat')
@Controller('combat')
export class CombatController {
  constructor(private readonly combatService: CombatService) {}

  @Get('ping')
  ping() {
    return { ok: true, module: 'combat', service: !!this.combatService };
  }
}
