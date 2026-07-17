import { Module, forwardRef } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { EconomyModule } from '../economy/economy.module';
import { EventsModule } from '../events/events.module';
import { CombatModule } from '../combat/combat.module';
import { GuildsModule } from '../guilds/guilds.module';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [
    forwardRef(() => EconomyModule),
    forwardRef(() => EventsModule),
    forwardRef(() => CombatModule),
    forwardRef(() => GuildsModule),
    forwardRef(() => GatewayModule),
  ],
  providers: [SimulationService],
  controllers: [SimulationController],
  exports: [SimulationService],
})
export class SimulationModule {}
