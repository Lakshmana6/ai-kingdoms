import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { WorldModule } from './modules/world/world.module';
import { SimulationModule } from './modules/simulation/simulation.module';
import { EconomyModule } from './modules/economy/economy.module';
import { CombatModule } from './modules/combat/combat.module';
import { GuildsModule } from './modules/guilds/guilds.module';
import { EventsModule } from './modules/events/events.module';
import { AdminModule } from './modules/admin/admin.module';
import { GatewayModule } from './modules/gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    RedisModule,
    AuthModule,
    UsersModule,
    WorldModule,
    SimulationModule,
    EconomyModule,
    CombatModule,
    GuildsModule,
    EventsModule,
    AdminModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
