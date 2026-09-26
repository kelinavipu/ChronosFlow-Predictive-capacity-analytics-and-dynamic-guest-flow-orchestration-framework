/**
 * CHRONOSFLOW — Pre-Plans & Spatial Digital Twin Engine
 */

// Active State
let currentActiveEvent = null;
let currentTwinNodes = [];
let currentStages = [];
let currentSelectedPinId = null;
let currentActiveFilter = 'all';
let allExistingPlans = [];

// Default Initializer: DY Patil Stadium Nerul
const VENUE_CATALOG = {
  dypatil_nerul: {
    id: "dypatil_nerul",
    title: "Championship Trophy: 4-Day Mega Cricket Fixture",
    eventType: "Cricket Championship",
    venueName: "Dr. D.Y. Patil Sports Stadium",
    venueArea: "Sector 7, Nerul",
    city: "Navi Mumbai (MMR)",
    duration: "4 Days (Sep 1 - Sep 4)",
    expectedVisitors: 50000,
    venueCapacity: 55000,
    highway: "Sion-Panvel Expressway & Palm Beach Corridor",
    railway: "Harbour Line & Trans-Harbour Suburban Rail",
    status: "BASELINE_LOCKED",
    isLocked: true,
    gps: "19.0330° N, 73.0297° E (Nerul)",
    description: "Conducting a 4-day cricket match at Dr. D.Y. Patil Stadium in Nerul from 1st September to 4th September with 50,000 spectators attending each day. Out-of-city spectators will arrive via Harbour Line trains and Sion-Panvel Highway, requiring local accommodation, shuttle connectivity, and staged egress management.",
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
      { id: "stage_01", name: "Ticketing & Accreditation", time: "Day -30 to -1", status: "optimal", req: 50000, avail: 55000, unit: "Passes", deficit: 0, formula: "Digital Quota vs Capacity", rootCause: "Pre-event verification verified.", consequence: "Zero physical box office queue." },
      { id: "stage_02", name: "Regional Ingress Transit", time: "10:00 - 13:00", status: "optimal", req: 22500, avail: 24000, unit: "pax/hr", deficit: 0, formula: "Suburban train rakes (12 cars @ 3 min headway)", rootCause: "Harbour Line frequency matched to arrival curve.", consequence: "Smooth station platform clearance." },
      { id: "stage_03", name: "Local First/Last Mile Transit", time: "11:00 - 13:30", status: "high_risk", req: 16000, avail: 9500, unit: "pax/hr", deficit: -6500, formula: "Feeder buses (65) + Auto-rickshaws vs Influx (16,000 pax/hr)", rootCause: "LP Junction traffic signal choking feeder buses.", consequence: "Pedestrian spillover onto highway lanes; 45-min transit queues." },
      { id: "stage_04", name: "Accommodation & Hospitality", time: "12:00 - 15:00", status: "attention", req: 12500, avail: 1850, unit: "Rooms", deficit: -10650, formula: "Out-of-towners (25%) ÷ 1.2 pax/room = 12,500 Rooms needed", rootCause: "Nerul/Belapur hotel cluster only has 1,850 hotel beds.", consequence: "Spectators forced into unverified homestays or long-distance travel." },
      { id: "stage_05", name: "Outer Security Perimeter", time: "12:30 - 14:30", status: "attention", req: 25000, avail: 19500, unit: "pax/hr", deficit: -5500, formula: "Bag inspection lanes (30 lanes @ 650 pax/hr)", rootCause: "Manual bag checks creating backpressure at Gate 4.", consequence: "28-minute wait queue outside boundary fence." },
      { id: "stage_06", name: "Turnstile Ingress & Bowl Seating", time: "13:00 - 15:00", status: "optimal", req: 25000, avail: 26500, unit: "pax/hr", deficit: 0, formula: "68 automated optical turnstiles @ 390 pax/hr", rootCause: "Turnstiles evenly distributed across Sectors A to N.", consequence: "Average entry wait time < 4 minutes." },
      { id: "stage_07", name: "Infield Concessions & Restrooms", time: "15:00 - 20:30", status: "attention", req: 18000, avail: 14000, unit: "pax/hr", deficit: -4000, formula: "Inning break crowd surge (35% of bowl) over 25 minutes", rootCause: "Concourse width restricted around North Stand.", consequence: "Concession wait times exceed 20 mins; restroom chokes." },
      { id: "stage_08", name: "Post-Event Bowl Egress", time: "21:30 - 22:30", status: "optimal", req: 50000, avail: 52000, unit: "pax/hr", deficit: 0, formula: "14 perimeter egress portals opened simultaneously", rootCause: "Staged exit announcements by stadium announcer.", consequence: "Full bowl cleared within 38 minutes." },
      { id: "stage_09", name: "Mass Dispersal & Transit Clear", time: "22:00 - 00:00", status: "high_risk", req: 25000, avail: 18000, unit: "pax/hr", deficit: -7000, formula: "Peak egress crowd converging on Nerul station vs train capacity", rootCause: "Harbour Line midnight headway drops to 12 minutes.", consequence: "Platform severe overcrowding; crush risk at foot overbridges." }
    ]
  },

  wankhede_mumbai: {
    id: "wankhede_mumbai",
    title: "International Tri-Series Cup",
    eventType: "Cricket Championship",
    venueName: "Wankhede Stadium",
    venueArea: "Churchgate & Marine Lines",
    city: "South Mumbai",
    duration: "3 Days (Nov 20 - Nov 22)",
    expectedVisitors: 33000,
    venueCapacity: 33100,
    highway: "Marine Drive Coastal Corridor",
    railway: "Western Line (Churchgate Terminus)",
    status: "BASELINE_LOCKED",
    isLocked: true,
    gps: "18.9389° N, 72.8258° E (Churchgate)",
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

  narendra_modi: {
    id: "narendra_modi",
    title: "Global T20 Finale Extravaganza",
    eventType: "Mega Cricket Final",
    venueName: "Narendra Modi Stadium",
    venueArea: "Motera & Sabarmati",
    city: "Ahmedabad",
    duration: "1 Day (Oct 24)",
    expectedVisitors: 100000,
    venueCapacity: 132000,
    highway: "Sabarmati Riverfront Arterial & Gandhinagar Highway",
    railway: "Ahmedabad Metro Line 1 & Sabarmati Junction",
    status: "IN_PLANNING",
    isLocked: false,
    gps: "23.0917° N, 72.5975° E (Motera)",
    description: "Single-day world championship cricket match with 100,000 spectators arriving between 11 AM and 2 PM. High demand for metro transit, parking plazas, security screening, and post-match stadium egress at 10 PM.",
    nodes: [
      { id: "motera_core", name: "Narendra Modi Stadium Core", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "132,000 Seats", details: "World's largest cricket bowl. 4 Entry Gates.", icon: "activity", critical: true },
      { id: "metro_motera", name: "Motera Stadium Metro Station", category: "rail", x: 40, y: 46, dist: "0.3 km", transitTime: "4 min direct foot ramp", capacity: "35,000 pax/hr", details: "Dedicated metro ingress station.", icon: "train", critical: true }
    ],
    stages: []
  },

  eden_gardens: {
    id: "eden_gardens",
    title: "Kolkata Cultural & Sports Fest",
    eventType: "Festival & Sports",
    venueName: "Eden Gardens Stadium",
    venueArea: "B.B.D. Bagh & Maidan",
    city: "Kolkata",
    duration: "2 Days (Dec 12 - Dec 13)",
    expectedVisitors: 65000,
    venueCapacity: 68000,
    highway: "Strand Road & Vidyasagar Setu Corridor",
    railway: "Howrah Railway Terminus & Esplanade Metro",
    status: "IN_PLANNING",
    isLocked: false,
    gps: "22.5646° N, 88.3433° E (Kolkata)",
    description: "Multi-day festival and match at Eden Gardens with 65,000 attendees arriving via Howrah Terminus and Esplanade Metro.",
    nodes: [],
    stages: []
  },

  wembley_london: {
    id: "wembley_london",
    title: "European Championship Cup Final",
    eventType: "Football Championship",
    venueName: "Wembley Stadium",
    venueArea: "Wembley Park, Brent",
    city: "London (UK)",
    duration: "1 Day (Aug 15)",
    expectedVisitors: 85000,
    venueCapacity: 90000,
    highway: "North Circular Road (A406) & M1 Corridor",
    railway: "London Underground (Jubilee & Metropolitan Lines)",
    status: "IN_PLANNING",
    isLocked: false,
    gps: "51.5560° N, 0.2795° W (London)",
    description: "Major football final at Wembley Stadium with 85,000 spectators arriving via Wembley Park station and Olympic Way.",
    nodes: [],
    stages: []
  },

  madison_sq_garden: {
    id: "madison_sq_garden",
    title: "World Arena Summit & Concert",
    eventType: "Concert & Convention",
    venueName: "Madison Square Garden",
    venueArea: "Midtown Manhattan (Penn Station)",
    city: "New York (USA)",
    duration: "2 Days (Sep 18 - Sep 19)",
    expectedVisitors: 20000,
    venueCapacity: 20500,
    highway: "7th & 8th Avenues / Lincoln Tunnel",
    railway: "Penn Station (MTA Subways, LIRR, NJ Transit, Amtrak)",
    status: "IN_PLANNING",
    isLocked: false,
    gps: "40.7505° N, 73.9934° W (Manhattan)",
    description: "Two-day high-density arena event atop Penn Station with 20,000 daily attendees.",
    nodes: [],
    stages: []
  }
};

