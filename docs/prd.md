> **FICTIONAL CONTENT DISCLAIMER**
> Everything in this document is entirely fictional and used solely as a case study / template example. This includes, but is not limited to: the brand name ("Prism Media Academy"), the location/address ("14 Lumina Way, Aurelia City"), all names of people (students, studio technicians, personas), and the currency ("Aurum" / AUR). None of these refer to any real business, real place, real person, or real currency. Any resemblance to actual entities is purely coincidental.

---

### Category: Media Studio and Equipment Reservation

# Product Requirements Document (PRD)
## Studio & Equipment Reservation App: Prism Media Academy

**Category:** Media Studio and Equipment Reservation
**Document Version:** 1.0
**Status:** Draft
**Date:** September 12, 2026
**Product Type:** Dedicated internal studio and gear booking application for a single media academy (not a SaaS/multi-tenant product)

---

## 1. Overview

### 1.1 Academy Identity (Fictional Case Study)
This document is authored for the creative media production facility of **Prism Media Academy**, a fictional film and digital arts college:

| Attribute | Detail |
|---|---|
| Academy Name | Prism Media Academy |
| Location | 14 Lumina Way, Aurelia City (fictional) |
| Media Studios | 3 production studios (Studio A: Podcast Booth, Studio B: Green Screen VFX Bay, Studio C: Product Photography Studio) |
| Operating Hours | Monday - Saturday, 08:00 - 20:00 (local time) |
| Active Staff Count | 2 shift studio technicians + 1 laboratory director |
| Currency | Aurum (AUR), used for studio consumable fees and equipment safety deposits |

### 1.2 Product Name
Prism Studio & Gear Reservation System: an internal production facility booking application built exclusively for academy students and lab technicians.

### 1.3 Important Note: Not a SaaS Product
This application is **not a multi-tenant rental management SaaS product** intended for commercial camera rental houses. It is designed **specifically for Prism Media Academy**:
- Single-tenant architecture with hardcoded studio rooms and academy gear inventories.
- Student authentication is tied directly to student ID numbers and academy credentials.
- No commercial checkout, subscription billing, or multi-campus configurations are implemented.
- The interface adheres strictly to Prism Media Academy brand standards.

### 1.4 Background
Prism Media Academy provides high-value media studios and camera gear for student coursework. Studio reservations are currently tracked through a physical whiteboard and paper equipment check-out binders, resulting in:
- Scheduling clashes where two student production crews arrive for the Green Screen Bay simultaneously.
- Unmonitored equipment checkout where lenses and wireless microphones return late or damaged without accountability.
- High no-show rates where students book 3-hour studio blocks and fail to show up, preventing other students from completing assignments.
- Technicians spending significant workshop time hunting for equipment status.

### 1.5 Goals
- Enable students to view daily studio availability and reserve 2-hour production time slots online.
- Allow students to attach bundled equipment kits (Cinema Camera Kit, Studio Strobe Kit, Podcast Microphone Set) to their studio bookings.
- Require an in-app digital equipment safety agreement before reservation confirmation.
- Provide studio technicians with a live check-in and gear inspection dashboard to log equipment return condition.

### 1.6 Non-Goals
- This application does NOT include external public gear rental or payment gateway processing; equipment is reserved free for enrolled students with counter verification.
- This application does NOT include remote live video streaming or digital media file uploads.
- This application does NOT manage course grading or classroom lecture scheduling.

---

## 2. Problem Statement

### 2.1 Problems to Solve
- Students cannot confirm studio and equipment availability before traveling to campus.
- Lack of equipment bundled tracking leads to reserved studios lacking required lenses or lighting units.
- Technicians lack a rapid digital mechanism to mark equipment as "Under Repair" or inspect return condition.
- Abandoned studio bookings waste up to 25% of weekly production capacity during midterm project weeks.

### 2.2 Supporting Insights
- Studio demand peaks in afternoons (13:00 - 19:00) leading up to portfolio submission deadlines.
- Studio B (Green Screen VFX Bay) is the most contested facility with over 90% occupancy requests.

---

## 3. Target Users & Personas

### 3.1 User Roles
This application serves **two core user roles**:

| Role | Description |
|---|---|
| Student Creator | An enrolled media student reserving studio spaces and production equipment kits |
| Studio Technician / Admin | A laboratory staff member overseeing equipment checkout, returns, and studio room status |

### 3.2 Personas

**Persona 1 (Student Creator): Maya, 22, Film Production Student**
- Directing a short video project requiring Studio B (Green Screen) and a Cinema Camera Kit.
- Needs to reserve a Friday afternoon 2-hour slot 3 days in advance to coordinate with her actors.
- Uses her laptop on campus to submit reservations and verify equipment package items.

