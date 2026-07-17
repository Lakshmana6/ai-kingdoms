import { PrismaClient } from '@prisma/client';
import { SKILL_NAMES } from '@ai-kingdoms/shared';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

function createDefaultSkills() {
  return Object.fromEntries(SKILL_NAMES.map((skill) => [skill, { level: 1, xp: 0 }]));
}

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@ai-kingdoms.com';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'change_this_admin_password';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      username: 'admin',
      email: adminEmail,
      passwordHash,
      role: 'ADMIN',
      character: {
        create: {
          name: 'Admin',
          skillsJson: createDefaultSkills(),
          inventoryJson: [],
          equipmentJson: {
            head: null,
            chest: null,
            legs: null,
            feet: null,
            hands: null,
            mainHand: null,
            offHand: null,
            ring1: null,
            ring2: null,
            necklace: null,
            cape: null,
            ammo: null,
          },
          questLogJson: [],
        },
      },
    },
  });

  await prisma.settlement.createMany({
    data: [
      {
        name: 'Ironhaven',
        type: 'CITY',
        x: 220,
        y: 190,
        mapId: 'world_overworld',
        population: 120,
        foodSupply: 1000,
        security: 75,
        economy: 80,
        resourcesJson: { wood: 1200, stone: 800, iron_ore: 340 },
        taxRate: 0.08,
        mayorId: null,
        guardCount: 16,
        walls: true,
        port: false,
        level: 5,
        foundedTick: 0,
        buildingIdsJson: [],
        citizenIdsJson: [],
        tradeRoutesJson: [],
      },
      {
        name: 'Seabreak',
        type: 'PORT',
        x: 420,
        y: 350,
        mapId: 'world_overworld',
        population: 95,
        foodSupply: 800,
        security: 62,
        economy: 74,
        resourcesJson: { fish: 900, wood: 600, cloth: 200 },
        taxRate: 0.06,
        mayorId: null,
        guardCount: 12,
        walls: false,
        port: true,
        level: 4,
        foundedTick: 0,
        buildingIdsJson: [],
        citizenIdsJson: [],
        tradeRoutesJson: [],
      },
    ],
    skipDuplicates: true,
  });

  console.log(`Seed complete. Admin user: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