// =========================================================================
// 1. INITIALIZATION & DATA FETCHING
// =========================================================================
async function initPreplansPage() {
  renderNavbar('preplans');
  
  // 1. Load Existing Plans from Supabase & Storage
  await loadAndRenderExistingPlans();

  // 2. Set Default Active Event (DY Patil Nerul)
  loadVenuePreset('dypatil_nerul');

  lucide.createIcons();
}

// Load and Render Existing Plans (Section 1)
async function loadAndRenderExistingPlans() {
  const container = document.getElementById('existing-plans-grid');
  if (!container) return;

  try {
    allExistingPlans = await window.ChronosSupabase.getPreplans();
  } catch (e) {
    allExistingPlans = Object.values(VENUE_CATALOG);
  }

  renderExistingPlansGrid(allExistingPlans);
}

function renderExistingPlansGrid(plans) {
  const container = document.getElementById('existing-plans-grid');
  if (!container) return;

  if (plans.length === 0) {
    container.innerHTML = `
      <div class="col-span-full dark-panel rounded-2xl p-8 border border-[#2a2c35] text-center space-y-2">
        <i data-lucide="inbox" class="w-8 h-8 text-[#9e9b93] mx-auto"></i>
        <h4 class="text-sm font-bold text-[#ede8e1]">No operational baselines found</h4>
        <p class="text-xs text-[#9e9b93]">Author a new pre-plan below to save the first baseline to Supabase.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = plans.map(plan => {
    const isLocked = plan.isLocked || plan.status === 'BASELINE_LOCKED';
    const statusBadge = isLocked 
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono badge-sand">LOCKED BASELINE</span>`
      : `<span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono badge-slate">IN PLANNING</span>`;

    const nodesCount = plan.nodes ? plan.nodes.length : 11;
    const hotelCount = plan.nodes ? plan.nodes.filter(n => n.category === 'hotel').length : 3;
    const railCount = plan.nodes ? plan.nodes.filter(n => n.category === 'rail').length : 3;

    return `
      <div class="dark-panel rounded-2xl p-5 border border-[#2a2c35] flex flex-col justify-between hover:border-[#d4a373]/50 transition group space-y-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase text-[#d4a373] font-bold">${plan.eventType || 'Mega Event'}</span>
            ${statusBadge}
          </div>

          <div>
            <h3 class="text-base font-bold text-[#ede8e1] group-hover:text-[#d4a373] transition leading-tight">
              ${plan.title || plan.venueName}
            </h3>
            <div class="flex items-center space-x-1.5 text-xs text-[#9e9b93] mt-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#d4a373]"></i>
              <span>${plan.venueArea || plan.venueName}, ${plan.city}</span>
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#22242b] border border-[#2a2c35] text-center text-xs">
            <div>
              <div class="text-[10px] text-[#9e9b93] uppercase">Attendees</div>
              <div class="font-mono font-bold text-[#ede8e1]">${(plan.expectedVisitors || 50000).toLocaleString()}</div>
            </div>
            <div>
              <div class="text-[10px] text-[#9e9b93] uppercase">Hotels Mapped</div>
              <div class="font-mono font-bold text-[#d4a373]">${hotelCount} Clusters</div>
            </div>
            <div>
              <div class="text-[10px] text-[#9e9b93] uppercase">Transit Hubs</div>
              <div class="font-mono font-bold text-[#709775]">${railCount} Stations</div>
            </div>
          </div>

          <p class="text-xs text-[#9e9b93] line-clamp-2 leading-relaxed">
            ${plan.description || 'Pre-planning operational blueprint and micro-area infrastructure digital twin.'}
          </p>
        </div>

        <div class="pt-3 border-t border-[#2a2c35] flex items-center justify-between text-xs font-bold">
          <button onclick="loadExistingPlanIntoWorkspace('${plan.id}')" class="px-3 py-1.5 rounded-xl btn-sand flex items-center space-x-1.5 transition">
            <i data-lucide="radar" class="w-3.5 h-3.5"></i>
            <span>Load Into Radar</span>
          </button>
          
          <button onclick="exportSinglePlanJSON('${plan.id}')" class="px-2.5 py-1.5 rounded-xl bg-[#22242b] hover:bg-[#2a2c35] text-[#9e9b93] hover:text-[#ede8e1] border border-[#2a2c35] flex items-center space-x-1 transition" title="Export Plan JSON">
            <i data-lucide="download" class="w-3.5 h-3.5"></i>
            <span class="text-[11px]">JSON</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function filterExistingPlans() {
  const query = document.getElementById('plan-search-input')?.value.toLowerCase() || '';
  const statusFilter = document.getElementById('plan-status-filter')?.value || 'all';

  const filtered = allExistingPlans.filter(p => {
    const matchText = (p.title + ' ' + p.venueName + ' ' + p.venueArea + ' ' + p.city).toLowerCase().includes(query);
    const isLocked = p.isLocked || p.status === 'BASELINE_LOCKED';
    if (statusFilter === 'locked' && !isLocked) return false;
    if (statusFilter === 'planning' && isLocked) return false;
    return matchText;
  });

  renderExistingPlansGrid(filtered);
}

// Load an existing plan into the interactive workspace below
window.loadExistingPlanIntoWorkspace = function(planId) {
  const plan = allExistingPlans.find(p => p.id === planId) || VENUE_CATALOG[planId];
  if (!plan) return;

  currentActiveEvent = plan;
  currentTwinNodes = plan.nodes && plan.nodes.length > 0 ? plan.nodes : generateProceduralNodes(plan);
  currentStages = plan.stages && plan.stages.length > 0 ? plan.stages : VENUE_CATALOG.dypatil_nerul.stages;
  currentSelectedPinId = currentTwinNodes[0].id;

  // Scroll smoothly to workbench
  document.getElementById('add-new-plan-section')?.scrollIntoView({ behavior: 'smooth' });

  // Update input text
  document.getElementById('event-narrative-input').value = plan.description || '';

  renderActiveEventSnapshot();
  renderTimeline();
  renderRadar();
  renderStageInspector();
  renderMitigations();
  lucide.createIcons();
};

// =========================================================================
// 2. VENUE PRESET LOADER & NATURAL LANGUAGE PARSER
// =========================================================================
window.loadVenuePreset = function(presetKey) {
  const preset = VENUE_CATALOG[presetKey];
  if (!preset) return;

  currentActiveEvent = preset;
  currentTwinNodes = preset.nodes && preset.nodes.length > 0 ? [...preset.nodes] : generateProceduralNodes(preset);
  currentStages = preset.stages && preset.stages.length > 0 ? [...preset.stages] : [...VENUE_CATALOG.dypatil_nerul.stages];
  currentSelectedPinId = currentTwinNodes[0]?.id || null;

  document.getElementById('event-narrative-input').value = preset.description;

  renderActiveEventSnapshot();
  renderTimeline();
  renderRadar();
  renderStageInspector();
  renderMitigations();
  lucide.createIcons();
};

window.parseAndGenerateTwin = function() {
  const narrative = document.getElementById('event-narrative-input').value;
  if (!narrative.trim()) {
    alert("Please enter an event description brief.");
    return;
  }

  // Check if matches known venue
  const text = narrative.toLowerCase();
  if (text.includes("patil") || text.includes("nerul")) {
    loadVenuePreset('dypatil_nerul');
    return;
  } else if (text.includes("wankhede") || text.includes("churchgate")) {
    loadVenuePreset('wankhede_mumbai');
    return;
  } else if (text.includes("narendra") || text.includes("motera")) {
    loadVenuePreset('narendra_modi');
    return;
  } else if (text.includes("eden") || text.includes("kolkata")) {
    loadVenuePreset('eden_gardens');
    return;
  } else if (text.includes("wembley")) {
    loadVenuePreset('wembley_london');
    return;
  } else if (text.includes("madison") || text.includes("msg")) {
    loadVenuePreset('madison_sq_garden');
    return;
  }

  // Synthesize a custom event and procedural spatial twin
  const customPlan = {
    id: "custom_" + Math.random().toString(36).substr(2, 7),
    title: "Global Feature Event",
    eventType: "Mega Fixture",
    venueName: "Selected International Arena",
    venueArea: "Central District",
    city: "Global Metro",
    duration: "3 Days",
    expectedVisitors: 45000,
    venueCapacity: 50000,
    highway: "Primary Arterial Expressway Corridor",
    railway: "Rapid Rail & Suburban Feeder Network",
    status: "IN_PLANNING",
    isLocked: false,
    gps: "25.2048° N, 55.2708° E (District)",
    description: narrative,
    nodes: [],
    stages: [...VENUE_CATALOG.dypatil_nerul.stages]
  };

  customPlan.nodes = generateProceduralNodes(customPlan);
  currentActiveEvent = customPlan;
  currentTwinNodes = customPlan.nodes;
  currentStages = customPlan.stages;
  currentSelectedPinId = currentTwinNodes[0].id;

  renderActiveEventSnapshot();
  renderTimeline();
  renderRadar();
  renderStageInspector();
  renderMitigations();
  lucide.createIcons();
};

function generateProceduralNodes(plan) {
  return [
    { id: "stadium_core", name: plan.venueName, category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: `${plan.venueCapacity} Seats`, details: "Main spectator arena and ingress gates.", icon: "activity", critical: true, stageLink: "stage_06" },
    { id: "rail_central", name: `${plan.city} Central Transit Hub`, category: "rail", x: 30, y: 45, dist: "1.6 km", transitTime: "15 min walk / 5 min bus", capacity: "28,000 pax/hr", details: "Major high-frequency rail gateway.", icon: "train", critical: true, stageLink: "stage_03" },
    { id: "hotel_cluster", name: `${plan.venueArea} Hotel District`, category: "hotel", x: 68, y: 62, dist: "2.4 km", transitTime: "10 min direct shuttle", capacity: "1,200 Rooms", details: "Business and hospitality lodging cluster.", icon: "hotel", critical: true, stageLink: "stage_04" },
    { id: "hospital_tertiary", name: `${plan.city} Emergency Trauma Center`, category: "hospital", x: 56, y: 38, dist: "1.1 km", transitTime: "4 min green corridor", capacity: "750 Emergency Beds", details: "Designated triage facility.", icon: "heart-pulse", critical: true, stageLink: "stage_06" },
    { id: "parking_plaza", name: "Metro Overflow Parking Plaza", category: "parking", x: 38, y: 72, dist: "2.8 km", transitTime: "8 min shuttle bus", capacity: "3,500 Vehicles", details: "Park-and-ride facility with frequent loops.", icon: "car", critical: false, stageLink: "stage_03" },
    { id: "choke_arterial", name: "Corridor Expressway Choke Point", category: "choke", x: 62, y: 32, dist: "1.4 km", transitTime: "Bottleneck Zone", capacity: "Severe Congestion", details: "Arterial interchange prone to pre-match bottlenecks.", icon: "alert-triangle", critical: true, stageLink: "stage_03" }
  ];
}

// =========================================================================
// 3. WORKBENCH RENDERING (SNAPSHOT, RADAR, TIMELINE, DIAGNOSTICS)
// =========================================================================
function renderActiveEventSnapshot() {
  const container = document.getElementById('active-event-summary');
  if (!container || !currentActiveEvent) return;

  const isLocked = currentActiveEvent.isLocked;

  container.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center space-x-2">
          <span class="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#22242b] text-[#d4a373] border border-[#2a2c35]">ACTIVE WORKSPACE</span>
          <h3 class="text-xl font-bold text-[#ede8e1]">${currentActiveEvent.title || currentActiveEvent.venueName}</h3>
        </div>
        <p class="text-xs text-[#9e9b93]">
          ${currentActiveEvent.venueName} &bull; ${currentActiveEvent.venueArea}, ${currentActiveEvent.city} &bull; ${currentActiveEvent.duration}
        </p>
      </div>

      <div class="flex items-center space-x-3">
        <button onclick="toggleLockBaseline()" class="px-3.5 py-1.5 rounded-xl border text-xs font-bold transition flex items-center space-x-1.5 ${isLocked ? 'btn-sand' : 'bg-[#22242b] text-[#9e9b93] border-[#2a2c35] hover:text-[#ede8e1]'}">
          <i data-lucide="${isLocked ? 'lock' : 'unlock'}" class="w-3.5 h-3.5"></i>
          <span>${isLocked ? 'Baseline Locked' : 'Lock Baseline'}</span>
        </button>

        <button onclick="exportActivePlanJSON()" class="px-3 py-1.5 rounded-xl bg-[#22242b] hover:bg-[#2a2c35] text-[#ede8e1] border border-[#2a2c35] text-xs font-semibold flex items-center space-x-1 transition">
          <i data-lucide="download" class="w-3.5 h-3.5"></i>
          <span>Export Certified JSON</span>
        </button>
      </div>
    </div>
  `;
}

// Render Alternating Event Journey Timeline
function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container || !currentStages) return;

  const nodesHtml = currentStages.map((stage, idx) => {
    const isTop = idx % 2 === 0;
    const isRisk = stage.status === 'high_risk';
    const isWarn = stage.status === 'attention';

    let badgeClass = "badge-sage";
    if (isRisk) badgeClass = "badge-terracotta";
    else if (isWarn) badgeClass = "badge-amber";

    return `
      <div class="timeline-node-item" onclick="selectTimelineStage('${stage.id}')">
        <!-- Top Stage Card -->
        <div class="timeline-content top-content ${isTop ? 'visible' : 'invisible'}">
          <div class="timeline-card ${isRisk ? 'border-[#c96a54]' : ''}">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] font-mono text-[#9e9b93]">${stage.time}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${badgeClass}">${stage.status.replace('_', ' ')}</span>
            </div>
            <div class="text-xs font-bold text-[#ede8e1] truncate">${stage.name}</div>
            <div class="text-[10px] text-[#9e9b93] mt-0.5 font-mono">Req: ${stage.req.toLocaleString()} ${stage.unit}</div>
          </div>
          <div class="timeline-stem"></div>
        </div>

        <!-- Anchor Circle on Horizontal Rail -->
        <div class="timeline-anchor ${isRisk ? 'bg-[#c96a54]' : isWarn ? 'bg-[#cc7744]' : 'bg-[#d4a373]'}"></div>

        <!-- Bottom Stage Card -->
        <div class="timeline-content bottom-content ${!isTop ? 'visible' : 'invisible'}">
          <div class="timeline-stem"></div>
          <div class="timeline-card ${isRisk ? 'border-[#c96a54]' : ''}">
            <div class="flex items-center justify-between gap-1 mb-1">
              <span class="text-[10px] font-mono text-[#9e9b93]">${stage.time}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded uppercase font-bold ${badgeClass}">${stage.status.replace('_', ' ')}</span>
            </div>
            <div class="text-xs font-bold text-[#ede8e1] truncate">${stage.name}</div>
            <div class="text-[10px] text-[#9e9b93] mt-0.5 font-mono">Req: ${stage.req.toLocaleString()} ${stage.unit}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="timeline-rail"></div>
    <div class="flex items-center justify-between relative z-10 px-4">
      ${nodesHtml}
    </div>
  `;
}

function selectTimelineStage(stageId) {
  // Sync with radar pin
  const linkedNode = currentTwinNodes.find(n => n.stageLink === stageId);
  if (linkedNode) {
    currentSelectedPinId = linkedNode.id;
    renderRadar();
  }
}

// Render Micro-Area Digital Twin & Infrastructure Radar
function renderRadar() {
  const pinsLayer = document.getElementById('radar-pins-layer');
  if (!pinsLayer) return;

  // Update titles
  const titleEl = document.getElementById('digital-twin-title');
  const subEl = document.getElementById('digital-twin-subtitle');
  const gpsEl = document.getElementById('twin-gps-coord');
  if (titleEl) titleEl.innerHTML = `<i data-lucide="radar" class="w-5 h-5 text-[#d4a373]"></i><span>${currentActiveEvent.venueArea || currentActiveEvent.venueName} Spatial Twin</span>`;
  if (subEl) subEl.innerText = `Geospatial infrastructure mapped within 5km radius of ${currentActiveEvent.venueName}: hotels, railway hubs, trauma centers, and highway choke points.`;
  if (gpsEl) gpsEl.innerText = `GPS: ${currentActiveEvent.gps || '19.0330° N, 73.0297° E'}`;

  // Filter nodes
  const filteredNodes = currentTwinNodes.filter(node => {
    if (currentActiveFilter === 'all') return true;
    return node.category === currentActiveFilter;
  });

  pinsLayer.innerHTML = filteredNodes.map(node => {
    const isSelected = node.id === currentSelectedPinId;
    let pinClass = `pin-${node.category}`;
    if (isSelected) pinClass += ' active-pin';

    return `
      <div 
        class="twin-pin ${pinClass}" 
        style="top: ${node.y}%; left: ${node.x}%;"
        onclick="selectPinNode('${node.id}')"
        title="${node.name} (${node.dist})"
      >
        <div class="twin-pin-inner ${isSelected ? 'ring-2 ring-[#d4a373] ring-offset-2 ring-offset-[#121316]' : ''}">
          <i data-lucide="${node.icon || 'map-pin'}" class="w-3.5 h-3.5"></i>
        </div>
        <div class="twin-pin-label">
          ${node.name.length > 20 ? node.name.substring(0, 18) + '...' : node.name}
        </div>
      </div>
    `;
  }).join('');

  renderSelectedPinTelemetry();
  lucide.createIcons();
}

window.selectPinNode = function(pinId) {
  currentSelectedPinId = pinId;
  renderRadar();
};

window.filterTwinNodes = function(cat) {
  currentActiveFilter = cat;
  document.querySelectorAll('.twin-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = "twin-filter-btn px-2.5 py-1 rounded-lg btn-sand font-bold text-[11px]";
    } else {
      btn.className = "twin-filter-btn px-2.5 py-1 rounded-lg bg-[#22242b] text-[#9e9b93] hover:text-[#ede8e1] text-[11px]";
    }
  });
  renderRadar();
};

