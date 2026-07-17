# AI Kingdoms

A production-quality browser-based MMORPG featuring a living world driven by thousands of autonomous AI citizens that form their own civilization — gathering resources, crafting equipment, trading, building settlements, fighting wars, and creating a fully simulated economy.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + TypeScript + Phaser 3 + Tailwind CSS |
| Backend | Node.js + NestJS |
| Realtime | Socket.IO |
| Database | PostgreSQL + Prisma ORM |
| Cache | Redis |
| Auth | JWT |
| Build | Vite |
| Containers | Docker Compose |
| Testing | Vitest + Playwright |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Lakshmana6/ai-kingdoms.git
cd ai-kingdoms

# Copy environment files
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env

# Start all services
docker compose up --build
```

The game will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Admin Dashboard**: http://localhost:5173/admin
- **API Docs (Swagger)**: http://localhost:3000/api/docs

## Development

```bash
# Install dependencies
npm install

# Start backend
npm run dev:backend

# Start frontend
npm run dev:frontend

# Run all tests
npm run test

# Run E2E tests
npm run test:e2e
```

## Architecture

```
ai-kingdoms/
├── apps/
│   ├── backend/          # NestJS API + simulation engine
│   └── frontend/         # React + Phaser 3 game client
├── packages/
│   └── shared/           # Shared types, constants, utilities
├── docker/               # Docker service configs
├── scripts/              # Dev and deployment scripts
└── docs/                 # Architecture documentation
```

## Features

- **Living World**: 1,000–10,000 autonomous AI citizens with full personality systems
- **Deep Skill System**: 22 skills (Mining, Smithing, Magic, Combat, Trading, etc.) with 99 levels each
- **Simulated Economy**: Supply/demand pricing, auction houses, trade routes, inflation controls
- **Dynamic Events**: Droughts, raids, plagues, dragon attacks, and more
- **Guild System**: AI and player guilds with wars, alliances, and elections
- **City Building**: Settlements grow organically based on population and resources
- **Admin Dashboard**: Live world map, AI thoughts, economy graphs, server metrics
- **Procedural World**: Unique continents, dungeons, lore, and quests each run

## License

MIT