**Persona 2 (Studio Technician): Roland, 28, Shift Lab Technician**
- Responsible for inspecting returning camera sensors, lenses, and lighting cables behind the gear counter.
- Needs an instant daily dashboard showing who is inside which studio and what gear kits are checked out.
- Needs rapid single-click actions to log gear return condition and flag damaged items for maintenance.

### 3.3 Key Use Cases
- Student Creator: Check studio calendar availability, select studio room and bundled gear kit, sign safety agreement, cancel booking.
- Studio Technician: View daily studio occupancy timeline, execute check-out handover, log check-in return condition, toggle studio maintenance mode.

---

## 4. Success Metrics

| Metric | Target | Measurement Method |
|---|---|---|
| Studio Conflict Rate | 0 double-booking occurrences | Database scheduling log audit |
| Gear Return Accountability | 100% of equipment kit returns logged with inspection notes | Technician check-in log verification |
| Unattended Studio Rate | Reduced below 8% of total bookings | Count of reservations marked "No-Show" |
| Check-out Handover Time | Under 45 seconds per student crew | Front counter time tracking survey |

---

## 5. Requirements / Specifications

### 5.1 Functional Requirements for Student Creators

1. **Authentication & Student Credentials**
   - Students authenticate with student email and student ID number.
   - Profile displays current active reservations and semester quota status (max 4 hours of studio time per week).

2. **Studio Availability Browser**
   - Interactive schedule calendar displaying the 3 studios (Studio A, Studio B, Studio C) across daily 2-hour operational blocks (08:00 - 10:00, 10:00 - 12:00, 12:00 - 14:00, 14:00 - 16:00, 16:00 - 18:00, 18:00 - 20:00).
   - Real-time status indicators: Available, Reserved, Maintenance.

3. **Studio & Gear Kit Booking**
   - Student selects target studio, date, and 2-hour time block.
   - Student selects optional bundled equipment kit:
     - Kit 1: Cinema Camera Kit (Camera Body, 35mm Prime Lens, Tripod).
     - Kit 2: Studio Lighting Strobe Kit (2 Softbox Strobes, Light Stands, Diffuser).
     - Kit 3: Audio Podcast Kit (4 Shure Microphones, Multi-channel Audio Interface, 4 Headphones).
   - Student enters Project Title and Crew Size (1 to 6 persons).
   - Mandatory digital checkbox agreement: "I confirm responsibility for equipment care and understand late return penalties."
   - System executes transactional validation and issues a Studio Reservation Voucher.

4. **Self-Service Cancellation**
   - Students can cancel reservations up to 4 hours before the scheduled session start time.
   - Cancellations made less than 4 hours prior are blocked and must be handled in person by technicians.

### 5.2 Functional Requirements for Studio Technicians / Admin

1. **Technician Authentication**
   - Technicians log in through `/technician/login` with staff role authorization.

2. **Daily Studio Master Timeline**
   - Grid view mapping Studio A, Studio B, and Studio C against daily time blocks.
   - Color-coded state indicators: Vacant, Booked, Checked-Out, Returned/Inspected, Cancelled, Maintenance.
   - Hover and click drawer revealing student name, student ID, project title, and attached gear kit details.

3. **Check-out & Return Logging**
   - Technician clicks "Check-Out" when student crew arrives and hands over the gear kit.
   - Technician clicks "Log Return" upon completion: opens an inspection modal with status options (`Good Condition`, `Consumables Replaced`, `Damage Flagged`).
   - If `Damage Flagged`: technician enters a text incident description and marks the gear kit as unavailable for subsequent bookings.

4. **Studio Maintenance Lockout**
   - Technicians can toggle any studio room into `Maintenance` mode for repainting cyclorama walls or soundproofing repairs.

### 5.3 Non-Functional Requirements

| Category | Requirement |
|---|---|
| Performance | Studio schedule grid renders in under 1.2 seconds |
| Concurrency Control | Row-level locking on studio-slot records prevents concurrent double-booking of physical rooms |
| Data Integrity | Equipment inspection notes and damage flags permanently preserved in audit logs |
| Compatibility | Responsive layout optimized for student mobile browsers and technician front desk widescreen monitors |
| Availability | 99.5% uptime during academy operational hours (08:00 - 20:00) |

### 5.4 Technology Stack Specification

