import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@/prisma/prisma.service';
import { EconomyService } from '../economy/economy.service';
import { EventsService } from '../events/events.service';
import { CombatService } from '../combat/combat.service';
import { GuildsService } from '../guilds/guilds.service';
import { SimulationGateway } from '../gateway/simulation.gateway';
import { randomInt, clamp, weightedRandom } from '@ai-kingdoms/shared';
import { v4 as uuid } from 'uuid';

interface RuntimeCitizen {
  id: string;
  name: string;
  profession: string;
  x: number;
  y: number;
  mapId: string;
  hunger: number;
  fatigue: number;
  wealth: number;
  health: number;
  maxHealth: number;
  mood: number;
  intelligence: number;
  riskTolerance: number;
  inventory: { itemId: string; quantity: number }[];
  goal?: { type: string; targetX?: number; targetY?: number; data?: Record<string, unknown> };
  memories: { id: string; type: string; description: string; importance: number; tick: number }[];
  isAlive: boolean;
}

@Injectable()
export class SimulationService implements OnModuleInit {
  private readonly logger = new Logger(SimulationService.name);
  private readonly tickMs: number;
  private readonly aiCount: number;
  private timer: NodeJS.Timeout | null = null;
  private tick = 0;
  private runtimeCitizens = new Map<string, RuntimeCitizen>();
  private simulationSpeed = 1;
  private paused = false;

  constructor(
    config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly economyService: EconomyService,
    private readonly eventsService: EventsService,
    private readonly combatService: CombatService,
    private readonly guildsService: GuildsService,
    private readonly gateway: SimulationGateway,
  ) {
    this.tickMs = config.get<number>('SIM_TICK_MS', 1000);
    this.aiCount = config.get<number>('SIM_AI_COUNT', 1000);
  }

  async onModuleInit() {
    await this.bootstrapRuntimeCitizens();
    this.start();
  }

  async bootstrapRuntimeCitizens() {
    const existing = await this.prisma.aICitizen.findMany({ take: this.aiCount });
    if (existing.length === 0) {
      await this.generateCitizens(this.aiCount);
    }

    const citizens = await this.prisma.aICitizen.findMany({ take: this.aiCount });
    citizens.forEach((citizen) => {
      this.runtimeCitizens.set(citizen.id, {
        id: citizen.id,
        name: citizen.name,
        profession: citizen.profession,
        x: citizen.x,
        y: citizen.y,
        mapId: citizen.mapId,
        hunger: citizen.hunger,
        fatigue: citizen.fatigue,
        wealth: citizen.wealth,
        health: citizen.health,
        maxHealth: citizen.maxHealth,
        mood: citizen.mood,
        intelligence: citizen.intelligence,
        riskTolerance: citizen.riskTolerance,
        inventory: (citizen.inventoryJson as { itemId: string; quantity: number }[]) ?? [],
        memories: (citizen.memoriesJson as RuntimeCitizen['memories']) ?? [],
        isAlive: citizen.isAlive,
      });
    });

    this.logger.log(`Loaded ${this.runtimeCitizens.size} AI citizens into runtime simulation`);
  }