function renderSelectedPinTelemetry() {
  const container = document.getElementById('selected-pin-telemetry');
  if (!container) return;

  const node = currentTwinNodes.find(n => n.id === currentSelectedPinId) || currentTwinNodes[0];
  if (!node) return;

  let badge = "badge-sand";
  if (node.category === 'choke') badge = "badge-terracotta";
  else if (node.category === 'hotel') badge = "badge-sand";
  else if (node.category === 'hospital') badge = "badge-terracotta";
  else if (node.category === 'rail') badge = "badge-slate";

  container.innerHTML = `
    <div class="flex items-center justify-between pb-2 border-b border-[#2a2c35] mb-3">
      <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded ${badge}">
        ${node.category.toUpperCase()} ASSET
      </span>
      <span class="text-xs font-mono text-[#d4a373] font-bold">${node.dist}</span>
    </div>

    <div class="flex items-start gap-2.5">
      <div class="w-9 h-9 rounded-xl bg-[#1a1b20] text-[#d4a373] flex items-center justify-center shrink-0 border border-[#2a2c35]">
        <i data-lucide="${node.icon || 'map-pin'}" class="w-4 h-4"></i>
      </div>
      <div>
        <h4 class="text-sm font-bold text-[#ede8e1] leading-tight">${node.name}</h4>
        <div class="text-[11px] text-[#9e9b93] mt-0.5">${node.transitTime || 'Transit Gateway'}</div>
      </div>
    </div>

    <div class="mt-3 p-2.5 rounded-xl bg-[#1a1b20] border border-[#2a2c35] space-y-1.5 text-xs">
      <div class="flex items-center justify-between">
        <span class="text-[#9e9b93]">Throughput / Capacity:</span>
        <span class="font-mono font-bold text-[#ede8e1]">${node.capacity || 'N/A'}</span>
      </div>
      <p class="text-[11px] text-[#9e9b93] leading-snug pt-1 border-t border-[#2a2c35]">${node.details || 'Operational infrastructure node mapped in 5km radar.'}</p>
    </div>
  `;
}

