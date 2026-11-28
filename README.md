# FoodieBite

FoodieBite is a full-stack, role-based food-delivery style application in this repository. It is organised as two independently installed/managed packages that talk over HTTP:

- a **Next.js 16 (App Router)** frontend at the repository root, and
- an **Express 5 + TypeScript** backend in [`backend/`](backend/).

The repository does not contain a monorepo workspace configuration or a single "run everything" script; the two packages have separate `package.json`, lockfile, `tsconfig.json` and environment files.

> This file replaces the original `create-next-app` boilerplate `README.md`. On this repository's case-insensitive filesystem `readme.md` and `README.md` are the same path. The three documentation files requested by the task are also listed in `.gitignore`, as requested, so they are present locally but are not automatically staged by `git add .`.

## What is implemented

Based strictly on the code in this repository:

| Area | Status in code |
| --- | --- |
| Authentication | Register/login/logout, JWT in an `httpOnly` cookie, `requireAuth` + `requireRole` middleware, server-side `RoleGuard` on frontend route groups |
| Admin | Dashboard stats, customer list/stats/status, restaurant list/stats/status, add restaurant, owner requests, invitation email, restaurant review/approve/reject |
| Restaurant owner | Invitation acceptance link, profile create/update with image upload, onboarding state machine, submission notification to admin |
| Notifications | Persisted notifications, unread count, mark-as-read, SSE stream fed by Redis pub/sub; bell widget in role headers |
| Public/customer/delivery UI | Landing page, navigation, dashboards, tables, charts, cart, payments, menu, availability, etc. Many of these screens use in-component sample data rather than backend calls |
| Orders, payments, delivery, menu, reviews | UI screens exist, but no corresponding backend routes/models are present in `backend/route/` or `backend/prisma/schema.prisma` |

Roles defined in `backend/prisma/schema.prisma` and used by both sides: `customer`, `restaurant_owner`, `delivery_partner`, `admin`. Only `customer`, `restaurant_owner` and `delivery_partner` can self-register; `admin` accounts are not creatable through the public register endpoint.

## Repository structure

```text
.
├── app/                       Next.js App Router pages and layouts
│   ├── layout.tsx             Root layout (Geist font, sonner Toaster, globals.css)
│   ├── page.tsx               Public landing page
│   ├── (public)/              login, register, invitation acceptance
│   ├── (admin)/               /admin dashboard, customers, restaurants, orders, delivery, queries
│   ├── (customer)/            /customer protected area, menus, restaurant browsing
│   ├── (deliverypartner)/     /deliverypartner dashboard, orders, earnings, history
│   └── (restaurantowner)/     /restaurant dashboard, profile, menu, orders, availability, reviews
├── component/                 Domain UI components grouped by role/feature
│   └── ui/                    shadcn/ui primitives (see components.json)
├── api/                       Frontend fetch clients + shared frontend types
│   ├── api.ts                 auth/current-user and legacy CRUD helpers
│   ├── admin/                 dashboard, customers, restaurants clients and types
│   ├── notification/          notification client and types
│   └── restaurantOwner/       restaurant profile/invitation client and types
├── store/                     zustand stores (admin customer and restaurant state)
├── lib/utils.ts               cn() helper
├── app/globals.css            Tailwind 4 / shadcn theme and Leaflet CSS imports
├── next.config.ts             Next config (remote image hosts, Turbopack CSS loader)
├── tsconfig.json              Frontend TS config, alias @/* -> ./*
├── package.json               Frontend scripts and dependencies
├── .env.example               NEXT_PUBLIC_API_URL placeholder
├── backend/
│   ├── server.ts              Express entry point, mounts routers and /uploads static files
│   ├── config/env.ts          dotenv loader for backend/.env
│   ├── route/                 Express routers (auth, admin, restaurant-owner, notifications)
│   ├── controller/            Request handlers
│   ├── model/                 Prisma data access
│   ├── middleware/            requireAuth, requireRole, multer upload config
│   ├── lib/                   Prisma client, Redis connections, notification pub/sub
│   ├── queues/                BullMQ queues and producers
│   ├── workers/               BullMQ workers (email, notification; invitation files are empty)
│   ├── utils/                 API response helpers, email transport, token/error helpers
│   ├── type/express.d.ts      Express.Request augmentation (id, userRole, currentUser)
│   ├── prisma/                schema.prisma, migrations, seed.ts
│   ├── prisma.config.ts       Prisma 7 config (schema, migrations, seed, DB_URL)
│   ├── ecosystem.config.cjs   PM2 process definitions (API + 2 workers)
│   ├── cleanEmailQueue.ts / testEmailQueue.ts / testNotificationQueue.ts  ad-hoc scripts
│   ├── package.json           Backend scripts and dependencies
│   ├── tsconfig.json          Backend TS config, alias @/backend/* -> ./*
│   └── .env.example           Backend environment template
├── readme.md                  This file
├── analysis-skill.md          Analysis process and findings
└── skill.md                   Repeatable guide for contributors/agents
```