  async generateCitizens(count: number) {
    const firstNames = ['Alden', 'Mira', 'Tarin', 'Selene', 'Brom', 'Lyra', 'Cedric', 'Nessa', 'Orin', 'Vale'];
    const lastNames = ['Stone', 'Rivers', 'Ashfall', 'Ironwood', 'Brighton', 'Thorne', 'Frost', 'Hollow'];
    const professions = ['miner', 'woodcutter', 'fisherman', 'hunter', 'farmer', 'smith', 'merchant', 'guard', 'builder', 'adventurer'];

    const data = Array.from({ length: count }, (_, i) => ({
      name: `${firstNames[randomInt(0, firstNames.length - 1)]} ${lastNames[randomInt(0, lastNames.length - 1)]} ${i}`,
      personality: weightedRandom([
        ['aggressive', 1],
        ['peaceful', 2],
        ['greedy', 1],
        ['generous', 1],
        ['curious', 2],
        ['cautious', 2],
        ['ambitious', 2],
        ['lazy', 1],
      ]),
      mood: randomInt(-10, 10),
      morality: weightedRandom([['good', 2], ['neutral', 5], ['evil', 1]]),
      intelligence: randomInt(20, 95),
      riskTolerance: randomInt(10, 90),
      hunger: randomInt(0, 40),
      fatigue: randomInt(0, 40),
      wealth: randomInt(25, 350),
      reputation: 0,
      familyIdsJson: [],
      guildId: null,
      profession: professions[randomInt(0, professions.length - 1)],
      inventoryJson: [{ itemId: 'cooked_shrimp', quantity: randomInt(1, 5) }],
      equipmentJson: { head: null, chest: null, legs: null, feet: null, hands: null, mainHand: null, offHand: null, ring1: null, ring2: null, necklace: null, cape: null, ammo: null },
      skillsJson: {
        mining: { level: randomInt(1, 30), xp: 0 }, woodcutting: { level: randomInt(1, 30), xp: 0 }, fishing: { level: randomInt(1, 30), xp: 0 }, hunting: { level: randomInt(1, 30), xp: 0 }, farming: { level: randomInt(1, 30), xp: 0 },
        herbalism: { level: randomInt(1, 30), xp: 0 }, smithing: { level: randomInt(1, 30), xp: 0 }, crafting: { level: randomInt(1, 30), xp: 0 }, cooking: { level: randomInt(1, 30), xp: 0 }, tailoring: { level: randomInt(1, 30), xp: 0 },
        fletching: { level: randomInt(1, 30), xp: 0 }, alchemy: { level: randomInt(1, 30), xp: 0 }, construction: { level: randomInt(1, 30), xp: 0 }, jewelcrafting: { level: randomInt(1, 30), xp: 0 }, melee: { level: randomInt(1, 30), xp: 0 },
        ranged: { level: randomInt(1, 30), xp: 0 }, magic: { level: randomInt(1, 30), xp: 0 }, defense: { level: randomInt(1, 30), xp: 0 }, trading: { level: randomInt(1, 30), xp: 0 }, leadership: { level: randomInt(1, 30), xp: 0 },
        sailing: { level: randomInt(1, 30), xp: 0 }, thieving: { level: randomInt(1, 30), xp: 0 },
      },
      x: randomInt(100, 400),
      y: randomInt(100, 400),
      mapId: 'world_overworld',
      health: 100,
      maxHealth: 100,
      homeId: null,
      cityId: null,
      currentGoalJson: null,
      goalQueueJson: [],
      memoriesJson: [],
      ambitionsJson: ['become wealthy', 'improve profession'],
      dailyRoutineJson: [],
      age: randomInt(18, 70),
      birthTick: -randomInt(1000, 100000),
      lastActionTick: 0,
    }));

    for (let i = 0; i < data.length; i += 200) {
      await this.prisma.aICitizen.createMany({ data: data.slice(i, i + 200) });
    }
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => this.advanceTick(), Math.max(50, this.tickMs / this.simulationSpeed));
    this.logger.log('Simulation started');
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  setSpeed(multiplier: number) {
    this.simulationSpeed = clamp(multiplier, 0.25, 16);
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.start();
    }
  }

  getState() {
    return {
      tick: this.tick,
      aiCount: this.runtimeCitizens.size,
      paused: this.paused,
      speed: this.simulationSpeed,
    };
  }

  async advanceTick() {
    if (this.paused) return;

    this.tick += 1;
    const batch = Array.from(this.runtimeCitizens.values());

    for (const citizen of batch) {
      this.updateCitizenNeeds(citizen);
      this.decideGoal(citizen);
      await this.executeGoal(citizen);
    }

    if (this.tick % 10 === 0) {
      await this.economyService.recordSnapshot(this.tick, batch);
    }

    if (this.tick % 30 === 0) {
      await this.eventsService.maybeTriggerWorldEvent(this.tick);
    }

    if (this.tick % 120 === 0) {
      await this.persistCitizens();
    }

    this.gateway.broadcastTick(this.tick);
  }

  updateCitizenNeeds(citizen: RuntimeCitizen) {
    citizen.hunger = clamp(citizen.hunger + 1, 0, 100);
    citizen.fatigue = clamp(citizen.fatigue + 1, 0, 100);

    if (citizen.hunger > 85) citizen.health = clamp(citizen.health - 2, 0, citizen.maxHealth);
    if (citizen.fatigue > 90) citizen.mood -= 1;
    if (citizen.health <= 0) citizen.isAlive = false;
  }

  decideGoal(citizen: RuntimeCitizen) {
    if (!citizen.isAlive) return;
    if (citizen.goal && Math.random() > 0.15) return;

    if (citizen.hunger > 70 && citizen.inventory.some((item) => item.itemId.startsWith('cooked_'))) {
      citizen.goal = { type: 'eat' };
      return;
    }

    if (citizen.fatigue > 75) {
      citizen.goal = { type: 'sleep' };
      return;
    }

    const professionGoals: Record<string, string[]> = {
      miner: ['mine_ore', 'sell_item'],
      woodcutter: ['chop_tree', 'sell_item'],
      fisherman: ['fish', 'sell_item'],
      hunter: ['hunt', 'cook'],
      farmer: ['farm', 'sell_item'],
      smith: ['smith', 'buy_item'],
      merchant: ['buy_item', 'sell_item', 'trade'],
      guard: ['patrol', 'defend_city'],
      builder: ['build', 'repair'],
      adventurer: ['explore', 'fight_monster', 'gather_rare'],
    };

    const pool = professionGoals[citizen.profession] ?? ['explore', 'trade'];
    const selected = pool[randomInt(0, pool.length - 1)];
    citizen.goal = {
      type: selected,
      targetX: clamp(citizen.x + randomInt(-8, 8), 0, 511),
      targetY: clamp(citizen.y + randomInt(-8, 8), 0, 511),
    };
  }

  async executeGoal(citizen: RuntimeCitizen) {
    if (!citizen.goal || !citizen.isAlive) return;

    switch (citizen.goal.type) {
      case 'eat': {
        const food = citizen.inventory.find((item) => item.itemId.startsWith('cooked_') && item.quantity > 0);
        if (food) {
          food.quantity -= 1;
          citizen.hunger = clamp(citizen.hunger - 35, 0, 100);
          citizen.health = clamp(citizen.health + 6, 0, citizen.maxHealth);
          citizen.memories.push({ id: uuid(), type: 'event', description: 'Ate a meal', importance: 2, tick: this.tick });
        }
        citizen.goal = undefined;
        break;
      }
      case 'sleep':
        citizen.fatigue = clamp(citizen.fatigue - 40, 0, 100);
        citizen.mood += 2;
        citizen.goal = undefined;
        break;
      case 'mine_ore':
        citizen.wealth += randomInt(1, 4);
        citizen.inventory.push({ itemId: 'iron_ore', quantity: 1 });
        citizen.goal = undefined;
        break;
      case 'chop_tree':
        citizen.inventory.push({ itemId: 'logs', quantity: randomInt(1, 2) });
        citizen.goal = undefined;
        break;
      case 'fish':
        citizen.inventory.push({ itemId: 'raw_trout', quantity: 1 });
        citizen.goal = undefined;
        break;
      case 'hunt':
        if (Math.random() > 0.3) citizen.inventory.push({ itemId: 'raw_swordfish', quantity: 1 });
        citizen.goal = undefined;
        break;
      case 'farm':
        citizen.wealth += randomInt(1, 3);
        citizen.goal = undefined;
        break;
      case 'smith':
        citizen.wealth += randomInt(2, 8);
        citizen.goal = undefined;
        break;
      case 'build':
      case 'repair':
        citizen.wealth += 2;
        citizen.goal = undefined;
        break;
      case 'buy_item':
        await this.economyService.performNpcPurchase(citizen.id, citizen.wealth);
        citizen.goal = undefined;
        break;
      case 'sell_item':
        await this.economyService.performNpcSale(citizen.id, citizen.name, citizen.inventory);
        citizen.goal = undefined;
        break;
      case 'trade':
        citizen.wealth += randomInt(1, 10);
        citizen.goal = undefined;
        break;
      case 'fight_monster':
      case 'defend_city':
      case 'patrol':
        await this.combatService.resolveNpcSkirmish(citizen.id, citizen.name, this.tick);
        citizen.goal = undefined;
        break;
      case 'explore':
      case 'gather_rare':
        citizen.x = citizen.goal.targetX ?? citizen.x;
        citizen.y = citizen.goal.targetY ?? citizen.y;
        if (Math.random() > 0.92) {
          citizen.inventory.push({ itemId: 'gold_ore', quantity: 1 });
        }
        citizen.goal = undefined;
        break;
      default:
        citizen.goal = undefined;
    }
  }

  async persistCitizens() {
    const citizens = Array.from(this.runtimeCitizens.values());
    for (const citizen of citizens.slice(0, 500)) {
      await this.prisma.aICitizen.update({
        where: { id: citizen.id },
        data: {
          x: citizen.x,
          y: citizen.y,
          hunger: citizen.hunger,
          fatigue: citizen.fatigue,
          wealth: citizen.wealth,
          health: citizen.health,
          mood: citizen.mood,
          inventoryJson: citizen.inventory,
          memoriesJson: citizen.memories.slice(-50),
          currentGoalJson: citizen.goal ?? null,
          lastActionTick: this.tick,
          isAlive: citizen.isAlive,
        },
      });
    }
  }
}
