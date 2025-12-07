# MockBank Backend (Mock-First)

Node.js + Express + TypeScript backend that runs entirely on mock/in-memory data with a mock WebSocket server. Structured to swap to MongoDB later.

## Quick start
```
cd backend
npm install
npm run dev
```

## Env
Copy `.env.example` to `.env` and set `JWT_SECRET` (keep `NODE_ENV=development` for mock mode).

## Scripts
- `npm run dev` – start with ts-node-dev
- `npm run build` – compile to dist
- `npm start` – run compiled build
- `npm run test` – vitest suite
- `npm run seed` – regenerate mock snapshot with deterministic seed

## Swap to Mongo later
See `docs/UPGRADE_TO_MONGO.md` for the exact steps to replace mock services with DB services.