| Layer / Component | Technology Choice | Version / Tooling | Architectural Rationale |
|---|---|---|---|
| Fullstack Framework | Next.js | Latest stable version when project is created (App Router) | Server Components for instant timetable rendering; Server Actions for atomic room/gear mutations. |
| Language & Runtime | TypeScript / Node.js | Latest stable version when project is created (Node.js LTS) | Static typing linking studio models, kit relationships, and inspection forms. |
| UI & Styling Engine | Tailwind CSS | Latest stable version when project is created | Clean visual studio cards with equipment badges and dark-room operational aesthetics. |
| Relational Database | PostgreSQL | Latest stable version when project is created (Alpine image) | ACID transaction safety preventing double-booking of both physical studios and shared gear kits. |
| ORM & Data Layer | Prisma ORM | Latest stable version when project is created | Type-safe migrations, relational models between Studios, Bookings, GearKits, and Inspections. |
| Containerization | Docker & Docker Compose | Latest stable version when project is created | Multi-stage Docker container pairing Next.js web application with PostgreSQL container. |
| Validation & Contracts | Zod | Latest stable version when project is created | Schema validation on time-slot boundaries, weekly quota limits, and inspection payloads. |
| Authentication | NextAuth.js / Auth.js | Latest stable version when project is created | Student credentials vs Technician credentials with isolated session lifetimes. |

#### Architectural Decisions
- **Fullstack Next.js Monolith:** Integrates student booking UI and technician counter tooling in one application without maintaining separate REST services.
- **Atomic Room-and-Kit Transaction:** Booking submissions run in a Prisma transaction that locks both the studio time-slot and the specific gear kit inventory, preventing gear conflicts across rooms.

---

## 6. Access Control & Permission Matrix

### 6.1 Page Access Matrix

| Page / Feature | Guest (Unauthenticated) | Student Creator | Studio Technician / Admin |
|---|---|---|---|
| Studio Info & Guidelines | [Allowed] Visible | [Allowed] Visible | [Denied] Redirected to Tech Console |
| Studio Schedule Grid | [Allowed] View Only | [Allowed] View & Book | [Denied] Handled via Tech Master Board |
| Studio Booking Checkout | [Denied] Redirects to Login | [Allowed] Full Access | [Denied] Handled via Manual Override |
| My Studio Bookings | [Denied] Redirects to Login | [Allowed] Own Records Only | [Denied] Techs use Master Board |
| Technician Master Board | [Denied] Excluded from DOM | [Denied] Excluded from DOM | [Allowed] Full Access |
| Gear Return & Inspection | [Denied] Excluded from DOM | [Denied] Excluded from DOM | [Allowed] Full Access |
| Studio Maintenance Lockout | [Denied] Excluded from DOM | [Denied] Excluded from DOM | [Allowed] Full Access |

### 6.2 Mandatory Principles
- **DOM Exclusion:** Links to technician management tools and inspection interfaces are completely excluded from the Student DOM.
- **Zero Normal Access-Denied Loops:** Normal student browsing never leads to access-denied barriers; direct URL manipulation triggers an immediate redirect.
- **Two-Layer Validation:** Every reservation mutation validates session roles on both the client navigation and backend Server Actions.
- **Anti-IDOR Protection:** Students can view and cancel only their own bookings; accessing foreign reservation IDs returns a 404 response.
- **Zero Privileged Entry Point Exposure:** Under no circumstances may student booking pages, public studio guides, footers, headers, or metadata advertise, link, or signpost privileged routes (such as technician login, inventory desks, or maintenance overrides). Technician management surfaces must remain unadvertised and accessible only via direct, unlinked URLs.

### 6.3 Acceptance Criteria Related to Access
- Unauthorized visitors or students attempting to load `/technician/*` routes are intercepted and returned a generic 404 Not Found or redirected to the public portal without disclosing technician route existence or login paths.
- Inspection notes and maintenance lockouts can only be written by authenticated Technician sessions.

---

## 7. User Flow (Text Description)

### 7.1 Student Flow: Booking a Studio and Equipment Kit
1. Student accesses the Prism Studio Reservation portal.
2. Student logs in with their student ID and credentials.
3. Student navigates to "Reserve Studio" and selects a date.
4. Student reviews the 3 studio columns and clicks an "Available" 2-hour slot on Studio B (Green Screen).
5. Student selects `Cinema Camera Kit` from the equipment add-on list.
6. Student enters Project Title ("Final Year Capstone Short") and crew headcount (3).
7. Student checks the mandatory digital equipment responsibility checkbox.
8. System initiates database transaction: validates slot availability, gear kit availability, and student weekly 4-hour quota.
9. If valid: reservation is confirmed with status `Booked`, and a digital booking voucher is generated.
10. If conflicted: student is notified of the conflicting room or gear kit and prompted to re-select.

### 7.2 Student Flow: Cancelling a Studio Session
1. Student logs in and navigates to "My Bookings".
2. Student clicks "Cancel Session" on an upcoming reservation.
3. System verifies that current time is at least 4 hours before the scheduled start time.
4. If valid: booking is marked `Cancelled`, releasing the studio and gear kit immediately for other students.
5. If under 4 hours: cancellation is disallowed and student is instructed to speak with lab technicians.

