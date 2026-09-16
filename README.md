# Prism Media Academy - Studio & Equipment Reservation System

Production-grade facility scheduling and equipment checkout platform engineered for Prism Media Academy. Built as an App Router monolith combining student self-service booking workflows with front-desk technician audit and inspection desks.

---

## 1. Executive Summary

Prism Media Academy operates three high-spec creative media production studios alongside dedicated camera and audio packages. This reservation system prevents room collisions, eliminates unmonitored equipment checkout, enforces weekly student studio quotas, and equips lab technicians with live inspection workflows.

### Key Capabilities
- **Atomic Double-Lock Scheduling**: Prevents concurrent room double-booking and cross-studio equipment kit conflicts using PostgreSQL database transactions.
- **Weekly Student Quota Guard**: Strict enforcement of a 4-hour maximum studio reservation allowance per student per calendar week.
- **Self-Service Cancellation Policy**: Automated 4-hour advance cutoff enforcement; cancellations within 4 hours require counter intervention.
- **Digital Responsibility Sign-Off**: Mandatory digital agreement binding students to gear liability before reservation voucher generation.
- **Technician Master Board**: Front-desk timeline monitoring occupancy, one-click checkout handovers, return condition logging, and maintenance lockouts.
- **Role Isolation & Unadvertised Privileged Surfaces**: Role-based access control with DOM exclusion; technician portals remain unlinked and protected by JWT session verification.

---

## 2. Technical Stack

| Layer | Technology | Specification / Version | Purpose |
|---|---|---|---|
| Framework | Next.js | 16.3.5 (App Router, Server Actions) | Fullstack architecture, React Server Components, zero API boilerplate |
| Runtime | Node.js | v20+ / v22 Alpine (Docker) | High-throughput asynchronous JavaScript runtime |
| UI Engine | React | 19.2.8 | Declarative component UI and optimistic state transitions |
| Styling | Tailwind CSS | v4 (via @tailwindcss/postcss) | High-performance utility CSS with zero runtime overhead |
| Icons | Lucide React | 1.46.0 | Scalable vector SVG icon assets (zero raw emojis) |
| Database | PostgreSQL | 16-Alpine | Relational persistence with ACID transactional integrity |
| ORM | Prisma ORM | 6.19.3 | Type-safe schema definitions, client migrations, and query generation |
| Validation | Zod | 4.6.5 | Runtime schema validation for mutations and DTOs |
| Security | Jose & BcryptJS | jose 6.2.12, bcryptjs 3.0.3 | JWT session cookie encryption and salted password hashing |
| Containerization | Docker & Compose | Multi-stage Dockerfile | Distroless-style standalone runner with healthcheck loops |

---

## 3. Architecture & Data Flow

```text
[ Client Viewport / Mobile & Desktop ]
               │
               ▼
[ Next.js App Router (Server Components & Server Actions) ]
        │                                  │
        ▼ (Session Guard)                  ▼ (Zod Validation)
[ Jose JWT Cookie Middleware ]     [ Domain Action Handlers ]
                                           │
                                           ▼ (ACID Transaction)
                                   [ Prisma ORM Client ]
                                           │
                                           ▼
                                   [ PostgreSQL 16 DB ]
```

### Request Flow & Domain Isolation
1. **Public & Student Surfaces (`/`, `/calendar`, `/my-bookings`, `/profile`)**:
   - Server-rendered schedules and student booking histories.
   - All technician URLs and admin controls are completely excluded from student markup.
2. **Technician Surface (`/technician`, `/technician/login`)**:
   - Access-controlled via Edge middleware checking encrypted `prism_session` JWT tokens.
   - Unauthorized attempts receive immediate redirection to the root portal without disclosing endpoint existence.
3. **Database Concurrency**:
   - Reservation creation runs inside `prisma.$transaction`.
   - Simultaneous requests competing for the same room or shared equipment package are resolved deterministically; losing transactions are rejected with conflict feedback.

---

## 4. Facilities & Equipment Inventory