// Stage Capacity Inspector
function renderStageInspector() {
  const container = document.getElementById('stage-inspector-section');
  if (!container) return;

  const stage = currentStages.find(s => s.status === 'high_risk') || currentStages[2] || currentStages[0];
  if (!stage) return;

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-[#2a2c35] pb-3">
        <div>
          <span class="text-[10px] font-mono text-[#c96a54] font-bold uppercase tracking-wider">Critical Bottleneck Inspection</span>
          <h3 class="text-lg font-bold text-[#ede8e1] flex items-center space-x-2">
            <span>${stage.name}</span>
            <span class="text-xs font-mono text-[#9e9b93]">(${stage.time})</span>
          </h3>
        </div>
        <span class="px-2.5 py-1 rounded text-xs font-mono font-bold badge-terracotta">HIGH RISK DEFICIT</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div class="p-3 rounded-xl bg-[#22242b] border border-[#2a2c35]">
          <div class="text-[#9e9b93] text-[10px] uppercase">Required Throughput</div>
          <div class="font-mono font-bold text-base text-[#ede8e1] mt-0.5">${stage.req.toLocaleString()} ${stage.unit}</div>
        </div>
        <div class="p-3 rounded-xl bg-[#22242b] border border-[#2a2c35]">
          <div class="text-[#9e9b93] text-[10px] uppercase">Available Capacity</div>
          <div class="font-mono font-bold text-base text-[#709775] mt-0.5">${stage.avail.toLocaleString()} ${stage.unit}</div>
        </div>
        <div class="p-3 rounded-xl bg-[#22242b] border border-[#2a2c35]">
          <div class="text-[#9e9b93] text-[10px] uppercase">Capacity Deficit Gap</div>
          <div class="font-mono font-bold text-base text-[#c96a54] mt-0.5">${stage.deficit} ${stage.unit}</div>
        </div>
      </div>

      <div class="p-3 rounded-xl bg-[#1a1b20] border border-[#2a2c35] text-xs space-y-1">
        <div class="font-bold text-[#d4a373] uppercase text-[10px]">Mathematical Capacity Formula</div>
        <div class="font-mono text-[#ede8e1]">${stage.formula || 'Required = Influx ÷ Window Hours; Deficit = Available - Required'}</div>
        <div class="text-[#9e9b93] text-[11px] pt-1"><strong>Root Cause:</strong> ${stage.rootCause || 'Signal timing and arterial bottleneck.'}</div>
        <div class="text-[#c96a54] text-[11px]"><strong>Unmitigated Risk:</strong> ${stage.consequence || 'Overcrowding and safety hazard.'}</div>
      </div>
    </div>
  `;
}

// Categorized Proactive Mitigations
function renderMitigations() {
  const container = document.getElementById('mitigations-section');
  if (!container) return;

  const items = [
    { cat: "Transportation", title: "Dedicated Shuttle Loop from Seawoods Grand Central", desc: "Deploy 25 continuous CNG feeder buses to absorb 4,500 pax/hr from southern rail lines.", impact: "+4,500 pax/hr" },
    { cat: "Capacity", title: "Outer Perimeter Fast-Track Screening Pods", desc: "Deploy 12 mobile bag check magnetometers at Gate 4 concourse.", impact: "+3,200 pax/hr" },
    { cat: "Accommodation", title: "Belapur & Vashi Satellite Hotel Room Charters", desc: "Block reserve 2,400 hotel rooms across 4-star properties with morning direct coach transfers.", impact: "+2,400 Rooms" },
    { cat: "Time", title: "Staggered 3-Wave Ingress Wristband Distribution", desc: "Incentivize early arrival between 11:00-12:30 with early bird fan zone access.", impact: "-25% Peak Wave" }
  ];

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-[#2a2c35] pb-3">
        <div>
          <h3 class="text-base font-bold text-[#ede8e1]">Proactive Operational Mitigations</h3>
          <p class="text-xs text-[#9e9b93]">Categorized 1-click interventions to eliminate capacity deficits</p>
        </div>
        <span class="text-xs text-[#709775] font-mono">4 Recommended Actions</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        ${items.map(item => `
          <div class="p-3.5 rounded-xl bg-[#22242b] border border-[#2a2c35] flex items-start justify-between gap-3">
            <div class="space-y-1">
              <span class="text-[9px] uppercase font-bold px-2 py-0.5 rounded badge-sand">${item.cat}</span>
              <h4 class="font-bold text-[#ede8e1]">${item.title}</h4>
              <p class="text-[11px] text-[#9e9b93]">${item.desc}</p>
            </div>
            <button onclick="applyMitigation(this)" class="px-2.5 py-1 rounded-lg btn-sand font-bold text-[10px] shrink-0">
              Apply
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.applyMitigation = function(btn) {
  btn.className = "px-2.5 py-1 rounded-lg badge-sage font-bold text-[10px] shrink-0";
  btn.innerText = "Applied";
  btn.disabled = true;
};

// =========================================================================
// 4. SUPABASE SAVE & EXPORT
// =========================================================================
window.saveCurrentPlanToSupabase = async function() {
  if (!currentActiveEvent) return;

  const btn = document.getElementById('btn-save-plan');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="animate-spin inline-block mr-1">&bull;</span> Saving...`;
  }

  const planPayload = {
    ...currentActiveEvent,
    nodes: currentTwinNodes,
    stages: currentStages,
    isLocked: !!currentActiveEvent.isLocked
  };

  const res = await window.ChronosSupabase.savePreplan(planPayload);

  if (btn) {
    btn.disabled = false;
    btn.innerHTML = `<i data-lucide="check" class="w-4 h-4"></i><span>Saved to Cloud!</span>`;
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="cloud-upload" class="w-4 h-4"></i><span>Save Plan to Supabase</span>`;
      lucide.createIcons();
    }, 2000);
  }

  alert(`Operational plan "${planPayload.title || planPayload.venueName}" has been synchronized with Supabase!`);
  await loadAndRenderExistingPlans();
  lucide.createIcons();
};