### 7.3 Technician Flow: Gear Handover and Return Inspection
1. Technician logs into the Master Timeline at the equipment desk.
2. Arriving student crew presents their student ID and reservation voucher.
3. Technician clicks "Check-Out", verifies gear kit serials, and hands over equipment.
4. When student returns gear after session: technician clicks "Log Return".
5. Technician opens inspection modal, inspects camera lens and studio cables, and selects "Good Condition".
6. Technician clicks "Confirm Return", marking the session `Completed` and releasing gear for the next session.

---

## 8. Prohibited Flows / Anti-Patterns

1. **Exceeding Weekly Quota:** A student attempting to book more than 4 hours of studio time in a single calendar week is blocked.
2. **Post-Deadline Cancellation:** A student attempting to cancel less than 4 hours before session start is rejected.
3. **Double Kit Allocation:** A single gear kit being checked out to two different studios during overlapping hours is strictly prohibited.
4. **Maintenance Override:** Students attempting to book studios marked `Maintenance` is blocked at query level.
5. **Public Signposting of Technician/Admin Portals:** Under no circumstances may public academy pages, student reservation interfaces, navigation headers, footers, or metadata display links, buttons, hints, or references to "Technician Login", "Equipment Desk", or "Admin Console". Privileged media management consoles must remain entirely unadvertised to students and accessible solely via unlinked direct URLs.

---

## 9. Scope

### 9.1 In-Scope (Version 1 / MVP)
- Studio schedule grid for 3 media studios across daily 08:00 - 20:00 hours in 2-hour increments.
- Equipment kit bundle selection linked directly to studio bookings.
- Student weekly quota enforcement (max 4 hours per week).
- Digital responsibility agreement checkbox.
- Technician Master Timeline with Check-Out and Return Inspection logging.
- Local Docker container orchestration with PostgreSQL.

### 9.2 Out-of-Scope (Future Versions)
- Individual piece-by-piece equipment checkout (bundled kits used in v1).
- Automated barcode scanner integration.
- Damage fine billing and online payment processing.
- External non-student public bookings.

---

## 10. Dependencies & Constraints

### 10.1 Dependencies
- Pre-seeded studio records (Studio A, Studio B, Studio C) and gear kit packages.
- Student ID directory for credential verification.

### 10.2 Constraints
- Single campus facility; operating hours fixed at Monday - Saturday, 08:00 - 20:00.
- Mandatory 2-hour fixed block allocation per reservation.

---

## 11. Development Phases (Sequential, Not Time-Boxed)

| Order | Phase | Description | Completion Criteria |
|---|---|---|---|
| Phase 1 | Schema & Relational Models | Define Prisma models for Studios, GearKits, Bookings, and Inspections with seed data | PostgreSQL database populates with 3 studios and standard gear kits |
| Phase 2 | Student Auth & Quota Guard | Configure NextAuth.js and build weekly 4-hour quota calculation logic | System restricts students exceeding 4 hours of bookings per week |
| Phase 3 | Studio Schedule & Booking Engine | Construct interactive 3-studio calendar with gear kit selection and atomic booking | Students can select room, kit, sign agreement, and receive booking voucher |
| Phase 4 | Cancellation & Quota Release | Implement self-service cancellation with strict 4-hour deadline verification | Cancelled sessions release studio slot and restore student weekly quota |
| Phase 5 | Technician Console & Inspection | Build desk Master Timeline with gear checkout and condition inspection modal | Technicians can log gear condition and flag damaged items |
| Phase 6 | Orchestration & Load Testing | Package Docker Compose configuration and write concurrency test suites | Clean deployment via single enter command passing all double-booking tests |

---

## 12. Risks & Open Questions

### 12.1 Risks
- **Simultaneous Gear Contention:** Multiple students booking different studios wanting the same single camera kit. *Mitigation:* Transactional database checks locking both studio slot and gear kit inventory.
- **Unreported Gear Damage:** Students returning gear without reporting broken items. *Mitigation:* Mandatory technician inspection sign-off before session can be closed.

### 12.2 Open Questions
- Should students receive an automated warning strike on their account if marked as a no-show? (Deferred to faculty policy review).

---

## 13. Stakeholders

| Role | Responsibility |
|---|---|
| Faculty Director | Sets studio operational policies, weekly quotas, and safety guidelines |
| Fullstack Engineer | Develops Next.js application, Prisma schema, and technician tooling |
| QA Engineer | Authors concurrency tests for studio-and-kit transactions |
| Head Studio Technician | Validates equipment kit definitions and counter check-out workflows |