### Production Studios
- **Studio A: Podcast Booth** (Slug: `studio-a`)
  - Capacity: 4 persons.
  - Specifications: Acoustically isolated broadcast recording suite designed for multi-mic panel podcasts and voiceover tracking.
- **Studio B: Green Screen VFX Bay** (Slug: `studio-b`)
  - Capacity: 6 persons.
  - Specifications: Full cyclorama wall facility optimized for narrative film shoots, green-screen compositing, and VFX motion capture.
- **Studio C: Product Photography Studio** (Slug: `studio-c`)
  - Capacity: 4 persons.
  - Specifications: Dedicated tabletop setup with continuous backdrops and overhead grid for commercial staging and stop-motion animation.

### Bundled Equipment Kits
- **Cinema Camera Kit** (Slug: `cinema-camera-kit`)
  - Contents: Cinema Camera Body, 35mm T1.5 Prime Lens, Heavy Duty Fluid Head Tripod, 2x 128GB CFast Cards, 2x V-Mount Batteries and Dual Charger.
- **Studio Lighting Strobe Kit** (Slug: `studio-lighting-strobe-kit`)
  - Contents: 2x 500W Studio Strobe Heads, 2x Quick-Fold Softboxes, 2x Heavy C-Stands with Grip Arms, Wireless Flash Trigger Transmitter, Translucent Diffusion Panel.
- **Audio Podcast Kit** (Slug: `audio-podcast-kit`)
  - Contents: 4x Shure Dynamic Broadcast Microphones, 4-Channel USB Audio Interface, 4x Broadcast Boom Arms with XLR Cables, 4x Closed-Back Studio Monitor Headphones.

---

## 5. Domain Rules & Business Constraints

1. **Operating Hours & Slot Blocks**:
   - Operating Schedule: Monday to Saturday, 08:00 to 20:00.
   - Fixed Slot Duration: 2-hour uniform intervals (`08:00-10:00`, `10:00-12:00`, `12:00-14:00`, `14:00-16:00`, `16:00-18:00`, `18:00-20:00`).
2. **Weekly Quota Enforcement**:
   - Each student is limited to a maximum of 4 confirmed booking hours per calendar week.
   - Any attempt to reserve a third 2-hour slot in the same week is blocked prior to database insertion.
3. **Equipment Kit Collision Guard**:
   - Equipment kits are shared assets across studios.
   - A kit cannot be assigned to two overlapping studio sessions, even if the requests target different physical rooms.
4. **Maintenance Lockout**:
   - Rooms toggled to `MAINTENANCE` status by technicians are excluded from student availability queries.
5. **Cancellation Cutoff**:
   - Self-service cancellation is permitted up to 4 hours before the session start time.
   - Within the 4-hour window, the cancellation action is locked, requiring direct in-person coordination with studio technicians.
6. **Return Inspection Workflow**:
   - Technicians log gear condition upon return: `GOOD_CONDITION`, `CONSUMABLES_REPLACED`, or `DAMAGE_FLAGGED`.
   - Flagging damage automatically locks the gear kit to `DAMAGED` status, removing it from booking availability until repaired.

---

## 6. Pre-Seeded Demonstration Accounts

| Role | Email | Password | Identifier | Details |
|---|---|---|---|---|
| Student Creator | `maya@prism.edu` | `password123` | Student ID: `STU-2026-0891` | Film and TV Production student; standard 4-hour quota profile. |
| Studio Technician | `roland@prism.edu` | `password123` | Staff ID: `TECH-001` | Counter 1 Gear Desk; Master Board and inspection clearance. |

*Note: The technician portal is located at `/technician/login` and is deliberately unadvertised on public navigation bars.*

---

## 7. Orchestration & Deployment

The repository ships with single-enter shell orchestrators paired with Docker Compose for zero-configuration startup.

### Single-Enter Production Deployment
```bash
./deploy.sh
```
This script executes the deployment sequence:
1. Validates or initializes `.env` from `.env.example`.
2. Builds the multi-stage Next.js standalone container.
3. Launches the PostgreSQL container and polls its healthcheck until operational.
4. Launches the Next.js production web container on port 3000.

