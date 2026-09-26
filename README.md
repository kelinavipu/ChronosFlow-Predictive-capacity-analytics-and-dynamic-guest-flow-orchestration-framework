# ChronosFlow — Predictive Capacity Analytics & Dynamic Guest Flow Orchestration Framework

> **"The Event Manager describes the event. The system designs, simulates, and orchestrates the operational plan."**

ChronosFlow (codenamed **ORCHESTRA**) is a comprehensive multi-phase intelligence platform engineered for mega-event hospitality, crowd flow dynamics, and spatial capacity orchestration.

---

## 🏛️ Comprehensive Multi-Page Platform Architecture

The system has been completely restructured into an individual multi-page web platform featuring role-based portals and cloud database synchronization:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        CHRONOSFLOW COMPLETE PLATFORM MAP                               │
└───────────────────────────────────┬────────────────────────────────────────────────────┘
                                    │
    ┌──────────────┬────────────────┼────────────────┬────────────────┬──────────────┐
    ▼              ▼                ▼                ▼                ▼              ▼
┌────────┐   ┌───────────┐    ┌───────────┐    ┌───────────┐    ┌───────────┐   ┌────────┐
│ HOME   │   │ SIGN IN   │    │ SIGN UP   │    │PRE-PLANS  │    │SIMULATIONS│   │ LIVE   │
│ PAGE   │   │ (4 Roles) │    │ (4 Roles) │    │(Baselines+│    │(Stress-   │   │ CURRENT│
│        │   │           │    │           │    │ Add New)  │    │ Testing)  │   │ EVENTS │
│index.  │   │signin.    │    │signup.    │    │preplans.  │    │simulations│   │current-│
│html    │   │html       │    │html       │    │html       │    │.html      │   │events. │
└────────┘   └───────────┘    └───────────┘    └───────────┘    └───────────┘   └────────┘
```

### 1. Home Page (`index.html`)
* **Minimal Dark Travel Aesthetic**: Warm obsidian (`#121316`), matte panels, sand ochre (`#d4a373`), terracotta (`#c96a54`), forest sage (`#709775`), and slate blue (`#607d8b`). Strictly zero neons.
* **Unified Navigation Hub**: Direct action buttons to Pre-Plans, Simulations, Current Events, Sign In, and Sign Up.
* **4 Role Portals**:
  1. 🎪 **Event Manager**: Operational blueprints, capacity matching, digital twins, baseline risk locking.
  2. 🎟️ **Visitor / Spectator**: Real-time turnstile wait times, transit corridors, and hotel inventory.
  3. 🛎️ **Service Provider**: Concessions, catering pods, medical trauma staffing, volunteer distribution.
  4. 🚆 **Infra Provider**: Railway frequencies, parking bay allocations, expressway diversions, shuttle fleets.

### 2. Role-Based Sign In & Sign Up (`signin.html` & `signup.html`)
* Role tabs for all 4 personas with customized onboarding fields.
* 1-Click instant demo logins for each role.
* Integrated with Supabase Auth & session manager.

### 3. Pre-Plans: Existing Gallery & Authoring Workbench (`preplans.html`)
* **Top Section (Existing Pre-Plans)**:
  * Live gallery of existing pre-plans fetched from Supabase Cloud:
    * *Dr. D.Y. Patil Sports Stadium (Nerul, Navi Mumbai)* — 50,000 spectators daily.
    * *Wankhede Stadium (South Mumbai)* — 33,000 spectators daily.
    * *Narendra Modi Stadium (Motera, Ahmedabad)* — 100,000 spectators daily.
    * *Eden Gardens (Kolkata)*, *Wembley Stadium (London)*, *Madison Square Garden (NYC)*.
  * Search, status filters (Baseline Locked vs. In Planning), and 1-click "Load into Radar Workspace".
* **Bottom Section (Add New Pre-Plan)**:
  * Natural language event prompt bar with procedural twin generator for any city worldwide.
  * **Alternating Event Journey Timeline**: Top/bottom alternating nodes with vertical stems.
  * **Micro-Area Digital Twin & Infrastructure Radar**: 1km–5km concentric rings directly below the timeline with interactive pins for Hotels, Railway Stations, Hospitals, Parking Bays, and Choke Points.
  * **Stage Capacity Inspector**: Mathematical bottleneck formulas and deficit calculations.
  * **Categorized Proactive Mitigations**: 1-click interventions across Capacity, Time, Spatial, Transportation, Accommodation, and Safety.
  * **"Save Plan to Supabase"** button: Directly persists the plan to the Supabase database.

### 4. Simulations & Crowd Dynamics (`simulations.html`)
* Crowd surge variance tolerance slider (**-20% to +50%**).
* Interactive simulated match clock and multi-wave ingress/egress pacing.
* **What-If Disruption Scenario Injector**:
  * 🌧️ Monsoon Deluge / Rain Storm
  * 🚆 Harbour Line Transit Failure (Nerul Station Choke)
  * 🚧 Gate Turnstile Jam (Gate B Scanner Failure)
  * 🚗 Arterial Expressway Gridlock (LP Junction Bottleneck)
* Real-time node saturation gauges and evacuation clearance time forecaster.

### 5. Current Events & Live AI Dispatch (`current-events.html`)
* Day-of-Event Real-Time Operational Cockpit:
  * **Weather Telemetry**: Temperature, humidity, precipitation probability, heat index alert.
  * **Crowd Influx Feed**: Live turnstile counts, ingress velocity (pax/min), bowl occupancy.
  * **Arterial Traffic Flow**: Sion-Panvel Expressway congestion index, Nerul rail frequency.
  * **Emergency & Medical Readiness**: Onsite trauma proximity, parking lot saturation.
* **Automated AI Decision Engine**: Continuously evaluates correlated live factors to synthesize actionable operational directives.
* **1-Click "Authorize & Dispatch"**: Pushes live decisions to the field log and Supabase `live_decisions` table.

---

## 🗄️ Supabase Cloud Integration

* **Project ID**: `rojjfjoquejjxuziriei`
* **Project URL**: `https://rojjfjoquejjxuziriei.supabase.co`
* **SQL Schema Script**: [`supabase_schema.sql`](supabase_schema.sql)
  * Contains complete tables: `profiles`, `events`, `spatial_assets`, `event_stages`, `stage_mitigations`, `simulations`, `live_telemetry`, `live_decisions`.
  * Pre-configured Row Level Security (RLS) policies and seed data for DY Patil Stadium.

---

## 🚀 How to Run

### Direct Browser Launch (Zero Dependencies)
Simply open [`index.html`](index.html) in any web browser.

### Local Python Server
```bash
python server.py
```
Starts a local web server at `http://localhost:8000` and automatically launches your browser.

---

## 👥 Credits

Developed by **Team 8** for Mega-Event Hospitality & Dynamic Crowd Flow Orchestration.
