# ChronosFlow — Predictive Capacity Analytics & Dynamic Guest Flow Orchestration Framework

> **"The Event Manager describes the event. The system designs, simulates, and orchestrates the operational plan."**

ChronosFlow (codenamed **ORCHESTRA**) is a multi-sided intelligence platform engineered for mega-event hospitality, crowd flow dynamics, and spatial capacity orchestration.

---

## 🏛️ Comprehensive Role-Driven Architecture

The platform provides tailored command dashboards for all four mega-event stakeholders:

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
                                    │
    ┌───────────────────────────────┴───────────────────────────────┐
    ▼                               ▼                               ▼
┌─────────────────────────┐   ┌─────────────────────────┐   ┌─────────────────────────┐
│ INFRASTRUCTURE MANAGER  │   │ SERVICE MANAGER         │   │ VISITOR COMPANION       │
│ • Registered Assets     │   │ • Service Capabilities  │   │ • Event Pass & Gate     │
│ • Host Pipeline         │   │ • Host RFPs & Quotas    │   │ • Pre-Planned Transit   │
│ • Request & Response    │   │ • Event Action Playbook │   │ • Live Queue Advisories │
│ dashboard-infra.html    │   │ dashboard-service.html  │   │ dashboard-visitor.html  │
└─────────────────────────┘   └─────────────────────────┘   └─────────────────────────┘
```

---

### 1. Home Page (`index.html`)
* **Interactive Stakeholder Switcher**: 1-Click tabs to instantly test any of the 4 personas (`Event Manager`, `Infrastructure Manager`, `Service Manager`, `Visitor`).
* **Minimal Dark Travel Aesthetic**: Warm obsidian (`#121316`), matte panels, sand ochre (`#d4a373`), terracotta (`#c96a54`), forest sage (`#709775`), and slate blue (`#607d8b`). Strictly zero neons.
* **Unified Navigation Hub**: Direct action buttons to Pre-Plans, Simulations, Current Events, Sign In, and Sign Up.

---

### 2. Sign In & Sign Up (`signin.html` & `signup.html`)
* **Role Selection**: Toggle between **Event Manager**, **Infrastructure Manager**, **Service Manager**, and **Visitor**.
* **1-Click Quick Demo Login Chips**: Instant 1-click test accounts for each role.
* **Smart Redirection**:
  * Event Manager $\rightarrow$ `preplans.html`
  * Infrastructure Manager $\rightarrow$ `dashboard-infra.html`
  * Service Manager $\rightarrow$ `dashboard-service.html`
  * Visitor $\rightarrow$ `dashboard-visitor.html`

---

### 3. Event Manager Suite (`preplans.html`, `simulations.html`, `current-events.html`)
* **Pre-Plans**:
  * **Top Section**: Existing baselines gallery (DY Patil Stadium Nerul, Wankhede Stadium, Narendra Modi Stadium, Eden Gardens, Wembley, Madison Square Garden).
  * **Bottom Section**: Full authoring workbench with natural language generator, 5km micro-area Digital Twin radar, alternating journey timeline, capacity bottleneck diagnostics, and 1-click mitigations.
  * **Save to Supabase**: Persists operational plans and spatial nodes directly to the cloud database.
* **Simulations**: Crowd variance tolerance slider (`-20%` to `+50%`), simulated clock, disruption scenario injectors (monsoon storm, rail freeze, gate jam, highway choke), and evacuation forecasting.
* **Current Events**: Live environmental and city telemetry (Weather, Crowd influx, Arterial traffic, Onsite medical readiness) with autonomous AI decision directives and 1-click field dispatch.

---

### 4. Infrastructure Manager Portal (`dashboard-infra.html`)
* **Data About Their Physical Assets**: Registered rail junctions (Nerul, Seawoods), arterial choke controls (LP Junction), and remote parking plazas (Wonders Park).
* **Which Event Manager is Ready to Host an Event (Host Pipeline)**:
  * Fixture: *4-Day Mega Cricket Championship at Dr. D.Y. Patil Stadium*
  * Host: *Vikram Sethi (Event Master Orchestrator, Sports Authority)*
  * Expected Attendance: *50,000 daily*
  * Infrastructure Demands: Rail clearance (24,000 pax/hr), Shuttle frequency (65 buses), Expressway choke management.