## Prerequisites

The repository does not pin Node/npm versions (no `engines` field and no `.nvmrc`). You need:

- Node.js with npm and `npx` compatible with Next.js 16, React 19, TypeScript 5 and Prisma 7.
- A MySQL-compatible database reachable through `DB_URL` (the Prisma datasource provider is `mysql`, using `@prisma/adapter-mariadb`).
- A Redis server for BullMQ queues and notification pub/sub.
- An SMTP account if you want the email worker to send invitation emails.
- PM2 only if you choose the `ecosystem.config.cjs` production-style startup.

There is no test runner configured in either `package.json`; the backend contains ad-hoc `test*Queue.ts` scripts, not a test suite.

## Setup

### 1. Install dependencies

```bash
# from the repository root (frontend)
npm install

# backend is a separate package
cd backend
npm install
```

### 2. Create environment files

Frontend — copy [`.env.example`](.env.example) to `.env` and set:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:4000
```

All frontend API clients read `process.env.NEXT_PUBLIC_API_URL` directly; if it is unset, fetches are made against a relative `undefined/...` URL.

Backend — copy [`backend/.env.example`](backend/.env.example) to `backend/.env` and fill in:

```dotenv
JWT_SECRET=<any strong secret>
DB_URL=mysql://user:password@host:3306/foodiebite
FRONTEND_URL=http://localhost:3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=<sender email>
SMTP_PASS=<app password>
```

Notes from the code:

- `server.ts` hardcodes `const PORT = 4000`; the `PORT` value in the example file does not change the listening port.
- `FRONTENDPORT` appears in the example file but is not read anywhere in the tracked source.
- CORS is hardcoded to `http://localhost:3000` with `credentials: true`; production host configuration is not implemented.
- `backend/utils/email/email.ts` throws `Email config is missing` at import time if any SMTP variable is absent, so the email worker needs all five SMTP values even if you only want to test other features.

### 3. Prepare the database

From `backend/`:

```bash
npx prisma generate          # required: lib/prisma.ts imports prisma/generated/prisma/client
npm run prisma:migrate       # development migrations
# or: npm run prisma:deploy  # apply checked-in migrations without prompting
```

Optional sample data (5 restaurants): `npm run prisma:seed`. The seed file is wired through `prisma.config.ts` (`migrations.seed`). Its image helper builds URLs from `https://unsplash.com{id}?...`, which does not look like a valid Unsplash path; this was observed but not verified at runtime.

### 4. Start the backend services

API (from `backend/`):

```bash
npm run server    # tsx watch server.ts
# or
npm start         # tsx server.ts
```

Workers in separate terminals (no npm scripts exist for them):

```bash
cd backend
npx tsx workers/emailWorkers.ts
npx tsx workers/notificationWorkers.ts
```

Alternatively, after `npm run build` in `backend/`, PM2 can start the API and the two workers with `pm2 start ecosystem.config.cjs` (the config points to `dist/server.js`, `dist/workers/emailWorkers.js` and `dist/workers/notificationWorkers.js`). It does **not** start an invitation-acceptance process even though `invitationAcceptanceWorker.ts` exists (that file is empty).

### 5. Start the frontend

From the repository root:

```bash
npm run dev       # http://localhost:3000
# production-style
npm run build
npm start
npm run lint
```

## How to use the application

1. Open `http://localhost:3000`. The landing page is public and uses static content.
2. Register at `/register` as `customer`, `restaurant_owner` or `delivery_partner`, then log in at `/login`. The backend sets an `httpOnly` `token` cookie (1 hour expiry).
3. Login redirects by role: `/admin`, `/customer`, `/restaurant` (or `/restaurant/profile` while onboarding), `/deliverypartner`. Each protected route group is wrapped in `RoleGuard`, which calls `/api/auth/me` and redirects on missing/wrong role.
4. **Admin**: `/admin` shows stats; `/admin/customers` supports search/status/sort/pagination and status changes; `/admin/restaurants` supports the same plus "add restaurant", owner-request invitations and a review dialog that approves or rejects with a reason. Invitation emails link to `/restaurant/invitation/accept?token=...` (24-hour expiry).
5. **Restaurant owner**: after accepting the invitation, complete the profile at `/restaurant/profile`. Logo and cover image are multipart uploads (JPEG/PNG, max 5 MB each) written under `backend/public/uploads/restaurants/{logo,image}` and served from `/uploads/...`. Submission sets the restaurant to `pending` and the owner to `pending_review`; an in-app notification is queued for the first active admin.
6. **Notifications**: role headers contain a bell (`component/NotificationDropdown.tsx`). History and unread count come from `GET /api/notifications`; live updates arrive over `EventSource` at `/api/notifications/stream`, backed by Redis pub/sub and a BullMQ worker.

## Backend HTTP API

