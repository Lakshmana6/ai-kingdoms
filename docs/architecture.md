# Architecture

AI Kingdoms uses a monorepo with three primary layers:

- `packages/shared`: canonical game contracts, types, configs, item tables, and XP math.
- `apps/backend`: NestJS API, Socket.IO realtime layer, Prisma/Postgres persistence, Redis caching, and world simulation.
- `apps/frontend`: React + Phaser 3 client and admin dashboard.

## Simulation Model

The simulation engine runs continuously on backend ticks. AI citizens are loaded into memory, evaluate needs, select goals, execute economic/combat/world actions, and persist state back to PostgreSQL in batches.

## Economy

The economy derives from player and AI activity. NPCs list goods, purchase from markets, and periodic economy snapshots track wealth, gini, inflation, unemployment, prices, and traded volume.

## Admin Panel

The admin panel reads live dashboard data from `/admin/dashboard` and realtime tick updates from Socket.IO.
