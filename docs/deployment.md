# Deployment Guide

## Local Docker

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/frontend/.env.example apps/frontend/.env
docker compose up --build
```

## Production Notes

- Set strong JWT and admin credentials.
- Use managed PostgreSQL and Redis where possible.
- Run `npm run db:migrate --workspace=apps/backend` before first production boot.
- Build frontend with `npm run build --workspace=apps/frontend` and serve static assets behind a CDN.
- Scale backend horizontally with sticky websocket sessions or a Socket.IO adapter.

## Fly/Render/Railway Pattern

1. Deploy PostgreSQL and Redis.
2. Deploy `apps/backend` as a Node service with env vars from `.env.example`.
3. Deploy `apps/frontend` as a static or Node-served Vite app.
4. Point `VITE_API_URL` and `VITE_WS_URL` to the backend public URL.
