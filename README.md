# ChronosFlow — Predictive Capacity Analytics & Dynamic Guest Flow Orchestration Framework

> **"The Event Manager describes the event. The system designs, simulates, and orchestrates the operational plan."**

ChronosFlow (codenamed **ORCHESTRA**) is an intelligent pre-planning and hospitality orchestration framework engineered for mega-events, stadium fixtures, cultural festivals, and global summits. The system transforms natural language narratives into structured operational baselines, micro-area digital twin radars, and predictive timeline sequences with automated bottleneck diagnosis and proactive mitigations.

---

## 🧭 System Architecture & Workflow

ChronosFlow operates across an end-to-end operational lifecycle:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          CHRONOSFLOW OPERATIONAL PIPELINE                              │
└───────────────────────────────────┬────────────────────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼────────────────────────────┐
       ▼                            ▼                            ▼
┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐
│ 1. PRE-PLANNING         │  │ 2. PRESENT / SIMULATION │  │ 3. POST-EVENT           │
│ Months / Weeks Out      │  │ Live Day-of-Event Ops   │  │ Retrospective Analysis  │
├─────────────────────────┤  ├─────────────────────────┤  ├─────────────────────────┤
│ • Natural Language Parse│  │ • Live Surge Simulation │  │ • Actual vs Planned     │
│ • Digital Twin Radar    │  │ • Bottleneck Detection  │  │ • Evacuation Clearance  │
│ • Alternating Timeline  │  │ • Incident Dispatch     │  │ • Choke Point Forensics │
│ • Capacity Diagnostics  │  │ • Transit Re-routing    │  │ • Operational Debrief   │
│ • Proactive Mitigations │  │ • Real-time Telemetry   │  │ • Institutional Memory  │
└─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘
```

### 1. Pre-Planning (Phase 0 — Current Release)
* **Natural Language Event Understanding**: Planners enter event briefs in plain text. The parser extracts attendees, dates, venue coordinates, transit shares, and schedules.
* **Micro-Area Digital Twin & Infrastructure Radar**: 5 km radial catchment zone mapping rail hubs, hotel inventories, arterial expressways, and medical centers directly below the event timeline.
* **Alternating Journey Timeline**: Visualizes key operational stages (Transit Arrival, Ingress Security, Ticketing, Seating, Concessions, Egress) with top/bottom alternating nodes and direct radar coupling.
* **Capacity Diagnostics Engine**: Explicit mathematical formulas detailing required vs. available throughput, queue accumulation rates, and unmitigated risk impacts.
* **Categorized 1-Click Mitigations**: Actionable interventions across Capacity, Timing, Spatial, Transportation, Accommodation, and Safety.

### 2. Present / Simulation (Phase 1)
* **Crowd Dynamics Stress-Testing**: Interactive variance testing (-20% to +50%) and 4-wave ingress/egress curves.
* **Failure Scenario Emulation**: Gate failures, transit line delays, or sudden weather shocks.
* **Real-time Dispatch Integration**: Live sensor feeds and turnstile telemetry.

### 3. Post-Event Analysis (Phase 2)
* **Variance & Clearance Auditing**: Total egress clearance times vs. planned safety baselines.
* **Bottleneck Forensics**: Identification of service chokes to refine future planning templates.

---

## ⚡ Core Features

### 1. Minimal Travel-Inspired Dark Interface
* Calibrated warm obsidian (`#121316`), matte panels, and hairlines.
* Grounded travel palette: warm sand ochre, terracotta, forest sage, and slate blue.
* Strictly zero harsh neons or eye-fatiguing glows.
* 100% SVG vector iconography via [Lucide Icons](https://lucide.dev) (zero emojis).

### 2. Universal Venue Coverage & Procedural Digital Twin
* Pre-configured catalog presets:
  * DY Patil Stadium (Nerul, Navi Mumbai)
  * Wankhede Stadium (Churchgate, Mumbai)
  * Narendra Modi Stadium (Motera, Ahmedabad)
  * Eden Gardens (Kolkata)
  * Bharat Mandapam (Pragati Maidan, New Delhi)
  * Wembley Stadium (London, UK)
  * Madison Square Garden (New York, USA)
* **Custom Venue Generator**: Dynamically synthesizes an authentic spatial micro-twin for any coordinate or venue name worldwide.

### 3. Alternating Event Journey Timeline
* Positioned directly above the Digital Twin Radar.
* Alternating top/bottom stage cards with hairline stems and anchor nodes.
* Bidirectional sync: clicking any stage highlights the corresponding spatial asset on the radar.

### 4. Transparent Capacity Formulas & Diagnostics
* Explicit display of capacity calculations:
  * *Required Throughput* = `Attendees × Peak Factor ÷ Window`
  * *Deficit* = `Required - Available`
  * *Queue Build-up* = `Deficit Rate × Duration`
* Clear root-cause analysis and unmitigated consequences.

### 5. Baseline Plan Export & Lock
* Lock the operational baseline to freeze parameters before deployment.
* 1-Click export to structured JSON containing venue metadata, journey stages, capacity metrics, applied mitigations, and locked status.

---

## 🚀 Quick Start Guide

### Option 1: Direct Browser Launch
Open [`index.html`](index.html) directly in any modern browser. Zero build steps, npm installs, or external servers required.

### Option 2: Python Local Server
```bash
python server.py
```
Launches a lightweight local server at `http://localhost:8000` and opens your default browser.

### Option 3: Node.js / NPX
```bash
npx serve .
```

---

## 🗄️ Database Architecture (Phase Roadmap)

ChronosFlow is architected for integration with [Supabase](https://supabase.com) (PostgreSQL + Realtime WebSockets):

* `events`: Master event profiles, venue metadata, locked baseline flags.
* `spatial_assets`: Geo-coordinates, distance rings, capacity limits, transit modes.
* `event_stages`: Stage identifiers, time windows, demand vs. available capacity.
* `stage_mitigations`: Categorized preventive interventions and applied statuses.
* `simulation_scenarios`: Stress-test variance parameters and wave profiles.
* `live_telemetry`: Real-time turnstile counts, corridor density, incident alerts.
* `post_event_reports`: Egress clearance logs, SLA metrics, variance reports.

---

## 💻 Tech Stack

* **Frontend**: Vanilla HTML5, Tailwind CSS (utility baseline), Custom Minimal Travel Dark Theme (`styles.css`).
* **Icons**: [Lucide Icons](https://lucide.dev) (SVG vectors).
* **Scripting**: Vanilla ES6+ JavaScript (`app.js`), zero framework dependencies.
* **GIS Radar**: Procedural SVG Digital Twin with concentric distance rings and animated radial sweep.
* **Export**: Structured Operational Baseline JSON.

---

## 👥 Credits

Developed by **Team 8** — Mega-Event Hospitality & Crowd Flow Orchestration Framework.
