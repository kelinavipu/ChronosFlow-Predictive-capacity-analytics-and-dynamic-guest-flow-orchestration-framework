# ChronosFlow — Predictive Capacity Analytics & Dynamic Guest Flow Orchestration Framework

> **"The Event Manager describes the event. The system designs, simulates, and orchestrates the operational plan."**

ChronosFlow (codenamed **ORCHESTRA**) is a multi-sided intelligence platform engineered for mega-event hospitality, crowd flow dynamics, and spatial capacity orchestration.

---

## 🏗️ IEEE/ACM 5-Level System Architecture

ChronosFlow operates on a high-legibility 5-Layer closed-loop predictive engine:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LEVEL 1: DATA INGESTION FEEDS & SCENARIO SHOCKS                                       │
│ [1.1 Accommodation] ➔ [1.2 Transport Feed] ➔ [1.3 Movement Feed] ➔ [1.4 Venue GIS] ➔ [1.5 What-If]
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ Assimilated Live State Vector (60s Calibration)
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LEVEL 2: DIGITAL TWIN & SIMULATION ENGINE                                             │
│ [2.1 State Sync Engine] ➔ [2.2 Predictive Sim Engine] ➔ [2.3 Timeline Repository]      │
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ Simulated Trajectories & Bottleneck Pulses
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LEVEL 3: DECISION INTELLIGENCE PIPELINE                                                │
│ [STAGE 1: DIAGNOSE (3.1➔3.2)] ➔ [STAGE 2: SOLVE (3.3➔3.4)] ➔ [STAGE 3: VALIDATE (3.5➔3.6)]│
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ Validated Mitigation Strategy & Expiry Window τ_valid
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LEVEL 4: ORCHESTRATION, API & DISPATCH GATEWAY                                         │
│ [4.0 API Gateway & Sync] ➔ [4.1 LLM Order Writer] ➔ [4.2 Partner RFP] ➔ [4.3 Attendee Push]
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │ Multi-Role Action Dispatch
                                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LEVEL 5: MULTI-ROLE APPLICATIONS & CLOSED-LOOP LEARNING                                │
│ [5.1 Event Master] | [5.2 Infra Command] | [5.3 Service Lead] | [5.4 Visitor App] ➔ [5.6 Retune]
└──────────────────────────────────────────┬─────────────────────────────────────────────┘
                                           │
  ⟵ ⟵ ⟵ CLOSED-LOOP TELEMETRY FEEDBACK PATH (5.6 Retune ➔ 2.1 State Sync) ⟵ ⟵ ⟵