All routes are mounted in `backend/server.ts`. Every route below except register/login/invitation-acceptance/logout requires `requireAuth`; admin routes additionally require `requireRole("admin")`; owner routes require `requireRole("restaurant_owner")`.

| Method | Path | Purpose |
| --- | --- | --- |
| POST | `/api/auth/register` | Create customer/owner/delivery account |
| POST | `/api/auth/login` | Verify password, issue cookie |
| GET | `/api/auth/me` | Current user summary |
| POST | `/api/auth/logout` | Clear cookie |
| POST | `/api/auth/accept-restaurant-invitation` | Consume token, move owner to `profile_pending` |
| GET | `/api/admin/` | Admin access probe |
| GET | `/api/admin/dashboard/stats` | Dashboard counts (`totalRevenue`/`totalOrders` are hardcoded `0`) |
| GET | `/api/admin/customers` | Paginated/filtered customer list |
| GET | `/api/admin/customers/stats` | Customer counts |
| PATCH | `/api/admin/customers/:id/status` | Activate/suspend customer |
| GET | `/api/admin/restaurants` | Paginated/filtered restaurant list |
| GET | `/api/admin/restaurants/stats` | Restaurant counts by status |
| POST | `/api/admin/restaurants` | Add restaurant + owner account with temporary password |
| GET | `/api/admin/restaurants/owner-requests` | Owner onboarding requests |
| POST | `/api/admin/restaurants/owner-requests/:userId/invite` | Create invitation + queue email |
| GET | `/api/admin/restaurants/:id/review` | Full profile for review |
| PATCH | `/api/admin/restaurants/:id/approve` | Approve pending profile |
| PATCH | `/api/admin/restaurants/:id/reject` | Reject pending profile with reason |
| PATCH | `/api/admin/restaurants/:id/status` | Change status (active/pending/suspended) |
| GET | `/api/restaurant-owner/restaurant` | My restaurant profile |
| POST | `/api/restaurant-owner/restaurant` | Submit profile (multipart) |
| PATCH | `/api/restaurant-owner/restaurant` | Update profile (multipart) |
| GET | `/api/notifications` | History (50) + unread count |
| PATCH | `/api/notifications/:notificationId/read` | Mark one as read |
| GET | `/api/notifications/stream` | SSE stream |
| GET | `/uploads/...` | Static restaurant images |

## Data model (Prisma / MySQL)

`backend/prisma/schema.prisma` defines: `customers`, `restaurants`, `restaurant_invitations`, `email_jobs`, `invitation_acceptance_jobs`, `notifications`. Important enums: `customers_role`, `customers_status`, `restaurant_status`, `restaurant_onboarding_status`, `email_job_status`, `invitation_acceptance_job_status`. Migrations under `backend/prisma/migrations/` show the schema evolving from the initial tables through profile fields, optional category, first-login password flag, onboarding/owner relation, MySQL job queues, notifications and restaurant rejection.

## Known limitations / things not determinable from the repository

These are observations from the code, not missing documentation that was guessed at:

- **No automated tests** are configured; `testEmailQueue.ts`, `testNotificationQueue.ts` and `cleanEmailQueue.ts` are standalone scripts with hardcoded values.
- **Empty tracked files**: `app/(customer)/restaurants/page.tsx`, `app/(customer)/restaurants/[id]/page.tsx`, `app/(customer)/menu/[restaurantId]/page.tsx`, `app/(customer)/customer/(protected)/settings/page.tsx`, `app/(restaurantowner)/restaurant/profile/edit/page.tsx`, `component/admin/RecentRestaurants.tsx`, `component/restaurant/profile/RestaurantForm.tsx`, `backend/queues/invitationAcceptanceQueue.ts`, `backend/workers/invitationAcceptanceWorker.ts`.
- **Legacy API helpers** in `api/api.ts` call `/api/restaurants` and `/api/customers` (including DELETE/PUT variants) that are not mounted in `backend/server.ts`; grep shows those helpers are currently unused by components.
- **`mustChangePassword`** is set for admin-created owners and returned by login, but no password-change route or form exists in the tracked code.
- **Invitation acceptance jobs** exist in the schema/migrations, but their queue and worker files are empty; acceptance is currently handled synchronously by a Prisma transaction.
- **Analytics/order/payment/delivery/revenue numbers** shown in many screens come from local arrays/constants inside components; the backend has no order or payment tables.
- `totalRevenue` and `totalOrders` in `getAdminDashboardStats()` are hardcoded to `0`.
- `PORT` and `FRONTENDPORT` in `backend/.env.example` are not consumed by the code; production CORS/URL configuration is not evident.
- Deployment target other than the PM2 process list is not specified; no Docker, CI, or hosting configuration is tracked.
- Node/npm version requirements cannot be determined from the repository.
- Runtime behaviour (whether the app currently builds, whether the seed images resolve, whether Redis/SMTP connections succeed) was **not** executed as part of this documentation pass; conclusions are from static reading only.
