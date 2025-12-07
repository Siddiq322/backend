# API Overview (Mock Mode)

Detailed paths and behaviors are described inline in controllers. Key groups:
- Auth: /api/auth/register, /login, /otp-request, /verify-otp
- Accounts: /api/accounts
- Transactions: /api/transactions
- Statements: /api/statements
- Investments: /api/stocks, /api/intraday, /api/mf, /api/investments
- Loans & EMI: /api/loans, /api/emi
- Cards: /api/cards
- FD/RD: /api/fd, /api/rd
- Notifications: /api/notifications
- Search: /api/search
- Admin: /api/admin (users, impersonate, bulk flag, monitor, fraud, audit, reseed, export)

Refer to controller files for request/response examples and validation schemas.