* **Incoming Requests & Responses from Event Hosts**:
  * *Request 1*: Allocate 65 feeder loop buses and 3 extra rakes at 22:00 $\rightarrow$ `[Approve & Reserve Capacity]`, `[Negotiate]`, `[Decline]`.
  * *Request 2*: LP Junction freight diversion for match express shuttles $\rightarrow$ `[Approve Green Corridor]`.

---

### 5. Service Manager Portal (`dashboard-service.html`)
* **What Kind of Services They Provide (Portfolio)**:
  * 🍔 *Infield Concessions & Beverage Kiosks* (45 satellite units, 15,000 servings/hr)
  * 🛡️ *Perimeter Security & Magnetometer Screening* (30 optical lanes, 19,500 pax/hr)
  * 🚑 *Tertiary Emergency Medical & ALS Triage* (12 ALS Ambulances, 4 mobile first-aid pods)
  * 🧹 *Infield Rapid Sanitation & Waste Disposal* (120 roaming crew members)
* **Request and Response of Services (Host RFPs)**:
  * *RFP 1 from DY Patil Event Manager*: Deploy 35 satellite grab-and-go concession kiosks across Sectors A to H $\rightarrow$ `[Accept Contract & Deploy Units]`, `[Decline]`.
  * *RFP 2*: Deploy 8 cooling misting tents with paramedics for heat index advisory $\rightarrow$ `[Accept & Confirm Staffing]`.
* **What Should Be Done in an Event (Execution Playbook)**:
  * *Ingress (10:00-13:00)*: Activate outer screening lanes; pre-chill hydration packs; position first-aid carts at Gate 4.
  * *Mid-Match (13:00-18:00)*: Concourse F&B queue balancing; continuous trash cycles; roving grab-and-go vendors.
  * *Inning Interval (18:00-18:45)*: Replenish ice & electrolyte stock; deploy grab-and-go hawkers into stand aisles.
  * *Egress Dispersal (21:30-23:00)*: Open all perimeter exit gates; deploy paramedical standby to railway approach corridor.

---

### 6. Visitor / Spectator Companion (`dashboard-visitor.html`)
* **Details About Their Event**:
  * Event: *Championship Trophy: 4-Day Mega Cricket Fixture*
  * Venue: *Dr. D.Y. Patil Sports Stadium, Sector 7, Nerul, Navi Mumbai*
  * Gate & Seat: *Gate 4 (West Wing) &bull; Stand C, Row 14, Seat 48*
  * Verified Pass Code: `TKT-DYP-2026-94812`
* **The Pre-Plans Decided for Them (Arrival & Logistics)**:
  * 🚆 *Recommended Transit*: Board Harbour Line Local departing CSMT/Kurla at 10:48 AM $\rightarrow$ Arrive Nerul Station at 11:32 AM.
  * 🚶 *Designated Walking Corridor*: Shaded 1.8km pedestrian green corridor from Nerul East bypass to Gate 4 (18 min walk) or free NMMT Event Shuttle from Depot Bay 2.
  * 🏨 *Accommodation Plan*: Room block at *Nerul Sector 21 Hotel Cluster* (1.4 km from stadium).
  * 🚗 *Parking Rule*: Infield stadium parking is 100% pass-restricted; private cars must park at Wonders Park Overflow Plaza.
  * 🎒 *Bag Policy*: Transparent bags only; power banks allowed; free hydration pods inside.
* **The Current Plans Decided for Them (Live Day-of-Event Updates)**:
  * ⏱️ *Gate 4 Live Queue Wait Time*: 4 Mins (Optimal Flow — Green).
  * 🌤️ *Current Stadium Weather*: 31.4°C &bull; Humid &bull; Heat Index Active. Misting fans active at concourse Gate 4.
  * 📢 *Live Dynamic Advisory*: "Gate 4 attendees are advised to use the Seawoods Shuttle Loop upon match exit at 21:45 for faster rail connection."

---

## 🗄️ Supabase Cloud Integration

* **Project ID**: `rojjfjoquejjxuziriei`
* **Project URL**: `https://rojjfjoquejjxuziriei.supabase.co`
* **SQL Schema Script**: [`supabase_schema.sql`](supabase_schema.sql)
  * Tables: `profiles`, `events`, `spatial_assets`, `event_stages`, `stage_mitigations`, `simulations`, `live_telemetry`, `live_decisions`, `infra_requests`, `service_requests`, `visitor_itineraries`.
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
