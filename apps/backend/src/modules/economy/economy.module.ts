import { Module, forwardRef } from '@nestjs/common';
import { EconomyService } from './economy.service';
import { EconomyController } from './economy.controller';

@Module({
  imports: [forwardRef(() => class Fake {}) as never],
  providers: [EconomyService],
  controllers: [EconomyController],
  exports: [EconomyService],
})
export class EconomyModule {}