```

---

## 🏛️ Complete Role-Driven Platform Map

The platform provides role-gated command dashboards guarded by strict Role-Based Access Control (RBAC):

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CHRONOSFLOW COMPLETE PLATFORM MAP                               │
└───────────────────────────────────┬────────────────────────────────────────────────────┘
                                    │
    ┌──────────────┬────────────────┼────────────────┬────────────────┬──────────────┐
    ▼              ▼                ▼                ▼                ▼              ▼
┌────────┐   ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐   ┌────────┐
│ HOME / │   │ PRE-PLANS │    │SIMULATIONS│    │ LIVE      │    │ GEOJSON   │   │ VISITOR│
│ AUTH   │   │ (Authoring│    │ (Stress-  │    │ CURRENT   │    │ MAPPER    │   │ PASS   │
│ index. │   │ Workbench)│    │ Testing)  │    │ EVENTS    │    │ geojson-  │   │ visitor│
│ html   │   │preplans.  │    │simulations│    │current-   │    │ mapper.   │   │ -app.  │
│        │   │html       │    │.html      │    │events.html│    │html       │   │html    │
└────────┘   └───────────┘    └───────────┘    └───────────┘    └───────────┘   └────────┘
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                               ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│ INFRASTRUCTURE MANAGER  │   │ SERVICE MANAGER         │   │ VISITOR COMPANION       │
│ • Host Pipeline         │   │ • Service Capabilities  │   │ • Optical Pass Scanner  │
│ • Requests & Conflicts  │   │ • Host RFPs & Bidding   │   │ • Smart Ticket & Detours│
│ • Asset Allocation      │   │ • Action Playbooks      │   │ • Live Telemetry GPS    │
│ dashboard-infra.html    │   │ dashboard-service.html  │   │ dashboard-visitor.html  │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

---

## 🔐 Role-Based Access Control (RBAC) Matrix

Every page enforces page guards via `window.ChronosSupabase.requireRole()`:

| Role | Permitted Pages / Features | Persona |
| :--- | :--- | :--- |
| **Event Manager** (`event_manager`) | `preplans.html`, `simulations.html`, `current-events.html`, `geojson-mapper.html` | Alicia Stone |
| **Infra Provider** (`infra_provider`) | `dashboard-infra.html`, `geojson-mapper.html` | Srinivasan R. |
| **Service Provider** (`service_provider`) | `dashboard-service.html` | Harry Vance |
| **Visitor / Spectator** (`visitor`) | `dashboard-visitor.html`, `visitor-app.html` | George Miller |

---

## 🌟 Key Platform Capabilities

### 1. Landing Hub & Dynamic Authentication (`index.html`)
* **1-Click Demo Login Chips**: Instant switching between all 4 role personas.
* **Session Isolation**: `sessionStorage` session caching allows multi-profile testing across different browser tabs simultaneously on a single device.
* **Unified RBAC Router**: Automatic redirection to designated command centers upon authentication.

### 2. Event Manager Workbench (`preplans.html`, `simulations.html`, `current-events.html`)
* **Spatial Pre-Plans**: Baseline gallery (DY Patil Stadium, Wankhede, Narendra Modi Stadium, Eden Gardens, Madison Square Garden) with natural language plan generation and 5km spatial twin radar.
* **Simulations Engine**: Disruption injectors (monsoon storms, rail freezes, gate jams, highway chokes) with crowd variance tolerance sliders (`-20%` to `+50%`).
* **Current Events Command**: Real-time environmental/crowd influx telemetry with automated decision directives and field dispatch.

### 3. Spatial Digital Twin Mapper (`geojson-mapper.html`)
* Interactive GeoJSON spatial mapping tool for drawing stadium gates, pedestrian corridors, shuttle transit loops, and emergency egress zones.

### 4. Infrastructure Command (`dashboard-infra.html`)
* **Host Requests & Time Conflicts**: Default landing interface for accepting, negotiating, or declining event host requests (e.g. 65 feeder loop buses, LP Junction green corridors).
* **Live Toast Alerts**: Real-time polling notifications when new host RFPs arrive.

### 5. Service Command (`dashboard-service.html`)
* Concession kiosk quotas, perimeter screening lanes, ALS medical triage, and infield rapid sanitation contracts with dynamic RFP acceptance.

### 6. Visitor Pass & Companion (`visitor-app.html` & `dashboard-visitor.html`)
* **Optical Pass Scanner**: Instant camera/file scanner for event passes (`dypatil_nerul`, `narendra_modi`), loading verified smart ticket itineraries, transit routing, and gate detour advisories.

---

## ⚡ Real-Time Multi-Window Sync Engine (`server.py`)

`server.py` features a built-in REST API sync engine operating on `http://localhost:8000`:
* **`GET /api/sync`**: Fetches global shared application state (`chronos_infra_requests`, `chronos_service_rfps`, live telemetry).
* **`POST /api/sync`**: Writes state updates from any tab and broadcasts them to normal and incognito browser windows instantly.

---

## 🗄️ Supabase Cloud Database

* **Project URL**: `https://rojjfjoquejjxuziriei.supabase.co`
* **Schema File**: [`supabase_schema.sql`](supabase_schema.sql)
  * Database Tables: `profiles`, `events`, `spatial_assets`, `event_stages`, `stage_mitigations`, `simulations`, `live_telemetry`, `live_decisions`, `infra_requests`, `service_requests`, `visitor_itineraries`.
  * Pre-configured Row-Level Security (RLS) policies and seed data for DY Patil Sports Stadium.

---

## 🚀 How to Run

### Local Python Server (Recommended)
```bash
python server.py
```
Launches `http://localhost:8000` with full `/api/sync` cross-tab and cross-incognito synchronization enabled.

### Direct Browser Launch
Open [`index.html`](index.html) in any modern web browser.

---

## 👥 Credits

Developed by **Team 8** for Predictive Capacity Analytics & Dynamic Guest Flow Orchestration.