window.toggleLockBaseline = function() {
  if (!currentActiveEvent) return;
  currentActiveEvent.isLocked = !currentActiveEvent.isLocked;
  currentActiveEvent.status = currentActiveEvent.isLocked ? 'BASELINE_LOCKED' : 'IN_PLANNING';
  renderActiveEventSnapshot();
  saveCurrentPlanToSupabase();
};

window.exportActivePlanJSON = function() {
  if (!currentActiveEvent) return;
  const data = {
    platform: "CHRONOSFLOW ORCHESTRA",
    phase: "Phase 0 Pre-Planning Baseline",
    event: currentActiveEvent,
    digital_twin_nodes: currentTwinNodes,
    timeline_stages: currentStages,
    exported_at: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chronos_preplan_${(currentActiveEvent.venueName || 'plan').toLowerCase().replace(/\s+/g, '_')}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

window.exportSinglePlanJSON = function(planId) {
  const plan = allExistingPlans.find(p => p.id === planId) || VENUE_CATALOG[planId];
  if (!plan) return;
  const blob = new Blob([JSON.stringify(plan, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chronos_plan_${plan.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Add Pin Modal
window.openAddAssetModal = function() {
  document.getElementById('add-asset-modal')?.classList.remove('hidden');
};
window.closeAddAssetModal = function() {
  document.getElementById('add-asset-modal')?.classList.add('hidden');
};
window.submitNewAsset = function(e) {
  e.preventDefault();
  const name = document.getElementById('asset-name').value;
  const category = document.getElementById('asset-category').value;
  const dist = document.getElementById('asset-dist').value;
  const capacity = document.getElementById('asset-capacity').value;

  const newPin = {
    id: "pin_" + Math.random().toString(36).substr(2, 7),
    name,
    category,
    dist,
    transitTime: "12 min shuttle",
    capacity,
    x: 40 + Math.floor(Math.random() * 25),
    y: 40 + Math.floor(Math.random() * 25),
    icon: category === 'hotel' ? 'hotel' : category === 'rail' ? 'train' : 'map-pin',
    details: "Custom added infrastructure asset."
  };

  currentTwinNodes.push(newPin);
  currentSelectedPinId = newPin.id;
  closeAddAssetModal();
  renderRadar();
};

// Cross-Role Procurement Handlers (Alicia orders from Srinivasan & Harry)
// Dynamic Possession Options & Availability Checker
window.populateInfraPossessionsDropdown = async function() {
  const select = document.getElementById('order-infra-possession');
  if (!select || !window.ChronosSupabase) return;
  const possessions = await window.ChronosSupabase.getInfraPossessions();
  if (possessions && possessions.length > 0) {
    select.innerHTML = possessions.map(p => `
      <option value="${p.id}">${p.name} (${Number(p.landAreaSqFt).toLocaleString()} sq ft &bull; ${p.gatesCount} Gates)</option>
    `).join('');
  }
  window.checkOrderAvailability();
};

window.checkOrderAvailability = function() {
  const posSelect = document.getElementById('order-infra-possession');
  const startInp = document.getElementById('order-infra-start');
  const endInp = document.getElementById('order-infra-end');
  const verdict = document.getElementById('order-infra-verdict');
  const msg = document.getElementById('order-infra-conflict-msg');
  const statusPill = document.getElementById('order-infra-status-pill');
  const btn = document.getElementById('btn-order-infra');
  const box = document.getElementById('order-infra-conflict-box');

  if (!posSelect || !startInp || !endInp) return;

  const posId = posSelect.value;
  const startDate = startInp.value || "2026-09-01";
  const endDate = endInp.value || "2026-09-04";

  const check = window.ChronosSupabase.checkPossessionAvailability(posId, startDate, endDate);

  if (!check.available) {
    // Conflict detected!
    if (box) box.className = "p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 space-y-1 text-xs text-rose-300";
    if (verdict) {
      verdict.className = "font-mono text-rose-400 font-bold flex items-center space-x-1";
      verdict.innerHTML = `<i data-lucide="alert-triangle" class="w-3.5 h-3.5 text-rose-400"></i><span>SCHEDULE CONFLICT</span>`;
    }
    if (msg) {
      msg.className = "text-[11px] text-rose-300 leading-tight";
      msg.innerText = check.reason || `Ground is in active use from ${check.conflictRange} for ${check.conflictEvent}! Concurrent equipping is restricted.`;
    }
    if (statusPill) {
      statusPill.className = "text-[11px] font-mono text-rose-400 font-bold flex items-center space-x-1";
      statusPill.innerHTML = `<i data-lucide="ban" class="w-3 h-3 text-rose-400"></i><span>RESTRICTED</span>`;
    }
    if (btn) {
      btn.disabled = true;
      btn.className = "w-full py-2.5 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center space-x-2 transition mt-2 cursor-not-allowed border border-slate-700";
      btn.innerHTML = `<i data-lucide="ban" class="w-3.5 h-3.5"></i><span>Equipping Restricted (Concurrent Conflict)</span>`;
    }
  } else {
    // 100% Available
    if (box) box.className = "p-3 rounded-xl bg-slate-950 border border-sky-900/30 space-y-1.5 text-xs";
    if (verdict) {
      verdict.className = "font-mono text-emerald-400 font-bold flex items-center space-x-1";
      verdict.innerHTML = `<i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i><span>Free / No Schedule Overlap</span>`;
    }
    if (msg) {
      msg.className = "text-[11px] text-slate-400 leading-tight";
      msg.innerText = check.message || `Target ground "${check.possessionName}" has no conflicting event bookings for ${startDate} to ${endDate}.`;
    }
    if (statusPill) {
      statusPill.className = "text-[11px] font-mono text-emerald-400 font-bold flex items-center space-x-1";
      statusPill.innerHTML = `<i data-lucide="check-circle" class="w-3 h-3 text-emerald-400"></i><span>AVAILABLE</span>`;
    }
    if (btn) {
      btn.disabled = false;
      btn.className = "w-full py-2.5 rounded-xl btn-glacier font-bold text-xs flex items-center justify-center space-x-2 transition mt-2";
      btn.innerHTML = `<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Send Infrastructure Order to Srinivasan</span>`;
    }
  }
  lucide.createIcons();
};

// Cross-Role Procurement Handlers (Alicia orders from Srinivasan & Harry)
window.submitOrderToSrinivasan = function() {
  const posSelect = document.getElementById('order-infra-possession');
  const startInp = document.getElementById('order-infra-start');
  const endInp = document.getElementById('order-infra-end');
  const demand = document.getElementById('order-infra-demand')?.value || "65 Feeder Buses + 2,200 Parking Bays";
  const btn = document.getElementById('btn-order-infra');
  
  const posId = posSelect?.value || "pos_nerul_hub";
  const posText = posSelect ? posSelect.options[posSelect.selectedIndex].text.split('(')[0].trim() : "Nerul Multi-Modal Hub";
  const startDate = startInp?.value || "2026-09-01";
  const endDate = endInp?.value || "2026-09-04";

  // Re-check conflict before sending
  const check = window.ChronosSupabase.checkPossessionAvailability(posId, startDate, endDate);
  if (!check.available) {
    alert("CANNOT TRANSMIT ORDER:\n\n" + check.reason);
    return;
  }

  const newReq = {
    id: "req_inf_" + Math.random().toString(36).substr(2, 7),
    eventId: currentActiveEvent.id,
    eventTitle: currentActiveEvent.title || currentActiveEvent.venueName,
    eventHost: "Alicia Stone (Event Master Orchestrator)",
    venue: currentActiveEvent.venueName,
    possessionId: posId,
    possessionName: posText,
    startDate: startDate,
    endDate: endDate,
    timeWindow: "10:00 - 23:00",
    expectedVisitors: currentActiveEvent.expectedVisitors || 50000,
    requestedAsset: posText,
    requestText: demand,
    allocatedCapacity: `Requested for ${startDate} to ${endDate} (10:00-23:00)`,
    status: "PENDING",
    timestamp: new Date().toISOString()
  };

  try {
    const stored = localStorage.getItem('chronos_infra_requests');
    let list = stored ? JSON.parse(stored) : [];
    list.unshift(newReq);
    localStorage.setItem('chronos_infra_requests', JSON.stringify(list));
  } catch (e) {}

  if (btn) {
    btn.className = "w-full py-2.5 rounded-xl badge-sage font-bold text-xs flex items-center justify-center space-x-2 mt-2";
    btn.innerHTML = `<i data-lucide="check-check" class="w-4 h-4"></i><span>Order Transmitted to Srinivasan's Command</span>`;
    btn.disabled = true;
  }

  alert(`Infrastructure request transmitted to Infrastructure Manager (Srinivasan R.)!\n\nTarget Ground: ${posText}\nDates: ${startDate} to ${endDate}\nStatus: Submitted to Srinivasan for Schedule Lock Verification.`);
  lucide.createIcons();
};

window.submitOrderToHarry = function() {
  const serviceType = document.getElementById('order-service-type')?.value || "transport";
  const units = document.getElementById('order-service-units')?.value || "25";
  const btn = document.getElementById('btn-order-service');

  const titles = {
    transport: `${units} Dedicated Feeder Shuttle Buses`,
    security: `${units} Perimeter Security Stewards`,
    cctv: `${units} Optical CCTV Surveillance Nodes`,
    hotel: `${units} Hotel Rooms at Sector 21 Cluster`
  };

  const newServiceReq = {
    id: "req_srv_" + Math.random().toString(36).substr(2, 7),
    eventId: currentActiveEvent.id,
    eventTitle: currentActiveEvent.title || currentActiveEvent.venueName,
    eventHost: "Alicia Stone (Event Master Orchestrator)",
    venue: currentActiveEvent.venueName,
    serviceDomain: serviceType.toUpperCase(),
    requestTitle: titles[serviceType] || `${units} Units of Service`,
    requirements: `Required for ${currentActiveEvent.duration} at Dr. D.Y. Patil Stadium. Hourly rate approved by Alicia.`,
    unitsRequested: parseInt(units),
    status: "ACCEPTED",
    timestamp: new Date().toISOString()
  };

  try {
    const stored = localStorage.getItem('chronos_service_requests');
    let list = stored ? JSON.parse(stored) : [];
    list.unshift(newServiceReq);
    localStorage.setItem('chronos_service_requests', JSON.stringify(list));
  } catch (e) {}

  if (btn) {
    btn.className = "w-full py-2.5 rounded-xl badge-sage font-bold text-xs flex items-center justify-center space-x-2";
    btn.innerHTML = `<i data-lucide="check-check" class="w-4 h-4"></i><span>Contract Confirmed & Staff Assigned by Harry</span>`;
    btn.disabled = true;
  }

  alert(`Service contract successfully issued to Service Manager (Harry Vance)!\n\nService: ${titles[serviceType]}\nUnits Allocated: ${units}\nCommercial Rates: Hourly billing locked in baseline.`);
  lucide.createIcons();
};

document.addEventListener('DOMContentLoaded', () => {
  initPreplansPage();
});
