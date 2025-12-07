# Admin API Usage

- Admin routes require admin role via JWT (`roleMiddleware`).
- Impersonation returns a mock token that encodes `impersonatedUserId` (mock mode only).
- Bulk flagging writes audit logs with actorId.
- Reseed: POST /api/admin/system/reseed { seedNumber }
- Export: POST /api/admin/export { entity, filter } returns CSV download (base64 in mock).
- Fraud simulate: POST /api/admin/fraud/simulate to create alerts.