### Redeployment & Remote Synchronization
```bash
./redeploy.sh
```
Pulls updates from the active branch, stops existing containers, and invokes `deploy.sh`.

### Verification Suite
```bash
./test.sh
```
Executes four sequential validation phases:
1. TypeScript compilation check (`tsc --noEmit`).
2. ESLint code standard audit (`npm run lint`).
3. Next.js standalone production build (`npm run build`).
4. Anti-pattern and domain rules integration test (`npx tsx tests/domain_rules.test.ts`).

---

## 8. Manual Local Development Setup

If running outside Docker containers:

### Prerequisites
- Node.js 20+ and npm
- PostgreSQL 16+ running locally or in Docker

### Installation & Initialization
```bash
# 1. Clone repository
git clone https://github.com/gtkrshnapublicarchive/prism-media-academy-studio-reservation-app.git
cd prism-media-academy-studio-reservation-app

# 2. Configure environment
cp .env.example .env

# 3. Install dependencies
npm install

# 4. Generate Prisma Client and push database schema
npx prisma db push

# 5. Populate initial studios, kits, and user credentials
npm run db:seed

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 9. Repository Structure

```text
├── Dockerfile                   # Multi-stage standalone Next.js image
├── docker-compose.yml           # Service orchestration (PostgreSQL 16 + Web app)
├── deploy.sh                    # Automated production deployment script
├── redeploy.sh                  # Automated redeploy and remote sync script
├── test.sh                      # Comprehensive verification and test runner
├── prisma/
│   ├── schema.prisma            # Relational database models and enums
│   └── seed.ts                  # Database seeder for studios, kits, and users
├── src/
│   ├── app/                     # Next.js App Router entrypoints
│   │   ├── calendar/            # Timetable grid and reservation booking modal
│   │   ├── login/               # Student credential login
│   │   ├── my-bookings/         # Student reservation vouchers and cancellation
│   │   ├── profile/             # Profile management and quota/metric views
│   │   ├── technician/          # Master Board and unadvertised staff desk
│   │   ├── layout.tsx           # Global layout with typography and metadata
│   │   └── page.tsx             # Public landing showcase and specs matrix
│   ├── core/                    # Infrastructure and database clients
│   │   └── database/prisma.ts   # Singleton Prisma client instance
│   ├── features/                # Semantic atomic domain feature modules
│   │   ├── auth/                # Actions, JWT sessions, and credential services
│   │   ├── bookings/            # Quota checks, timetable rendering, atomic mutations
│   │   ├── gearkits/            # Equipment bundle definitions
│   │   ├── inspections/         # Technician desk, condition logging, maintenance
│   │   ├── landing/             # Studio showcase and facility specifications
│   │   └── profile/             # Role-isolated metric aggregation
│   ├── shared/                  # Reusable UI primitives and layouts
│   └── middleware.ts            # Route protection and technician gatekeeper
├── tests/
│   └── domain_rules.test.ts     # 8-step integration test for business invariants
└── docs/
    └── prd.md                   # Product Requirements Document
```

---

## 10. Automated Domain Test Matrix

The integration test suite (`tests/domain_rules.test.ts`) programmatically tests the following invariants:
- **Test 1**: Successful reservation creation with attached gear package and voucher code generation.
- **Test 2**: Room double-booking collision guard blocking concurrent reservations for the same studio.
- **Test 3**: Gear kit collision guard preventing allocation of the same gear package across different rooms.
- **Test 4**: Weekly 4-hour quota guard rejecting bookings that exceed the weekly limit.
- **Test 5**: Studio maintenance lockout blocking bookings on rooms undergoing maintenance.
- **Test 6**: Gear return inspection workflow and status transition to `DAMAGED`.
- **Test 7**: Decoupled profile metrics preventing data leakage between student and technician roles.
- **Test 8**: Technician on-duty / off-duty shift toggle state machine validation.

---

## 11. Disclaimer

All branding, facilities, student personas, and institution names depicted in this project are entirely fictional and designed exclusively for academic and portfolio demonstration purposes.