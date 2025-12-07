# Upgrade to MongoDB

1) Implement `connectMongo` in `src/config/mongoPlaceholder.ts` (use mongoose connect).
2) Replace imports in controllers from `services/mock/*` to `services/db/*` (methods must keep same signatures).
3) Implement DB services in `src/services/db/` (mirror mock services).
4) Swap websocket data sources if needed (but ws wiring stays the same).
5) Use schemas in `src/models/mongooseExamples/*` as starting points.
6) Run migration helper (to be added) to import snapshot into Mongo.
7) Update `.env` with real `MONGO_URI` and set `NODE_ENV=production` or `MOCK_MODE=false`.
