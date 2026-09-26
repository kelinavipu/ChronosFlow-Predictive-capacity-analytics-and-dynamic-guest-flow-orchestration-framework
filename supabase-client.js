/**
 * CHRONOSFLOW / ORCHESTRA — Supabase Data & Auth Service
 * Project ID: rojjfjoquejjxuziriei
 */

const SUPABASE_CONFIG = {
  url: "https://rojjfjoquejjxuziriei.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvampmam9xdWVqanh1emlyaWVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA0MTIwMjgsImV4cCI6MjEwNTk4ODAyOH0.Y0-SG110KdcACP8OMQvfV85yJbi00kfYZLxG-Vzxo2M",
  projectId: "rojjfjoquejjxuziriei"
};

// Initialize Supabase Client if library is loaded
let _supabase = null;
try {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    _supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log("⚡ Supabase Client Connected:", SUPABASE_CONFIG.projectId);
  }
} catch (e) {
  console.warn("Supabase SDK init deferred or failed:", e);
}

// Built-in Seed Data for Pre-Plans (DY Patil Nerul, Wankhede, Narendra Modi, Eden Gardens, Wembley)
const SEED_PREPLANS = [
  {
    id: "dypatil_nerul",
    title: "Championship Trophy: 4-Day Mega Cricket Fixture",
    eventType: "Cricket Championship",
    venueName: "Dr. D.Y. Patil Sports Stadium",
    venueArea: "Sector 7, Nerul",
    city: "Navi Mumbai (MMR)",
    duration: "4 Days (Sep 1 - Sep 4)",
    startDate: "2026-09-01",
    endDate: "2026-09-04",
    expectedVisitors: 50000,
    venueCapacity: 55000,
    highway: "Sion-Panvel Expressway & Palm Beach Corridor",
    railway: "Harbour Line & Trans-Harbour Suburban Rail",
    status: "BASELINE_LOCKED",
    isLocked: true,
    description: "4-day cricket championship at Dr. D.Y. Patil Stadium in Nerul with 50,000 daily spectators arriving via Harbour Line trains and Sion-Panvel Highway, requiring local accommodation, shuttle loops, and staged egress management.",
    nodes: [
      { id: "stadium_dypatil", name: "Dr. D.Y. Patil Sports Stadium", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Epicenter", capacity: "55,000 Seats", details: "14 Ingress Portals (A to N), 4 internal ramps, 2 broadcast towers.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main event operational container." },
      { id: "rail_nerul", name: "Nerul Railway Station", category: "rail", x: 28, y: 48, dist: "1.8 km", transitTime: "20 min walk / 6 min bus", capacity: "24,000 pax/hr", details: "Major suburban rail junction on Harbour Line & Trans-Harbour Line.", icon: "train", critical: true, stageLink: "stage_03", impact: "Primary mass transit gateway (52% of crowd influx)." },
      { id: "rail_juinagar", name: "Juinagar Railway Station", category: "rail", x: 24, y: 22, dist: "2.4 km", transitTime: "26 min walk / 8 min shuttle", capacity: "14,000 pax/hr", details: "Trans-Harbour feeder connector from Thane & Vashi direction.", icon: "train", critical: false, stageLink: "stage_03", impact: "Secondary rail drop-off." },
      { id: "rail_seawoods", name: "Seawoods Grand Central Station", category: "rail", x: 32, y: 78, dist: "3.1 km", transitTime: "10 min direct shuttle", capacity: "18,000 pax/hr", details: "Integrated modern transit hub & Nexus Seawoods Mall concourse.", icon: "train", critical: false, stageLink: "stage_09", impact: "Optimal southern egress collection point." },
      { id: "hotel_the_park", name: "The Park Navi Mumbai (CBD Belapur)", category: "hotel", x: 74, y: 58, dist: "3.5 km", transitTime: "7 min drive / shuttle", capacity: "80 Luxury Rooms", details: "Boutique 5-star hotel for athletes, officials & VIPs.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "VIP delegation lodging." },
      { id: "hotel_fortune_select", name: "Fortune Select Exotica", category: "hotel", x: 18, y: 12, dist: "6.2 km", transitTime: "12 min highway drive", capacity: "85 Luxury Rooms", details: "Vashi upscale commercial hotel with banquet suites.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "Secondary business cluster." },
      { id: "hotel_nerul_cluster", name: "Nerul Sector 19/21 Hotel Cluster", category: "hotel", x: 42, y: 56, dist: "1.4 km", transitTime: "16 min walk", capacity: "420 Budget Rooms", details: "Budget and mid-tier guest properties within walking radius.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "Immediate local accommodation (100% booked)." },
      { id: "hospital_dypatil", name: "Dr. D.Y. Patil Hospital & Research Centre", category: "hospital", x: 58, y: 44, dist: "0.2 km", transitTime: "2 min direct corridor", capacity: "1,200 Beds & Trauma Unit", details: "On-campus tertiary hospital immediately adjacent to stadium.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Guarantees <3 min emergency triage readiness." },
      { id: "park_stadium_bays", name: "DY Patil North/South Parking", category: "parking", x: 47, y: 56, dist: "0.1 km", transitTime: "Direct Foot Access", capacity: "2,200 Cars / 3,500 Bikes", details: "Reserved for match VIP pass holders, team coaches & ambulances.", icon: "car", critical: true, stageLink: "stage_03", impact: "Secured vehicle perimeter." },
      { id: "park_wonders_park", name: "Wonders Park Public Overflow Parking", category: "parking", x: 38, y: 68, dist: "1.8 km", transitTime: "5 min shuttle loop", capacity: "1,500 Cars", details: "Municipal park-and-ride facility with continuous shuttle frequency.", icon: "car", critical: false, stageLink: "stage_03", impact: "Municipal park-and-ride buffer." },
      { id: "choke_lp_junction", name: "LP Junction (Sion-Panvel Hwy)", category: "choke", x: 52, y: 32, dist: "0.8 km", transitTime: "Pinch Point", capacity: "Severe Bottleneck", details: "Intersection of Sion-Panvel Highway and Nerul East bypass.", icon: "alert-triangle", critical: true, stageLink: "stage_03", impact: "Severe traffic congestion during 10:30-12:00 and 21:45-23:15." }
    ],
    stages: [
      { id: "stage_01", name: "Ticketing & Accreditation", time: "Day -30 to -1", status: "optimal", req: "50,000 Passes", avail: "55,000 Passes", unit: "Passes", deficit: "0" },
      { id: "stage_02", name: "Regional Ingress Transit", time: "10:00 - 13:00", status: "optimal", req: "22,500 pax/hr", avail: "24,000 pax/hr", unit: "pax/hr", deficit: "0" },
      { id: "stage_03", name: "Local First/Last Mile Transit", time: "11:00 - 13:30", status: "high_risk", req: "16,000 pax/hr", avail: "9,500 pax/hr", unit: "pax/hr", deficit: "-6,500 pax/hr" },
      { id: "stage_04", name: "Accommodation & Hospitality", time: "12:00 - 15:00", status: "attention", req: "12,500 Rooms", avail: "1,850 Rooms", unit: "Rooms", deficit: "-10,650 Rooms" },
      { id: "stage_05", name: "Outer Security Perimeter", time: "12:30 - 14:30", status: "attention", req: "25,000 pax/hr", avail: "19,500 pax/hr", unit: "pax/hr", deficit: "-5,500 pax/hr" },
      { id: "stage_06", name: "Turnstile Ingress & Bowl Seating", time: "13:00 - 15:00", status: "optimal", req: "25,000 pax/hr", avail: "26,500 pax/hr", unit: "pax/hr", deficit: "0" },
      { id: "stage_07", name: "Infield Concessions & Restrooms", time: "15:00 - 20:30", status: "attention", req: "18,000 pax/hr", avail: "14,000 pax/hr", unit: "pax/hr", deficit: "-4,000 pax/hr" },
      { id: "stage_08", name: "Post-Event Bowl Egress", time: "21:30 - 22:30", status: "optimal", req: "50,000 pax/hr", avail: "52,000 pax/hr", unit: "pax/hr", deficit: "0" },
      { id: "stage_09", name: "Mass Dispersal & Transit Clear", time: "22:00 - 00:00", status: "high_risk", req: "25,000 pax/hr", avail: "18,000 pax/hr", unit: "pax/hr", deficit: "-7,000 pax/hr" }
    ]
  },
  {
    id: "wankhede_mumbai",
    title: "International Tri-Series Cup",
    eventType: "Cricket Championship",
    venueName: "Wankhede Stadium",
    venueArea: "Churchgate & Marine Lines",
    city: "South Mumbai",
    duration: "3 Days (Nov 20 - Nov 22)",
    startDate: "2026-11-20",
    endDate: "2026-11-22",
    expectedVisitors: 33000,
    venueCapacity: 33100,
    highway: "Marine Drive Coastal Corridor",
    railway: "Western Line (Churchgate Terminus)",
    status: "BASELINE_LOCKED",
    isLocked: true,
    description: "3-day international cricket tournament at Wankhede Stadium in South Mumbai with 33,000 spectators daily. Attendees arrive via Churchgate and CST suburban trains, requiring coastal traffic diversions and hotel coordination across Nariman Point and Colaba.",
    nodes: [
      { id: "wankhede_core", name: "Wankhede Stadium Core", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "33,100 Seats", details: "Gates 1 to 7, Sachin Tendulkar Stand, Garware Pavilion.", icon: "activity", critical: true, stageLink: "stage_06" },
      { id: "rail_churchgate", name: "Churchgate Railway Terminus", category: "rail", x: 38, y: 44, dist: "0.4 km", transitTime: "5 min walk", capacity: "45,000 pax/hr", details: "Western Line terminus handling local fast and slow rakes.", icon: "train", critical: true, stageLink: "stage_03" },
      { id: "rail_csmt", name: "CSMT Central Terminus", category: "rail", x: 70, y: 35, dist: "2.1 km", transitTime: "15 min bus / cab", capacity: "60,000 pax/hr", details: "Central & Harbour line mega terminus connecting eastern suburbs.", icon: "train", critical: false, stageLink: "stage_03" },
      { id: "hotel_taj_mahal", name: "Taj Mahal Palace & Tower (Colaba)", category: "hotel", x: 55, y: 80, dist: "2.8 km", transitTime: "10 min drive", capacity: "285 Luxury Rooms", details: "5-Star heritage flagship hotel for international delegations.", icon: "hotel", critical: false, stageLink: "stage_04" },
      { id: "hotel_trident", name: "Trident & The Oberoi (Nariman Point)", category: "hotel", x: 30, y: 70, dist: "1.4 km", transitTime: "6 min drive", capacity: "550 Luxury Rooms", details: "Nariman Point luxury business property.", icon: "hotel", critical: true, stageLink: "stage_04" }
    ],
    stages: []
  },
  {
    id: "narendra_modi",
    title: "Global T20 Finale Extravaganza",
    eventType: "Mega Cricket Final",
    venueName: "Narendra Modi Stadium",
    venueArea: "Motera & Sabarmati",
    city: "Ahmedabad",
    duration: "1 Day (Oct 24)",
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    expectedVisitors: 100000,
    venueCapacity: 132000,
    highway: "Sabarmati Riverfront Arterial & Gandhinagar Highway",
    railway: "Ahmedabad Metro Line 1 & Sabarmati Junction",
    status: "IN_PLANNING",
    isLocked: false,
    description: "Single-day world championship cricket match with 100,000 spectators arriving between 11 AM and 2 PM. High demand for metro transit, parking plazas, security screening, and post-match stadium egress at 10 PM.",
    nodes: [
      { id: "motera_core", name: "Narendra Modi Stadium Core", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "132,000 Seats", details: "World's largest cricket bowl.", icon: "activity", critical: true },
      { id: "metro_motera", name: "Motera Stadium Metro Station", category: "rail", x: 40, y: 46, dist: "0.3 km", transitTime: "4 min direct foot ramp", capacity: "35,000 pax/hr", details: "Dedicated metro ingress station.", icon: "train", critical: true }
    ],
    stages: []
  }
];

// Supabase Service API Wrapper
const ChronosSupabase = {
  client: _supabase,
  config: SUPABASE_CONFIG,

  // 1. AUTHENTICATION & SESSION
  getCurrentUser() {
    try {
      const stored = localStorage.getItem('chronos_user');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    // Default fallback demo user
    return {
      email: "planner@chronosflow.org",
      fullName: "Vikram Sethi",
      role: "event_manager",
      organization: "National Sports & Mega Events Authority"
    };
  },

  setCurrentUser(user) {
    localStorage.setItem('chronos_user', JSON.stringify(user));
    window.dispatchEvent(new Event('chronos_auth_changed'));
  },

  signOut() {
    localStorage.removeItem('chronos_user');
    window.dispatchEvent(new Event('chronos_auth_changed'));
    window.location.href = "index.html";
  },

  async signIn(email, password, role) {
    const lowerEmail = (email || '').toLowerCase().trim();
    // If Supabase client is active, try Supabase Auth
    if (this.client) {
      try {
        const { data, error } = await this.client.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          const userObj = {
            id: data.user.id,
            email: data.user.email,
            role: role || 'event_manager',
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            organization: data.user.user_metadata?.organization || "Mega-Event Operations"
          };
          this.setCurrentUser(userObj);
          return { success: true, user: userObj };
        }
      } catch (err) {
        console.warn("Supabase remote auth attempt had notice:", err.message);
      }
    }

    // Default personas dictionary
    const DEFAULT_PERSONAS = {
      'alicia@eventm.com': {
        id: "usr_alicia",
        email: "alicia@eventm.com",
        fullName: "Alicia Stone",
        role: "event_manager",
        roleTitle: "Event Master Orchestrator",
        organization: "International Mega-Events Board",
        phone: "+91 98199 12345"
      },
      'srinivasan@infram.com': {
        id: "usr_srinivasan",
        email: "srinivasan@infram.com",
        fullName: "Srinivasan R.",
        role: "infra_provider",
        roleTitle: "Infrastructure & Transit Director",
        organization: "Navi Mumbai Municipal Transport & Central Railway",
        phone: "+91 98201 45678",
        residence: "Sector 19A, Nerul, Navi Mumbai",
        property: {
          name: "Nerul Multi-Modal Transit Hub & Parking Complex",
          placement: "Nerul East Railway Approach & Sion-Panvel Bypass",
          geo: "19.0330° N, 73.0297° E (Zone B Catchment)",
          docNumber: "LIC-MH-CIDCO-2024-8841",
          capacity: "24,000 pax/hr Rail & 2,200 Parking Bays",
          availability: "Available for Sep 1 - Sep 4 (No Conflicting Bookings)"
        }
      },
      'harry@servicem.com': {
        id: "usr_harry",
        email: "harry@servicem.com",
        fullName: "Harry Vance",
        role: "service_provider",
        roleTitle: "Hospitality, Security & Logistics Lead",
        organization: "Apex Stadium Services & Fleet Co.",
        phone: "+91 97110 33451",
        services: ["Hotel / Accommodation", "Transit Shuttles", "Security & Stewards", "Camera / CCTV Surveillance", "Concessions & F&B"],
        pricing: {
          hotel: "₹3,500 / room / night",
          transport: "₹1,800 / bus / hr",
          security: "₹450 / guard / hr",
          cctv: "₹850 / camera / day",
          concessions: "₹120 / meal kit"
        }
      },
      'george@visitor.com': {
        id: "usr_george",
        email: "george@visitor.com",
        fullName: "George Miller",
        role: "visitor",
        roleTitle: "Grandstand Ticket Holder",
        organization: "Spectator & Guest",
        phone: "+91 91234 56789",
        originLocation: "Dadar East, Mumbai (19.0178° N, 72.8478° E)",
        distanceToVenue: "28.4 km via Harbour Rail Line",
        transitPreference: "Suburban Rail (Harbour Line)",
        ticketId: "TKT-DYP-2026-94812"
      }
    };

    // Add direct username aliases
    DEFAULT_PERSONAS['alicia'] = DEFAULT_PERSONAS['alicia@eventm.com'];
    DEFAULT_PERSONAS['srinivasan'] = DEFAULT_PERSONAS['srinivasan@infram.com'];
    DEFAULT_PERSONAS['harry'] = DEFAULT_PERSONAS['harry@servicem.com'];
    DEFAULT_PERSONAS['george'] = DEFAULT_PERSONAS['george@visitor.com'];

    // Check custom registered users from localStorage first
    try {
      const storedUsers = localStorage.getItem('chronos_registered_users');
      if (storedUsers) {
        const userList = JSON.parse(storedUsers);
        const matched = userList.find(u => (u.username && u.username.toLowerCase() === lowerEmail) || (u.email && u.email.toLowerCase() === lowerEmail));
        if (matched) {
          this.setCurrentUser(matched);
          return { success: true, user: matched, isLocal: true };
        }
      }
    } catch (e) {}

    // If matches known persona, use their full profile
    if (DEFAULT_PERSONAS[lowerEmail]) {
      const userObj = DEFAULT_PERSONAS[lowerEmail];
      this.setCurrentUser(userObj);
      return { success: true, user: userObj, isLocal: true };
    }

    // Role labels fallback
    const roleLabels = {
      event_manager: "Event Master Orchestrator",
      visitor: "Grandstand Spectator",
      service_provider: "Hospitality & Concessions Lead",
      infra_provider: "Municipal Transit & Traffic Dispatch"
    };

    const userObj = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      email: email || "alicia@eventm.com",
      role: role || "event_manager",
      fullName: email ? email.split('@')[0].toUpperCase() : "Alicia Stone",
      roleTitle: roleLabels[role] || "Operational User",
      organization: "ChronosFlow Operations Grid"
    };

    this.setCurrentUser(userObj);
    return { success: true, user: userObj, isLocal: true };
  },

  async signUp(data) {
    if (this.client) {
      try {
        await this.client.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              role: data.role,
              full_name: data.fullName,
              organization: data.organization
            }
          }
        });
      } catch (e) {
        console.warn("Supabase remote signup notice:", e.message);
      }
    }

    const userObj = {
      id: "usr_" + Math.random().toString(36).substr(2, 9),
      email: data.email,
      role: data.role || "event_manager",
      fullName: data.fullName || "New Member",
      organization: data.organization || "Event Partner"
    };

    this.setCurrentUser(userObj);
    return { success: true, user: userObj };
  },

  // 2. PRE-PLANS (FETCH & SAVE)
  async getPreplans() {
    let cloudPlans = [];
    if (this.client) {
      try {
        const { data, error } = await this.client.from('events').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          cloudPlans = data.map(item => ({
            id: item.id,
            title: item.title,
            eventType: item.event_type,
            venueName: item.venue_name,
            venueArea: item.venue_area,
            city: item.city,
            duration: item.duration,
            startDate: item.start_date,
            endDate: item.end_date,
            expectedVisitors: item.expected_visitors,
            venueCapacity: item.venue_capacity,
            highway: item.highway,
            railway: item.railway,
            description: item.description,
            isLocked: item.is_locked,
            status: item.status
          }));
        }
      } catch (err) {
        console.warn("Supabase query notice (using cached/seed):", err.message);
      }
    }

    // Merge custom plans from localStorage
    let localCustom = [];
    try {
      const stored = localStorage.getItem('chronos_custom_plans');
      if (stored) localCustom = JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }

    // Combine cloud, local custom, and seed plans (deduplicated by id)
    const combined = [...cloudPlans, ...localCustom, ...SEED_PREPLANS];
    const unique = [];
    const seen = new Set();
    for (const p of combined) {
      if (!seen.has(p.id)) {
        seen.add(p.id);
        unique.push(p);
      }
    }
    return unique;
  },

  async getPreplanById(id) {
    const all = await this.getPreplans();
    const found = all.find(p => p.id === id);
    if (found) return found;
    return all[0];
  },

  async savePreplan(plan) {
    // 1. Try persisting to Supabase
    if (this.client) {
      try {
        await this.client.from('events').upsert({
          id: plan.id,
          title: plan.title,
          event_type: plan.eventType,
          venue_name: plan.venueName,
          venue_area: plan.venueArea,
          city: plan.city,
          duration: plan.duration,
          expected_visitors: plan.expectedVisitors,
          venue_capacity: plan.venueCapacity || 55000,
          highway: plan.highway,
          railway: plan.railway,
          description: plan.description,
          status: plan.isLocked ? 'BASELINE_LOCKED' : 'IN_PLANNING',
          is_locked: !!plan.isLocked
        });

        // Upsert nodes if present
        if (plan.nodes && plan.nodes.length > 0) {
          const dbNodes = plan.nodes.map(n => ({
            id: n.id,
            event_id: plan.id,
            name: n.name,
            category: n.category,
            dist_km: n.dist || "1.0 km",
            transit_time: n.transitTime || "10 min",
            capacity_spec: n.capacity || "N/A",
            x: n.x,
            y: n.y,
            details: n.details || "",
            is_critical: !!n.critical,
            stage_link: n.stageLink
          }));
          await this.client.from('spatial_assets').upsert(dbNodes);
        }
      } catch (err) {
        console.warn("Could not save to Supabase cloud, saving locally:", err.message);
      }
    }

    // 2. Always persist locally
    try {
      const stored = localStorage.getItem('chronos_custom_plans');
      let localCustom = stored ? JSON.parse(stored) : [];
      localCustom = localCustom.filter(p => p.id !== plan.id);
      localCustom.unshift(plan);
      localStorage.setItem('chronos_custom_plans', JSON.stringify(localCustom));
    } catch (e) {
      console.error(e);
    }

    return { success: true, plan };
  },

  // 3. SIMULATIONS
  async saveSimulationRun(simData) {
    if (this.client) {
      try {
        await this.client.from('simulations').insert({
          event_id: simData.eventId,
          scenario_type: simData.scenario,
          stress_factor: simData.variance,
          bottlenecks: simData.bottlenecks,
          evacuation_time_mins: simData.evacuationTime,
          results: simData
        });
      } catch (e) {
        console.warn("Simulation cloud logging notice:", e.message);
      }
    }

    // Local logging
    try {
      const stored = localStorage.getItem('chronos_sim_history');
      let hist = stored ? JSON.parse(stored) : [];
      hist.unshift({ ...simData, timestamp: new Date().toISOString() });
      if (hist.length > 20) hist = hist.slice(0, 20);
      localStorage.setItem('chronos_sim_history', JSON.stringify(hist));
    } catch (e) {}

    return { success: true };
  },

  // 4. CURRENT EVENTS & LIVE DECISIONS
  async logLiveDecision(decision) {
    if (this.client) {
      try {
        await this.client.from('live_decisions').insert({
          event_id: decision.eventId,
          decision_title: decision.title,
          decision_text: decision.text,
          category: decision.category,
          urgency: decision.urgency || 'HIGH',
          status: 'DISPATCHED',
          dispatched_by: this.getCurrentUser().fullName,
          dispatched_at: new Date().toISOString()
        });
      } catch (e) {
        console.warn("Live decision cloud dispatch notice:", e.message);
      }
    }

    // Local decision store
    try {
      const stored = localStorage.getItem('chronos_live_decisions');
      let list = stored ? JSON.parse(stored) : [];
      list.unshift({ ...decision, dispatchedAt: new Date().toISOString() });
      localStorage.setItem('chronos_live_decisions', JSON.stringify(list));
    } catch (e) {}

    return { success: true };
  },

  // 5. INFRASTRUCTURE MANAGER PIPELINE & ASSETS
  async getInfraData() {
    const assets = [
      { id: "rail_nerul", name: "Nerul Railway Station", category: "Suburban Rail", capacity: "24,000 pax/hr", status: "Operational", line: "Harbour Line & Trans-Harbour Line", loadPct: 68 },
      { id: "choke_lp", name: "LP Junction Arterial Control", category: "Traffic Grid", capacity: "Primary Highway Corridor", status: "Heavy Traffic Warning", line: "Sion-Panvel Expressway", loadPct: 92 },
      { id: "park_wonders", name: "Wonders Park Remote Parking Plaza", category: "Parking & Shuttles", capacity: "1,500 Cars / 65 Buses", status: "Available", line: "Dedicated Loop Corridor", loadPct: 46 },
      { id: "rail_seawoods", name: "Seawoods Grand Central Transit Hub", category: "Modern Integrated Hub", capacity: "18,000 pax/hr", status: "Optimal", line: "Harbour Line Southern Feeder", loadPct: 52 }
    ];

    let requests = [];
    try {
      const stored = localStorage.getItem('chronos_infra_requests');
      if (stored) {
        requests = JSON.parse(stored);
      } else {
        requests = [
          {
            id: "req_inf_01",
            eventId: "dypatil_nerul",
            eventTitle: "Championship Trophy: 4-Day Cricket Fixture",
            eventHost: "Vikram Sethi (Event Master Orchestrator)",
            venue: "Dr. D.Y. Patil Sports Stadium, Nerul",
            date: "Sep 1 - Sep 4, 2026",
            expectedVisitors: 50000,
            requestedAsset: "Nerul Station & Bus Fleet",
            requestText: "Allocate 65 feeder CNG loop shuttles from Nerul Station to Stadium Gate 4 between 10:30-13:30. Coordinate with Central Railway for 3 emergency rakes at 22:00.",
            allocatedCapacity: "65 Shuttles & 3 Extra Rakes",
            status: "PENDING",
            timestamp: "2026-08-15T09:30:00Z"
          },
          {
            id: "req_inf_02",
            eventId: "dypatil_nerul",
            eventTitle: "Championship Trophy: 4-Day Cricket Fixture",
            eventHost: "Vikram Sethi (Event Master Orchestrator)",
            venue: "Dr. D.Y. Patil Sports Stadium, Nerul",
            date: "Sep 1 - Sep 4, 2026",
            expectedVisitors: 50000,
            requestedAsset: "LP Junction Traffic Police Unit",
            requestText: "Designate freight lane diversion at Uran Phata and LP Junction to prevent match spectator buses from being delayed by port trailers.",
            allocatedCapacity: "Green Corridor Priority Signage",
            status: "APPROVED",
            timestamp: "2026-08-14T14:15:00Z"
          }
        ];
        localStorage.setItem('chronos_infra_requests', JSON.stringify(requests));
      }
    } catch (e) {}

    return { assets, requests };
  },

  async respondToInfraRequest(requestId, newStatus, notes) {
    try {
      const stored = localStorage.getItem('chronos_infra_requests');
      let requests = stored ? JSON.parse(stored) : [];
      requests = requests.map(r => r.id === requestId ? { ...r, status: newStatus, responseNotes: notes, updated_at: new Date().toISOString() } : r);
      localStorage.setItem('chronos_infra_requests', JSON.stringify(requests));
    } catch (e) {}
    return { success: true };
  },

  // 6. SERVICE MANAGER PORTFOLIO & RFPS
  async getServiceData() {
    const portfolio = [
      { id: "srv_concessions", name: "Infield Concessions & Hydration Kiosks", domain: "F&B & Catering", capacity: "45 Satellite Kiosks / 15,000 servings/hr", activeUnits: 38, lead: "Chef Rajesh M." },
      { id: "srv_screening", name: "Perimeter Security & Magnetometer Screening", domain: "Security & Access", capacity: "30 Optical Lanes / 19,500 pax/hr", activeUnits: 30, lead: "Capt. K. Roy" },
      { id: "srv_medical", name: "Infield ALS Emergency Triage & Paramedics", domain: "Medical & Trauma", capacity: "12 ALS Ambulances & 4 Rapid Tents", activeUnits: 12, lead: "Dr. Sunita V." },
      { id: "srv_sanitation", name: "Continuous Waste Disposal & Restroom Hygiene", domain: "Sanitation", capacity: "120 Roaming Crew Members", activeUnits: 110, lead: "M. Fernandes" }
    ];

    let requests = [];
    try {
      const stored = localStorage.getItem('chronos_service_requests');
      if (stored) {
        requests = JSON.parse(stored);
      } else {
        requests = [
          {
            id: "req_srv_01",
            eventId: "dypatil_nerul",
            eventTitle: "Championship Trophy: 4-Day Cricket Fixture",
            eventHost: "Vikram Sethi (Event Master Orchestrator)",
            venue: "Dr. D.Y. Patil Sports Stadium, Nerul",
            serviceDomain: "F&B & Catering",
            requestTitle: "Deploy 35 Satellite Beverage & Grab-and-Go Kiosks",
            requirements: "High-density crowd expected during 15:00-20:30 inning intervals. Require pre-packaged hydration and electrolyte packs distributed across Sectors A to H.",
            unitsRequested: 35,
            status: "PENDING",
            timestamp: "2026-08-16T11:00:00Z"
          },
          {
            id: "req_srv_02",
            eventId: "dypatil_nerul",
            eventTitle: "Championship Trophy: 4-Day Cricket Fixture",
            eventHost: "Vikram Sethi (Event Master Orchestrator)",
            venue: "Dr. D.Y. Patil Sports Stadium, Nerul",
            serviceDomain: "Medical & Trauma",
            requestTitle: "High Heat Index Standby: 8 Cooling Misting Tents",
            requirements: "Forecast shows 31.4°C and 78% humidity. Deploy 8 cooling hydration pods with paramedical triage stations at perimeter Gates 2, 4, and 7.",
            unitsRequested: 8,
            status: "ACCEPTED",
            timestamp: "2026-08-15T16:20:00Z"
          }
        ];
        localStorage.setItem('chronos_service_requests', JSON.stringify(requests));
      }
    } catch (e) {}

    const actionPlaybook = [
      { phase: "Ingress (10:00 - 13:00)", task: "Activate 30 outer magnetometer screening lanes. Pre-chill hydration inventory.", priority: "CRITICAL" },
      { phase: "Match Live (13:00 - 18:00)", task: "Monitor concourse F&B queues. Restock Sector C satellite pods.", priority: "HIGH" },
      { phase: "Inning Interval (18:00 - 18:45)", task: "Deploy roaming grab-and-go vendors into Stand aisles.", priority: "URGENT" },
      { phase: "Egress Dispersal (21:30 - 23:00)", task: "Open all perimeter exit gates. Position medical standby teams along railway walking corridor.", priority: "HIGH" }
    ];

    return { portfolio, requests, actionPlaybook };
  },

  async respondToServiceRequest(requestId, newStatus, notes) {
    try {
      const stored = localStorage.getItem('chronos_service_requests');
      let requests = stored ? JSON.parse(stored) : [];
      requests = requests.map(r => r.id === requestId ? { ...r, status: newStatus, responseNotes: notes, updated_at: new Date().toISOString() } : r);
      localStorage.setItem('chronos_service_requests', JSON.stringify(requests));
    } catch (e) {}
    return { success: true };
  },

  // 7. VISITOR / SPECTATOR DETAILS & DECIDED PLANS
  async getVisitorData(email) {
    return {
      visitorName: "Ananya Sharma",
      ticketId: "TKT-DYP-2026-94812",
      event: {
        title: "Championship Trophy: 4-Day Mega Cricket Fixture",
        venue: "Dr. D.Y. Patil Sports Stadium",
        location: "Sector 7, Nerul, Navi Mumbai",
        date: "September 2, 2026",
        gate: "Gate 4 (West Wing)",
        seat: "North-West Stand &bull; Block C &bull; Row 14 &bull; Seat 48",
        gateOpeningTime: "11:30 AM",
        matchStartTime: "01:30 PM"
      },
      prePlansDecided: {
        recommendedTransit: "Harbour Line Suburban Train departing CSMT/Kurla at 10:48 AM &bull; Arrive Nerul Station at 11:32 AM",
        walkingCorridor: "Take shaded 1.8km pedestrian green corridor from Nerul East bypass directly to Stadium Gate 4 (18 min leisurely walk), or board free NMMT Event Shuttle from Nerul Depot Bay 2.",
        hotelBooking: "Hotel booked at Sector 21 Nerul Cluster (1.4 km from venue)",
        parkingNotice: "Infield stadium parking is 100% pass-restricted. Private cars must park at Wonders Park Overflow Plaza with shuttle transit.",
        bagPolicy: "Transparent bags only. No outside water bottles (free purified hydration pods available at all concourses)."
      },
      liveCurrentStatus: {
        gateQueueTime: "4 Mins (Optimal Flow)",
        weatherAtStadium: "31.4°C &bull; Humid &bull; Heat Index Active",
        concourseDensity: "Comfortable (Level 2)",
        liveAdvisory: "Gate 4 attendees are advised to use the Seawoods Shuttle Loop upon match exit at 21:45 for faster rail connection."
      }
    };
  }
};

window.ChronosSupabase = ChronosSupabase;

