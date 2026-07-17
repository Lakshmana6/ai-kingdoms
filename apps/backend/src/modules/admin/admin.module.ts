import { Module, forwardRef } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { SimulationModule } from '../simulation/simulation.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [forwardRef(() => SimulationModule), EventsModule],
  controllers: [AdminController],
})
export class AdminModule {}
