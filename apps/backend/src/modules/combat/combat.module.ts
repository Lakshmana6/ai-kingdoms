import { Module } from '@nestjs/common';
import { CombatService } from './combat.service';
import { CombatController } from './combat.controller';

@Module({
  providers: [CombatService],
  controllers: [CombatController],
  exports: [CombatService],
})
export class CombatModule {}
