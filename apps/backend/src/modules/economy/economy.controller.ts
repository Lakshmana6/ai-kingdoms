import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EconomyService } from './economy.service';

@ApiTags('economy')
@Controller('economy')
export class EconomyController {
  constructor(private readonly economyService: EconomyService) {}

  @Get('market')
  getMarket() {
    return this.economyService.getMarketState();
  }
}
