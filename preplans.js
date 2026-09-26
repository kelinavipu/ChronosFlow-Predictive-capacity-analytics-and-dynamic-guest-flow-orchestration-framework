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
    duration: "4 Days (Sep 26 - Sep 28)",
    startDate: "2026-09-26",
    endDate: "2026-09-28",
    expectedVisitors: 50000,
    venueCapacity: 55000,
    highway: "Sion-Panvel Expressway & Palm Beach Corridor",
    railway: "Harbour Line & Trans-Harbour Suburban Rail",
    status: "BASELINE_LOCKED",
    isLocked: true,
    lat: 19.0435,
    lng: 73.0253,
    gps: "19.0435° N, 73.0253° E (Nerul)",
    description: "Conducting a 4-day cricket match at Dr. D.Y. Patil Stadium in Nerul from 26th September to 28th September with 50,000 spectators attending each day. Out-of-city spectators will arrive via Harbour Line trains and Sion-Panvel Highway, requiring local accommodation, shuttle connectivity, and staged egress management.",
    nodes: [
      { id: "stadium_dypatil", name: "Dr. D.Y. Patil Sports Stadium", category: "stadium", lat: 19.0435, lng: 73.0253, x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Epicenter", capacity: "55,000 Seats", details: "14 Ingress Portals (A to N), 4 internal ramps, 2 broadcast towers.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main event operational container." },
      { id: "rail_nerul", name: "Nerul Railway Station", category: "rail", lat: 19.0330, lng: 73.0185, x: 28, y: 48, dist: "1.8 km", transitTime: "20 min walk / 6 min bus", capacity: "24,000 pax/hr", details: "Major suburban rail junction on Harbour Line & Trans-Harbour Line.", icon: "train", critical: true, stageLink: "stage_03", impact: "Primary mass transit gateway (52% of crowd influx)." },
      { id: "rail_juinagar", name: "Juinagar Railway Station", category: "rail", lat: 19.0550, lng: 73.0160, x: 24, y: 22, dist: "2.4 km", transitTime: "26 min walk / 8 min shuttle", capacity: "14,000 pax/hr", details: "Trans-Harbour feeder connector from Thane & Vashi direction.", icon: "train", critical: false, stageLink: "stage_03", impact: "Secondary rail drop-off." },
      { id: "rail_seawoods", name: "Seawoods Grand Central Station", category: "rail", lat: 19.0215, lng: 73.0180, x: 32, y: 78, dist: "3.1 km", transitTime: "10 min direct shuttle", capacity: "18,000 pax/hr", details: "Integrated modern transit hub & Nexus Seawoods Mall concourse.", icon: "train", critical: false, stageLink: "stage_09", impact: "Optimal southern egress collection point." },
      { id: "hotel_the_park", name: "The Park Navi Mumbai (CBD Belapur)", category: "hotel", lat: 19.0180, lng: 73.0380, x: 74, y: 58, dist: "3.5 km", transitTime: "7 min drive / shuttle", capacity: "80 Luxury Rooms", details: "Boutique 5-star hotel for athletes, officials & VIPs.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "VIP delegation lodging." },
      { id: "hotel_fortune_select", name: "Fortune Select Exotica", category: "hotel", lat: 19.0760, lng: 73.0030, x: 18, y: 12, dist: "6.2 km", transitTime: "12 min highway drive", capacity: "85 Luxury Rooms", details: "Vashi upscale commercial hotel with banquet suites.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "Secondary business cluster." },
      { id: "hotel_nerul_cluster", name: "Nerul Sector 19/21 Hotel Cluster", category: "hotel", lat: 19.0380, lng: 73.0240, x: 42, y: 56, dist: "1.4 km", transitTime: "16 min walk", capacity: "420 Budget Rooms", details: "Budget and mid-tier guest properties within walking radius.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "Immediate local accommodation (100% booked)." },
      { id: "hospital_dypatil", name: "Dr. D.Y. Patil Hospital & Research Centre", category: "hospital", lat: 19.0450, lng: 73.0270, x: 58, y: 44, dist: "0.2 km", transitTime: "2 min direct corridor", capacity: "1,200 Beds & Trauma Unit", details: "On-campus tertiary hospital immediately adjacent to stadium.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Guarantees <3 min emergency triage readiness." },
      { id: "park_stadium_bays", name: "DY Patil North/South Parking", category: "parking", lat: 19.0425, lng: 73.0260, x: 47, y: 56, dist: "0.1 km", transitTime: "Direct Foot Access", capacity: "2,200 Cars / 3,500 Bikes", details: "Reserved for match VIP pass holders, team coaches & ambulances.", icon: "car", critical: true, stageLink: "stage_03", impact: "Secured vehicle perimeter." },
      { id: "park_wonders_park", name: "Wonders Park Public Overflow Parking", category: "parking", lat: 19.0270, lng: 73.0225, x: 38, y: 68, dist: "1.8 km", transitTime: "5 min shuttle loop", capacity: "1,500 Cars", details: "Municipal park-and-ride facility with continuous shuttle frequency.", icon: "car", critical: false, stageLink: "stage_03", impact: "Municipal park-and-ride buffer." },
      { id: "choke_lp_junction", name: "LP Junction (Sion-Panvel Hwy)", category: "choke", lat: 19.0400, lng: 73.0220, x: 52, y: 32, dist: "0.8 km", transitTime: "Pinch Point", capacity: "Severe Bottleneck", details: "Intersection of Sion-Panvel Highway and Nerul East bypass.", icon: "alert-triangle", critical: true, stageLink: "stage_03", impact: "Severe traffic congestion during 10:30-12:00 and 21:45-23:15." }
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
    startDate: "2026-11-20",
    endDate: "2026-11-22",
    expectedVisitors: 33000,
    venueCapacity: 33100,
    highway: "Marine Drive Coastal Corridor",
    railway: "Western Line (Churchgate Terminus)",
    status: "BASELINE_LOCKED",
    isLocked: true,
    lat: 18.9389,
    lng: 72.8258,
    gps: "18.9389° N, 72.8258° E (Churchgate)",
    description: "3-day international cricket tournament at Wankhede Stadium in South Mumbai with 33,000 spectators daily. Attendees arrive via Churchgate and CST suburban trains, requiring coastal traffic diversions and hotel coordination across Nariman Point and Colaba.",
    nodes: [
      { id: "wankhede_core", name: "Wankhede Stadium Core", category: "stadium", lat: 18.9389, lng: 72.8258, x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "33,100 Seats", details: "Gates 1 to 7, Sachin Tendulkar Stand, Garware Pavilion.", icon: "activity", critical: true, stageLink: "stage_06" },
      { id: "rail_churchgate", name: "Churchgate Railway Terminus", category: "rail", lat: 18.9350, lng: 72.8270, x: 38, y: 44, dist: "0.4 km", transitTime: "5 min walk", capacity: "45,000 pax/hr", details: "Western Line terminus handling local fast and slow rakes.", icon: "train", critical: true, stageLink: "stage_03" },
      { id: "rail_csmt", name: "CSMT Central Terminus", category: "rail", lat: 18.9400, lng: 72.8350, x: 70, y: 35, dist: "2.1 km", transitTime: "15 min bus / cab", capacity: "60,000 pax/hr", details: "Central & Harbour line mega terminus connecting eastern suburbs.", icon: "train", critical: false, stageLink: "stage_03" },
      { id: "hotel_taj_mahal", name: "Taj Mahal Palace & Tower (Colaba)", category: "hotel", lat: 18.9217, lng: 72.8332, x: 55, y: 80, dist: "2.8 km", transitTime: "10 min drive", capacity: "285 Luxury Rooms", details: "5-Star heritage flagship hotel for international delegations.", icon: "hotel", critical: false, stageLink: "stage_04" },
      { id: "hotel_trident", name: "Trident & The Oberoi (Nariman Point)", category: "hotel", lat: 18.9270, lng: 72.8210, x: 30, y: 70, dist: "1.4 km", transitTime: "6 min drive", capacity: "550 Luxury Rooms", details: "Nariman Point luxury business property.", icon: "hotel", critical: true, stageLink: "stage_04" }
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
    startDate: "2026-10-24",
    endDate: "2026-10-24",
    expectedVisitors: 100000,
    venueCapacity: 132000,
    highway: "Sabarmati Riverfront Arterial & Gandhinagar Highway",
    railway: "Ahmedabad Metro Line 1 & Sabarmati Junction",
    status: "IN_PLANNING",
    isLocked: false,
    lat: 23.0917,
    lng: 72.5975,
    gps: "23.0917° N, 72.5975° E (Motera)",
    description: "Single-day world championship cricket match with 100,000 spectators arriving between 11 AM and 2 PM. High demand for metro transit, parking plazas, security screening, and post-match stadium egress at 10 PM.",
    nodes: [
      { id: "motera_core", name: "Narendra Modi Stadium Core", category: "stadium", lat: 23.0917, lng: 72.5975, x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "132,000 Seats", details: "World's largest cricket bowl. 4 Entry Gates.", icon: "activity", critical: true },
      { id: "metro_motera", name: "Motera Stadium Metro Station", category: "rail", lat: 23.0900, lng: 72.5940, x: 40, y: 46, dist: "0.3 km", transitTime: "4 min direct foot ramp", capacity: "35,000 pax/hr", details: "Dedicated metro ingress station.", icon: "train", critical: true }
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
    startDate: "2026-12-12",
    endDate: "2026-12-13",
    expectedVisitors: 65000,
    venueCapacity: 68000,
    highway: "Strand Road & Vidyasagar Setu Corridor",
    railway: "Howrah Railway Terminus & Esplanade Metro",
    status: "IN_PLANNING",
    isLocked: false,
    lat: 22.5646,
    lng: 88.3433,
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
    duration: "1 Day (Aug 01 - Aug 02)",
    startDate: "2026-08-01",
    endDate: "2026-08-02",
    expectedVisitors: 85000,
    venueCapacity: 90000,
    highway: "North Circular Road (A406) & M1 Corridor",
    railway: "London Underground (Jubilee & Metropolitan Lines)",
    status: "IN_PLANNING",
    isLocked: false,
    lat: 51.5560,
    lng: -0.2795,
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
    duration: "2 Days (Aug 15 - Aug 16)",
    startDate: "2026-08-15",
    endDate: "2026-08-16",
    expectedVisitors: 20000,
    venueCapacity: 20500,
    highway: "7th & 8th Avenues / Lincoln Tunnel",
    railway: "Penn Station (MTA Subways, LIRR, NJ Transit, Amtrak)",
    status: "IN_PLANNING",
    isLocked: false,
    lat: 40.7505,
    lng: -73.9934,
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

let currentPhaseTabFilter = 'ALL';

function filterEventsByPhase(phase) {
  currentPhaseTabFilter = phase;

  // Update tab button styles
  const tabs = ['all', 'present', 'pre', 'post'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-filter-${t}`);
    if (btn) {
      if (t.toUpperCase() === phase) {
        btn.className = "px-3 py-1.5 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold transition flex items-center space-x-1.5 shadow-sm";
      } else {
        btn.className = "px-3 py-1.5 rounded-xl bg-slate-900/90 text-slate-400 hover:text-white border border-sky-900/40 font-bold transition flex items-center space-x-1.5";
      }
    }
  });

  filterExistingPlans();
}

function renderExistingPlansGrid(plans) {
  const container = document.getElementById('existing-plans-grid');
  if (!container) return;

  if (plans.length === 0) {
    container.innerHTML = `
      <div class="col-span-full glass-panel rounded-3xl p-10 border border-sky-900/40 text-center space-y-2">
        <i data-lucide="inbox" class="w-10 h-10 text-slate-500 mx-auto"></i>
        <h4 class="text-sm font-bold text-white">No events match the selected filter</h4>
        <p class="text-xs text-slate-400">Click '+ Create New Event' above to register a new fixture.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = plans.map(plan => {
    const isLocked = plan.isLocked || plan.status === 'BASELINE_LOCKED';
    const statusBadge = isLocked 
      ? `<span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-sky-500/10 text-sky-300 border border-sky-400/20">LOCKED BASELINE</span>`
      : `<span class="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-900 text-slate-400 border border-sky-900/30">IN PLANNING</span>`;

    const phase = getEventPhase(plan);
    let phaseBadge = '';
    let primaryActionBtn = '';
    let cardClickAction = '';

    if (phase === 'PRE') {
      phaseBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-sky-500/15 text-sky-300 border border-sky-400/30 flex items-center space-x-1"><i data-lucide="calendar" class="w-3 h-3 text-sky-400"></i><span>PRE-EVENT</span></span>`;
      cardClickAction = `openPreEventPossibilitiesModal('${plan.id}')`;
      primaryActionBtn = `
        <button onclick="event.stopPropagation(); openPreEventPossibilitiesModal('${plan.id}')" class="w-full py-2.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30 text-sky-300 text-xs font-bold font-mono flex items-center justify-center space-x-2 transition">
          <i data-lucide="calendar" class="w-3.5 h-3.5 text-sky-400"></i>
          <span>View Possibilities &amp; Services</span>
        </button>
      `;
    } else if (phase === 'PRESENT') {
      phaseBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center space-x-1.5"><span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span><span>PRESENT (LIVE NOW)</span></span>`;
      cardClickAction = `openPresentEventPage('${plan.id}')`;
      primaryActionBtn = `
        <button onclick="event.stopPropagation(); openPresentEventPage('${plan.id}')" class="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-500/30 to-sky-500/30 hover:from-rose-500/40 hover:to-sky-500/40 border border-rose-500/50 text-white text-xs font-bold font-mono flex items-center justify-center space-x-2 transition shadow-lg shadow-rose-950/50">
          <span class="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
          <span>⚡ Launch Live Ops Command &amp; CCTV &rarr;</span>
        </button>
      `;
    } else {
      phaseBadge = `<span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center space-x-1"><i data-lucide="archive" class="w-3 h-3 text-purple-400"></i><span>POST-EVENT</span></span>`;
      cardClickAction = `openPostEventSummaryModal('${plan.id}')`;
      primaryActionBtn = `
        <button onclick="event.stopPropagation(); openPostEventSummaryModal('${plan.id}')" class="w-full py-2.5 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-300 text-xs font-bold font-mono flex items-center justify-center space-x-2 transition">
          <i data-lucide="file-check" class="w-3.5 h-3.5 text-purple-400"></i>
          <span>View Post-Event Summary Audit</span>
        </button>
      `;
    }

    const nodesCount = plan.nodes ? plan.nodes.length : 11;
    const hotelCount = plan.nodes ? plan.nodes.filter(n => n.category === 'hotel').length : 3;
    const railCount = plan.nodes ? plan.nodes.filter(n => n.category === 'rail').length : 3;

    return `
      <div onclick="${cardClickAction}" class="glass-card-interactive rounded-3xl p-5 border border-sky-900/40 flex flex-col justify-between hover:border-sky-400/60 transition group space-y-4 cursor-pointer relative overflow-hidden shadow-xl">
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase text-sky-400 font-bold">${plan.eventType || 'Mega Event'}</span>
            <div class="flex items-center space-x-1.5">
              ${phaseBadge}
              ${statusBadge}
            </div>
          </div>

          <div>
            <h3 class="text-base font-bold text-white group-hover:text-cyan-300 transition leading-tight">
              ${plan.title || plan.venueName}
            </h3>
            <div class="flex items-center space-x-1.5 text-xs text-slate-400 mt-1">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-sky-400"></i>
              <span>${plan.venueArea || plan.venueName}, ${plan.city}</span>
            </div>
          </div>

          <!-- Quick Metrics Bar -->
          <div class="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-slate-950/80 border border-sky-900/30 text-center text-xs">
            <div>
              <div class="text-[10px] text-slate-400 uppercase">Attendees</div>
              <div class="font-mono font-bold text-white">${(plan.expectedVisitors || 50000).toLocaleString()}</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400 uppercase">Hotels Mapped</div>
              <div class="font-mono font-bold text-sky-300">${hotelCount} Clusters</div>
            </div>
            <div>
              <div class="text-[10px] text-slate-400 uppercase">Transit Hubs</div>
              <div class="font-mono font-bold text-emerald-400">${railCount} Stations</div>
            </div>
          </div>

          <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            ${plan.description || 'Pre-planning operational blueprint, simulated micro-area traffic vectors, and services ledger.'}
          </p>
        </div>

        <div class="space-y-2 pt-2 border-t border-sky-950/80" onclick="event.stopPropagation();">
          ${primaryActionBtn}

          <div class="flex items-center justify-between text-xs pt-1">
            <button onclick="openEventLifecycleCommand('${plan.id}')" class="text-cyan-400 hover:text-cyan-300 text-[11px] font-mono flex items-center space-x-1">
              <i data-lucide="crosshair" class="w-3 h-3"></i>
              <span>Lifecycle Mission Control &rarr;</span>
            </button>
            <button onclick="exportSinglePlanJSON('${plan.id}')" class="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-900/30" title="Export Plan JSON">
              <i data-lucide="download" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function filterExistingPlans() {
  const query = document.getElementById('plan-search-input')?.value.toLowerCase() || '';

  const filtered = allExistingPlans.filter(p => {
    const matchText = (p.title + ' ' + p.venueName + ' ' + (p.venueArea || '') + ' ' + p.city).toLowerCase().includes(query);
    if (!matchText) return false;

    if (currentPhaseTabFilter !== 'ALL') {
      const phase = getEventPhase(p);
      if (phase !== currentPhaseTabFilter) return false;
    }
    return true;
  });

  renderExistingPlansGrid(filtered);
}

// =========================================================================
// MODAL & PHASE ACTION HELPERS
// =========================================================================
window.openPresentEventPage = function(eventId) {
  window.location.href = `current-events.html?event=${eventId}`;
};

window.openPostEventSummaryModal = function(eventId) {
  const event = allExistingPlans.find(p => p.id === eventId) || VENUE_CATALOG[eventId] || VENUE_CATALOG.wembley_london;
  const modal = document.getElementById('post-event-summary-modal');
  const title = document.getElementById('modal-post-title');
  const att = document.getElementById('modal-post-attendance');

  if (title) title.innerText = `${event.title || event.venueName} — Post-Event Performance & Safety Audit`;
  if (att) att.innerText = (event.expectedVisitors ? Math.round(event.expectedVisitors * 0.984).toLocaleString() : '49,210');

  if (modal) modal.classList.remove('hidden');
};

window.closePostEventModal = function() {
  document.getElementById('post-event-summary-modal')?.classList.add('hidden');
};

window.openPreEventPossibilitiesModal = function(eventId) {
  const event = allExistingPlans.find(p => p.id === eventId) || VENUE_CATALOG[eventId] || VENUE_CATALOG.wankhede_mumbai;
  const modal = document.getElementById('pre-event-possibilities-modal');
  const title = document.getElementById('modal-pre-title');

  if (title) title.innerText = `${event.title || event.venueName} — Services, Visitors Roster & Predictive Inferences`;
  if (modal) modal.classList.remove('hidden');
};

window.closePreEventModal = function() {
  document.getElementById('pre-event-possibilities-modal')?.classList.add('hidden');
};

window.openCreateNewEventModal = function() {
  document.getElementById('create-new-event-modal')?.classList.remove('hidden');
};

window.closeCreateNewEventModal = function() {
  document.getElementById('create-new-event-modal')?.classList.add('hidden');
};

window.handleCreateNewEvent = function(e) {
  e.preventDefault();
  const title = document.getElementById('new-evt-title').value;
  const venue = document.getElementById('new-evt-venue').value;
  const city = document.getElementById('new-evt-city').value;
  const start = document.getElementById('new-evt-start').value;
  const end = document.getElementById('new-evt-end').value;
  const visitors = parseInt(document.getElementById('new-evt-visitors').value) || 50000;
  const capacity = parseInt(document.getElementById('new-evt-capacity').value) || 55000;

  const newId = "evt_" + Math.random().toString(36).substr(2, 7);
  const newEvent = {
    id: newId,
    title: title,
    venueName: venue,
    venueArea: venue,
    city: city,
    eventType: "Mega Event",
    startDate: start,
    endDate: end,
    expectedVisitors: visitors,
    venueCapacity: capacity,
    status: "IN_PLANNING",
    lat: 19.0435, lng: 73.0253,
    description: `Official pre-plan registered for ${title} at ${venue}, ${city}. Includes multi-modal transit and crowd simulation.`
  };

  allExistingPlans.unshift(newEvent);
  closeCreateNewEventModal();
  showToast(`New Event '${title}' registered successfully! Phase auto-assigned.`);
  filterExistingPlans();
};

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

// =========================================================================
// REAL HIGH-RESOLUTION SATELLITE DIGITAL TWIN ENGINE (ESRI WORLD IMAGERY)
// =========================================================================
let satelliteTwinMap = null;
let satelliteImageryLayer = null;
let satelliteHybridLayer = null;
let satelliteMarkersGroup = null;
let showGeofence = true;
let currentSatelliteMode = 'imagery'; // 'imagery' or 'hybrid'

function initSatelliteTwinMap() {
  const container = document.getElementById('satellite-twin-map');
  if (!container || typeof L === 'undefined') return;

  if (satelliteTwinMap) {
    satelliteTwinMap.remove();
    satelliteTwinMap = null;
  }

  const centerLat = currentActiveEvent.lat || 19.0435;
  const centerLng = currentActiveEvent.lng || 73.0253;

  satelliteTwinMap = L.map('satellite-twin-map', {
    center: [centerLat, centerLng],
    zoom: 14,
    minZoom: 11,
    maxZoom: 19,
    zoomControl: false,
    attributionControl: false
  });

  L.control.zoom({ position: 'topright' }).addTo(satelliteTwinMap);

  // ESRI World Imagery Base (True Earth Orthophoto)
  satelliteImageryLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics'
  }).addTo(satelliteTwinMap);

  // ESRI Reference Overlay (Highways, Roads & Labels)
  satelliteHybridLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    opacity: 0.85
  });

  if (currentSatelliteMode === 'hybrid') {
    satelliteHybridLayer.addTo(satelliteTwinMap);
  }

  satelliteMarkersGroup = L.layerGroup().addTo(satelliteTwinMap);

  const hudCenter = document.getElementById('sat-hud-center');
  if (hudCenter) hudCenter.innerText = `${centerLat.toFixed(4)}° N, ${centerLng.toFixed(4)}° E`;

  window.satelliteMap = satelliteTwinMap;
}

window.toggleSatelliteLayer = function(mode) {
  if (!satelliteTwinMap) return;
  currentSatelliteMode = mode;

  const btnPure = document.getElementById('btn-sat-pure');
  const btnHybrid = document.getElementById('btn-sat-hybrid');

  if (mode === 'hybrid') {
    if (!satelliteTwinMap.hasLayer(satelliteHybridLayer)) {
      satelliteHybridLayer.addTo(satelliteTwinMap);
    }
    if (btnHybrid) btnHybrid.className = "px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold transition";
    if (btnPure) btnPure.className = "px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-sky-900/30 font-medium transition";
  } else {
    if (satelliteTwinMap.hasLayer(satelliteHybridLayer)) {
      satelliteTwinMap.removeLayer(satelliteHybridLayer);
    }
    if (btnPure) btnPure.className = "px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold transition";
    if (btnHybrid) btnHybrid.className = "px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-sky-900/30 font-medium transition";
  }
};

window.toggle5kmGeofence = function() {
  showGeofence = !showGeofence;
  const btn = document.getElementById('btn-toggle-geofence');
  if (btn) {
    btn.className = showGeofence ? 
      "px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold transition" : 
      "px-2.5 py-1 rounded-lg bg-slate-950 text-slate-400 hover:text-white border border-sky-900/30 font-medium transition";
  }
  renderSatelliteMarkers();
};

window.recenterSatelliteMap = function() {
  if (!satelliteTwinMap || !currentActiveEvent) return;
  const centerLat = currentActiveEvent.lat || 19.0435;
  const centerLng = currentActiveEvent.lng || 73.0253;
  satelliteTwinMap.flyTo([centerLat, centerLng], 14, { duration: 1.2 });
};

function renderSatelliteMarkers() {
  if (!satelliteTwinMap || !satelliteMarkersGroup) return;
  satelliteMarkersGroup.clearLayers();

  const centerLat = currentActiveEvent.lat || 19.0435;
  const centerLng = currentActiveEvent.lng || 73.0253;

  // 5km Geofence Radius Circle Overlay
  if (showGeofence) {
    const geofenceCircle = L.circle([centerLat, centerLng], {
      radius: 5000,
      color: '#38bdf8',
      weight: 1.5,
      dashArray: '6, 6',
      fillColor: '#38bdf8',
      fillOpacity: 0.04
    }).addTo(satelliteMarkersGroup);
    geofenceCircle.bindTooltip("5.0 km Tactical Catchment Geofence", { permanent: false, direction: 'top' });

    // Inner 2.5km core zone
    L.circle([centerLat, centerLng], {
      radius: 2500,
      color: '#0284c7',
      weight: 1,
      dashArray: '3, 4',
      fillColor: '#0284c7',
      fillOpacity: 0.02
    }).addTo(satelliteMarkersGroup);
  }

  // Filter nodes
  const filteredNodes = currentTwinNodes.filter(node => {
    if (currentActiveFilter === 'all') return true;
    return node.category === currentActiveFilter;
  });

  const catColors = {
    stadium: '#38bdf8',
    rail: '#7dd3fc',
    hotel: '#38bdf8',
    hospital: '#f87171',
    parking: '#34d399',
    choke: '#f87171'
  };

  const catIcons = {
    stadium: '🏟️',
    rail: '🚆',
    hotel: '🏨',
    hospital: '🏥',
    parking: '🅿️',
    choke: '⚠️'
  };

  filteredNodes.forEach(node => {
    const isSelected = node.id === currentSelectedPinId;
    const color = catColors[node.category] || '#38bdf8';
    const iconEmoji = catIcons[node.category] || '📍';
    const lat = node.lat || (centerLat + ((node.y - 50) * 0.0006));
    const lng = node.lng || (centerLng + ((node.x - 50) * 0.0006));

    const htmlIcon = L.divIcon({
      className: 'custom-sat-icon',
      html: `
        <div class="satellite-tactical-pin ${isSelected ? 'active-pin scale-110' : ''}">
          <div class="satellite-pin-beacon" style="background: rgba(15, 23, 42, 0.9); border: 2px solid ${color}; color: ${color};">
            ${isSelected ? `<span class="satellite-pin-pulse" style="border-color: ${color};"></span>` : ''}
            <span>${iconEmoji}</span>
          </div>
          <div class="satellite-pin-tag" style="border-color: ${color}66;">
            ${node.name.length > 22 ? node.name.substring(0, 20) + '...' : node.name}
          </div>
        </div>
      `,
      iconSize: [120, 50],
      iconAnchor: [60, 25]
    });

    const marker = L.marker([lat, lng], { icon: htmlIcon });
    
    marker.on('click', () => {
      selectPinNode(node.id);
    });

    marker.bindPopup(`
      <div class="space-y-1.5 p-1 text-xs">
        <div class="flex items-center justify-between gap-3">
          <span class="font-mono text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-300">${node.category.toUpperCase()}</span>
          <span class="font-mono text-emerald-400 font-bold">${node.dist}</span>
        </div>
        <div class="font-bold text-white text-sm">${node.name}</div>
        <div class="text-[11px] text-slate-300">${node.details || ''}</div>
        <div class="pt-1 text-[10px] font-mono text-sky-400">Capacity: ${node.capacity || 'N/A'}</div>
      </div>
    `);

    marker.addTo(satelliteMarkersGroup);
  });

  renderSelectedPinTelemetry();
}

function renderRadar() {
  if (!satelliteTwinMap) {
    initSatelliteTwinMap();
  } else {
    const centerLat = currentActiveEvent.lat || 19.0435;
    const centerLng = currentActiveEvent.lng || 73.0253;
    satelliteTwinMap.setView([centerLat, centerLng], 14);
  }
  renderSatelliteMarkers();

  // Update titles
  const titleEl = document.getElementById('digital-twin-title');
  const subEl = document.getElementById('digital-twin-subtitle');
  if (titleEl) titleEl.innerHTML = `<i data-lucide="satellite" class="w-5 h-5 text-sky-400"></i><span>${currentActiveEvent.venueArea || currentActiveEvent.venueName} Satellite Twin</span>`;
  if (subEl) subEl.innerText = `High-resolution ESRI Earth Observation Imagery mapped within 5km radius of ${currentActiveEvent.venueName}: hotels, railway hubs, trauma centers, and highway corridors.`;

  lucide.createIcons();
}

window.selectPinNode = function(pinId) {
  currentSelectedPinId = pinId;
  const node = currentTwinNodes.find(n => n.id === pinId);
  if (node && satelliteTwinMap) {
    const lat = node.lat || currentActiveEvent.lat || 19.0435;
    const lng = node.lng || currentActiveEvent.lng || 73.0253;
    satelliteTwinMap.flyTo([lat, lng], 16, { duration: 1.0 });
  }
  renderSatelliteMarkers();
};

window.filterTwinNodes = function(cat) {
  currentActiveFilter = cat;
  document.querySelectorAll('.twin-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === cat) {
      btn.className = "twin-filter-btn px-2.5 py-1 rounded-lg btn-glacier font-bold text-[11px]";
    } else {
      btn.className = "twin-filter-btn px-2.5 py-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white text-[11px]";
    }
  });
  renderSatelliteMarkers();
};

function renderSelectedPinTelemetry() {
  const container = document.getElementById('pin-inspector-panel') || document.getElementById('selected-pin-telemetry');
  if (!container) return;

  const node = currentTwinNodes.find(n => n.id === currentSelectedPinId) || currentTwinNodes[0];
  if (!node) return;

  container.innerHTML = `
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-3 border-b border-sky-950/60">
        <div>
          <span class="text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded badge-slate">
            ${node.category.toUpperCase()} ASSET
          </span>
          <h4 class="text-base font-bold text-white mt-1 leading-snug">${node.name}</h4>
        </div>
        <div class="text-right">
          <div class="text-xs font-mono text-sky-400 font-bold">${node.dist}</div>
          <div class="text-[10px] text-slate-400 font-mono">Radius Offset</div>
        </div>
      </div>

      <!-- Real Satellite Coordinates HUD -->
      <div class="p-3 rounded-xl bg-slate-950/80 border border-sky-900/40 space-y-1.5 font-mono text-xs">
        <div class="text-[10px] uppercase text-slate-400 flex items-center justify-between">
          <span>Satellite Geolocation</span>
          <span class="text-emerald-400 font-bold">LOCKED</span>
        </div>
        <div class="text-white font-bold">${node.lat ? node.lat.toFixed(4) : (currentActiveEvent.lat || 19.0435)}° N, ${node.lng ? node.lng.toFixed(4) : (currentActiveEvent.lng || 73.0253)}° E</div>
        <div class="text-[11px] text-sky-300">${node.transitTime || 'Transit Gateway'}</div>
      </div>

      <!-- Capacity & Telemetry Details -->
      <div class="space-y-2 text-xs">
        <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-sky-950">
          <span class="text-slate-400">Capacity / Spec:</span>
          <span class="font-mono font-bold text-white">${node.capacity || 'N/A'}</span>
        </div>
        <div class="p-3 rounded-xl bg-slate-900 border border-sky-950 text-slate-300 leading-relaxed text-[11px]">
          ${node.details || 'Operational infrastructure node mapped in 5km high-resolution satellite twin.'}
        </div>
      </div>

      <!-- Fly to Asset on Satellite Map Button -->
      <button onclick="selectPinNode('${node.id}')" class="w-full py-2.5 rounded-xl btn-glacier font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-sky-950/40">
        <i data-lucide="crosshair" class="w-3.5 h-3.5"></i>
        <span>Center Satellite View on Asset</span>
      </button>
    </div>
  `;
  lucide.createIcons();
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
let currentTrackerFilter = 'all';

window.populateInfraPossessionsDropdown = async function() {
  const select = document.getElementById('order-infra-possession');
  if (!select || !window.ChronosSupabase) return;
  const currentVal = select.value;
  const possessions = await window.ChronosSupabase.getInfraPossessions();
  if (possessions && possessions.length > 0) {
    select.innerHTML = possessions.map(p => `
      <option value="${p.id}" ${p.id === currentVal ? 'selected' : ''}>
        ${p.name} (${Number(p.landAreaSqFt || 100000).toLocaleString()} sq ft &bull; ${p.gatesCount || 4} Gates)
      </option>
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
  const demand = document.getElementById('order-infra-demand')?.value || "Allocate 65 feeder CNG loop shuttles + reserve 2,200 parking bays for fixture";
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

  const activeEvt = currentActiveEvent || (typeof allExistingPlans !== 'undefined' && allExistingPlans[0]) || VENUE_CATALOG.dypatil_nerul;

  const newReq = {
    id: "req_inf_" + Math.random().toString(36).substr(2, 7),
    eventId: activeEvt.id || "dypatil_nerul",
    eventTitle: activeEvt.title || activeEvt.venueName || "Championship Trophy: 4-Day Mega Cricket Fixture",
    eventHost: "Alicia Stone (Event Master Orchestrator)",
    venue: activeEvt.venueName || "Dr. D.Y. Patil Sports Stadium",
    possessionId: posId,
    possessionName: posText,
    startDate: startDate,
    endDate: endDate,
    timeWindow: "10:00 - 23:00",
    expectedVisitors: activeEvt.expectedVisitors || 50000,
    requestedAsset: posText,
    requestText: demand,
    allocatedCapacity: `Requested for ${startDate} to ${endDate} (10:00-23:00)`,
    status: "PENDING",
    responseNotes: "Dispatched to Infrastructure Command. Awaiting schedule lock verification by Srinivasan R.",
    timestamp: new Date().toISOString()
  };

  try {
    const stored = localStorage.getItem('chronos_infra_requests');
    let list = stored ? JSON.parse(stored) : [];
    list.unshift(newReq);
    localStorage.setItem('chronos_infra_requests', JSON.stringify(list));
  } catch (e) {}

  // Dispatch real-time synchronization event for inter-tab reactivity
  window.dispatchEvent(new CustomEvent('chronos:infra_sync', { detail: { newReq, action: 'order_submitted' } }));

  if (btn) {
    btn.className = "w-full py-2.5 rounded-xl badge-sage font-bold text-xs flex items-center justify-center space-x-2 mt-2";
    btn.innerHTML = `<i data-lucide="check-check" class="w-4 h-4"></i><span>Order Transmitted to Srinivasan's Command</span>`;
    setTimeout(() => {
      btn.className = "w-full py-2.5 rounded-xl btn-glacier font-bold text-xs flex items-center justify-center space-x-2 transition mt-2";
      btn.innerHTML = `<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Send Infrastructure Order to Srinivasan</span>`;
    }, 3000);
  }

  // Toast feedback
  const toast = document.getElementById('em-toast');
  const toastMsg = document.getElementById('em-toast-msg');
  if (toast && toastMsg) {
    toastMsg.innerText = `✓ Infrastructure order transmitted to Srinivasan R.! Schedule lock telemetry active for "${posText}".`;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 4000);
  }

  // Refresh live tracking panel
  window.renderEventInfraRequestsTracker();
  lucide.createIcons();
};

window.submitOrderToHarry = function() {
  const serviceType = document.getElementById('order-service-type')?.value || "transport";
  const units = document.getElementById('order-service-units')?.value || "25";
  const demand = document.getElementById('order-service-demand')?.value || "Deploy 35 satellite F&B hydration kiosks + 8 cooling misting tents at Gates 2, 4, 7";
  const btn = document.getElementById('btn-order-services');

  const titles = {
    transport: `${units} Dedicated Feeder Shuttle Buses`,
    security: `${units} Perimeter Security Stewards`,
    cctv: `${units} Optical CCTV Surveillance Nodes`,
    hotel: `${units} Hotel Rooms at Sector 21 Cluster`
  };

  const activeEvt = currentActiveEvent || (typeof allExistingPlans !== 'undefined' && allExistingPlans[0]) || VENUE_CATALOG.dypatil_nerul;

  const newServiceReq = {
    id: "req_srv_" + Math.random().toString(36).substr(2, 7),
    eventId: activeEvt.id || "dypatil_nerul",
    eventTitle: activeEvt.title || activeEvt.venueName || "Championship Trophy: 4-Day Mega Cricket Fixture",
    eventHost: "Alicia Stone (Event Master Orchestrator)",
    venue: activeEvt.venueName || "Dr. D.Y. Patil Sports Stadium",
    serviceDomain: serviceType.toUpperCase(),
    requestTitle: titles[serviceType] || `${units} Units of Service`,
    requirements: demand,
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
    setTimeout(() => {
      btn.className = "w-full py-2.5 rounded-xl btn-glacier font-bold text-xs flex items-center justify-center space-x-2 transition";
      btn.innerHTML = `<i data-lucide="send" class="w-3.5 h-3.5"></i><span>Send Services RFP to Harry</span>`;
    }, 3000);
  }

  // Toast feedback
  const toast = document.getElementById('em-toast');
  const toastMsg = document.getElementById('em-toast-msg');
  if (toast && toastMsg) {
    toastMsg.innerText = `✓ Service contract registered with Harry Vance! (${titles[serviceType]})`;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 4000);
  }

  lucide.createIcons();
};

// =========================================================================
// ACTIVE INFRASTRUCTURE PROCUREMENT & SCHEDULE LOCK TRACKER (CONNECTED TO SRINIVASAN)
// =========================================================================
window.filterEventInfraRequests = function(filter) {
  currentTrackerFilter = filter;
  const pills = document.querySelectorAll('.em-tracker-filter-btn');
  pills.forEach(p => {
    if (p.getAttribute('data-filter') === filter) {
      p.className = "em-tracker-filter-btn px-3 py-1.5 rounded-xl btn-glacier font-bold text-xs";
    } else {
      p.className = "em-tracker-filter-btn px-3 py-1.5 rounded-xl bg-slate-900 text-slate-400 hover:text-white text-xs border border-sky-950";
    }
  });
  window.renderEventInfraRequestsTracker(filter);
};

window.renderEventInfraRequestsTracker = async function(filter = currentTrackerFilter) {
  const container = document.getElementById('em-procurement-tracker-container');
  if (!container) return;

  let requests = [];
  try {
    const stored = localStorage.getItem('chronos_infra_requests');
    if (stored) {
      requests = JSON.parse(stored);
    } else if (window.ChronosSupabase) {
      const data = await window.ChronosSupabase.getInfraData();
      requests = data.requests || [];
    }
  } catch (e) {}

  let possessions = [];
  if (window.ChronosSupabase) {
    possessions = await window.ChronosSupabase.getInfraPossessions();
  }

  // Update counts
  const totalCount = requests.length;
  const approvedCount = requests.filter(r => r.status === 'APPROVED').length;
  const pendingCount = requests.filter(r => r.status === 'PENDING').length;
  const conflictCount = requests.filter(r => r.status === 'RESTRICTED' || r.status === 'DECLINED').length;

  const elAll = document.getElementById('em-tracker-count-all');
  const elApp = document.getElementById('em-tracker-count-approved');
  const elPen = document.getElementById('em-tracker-count-pending');
  const elCon = document.getElementById('em-tracker-count-conflict');

  if (elAll) elAll.innerText = totalCount;
  if (elApp) elApp.innerText = approvedCount;
  if (elPen) elPen.innerText = pendingCount;
  if (elCon) elCon.innerText = conflictCount;

  // Filter requests
  let filtered = requests;
  if (filter === 'APPROVED') {
    filtered = requests.filter(r => r.status === 'APPROVED');
  } else if (filter === 'PENDING') {
    filtered = requests.filter(r => r.status === 'PENDING');
  } else if (filter === 'RESTRICTED') {
    filtered = requests.filter(r => r.status === 'RESTRICTED' || r.status === 'DECLINED');
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="p-8 rounded-2xl bg-slate-950/80 border border-sky-900/30 text-center space-y-2">
        <i data-lucide="inbox" class="w-8 h-8 text-slate-500 mx-auto"></i>
        <div class="text-sm font-bold text-slate-300">No Infrastructure Orders Match Filter (${filter})</div>
        <p class="text-xs text-slate-500 max-w-md mx-auto">Submit an order using the form above to request land, perimeter gates, and parking bays from Srinivasan R.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(req => {
    const isApproved = req.status === 'APPROVED';
    const isPending = req.status === 'PENDING';
    const isConflict = req.status === 'RESTRICTED' || req.status === 'DECLINED';

    const matchedPos = possessions.find(p => p.id === req.possessionId) || {
      name: req.possessionName || req.requestedAsset || "Synthetic Sports Ground",
      gatesCount: 3,
      landAreaSqFt: 480000,
      nocDocNumber: "NOC-MH-CIDCO-STAD-2026-45K"
    };

    return `
      <div class="dark-panel rounded-2xl p-5 border ${isApproved ? 'border-emerald-500/40 bg-emerald-950/10' : isPending ? 'border-amber-500/40 bg-amber-950/10' : 'border-rose-500/40 bg-rose-950/10'} space-y-4 transition">
        
        <!-- Order Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sky-950/60 pb-3">
          <div class="flex flex-wrap items-center gap-2">
            ${isApproved ? `
              <span class="badge-sage px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                <i data-lucide="check-check" class="w-3.5 h-3.5 text-emerald-300"></i>
                <span>APPROVED &amp; SCHEDULE LOCKED</span>
              </span>
            ` : isPending ? `
              <span class="badge-amber px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span>AWAITING SRINIVASAN'S REVIEW</span>
              </span>
            ` : `
              <span class="badge-coral px-2.5 py-0.5 rounded text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-300"></i>
                <span>RESTRICTED / SCHEDULE OVERLAP</span>
              </span>
            `}
            <span class="text-xs text-slate-400 font-mono">&bull; Order ID: <strong class="text-slate-200">${req.id}</strong></span>
            <span class="text-xs text-slate-400 font-mono">&bull; ${new Date(req.timestamp).toLocaleDateString()} ${new Date(req.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div class="text-xs font-mono text-sky-400 font-bold flex items-center space-x-1">
            <span class="text-slate-400">Target Ground:</span>
            <span class="text-white">${matchedPos.name || req.possessionName}</span>
          </div>
        </div>

        <!-- Order Spec Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div class="md:col-span-2 space-y-1.5">
            <h4 class="text-base font-bold text-white">${req.eventTitle}</h4>
            <div class="text-slate-400 flex flex-wrap items-center gap-1.5">
              <span>Host: <strong class="text-slate-200">${req.eventHost}</strong></span>
              <span>&bull;</span>
              <span>Venue: <strong class="text-slate-200">${req.venue}</strong></span>
            </div>
            <div class="p-3 rounded-xl bg-slate-950/70 border border-sky-950 space-y-1 mt-1">
              <div class="text-[10px] font-mono text-slate-400 uppercase">Procured Allocation Demand</div>
              <p class="text-slate-200 leading-relaxed text-[11px] font-mono">${req.requestText}</p>
            </div>
          </div>

          <!-- Time Window & Capacity -->
          <div class="p-3.5 rounded-xl bg-slate-950/90 border border-sky-950 space-y-2 font-mono text-[11px]">
            <div class="text-[10px] text-slate-400 uppercase tracking-wider">Locked Schedule Window</div>
            <div class="font-bold text-sky-300">${req.startDate || '2026-09-01'} &rarr; ${req.endDate || '2026-09-04'}</div>
            <div class="text-slate-300">Daily Operating Window: <strong class="text-white">${req.timeWindow || '10:00 - 23:00'}</strong></div>
            <div class="text-emerald-400 font-bold flex items-center space-x-1">
              <i data-lucide="users" class="w-3.5 h-3.5"></i>
              <span>${req.expectedVisitors ? Number(req.expectedVisitors).toLocaleString() : '50,000'} Expected Pax</span>
            </div>
            <div class="pt-1.5 border-t border-sky-950/60 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Perimeter Gates:</span>
              <span class="text-white font-bold">${matchedPos.gatesCount || 3} Ingress Gates</span>
            </div>
          </div>
        </div>

        <!-- Telemetry & Decision Status Banner -->
        ${isApproved ? `
          <div class="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-start space-x-3">
            <i data-lucide="shield-check" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i>
            <div class="space-y-1">
              <div class="font-bold text-emerald-200 flex items-center space-x-2">
                <span>SCHEDULE LOCKED BY SRINIVASAN R. (INFRASTRUCTURE MANAGER)</span>
                <span class="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-500/20 text-emerald-300">BINDING NOC ACTIVE</span>
              </div>
              <p class="text-[11px] text-emerald-300/90 leading-relaxed">${req.responseNotes || 'Approved and schedule locked by Srinivasan R. All conflicting reservations have been restricted for your event dates.'}</p>
              <div class="flex flex-wrap items-center gap-3 pt-1 text-[10px] font-mono text-emerald-400">
                <span>&bull; CIDCO NOC: ${matchedPos.nocDocNumber || 'NOC-MH-CIDCO-STAD-2026-45K'}</span>
                <span>&bull; Security &amp; Evacuation Clearance: Certified</span>
                <span>&bull; Direct Ingress Granted: Gates A, B, C</span>
              </div>
            </div>
          </div>
        ` : isPending ? `
          <div class="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-start space-x-3">
            <i data-lucide="clock" class="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse"></i>
            <div class="space-y-1">
              <div class="font-bold text-amber-200">AWAITING INFRASTRUCTURE MANAGER ACCEPTANCE</div>
              <p class="text-[11px] text-amber-300/90 leading-relaxed">Dispatched to Srinivasan's Infrastructure Command. Time-conflict pre-check is CLEAR (0 overlap conflicts). Srinivasan will review and commit the schedule lock in his dashboard.</p>
              <div class="text-[10px] font-mono text-amber-400/80 pt-0.5">Action pending in Srinivasan's dashboard: "Accept &amp; Lock Schedule"</div>
            </div>
          </div>
        ` : `
          <div class="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 flex items-start space-x-3">
            <i data-lucide="alert-octagon" class="w-5 h-5 text-rose-400 shrink-0 mt-0.5"></i>
            <div class="space-y-1">
              <div class="font-bold text-rose-200">SCHEDULE CONFLICT / RESTRICTED BY SRINIVASAN</div>
              <p class="text-[11px] text-rose-300/90 leading-relaxed">${req.responseNotes || 'Ground is currently booked by a concurrent event fixture during this window. Concurrent equipping is restricted.'}</p>
              <div class="text-[10px] font-mono text-rose-400/80 pt-0.5">Resolution: Revise requested dates or select an alternate open ground (e.g. Nerul Hub or Wonders Park).</div>
            </div>
          </div>
        `}

        <!-- Actions Footer -->
        <div class="pt-3 border-t border-sky-950/60 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div class="text-slate-400 text-[11px] flex items-center space-x-1.5">
            <i data-lucide="file-check" class="w-3.5 h-3.5 text-sky-400"></i>
            <span>NOC Authority: CIDCO Navi Mumbai Fire Directorate</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button onclick="openSpatialGateModal('${req.possessionId || 'pos_dypatil_ground'}')" class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-sky-300 hover:text-white border border-sky-900/40 text-xs flex items-center space-x-1.5 transition">
              <i data-lucide="shield-alert" class="w-3.5 h-3.5 text-sky-400"></i>
              <span>View Spatial Gate Blueprint &amp; NOC</span>
            </button>

            ${isPending ? `
              <button onclick="simulateSrinivasanAccept('${req.id}')" class="px-3.5 py-1.5 rounded-xl btn-glacier font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-sky-950" title="Simulate Srinivasan clicking Accept in his dashboard">
                <i data-lucide="check" class="w-3.5 h-3.5"></i>
                <span>Instant Lock (Srinivasan)</span>
              </button>
              <button onclick="cancelEventInfraRequest('${req.id}')" class="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-sky-950 text-xs transition">
                Cancel Order
              </button>
            ` : isApproved ? `
              <button onclick="exportGatePermit('${req.id}')" class="px-3.5 py-1.5 rounded-xl badge-sage font-bold text-xs flex items-center space-x-1.5">
                <i data-lucide="download" class="w-3.5 h-3.5"></i>
                <span>Export Gate Clearance Permit</span>
              </button>
              <button onclick="simulateSrinivasanRevoke('${req.id}')" class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-sky-950 text-xs transition" title="Simulate Srinivasan revoking approval">
                Revoke Lock
              </button>
            ` : `
              <button onclick="switchEMSection('em-sec-procure')" class="px-3.5 py-1.5 rounded-xl btn-glacier font-bold text-xs flex items-center space-x-1.5">
                <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i>
                <span>Re-Submit with Alternate Dates</span>
              </button>
            `}
          </div>
        </div>

      </div>
    `;
  }).join('');

  lucide.createIcons();
};

window.cancelEventInfraRequest = function(reqId) {
  try {
    const stored = localStorage.getItem('chronos_infra_requests');
    if (!stored) return;
    let list = JSON.parse(stored);
    list = list.filter(r => r.id !== reqId);
    localStorage.setItem('chronos_infra_requests', JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('chronos:infra_sync', { detail: { reqId, action: 'order_cancelled' } }));
    window.renderEventInfraRequestsTracker();
    
    const toast = document.getElementById('em-toast');
    const toastMsg = document.getElementById('em-toast-msg');
    if (toast && toastMsg) {
      toastMsg.innerText = `Infrastructure order ${reqId} has been cancelled.`;
      toast.classList.remove('hidden');
      setTimeout(() => { toast.classList.add('hidden'); }, 3000);
    }
  } catch (e) {}
};

window.simulateSrinivasanAccept = async function(reqId) {
  if (window.ChronosSupabase) {
    await window.ChronosSupabase.respondToInfraRequest(reqId, 'APPROVED', 'Approved and schedule locked by Srinivasan R.');
  }
  window.renderEventInfraRequestsTracker();
  
  const toast = document.getElementById('em-toast');
  const toastMsg = document.getElementById('em-toast-msg');
  if (toast && toastMsg) {
    toastMsg.innerText = `✓ Srinivasan R. accepted request ${reqId}! Schedule is now LOCKED for your event.`;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 4000);
  }
};

window.simulateSrinivasanRevoke = async function(reqId) {
  if (window.ChronosSupabase) {
    await window.ChronosSupabase.respondToInfraRequest(reqId, 'DECLINED', 'Revoked by Srinivasan R.');
  }
  window.renderEventInfraRequestsTracker();
  
  const toast = document.getElementById('em-toast');
  const toastMsg = document.getElementById('em-toast-msg');
  if (toast && toastMsg) {
    toastMsg.innerText = `Schedule lock revoked for request ${reqId}. Possession released.`;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 4000);
  }
};

window.openSpatialGateModal = async function(possessionId) {
  let possessions = [];
  if (window.ChronosSupabase) {
    possessions = await window.ChronosSupabase.getInfraPossessions();
  }
  const pos = possessions.find(p => p.id === possessionId) || possessions[1] || possessions[0];
  if (!pos) return;

  const modal = document.getElementById('spatial-gate-modal');
  if (!modal) return;

  const elName = document.getElementById('modal-gate-possession-name');
  const elNoc = document.getElementById('modal-gate-noc-number');
  const elIssuer = document.getElementById('modal-gate-noc-issuer');
  const elCap = document.getElementById('modal-gate-capacity');
  const elOcr = document.getElementById('modal-gate-ocr-text');
  const elCount = document.getElementById('modal-gate-count-badge');
  const cardsContainer = document.getElementById('modal-gate-cards-container');

  if (elName) elName.innerText = pos.name;
  if (elNoc) elNoc.innerText = pos.nocDocNumber || "NOC-MH-CIDCO-STAD-2026-45K";
  if (elIssuer) elIssuer.innerText = pos.nocIssuer || "CIDCO Urban Safety & Navi Mumbai Fire Directorate";
  if (elCap) elCap.innerText = (pos.landAreaSqFt >= 400000 ? "45,000 Spectators" : "25,000 Spectators") + ` (${Number(pos.landAreaSqFt).toLocaleString()} sq ft)`;
  if (elOcr) elOcr.innerText = pos.ocrText || `Official Document verified. Structural integrity approved for crowd evacuation. Gates and perimeter verified under CIDCO regulations.`;
  if (elCount) elCount.innerText = `${pos.gatesCount || 3} Gates Certified`;

  if (cardsContainer) {
    if (pos.id === 'pos_dypatil_ground' || pos.gatesCount === 3) {
      cardsContainer.innerHTML = `
        <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
          <div class="text-[10px] font-bold text-emerald-400">DUMMY_GATE_A</div>
          <div class="font-bold text-white">North Public Entry</div>
          <div class="text-[10px] text-slate-400">14,000 pax/hr max curve &bull; 16 Turnstiles &bull; Pedestrian Loop</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1">
          <div class="text-[10px] font-bold text-sky-400">DUMMY_GATE_B</div>
          <div class="font-bold text-white">West VIP Entry</div>
          <div class="text-[10px] text-slate-400">3,500 pax/hr &bull; Pavilion Direct Ingress &bull; Heli-Approach</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
          <div class="text-[10px] font-bold text-amber-400">DUMMY_GATE_C</div>
          <div class="font-bold text-white">South Operations</div>
          <div class="text-[10px] text-slate-400">1,800 pax/hr &bull; ALS Ambulance &amp; Fire Tender Bypass</div>
        </div>
      `;
    } else {
      cardsContainer.innerHTML = `
        <div class="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1">
          <div class="text-[10px] font-bold text-emerald-400">GATE 1</div>
          <div class="font-bold text-white">Main Pedestrian Ingress</div>
          <div class="text-[10px] text-slate-400">10,500 pax/hr &bull; Direct Station Approach</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950 border border-sky-500/30 space-y-1">
          <div class="text-[10px] font-bold text-sky-400">GATE 2</div>
          <div class="font-bold text-white">VIP &amp; Media Entrance</div>
          <div class="text-[10px] text-slate-400">2,500 pax/hr &bull; Secured Valet Approach</div>
        </div>
        <div class="p-3 rounded-xl bg-slate-950 border border-amber-500/30 space-y-1">
          <div class="text-[10px] font-bold text-amber-400">GATE 3 &amp; 4</div>
          <div class="font-bold text-white">Rapid Dispersal &amp; Transit</div>
          <div class="text-[10px] text-slate-400">12,000 pax/hr &bull; Feeder Loop Shuttles</div>
        </div>
      `;
    }
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
};

window.closeSpatialGateModal = function() {
  const modal = document.getElementById('spatial-gate-modal');
  if (modal) modal.classList.add('hidden');
};

window.exportGatePermit = function(reqId) {
  let requests = [];
  try {
    const stored = localStorage.getItem('chronos_infra_requests');
    if (stored) requests = JSON.parse(stored);
  } catch (e) {}
  const req = requests.find(r => r.id === reqId) || { id: reqId, status: "APPROVED" };
  
  const permitData = {
    permitId: "PERMIT-" + req.id.toUpperCase(),
    status: req.status,
    eventTitle: req.eventTitle,
    host: req.eventHost,
    venue: req.venue,
    possession: req.possessionName || req.requestedAsset,
    dates: `${req.startDate} to ${req.endDate}`,
    timeWindow: req.timeWindow,
    authorizedBy: "Srinivasan R. (Infrastructure Manager, CIDCO)",
    clearanceNotes: req.responseNotes || "Approved and schedule locked.",
    nocDocumentNumber: "NOC-MH-CIDCO-STAD-2026-45K",
    issuedAt: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(permitData, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Permit_${req.id}_Approved.json`;
  a.click();
  URL.revokeObjectURL(url);

  alert(`CIDCO Infrastructure Clearance Permit exported!\n\nPermit ID: PERMIT-${req.id.toUpperCase()}\nStatus: APPROVED & SCHEDULE LOCKED\nAuthorized by: Srinivasan R.`);
};

// Real-Time Inter-Tab Storage Synchronization
window.addEventListener('storage', (e) => {
  if (e.key === 'chronos_infra_requests' || e.key === 'chronos_infra_possessions') {
    if (typeof window.renderEventInfraRequestsTracker === 'function') {
      window.renderEventInfraRequestsTracker();
    }
    if (typeof window.populateInfraPossessionsDropdown === 'function') {
      window.populateInfraPossessionsDropdown();
    }
  }
});

window.addEventListener('chronos:infra_sync', () => {
  if (typeof window.renderEventInfraRequestsTracker === 'function') {
    window.renderEventInfraRequestsTracker();
  }
  if (typeof window.populateInfraPossessionsDropdown === 'function') {
    window.populateInfraPossessionsDropdown();
  }
});

// Periodic High-Responsiveness Sync Polling (every 3 seconds when on procurement screen)
setInterval(() => {
  const procureSec = document.getElementById('em-sec-procure');
  if (procureSec && !procureSec.classList.contains('hidden')) {
    if (typeof window.renderEventInfraRequestsTracker === 'function') {
      window.renderEventInfraRequestsTracker(currentTrackerFilter);
    }
  }
}, 3000);

// =========================================================================
// 8. SCI-FI EVENT LIFECYCLE MISSION CONTROL ENGINE (PRE, PRESENT, POST)
// =========================================================================
let lifecycleActiveEventId = 'dypatil_nerul';
let lifecyclePhaseOverride = null; // null (auto-calculate from dates), 'PRE', 'PRESENT', 'POST'
let lifecycleSatelliteMap = null;
let lifecycleSurgeActive = false;

// Temporal Phase Calculation Engine
function getEventPhase(event, overridePhase = null) {
  if (overridePhase && ['PRE', 'PRESENT', 'POST'].includes(overridePhase)) {
    return overridePhase;
  }
  if (!event) return 'PRE';
  const todayStr = '2026-09-26';
  const sStr = (event.startDate || '2026-09-26').split('T')[0];
  const eStr = (event.endDate || event.startDate || '2026-09-26').split('T')[0];
  if (todayStr < sStr) return 'PRE';
  if (todayStr > eStr) return 'POST';
  return 'PRESENT';
}

// Master Contingency Directives Array with Multi-Stage Repeated Approval
let lifecycleContingencyPlans = [
  {
    id: "plan_alpha",
    code: "DIRECTIVE-ALT-01",
    title: "LP Junction Bypass & Shuttle Divert",
    priority: "CRITICAL // LIVE MITIGATION",
    targetChoke: "LP Junction & Gate 4 West Overspill",
    strategy: "Divert incoming Nerul Feeder Shuttles via Palm Beach Service Flyover. Reduces LP corridor pedestrian backpressure by 42% in 6 minutes; reroutes 45 feeder CNG buses to alternate bypass.",
    currentStage: 2,
    maxStages: 3,
    status: "STAGE_2_APPROVED",
    approvalLogs: [
      { timestamp: "11:42:15 AM", author: "Alicia Stone (Event Master)", note: "Stage 1 Approved: Bypass strategy verified against traffic camera feed." },
      { timestamp: "11:58:30 AM", author: "Alicia Stone (Event Master)", note: "Stage 2 Re-Approved: NMMT dispatch confirmed 45 buses re-routed." }
    ]
  },
  {
    id: "plan_beta",
    code: "DIRECTIVE-ALT-02",
    title: "Gate C Auxiliary Overspill Activation",
    priority: "HIGH // TURNSTILE SURGE",
    targetChoke: "Gate 4 West Optical Turnstiles (88% Surge)",
    strategy: "Open auxiliary optical turnstiles at Gate C (North Concourse) and redirect Stand C Row 1-20 attendees via West Skywalk with 20 security marshals pacing throughput.",
    currentStage: 1,
    maxStages: 3,
    status: "STAGE_1_APPROVED",
    approvalLogs: [
      { timestamp: "12:05:10 PM", author: "Alicia Stone (Event Master)", note: "Stage 1 Approved: Gate C physical locks cleared by Srinivasan's security lead." }
    ]
  },
  {
    id: "plan_gamma",
    code: "DIRECTIVE-ALT-03",
    title: "Cooling Misting Surge & Hydration Taskforce",
    priority: "MEDIUM // CLIMATE CONTROL",
    targetChoke: "West Concourse & Bay 114 (31.4°C High Heat Index)",
    strategy: "Activate high-pressure misting cannons 3-6 along North walkway; dispatch 12 mobile hydration marshals with chilled electrolyte canisters.",
    currentStage: 3,
    maxStages: 3,
    status: "DISPATCHED_ACTIVE",
    approvalLogs: [
      { timestamp: "11:15:00 AM", author: "Alicia Stone (Event Master)", note: "Stage 1 Approved: Temperature index exceeded 30°C." },
      { timestamp: "11:22:15 AM", author: "Alicia Stone (Event Master)", note: "Stage 2 Re-Approved: Water pressure certified." },
      { timestamp: "11:30:00 AM", author: "Alicia Stone (Event Master)", note: "Stage 3 Final Execution: Cannons active. Harry's staff deployed." }
    ]
  },
  {
    id: "plan_delta",
    code: "DIRECTIVE-ALT-04",
    title: "Staged Egress Seawoods Loop Pre-Allocation",
    priority: "PRE-EMPTIVE // DISPERSAL",
    targetChoke: "Post-Match Nerul Footbridge Crush Risk (21:45)",
    strategy: "Pre-stage 40 Seawoods loop express shuttles at Gate 4 West Plaza; program dynamic LED signage to direct Stands C & D away from Nerul station toward Seawoods.",
    currentStage: 0,
    maxStages: 3,
    status: "AWAITING_APPROVAL",
    approvalLogs: []
  }
];

// Global Approval Audit Trail
let lifecycleApprovalLogs = [
  { time: "11:15:00 AM", directive: "DIRECTIVE-ALT-03", stage: "Stage 1 Approved", author: "Alicia Stone", note: "Climate risk threshold exceeded." },
  { time: "11:22:15 AM", directive: "DIRECTIVE-ALT-03", stage: "Stage 2 Confirmed", author: "Alicia Stone", note: "Water pods & marshals verified." },
  { time: "11:30:00 AM", directive: "DIRECTIVE-ALT-03", stage: "Stage 3 Dispatched", author: "Alicia Stone", note: "Active misting cannons deployed." },
  { time: "11:42:15 AM", directive: "DIRECTIVE-ALT-01", stage: "Stage 1 Approved", author: "Alicia Stone", note: "LP Junction CCTV choke detected." },
  { time: "11:58:30 AM", directive: "DIRECTIVE-ALT-01", stage: "Stage 2 Confirmed", author: "Alicia Stone", note: "45 feeder CNG buses rerouted." },
  { time: "12:05:10 PM", directive: "DIRECTIVE-ALT-02", stage: "Stage 1 Approved", author: "Alicia Stone", note: "Gate C auxiliary turnstiles unlocked." }
];

// Open Lifecycle Mission Control for any event
window.openEventLifecycleCommand = function(eventId, forcePhase = null) {
  if (eventId) lifecycleActiveEventId = eventId;
  if (forcePhase) lifecyclePhaseOverride = forcePhase;
  switchEMSection('em-sec-lifecycle');
  renderEventLifecycleCommand();
};

window.handleLifecycleEventChange = function(eventId) {
  lifecycleActiveEventId = eventId;
  lifecyclePhaseOverride = null;
  renderEventLifecycleCommand();
};

window.setLifecyclePhaseOverride = function(phase) {
  lifecyclePhaseOverride = phase;
  renderEventLifecycleCommand();
};

window.renderEventLifecycleCommand = function() {
  const event = allExistingPlans.find(p => p.id === lifecycleActiveEventId) || VENUE_CATALOG[lifecycleActiveEventId] || VENUE_CATALOG.dypatil_nerul;
  if (!event) return;

  // 1. Populate Dropdown with all plans
  const selector = document.getElementById('lc-event-selector');
  if (selector) {
    const list = allExistingPlans.length > 0 ? allExistingPlans : Object.values(VENUE_CATALOG);
    selector.innerHTML = list.map(p => `
      <option value="${p.id}" ${p.id === event.id ? 'selected' : ''}>
        ${p.venueName} (${p.city}) &bull; ${p.duration || 'Scheduled'}
      </option>
    `).join('');
  }

  // 2. Compute Temporal Phase
  const phase = getEventPhase(event, lifecyclePhaseOverride);

  // 3. Update HUD Top Banners
  const titleDisplay = document.getElementById('lc-event-title-display');
  if (titleDisplay) titleDisplay.innerText = event.title || event.venueName;

  const locDisplay = document.getElementById('lc-event-location-display');
  if (locDisplay) {
    locDisplay.innerHTML = `
      ${event.venueArea || event.city}, ${event.city} &bull; Coordinates: ${(event.lat || 19.0435).toFixed(4)}° N, ${(event.lng || 73.0253).toFixed(4)}° E &bull; Venue Capacity: ${(event.venueCapacity || 55000).toLocaleString()}
    `;
  }

  const datesDisplay = document.getElementById('lc-dates-display');
  if (datesDisplay) datesDisplay.innerText = `${event.startDate || '2026-09-26'} to ${event.endDate || event.startDate || '2026-09-28'}`;

  const visitorsDisplay = document.getElementById('lc-visitors-display');
  if (visitorsDisplay) visitorsDisplay.innerText = `${(event.expectedVisitors || 50000).toLocaleString()} Attendees`;

  const badgeEl = document.getElementById('lc-event-phase-badge');
  const summaryEl = document.getElementById('lc-phase-summary-display');

  if (phase === 'PRE') {
    if (badgeEl) {
      badgeEl.className = "text-xs font-mono px-3 py-1 rounded-full font-bold border bg-sky-500/15 text-sky-300 border-sky-400/40 flex items-center space-x-1.5";
      badgeEl.innerHTML = `<i data-lucide="calendar" class="w-3.5 h-3.5 text-sky-400"></i><span>PRE-EVENT READINESS</span>`;
    }
    if (summaryEl) summaryEl.innerHTML = `<span class="text-sky-300">PRE-EVENT (PLANNING & INFERENCES)</span>`;
  } else if (phase === 'PRESENT') {
    if (badgeEl) {
      badgeEl.className = "text-xs font-mono px-3 py-1 rounded-full font-bold border bg-emerald-500/15 text-emerald-400 border-emerald-500/40 flex items-center space-x-1.5 shadow-lg shadow-emerald-500/10";
      badgeEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span>PRESENT EVENT (LIVE INGRESS ACTIVE)</span>`;
    }
    if (summaryEl) summaryEl.innerHTML = `<span class="text-emerald-400">PRESENT EVENT (DAY-OF-EVENT LIVE)</span>`;
  } else {
    if (badgeEl) {
      badgeEl.className = "text-xs font-mono px-3 py-1 rounded-full font-bold border bg-purple-500/15 text-purple-300 border-purple-500/40 flex items-center space-x-1.5";
      badgeEl.innerHTML = `<i data-lucide="archive" class="w-3.5 h-3.5 text-purple-400"></i><span>POST-EVENT DEBRIEF</span>`;
    }
    if (summaryEl) summaryEl.innerHTML = `<span class="text-purple-300">POST-EVENT (SUMMARY & AUDIT)</span>`;
  }

  // 4. Update Override Button states
  ['auto', 'pre', 'present', 'post'].forEach(btnKey => {
    const btn = document.getElementById('phase-btn-' + btnKey);
    if (!btn) return;
    const isTarget = (btnKey === 'auto' && lifecyclePhaseOverride === null) ||
                     (btnKey.toUpperCase() === lifecyclePhaseOverride);
    if (isTarget) {
      btn.className = "px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold transition";
    } else {
      btn.className = "px-2.5 py-1 rounded-lg text-slate-400 hover:text-white transition";
    }
  });

  // 5. Update Map Coordinates Caption
  const mapCaption = document.getElementById('lc-map-coords-caption');
  if (mapCaption) {
    mapCaption.innerText = `LAT ${(event.lat || 19.0435).toFixed(4)}° N • LNG ${(event.lng || 73.0253).toFixed(4)}° E • 0.3m Ground Resolution • ${event.venueName}`;
  }

  // 6. Initialize / Recenter Satellite Map
  setTimeout(() => {
    initLifecycleSatelliteMap(event.lat || 19.0435, event.lng || 73.0253, phase);
  }, 120);

  // 7. Render Dynamic Phase-Dependent Telemetry Panel
  renderLifecyclePhaseContent(phase, event);

  // 8. Render Sci-Fi Alternative Plans Side Panel
  renderLifecyclePlans(phase);

  // 9. Render Approval Audit Trail
  renderLifecycleAuditTrail();

  lucide.createIcons();
};

// Sci-Fi Satellite Map Engine for Lifecycle Command
function initLifecycleSatelliteMap(lat, lng, phase) {
  const container = document.getElementById('lifecycle-satellite-map');
  if (!container || typeof L === 'undefined') return;

  if (lifecycleSatelliteMap) {
    lifecycleSatelliteMap.remove();
    lifecycleSatelliteMap = null;
  }

  lifecycleSatelliteMap = L.map('lifecycle-satellite-map', {
    center: [lat, lng],
    zoom: 15,
    minZoom: 12,
    maxZoom: 19,
    zoomControl: true,
    attributionControl: false
  });

  // 1. ESRI World Imagery Base (True Earth Orthophoto)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics'
  }).addTo(lifecycleSatelliteMap);

  // 2. Reference Overlay (Roads & Labels)
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    opacity: 0.80
  }).addTo(lifecycleSatelliteMap);

  // 3. 5km Safety Geofence Circle
  L.circle([lat, lng], {
    radius: 3500,
    color: '#38bdf8',
    fillColor: '#0284c7',
    fillOpacity: 0.04,
    weight: 1.5,
    dashArray: '6, 6'
  }).addTo(lifecycleSatelliteMap);

  // 4. Shaded Walking / Feeder Route Polyline
  const routeCoords = [
    [lat - 0.0105, lng - 0.0068], // Nerul Station Hub
    [lat - 0.0075, lng - 0.0048], 
    [lat - 0.0035, lng - 0.0033], // LP Junction
    [lat, lng]                   // Gate 4 Stadium Ingress
  ];

  L.polyline(routeCoords, {
    color: phase === 'PRESENT' ? '#00f0ff' : '#38bdf8',
    weight: 4,
    opacity: 0.9,
    dashArray: '8, 8'
  }).addTo(lifecycleSatelliteMap);

  // 5. Tactical Sci-Fi Satellite Nodes
  const tacticalNodes = [
    {
      lat: lat, lng: lng,
      title: "Stadium Main Bowl (Gate 4 West)",
      status: phase === 'PRESENT' ? "SURGE 1,840/min &bull; 88% Backpressure" : "Capacity: 55,000 Seats",
      icon: "🏟️", color: phase === 'PRESENT' ? "#f43f5e" : "#38bdf8",
      pulse: phase === 'PRESENT'
    },
    {
      lat: lat - 0.0035, lng: lng - 0.0033,
      title: "LP Junction Highway Bottleneck",
      status: phase === 'PRESENT' ? "CHOKE ACTIVE // Queue 120m" : "Flyover Transit Bypass",
      icon: "⚠️", color: "#f59e0b",
      pulse: phase === 'PRESENT'
    },
    {
      lat: lat - 0.0105, lng: lng - 0.0068,
      title: "Nerul Railway Station East Hub",
      status: "65 Feeder Shuttles Operational &bull; Headway 3m",
      icon: "🚆", color: "#34d399",
      pulse: false
    },
    {
      lat: lat + 0.0015, lng: lng + 0.0017,
      title: "Dr. D.Y. Patil Trauma Emergency Centre",
      status: "24 ICU Beds Available &bull; 2 ALS Ambulances Staged",
      icon: "🏥", color: "#38bdf8",
      pulse: false
    },
    {
      lat: lat - 0.0220, lng: lng - 0.0073,
      title: "Seawoods Staged Egress Dispersal Loop",
      status: "40 CNG Shuttles Pre-Positioned for Exit",
      icon: "🚌", color: "#a855f7",
      pulse: false
    }
  ];

  tacticalNodes.forEach(node => {
    const pin = L.divIcon({
      className: 'scifi-sat-pin',
      html: `
        <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -50%); cursor:pointer;">
          <div style="width:30px; height:30px; border-radius:10px; background:rgba(8,12,20,0.92); border:2px solid ${node.color}; color:${node.color}; display:flex; align-items:center; justify-content:center; font-size:14px; box-shadow:0 0 16px ${node.color}66; ${node.pulse ? 'animation: pulse 1.5s infinite;' : ''}">
            ${node.icon}
          </div>
          <div style="margin-top:3px; font-size:9px; font-family:monospace; font-weight:bold; color:#fff; background:rgba(8,12,20,0.95); padding:1px 6px; border-radius:4px; border:1px solid ${node.color}aa; white-space:nowrap;">
            ${node.title.split('(')[0].trim()}
          </div>
        </div>
      `,
      iconSize: [120, 50],
      iconAnchor: [60, 25]
    });

    const marker = L.marker([node.lat, node.lng], { icon: pin }).addTo(lifecycleSatelliteMap);
    marker.bindPopup(`
      <div style="padding:6px; font-family:sans-serif; min-width:180px;">
        <div style="font-weight:bold; font-size:12px; color:${node.color};">${node.title}</div>
        <div style="font-size:11px; color:#cbd5e1; margin-top:2px;">${node.status}</div>
        <div style="font-size:10px; color:#38bdf8; font-family:monospace; margin-top:4px;">GPS: ${node.lat.toFixed(4)}° N, ${node.lng.toFixed(4)}° E</div>
      </div>
    `);
  });

  setTimeout(() => {
    if (lifecycleSatelliteMap) lifecycleSatelliteMap.invalidateSize();
  }, 200);
}

window.recenterLifecycleSatMap = function() {
  const event = allExistingPlans.find(p => p.id === lifecycleActiveEventId) || VENUE_CATALOG[lifecycleActiveEventId] || VENUE_CATALOG.dypatil_nerul;
  if (lifecycleSatelliteMap && event) {
    lifecycleSatelliteMap.flyTo([event.lat || 19.0435, event.lng || 73.0253], 15, { duration: 1.0 });
  }
};

window.triggerLifecycleSurgeSim = function() {
  lifecycleSurgeActive = !lifecycleSurgeActive;
  const btn = document.getElementById('btn-surge-sim');
  if (btn) {
    if (lifecycleSurgeActive) {
      btn.className = "px-2.5 py-1 rounded-lg bg-rose-500 text-white font-bold transition flex items-center space-x-1 animate-pulse";
      btn.innerHTML = `<i data-lucide="alert-triangle" class="w-3 h-3"></i><span>Surge Spike Active (+45%)</span>`;
    } else {
      btn.className = "px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-400/40 font-bold transition flex items-center space-x-1";
      btn.innerHTML = `<i data-lucide="zap" class="w-3 h-3 text-amber-400"></i><span>Simulate Surge</span>`;
    }
  }

  // Force PRESENT mode and notify
  setLifecyclePhaseOverride('PRESENT');
  alert("SIMULATED LIVE INGRESS SURGE TRIGGERED!\n\nTelemetry: Gate 4 Turnstile influx surged to 2,450 pax/min (+45%).\nLP Junction crowd backpressure elevated.\nAction: Plan Beta (Gate C Overspill) and Plan Alpha (Shuttle Divert) highlighted for manager approval!");
  lucide.createIcons();
};

// =========================================================================
// 9. PHASE-SPECIFIC PANEL RENDERING (PRE / PRESENT / POST)
// =========================================================================
function renderLifecyclePhaseContent(phase, event) {
  const container = document.getElementById('lifecycle-phase-container');
  if (!container) return;

  if (phase === 'PRE') {
    container.innerHTML = renderLifecyclePrePanel(event);
  } else if (phase === 'PRESENT') {
    container.innerHTML = renderLifecyclePresentPanel(event);
  } else {
    container.innerHTML = renderLifecyclePostPanel(event);
  }

  lucide.createIcons();
}

// 1. PRE-EVENT PANEL
function renderLifecyclePrePanel(event) {
  const visitors = (event.expectedVisitors || 50000).toLocaleString();
  const capacity = (event.venueCapacity || 55000).toLocaleString();

  return `
    <div class="space-y-4">
      
      <!-- Box 1: Pre-Inferences & Suggestive Services Matrix -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-sky-900/40 space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-sky-950/80 pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">AI PRE-EVENT INFERENCES &amp; SERVICE PROCUREMENT</span>
            <h4 class="text-base font-black text-white">Suggestive Infrastructure &amp; Vendor Allocations</h4>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-400/30 font-bold">
            Baseline Ready
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          <!-- Suggestion 1: Feeder Buses -->
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-2">
            <div class="flex justify-between items-start">
              <span class="font-bold text-white flex items-center space-x-1.5">
                <i data-lucide="bus" class="w-4 h-4 text-sky-400"></i>
                <span>65 Feeder CNG Loop Shuttles</span>
              </span>
              <span class="text-[10px] font-mono text-emerald-400">Suggested: Harry</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-snug">
              Required to clear 9,500 pax/hr from Nerul East Station to Gate 4 at 3-minute headway.
            </p>
            <div class="flex justify-between items-center pt-1 border-t border-sky-950 text-[10px] font-mono">
              <span class="text-slate-500">Est. ₹1,17,000 / day</span>
              <button onclick="procureSuggestedServiceFromLifecycle('transport')" class="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-bold transition">
                Procure Service &rarr;
              </button>
            </div>
          </div>

          <!-- Suggestion 2: Misting & Hydration -->
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-2">
            <div class="flex justify-between items-start">
              <span class="font-bold text-white flex items-center space-x-1.5">
                <i data-lucide="droplet" class="w-4 h-4 text-cyan-400"></i>
                <span>38 Shaded Hydration Misting Pods</span>
              </span>
              <span class="text-[10px] font-mono text-cyan-400">Climate Safety</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-snug">
              Deploys along 1.8km green walking corridor and concourse gates 2, 4, 7 to prevent heat strokes.
            </p>
            <div class="flex justify-between items-center pt-1 border-t border-sky-950 text-[10px] font-mono">
              <span class="text-slate-500">Water Tankers Linked</span>
              <button onclick="procureSuggestedServiceFromLifecycle('hydration')" class="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-bold transition">
                Procure Service &rarr;
              </button>
            </div>
          </div>

          <!-- Suggestion 3: Security Stewards -->
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-2">
            <div class="flex justify-between items-start">
              <span class="font-bold text-white flex items-center space-x-1.5">
                <i data-lucide="shield" class="w-4 h-4 text-emerald-400"></i>
                <span>140 Licensed Stewards &amp; 8 K9 Units</span>
              </span>
              <span class="text-[10px] font-mono text-emerald-400">Srinivasan / Police</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-snug">
              Ensures outer boundary compliance, bag pre-screening, and optical turnstile queuing.
            </p>
            <div class="flex justify-between items-center pt-1 border-t border-sky-950 text-[10px] font-mono">
              <span class="text-slate-500">Fixed Rate SLA</span>
              <button onclick="procureSuggestedServiceFromLifecycle('security')" class="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-bold transition">
                Procure Service &rarr;
              </button>
            </div>
          </div>

          <!-- Suggestion 4: Medical Triage -->
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-2">
            <div class="flex justify-between items-start">
              <span class="font-bold text-white flex items-center space-x-1.5">
                <i data-lucide="heart-pulse" class="w-4 h-4 text-rose-400"></i>
                <span>2 ALS Ambulances &amp; 24 ICU Beds</span>
              </span>
              <span class="text-[10px] font-mono text-rose-400">Hospital Pre-Alert</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-snug">
              Pre-staged direct corridor with DY Patil Hospital for &lt;3 min emergency transfer.
            </p>
            <div class="flex justify-between items-center pt-1 border-t border-sky-950 text-[10px] font-mono">
              <span class="text-slate-500">Zero Transit Latency</span>
              <button onclick="procureSuggestedServiceFromLifecycle('medical')" class="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 font-bold transition">
                Confirm Unit &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>

      <!-- Box 2: Current Enrolled Visitors & Passholders List -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-sky-900/40 space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-sky-950/80 pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">CURRENT ENROLLED VISITORS REGISTRY</span>
            <h4 class="text-base font-black text-white">Registered Passholders &amp; Ingress Portals</h4>
          </div>
          <span class="text-xs font-mono font-bold text-emerald-400">42,910 of ${visitors} Enrolled</span>
        </div>

        <div class="overflow-x-auto text-xs font-mono">
          <table class="w-full text-left">
            <thead>
              <tr class="text-[10px] text-slate-500 border-b border-sky-950">
                <th class="pb-2">Pass ID</th>
                <th class="pb-2">Passholder Name</th>
                <th class="pb-2">Admission Tier</th>
                <th class="pb-2">Entry Portal</th>
                <th class="pb-2">Seating Block</th>
                <th class="pb-2">Transit Mode</th>
                <th class="pb-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-sky-950/60 text-slate-300 text-[11px]">
              <tr>
                <td class="py-2.5 font-bold text-sky-400">TKT-DYP-2026-94812</td>
                <td class="py-2.5 font-bold text-white">George Miller</td>
                <td class="py-2.5 text-sky-300">Grandstand Pavilion</td>
                <td class="py-2.5 text-emerald-400">Gate 4 West</td>
                <td class="py-2.5">Stand C &bull; Row 14 &bull; S48</td>
                <td class="py-2.5 text-slate-400">Harbour Rail</td>
                <td class="py-2.5 text-right font-bold text-emerald-400">CONFIRMED</td>
              </tr>
              <tr>
                <td class="py-2.5 font-bold text-sky-400">TKT-DYP-2026-88123</td>
                <td class="py-2.5 font-bold text-white">Sarah Jenkins</td>
                <td class="py-2.5 text-amber-300">Executive VIP Box</td>
                <td class="py-2.5 text-emerald-400">Gate 2 VIP</td>
                <td class="py-2.5">Club Lounge VIP-04</td>
                <td class="py-2.5 text-slate-400">Private Shuttle</td>
                <td class="py-2.5 text-right font-bold text-emerald-400">CONFIRMED</td>
              </tr>
              <tr>
                <td class="py-2.5 font-bold text-sky-400">TKT-DYP-2026-77402</td>
                <td class="py-2.5 font-bold text-white">Rajiv Deshmukh</td>
                <td class="py-2.5 text-sky-300">North Stand Lower</td>
                <td class="py-2.5 text-sky-400">Gate 3 North</td>
                <td class="py-2.5">Stand A &bull; Row 05 &bull; S30</td>
                <td class="py-2.5 text-slate-400">Walking Corridor</td>
                <td class="py-2.5 text-right font-bold text-emerald-400">CONFIRMED</td>
              </tr>
              <tr>
                <td class="py-2.5 font-bold text-sky-400">TKT-DYP-2026-61294</td>
                <td class="py-2.5 font-bold text-white">Elena Rostova</td>
                <td class="py-2.5 text-slate-300">Terrace General</td>
                <td class="py-2.5 text-sky-400">Gate 7 East</td>
                <td class="py-2.5">Stand E &bull; Row 22 &bull; S102</td>
                <td class="py-2.5 text-slate-400">Metro Feeder</td>
                <td class="py-2.5 text-right font-bold text-emerald-400">CONFIRMED</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Box 3: Predictive Statistics Dashboard -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-sky-900/40 space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-sky-950/80 pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">PREDICTIVE READINESS DASHBOARD</span>
            <h4 class="text-base font-black text-white">Crowd Ingress Velocity &amp; Risk Benchmarks</h4>
          </div>
          <span class="text-xs font-mono text-emerald-400 font-bold">Safety Model: PASS</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Peak Influx Slot</div>
            <div class="text-base font-bold text-white">11:45 &ndash; 12:30 PM</div>
            <div class="text-[10px] text-slate-500">14,200 pax/hr max curve</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Choke Risk Index</div>
            <div class="text-base font-bold text-emerald-400">14 / 100 (Optimal)</div>
            <div class="text-[10px] text-slate-500">Shaded walking bypass active</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Turnstile Latency</div>
            <div class="text-base font-bold text-sky-300">4.1s per Visitor</div>
            <div class="text-[10px] text-slate-500">68 optical scanners operational</div>
          </div>
        </div>

        <div class="pt-2 flex justify-end">
          <a href="simulations.html" class="px-4 py-2 rounded-xl btn-glacier text-xs font-bold flex items-center space-x-1.5 transition">
            <i data-lucide="sliders" class="w-4 h-4"></i>
            <span>Launch Pre-Event Dynamic Simulation</span>
          </a>
        </div>
      </div>

    </div>
  `;
}

// 2. PRESENT EVENT (LIVE) PANEL
function renderLifecyclePresentPanel(event) {
  return `
    <div class="space-y-4">
      
      <!-- Live Telemetry: Flooding of Visitors -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-sky-900/40 space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-sky-950/80 pb-3">
          <div class="space-y-0.5">
            <div class="flex items-center space-x-2">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
              <span class="text-[10px] font-mono uppercase text-rose-400 font-bold tracking-wider">LIVE INGRESS FLOOD MONITOR</span>
            </div>
            <h4 class="text-base font-black text-white">Live Visitor Surge &amp; Turnstile Backpressure</h4>
          </div>
          <span class="text-xs font-mono font-bold text-sky-400">Sensor Pulse: 1s Headway</span>
        </div>

        <!-- Influx Gauges Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-rose-500/40 space-y-1 relative overflow-hidden">
            <div class="text-[10px] text-rose-400 uppercase font-bold flex items-center space-x-1">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse"></span>
              <span>Gate 4 West (Main)</span>
            </div>
            <div class="text-xl font-black text-white mt-1">1,840 <span class="text-xs font-normal text-slate-400">pax/m</span></div>
            <div class="text-[10px] text-rose-400 font-bold">Surge Warning: 88% Flow</div>
            <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div class="bg-rose-500 h-full" style="width: 88%"></div>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Gate 3 North</div>
            <div class="text-xl font-black text-white mt-1">720 <span class="text-xs font-normal text-slate-400">pax/m</span></div>
            <div class="text-[10px] text-emerald-400 font-bold">Optimal: 45% Flow</div>
            <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div class="bg-emerald-400 h-full" style="width: 45%"></div>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Gate 7 East</div>
            <div class="text-xl font-black text-white mt-1">610 <span class="text-xs font-normal text-slate-400">pax/m</span></div>
            <div class="text-[10px] text-sky-300 font-bold">Steady: 38% Flow</div>
            <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div class="bg-sky-400 h-full" style="width: 38%"></div>
            </div>
          </div>

          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase font-bold">Gate 2 VIP</div>
            <div class="text-xl font-black text-white mt-1">190 <span class="text-xs font-normal text-slate-400">pax/m</span></div>
            <div class="text-[10px] text-emerald-400 font-bold">Fast-Track: 22%</div>
            <div class="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div class="bg-emerald-400 h-full" style="width: 22%"></div>
            </div>
          </div>
        </div>

        <!-- In-Bowl Spectator Capacity Meter -->
        <div class="p-4 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-2">
          <div class="flex justify-between items-center text-xs font-mono">
            <span class="text-slate-300 font-bold">In-Bowl Spectator Occupancy</span>
            <span class="text-white font-bold">43,240 / 55,000 Seats (78.6% Filled)</span>
          </div>
          <div class="w-full h-2.5 rounded-full bg-slate-900 overflow-hidden flex">
            <div class="h-full bg-emerald-400" style="width: 50%"></div>
            <div class="h-full bg-sky-400" style="width: 28.6%"></div>
          </div>
          <div class="flex justify-between text-[10px] font-mono text-slate-500">
            <span>Stands A &amp; B: 92%</span>
            <span>Stand C: 84%</span>
            <span>Stand D: 68%</span>
            <span>VIP Lounge: 80%</span>
          </div>
        </div>
      </div>

      <!-- Live Reported Issues Stream -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-sky-900/40 space-y-3.5 shadow-xl">
        <div class="flex items-center justify-between border-b border-sky-950/80 pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase text-amber-400 font-bold tracking-wider">LIVE INCIDENTS &amp; CHOKE ALERTS</span>
            <h4 class="text-base font-black text-white">Active Field Issue Telemetry</h4>
          </div>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-bold flex items-center space-x-1">
            <span class="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
            <span>1 Critical Alert</span>
          </span>
        </div>

        <div class="space-y-2.5 text-xs">
          
          <div class="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-1">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-rose-300">
              <span class="flex items-center space-x-1.5">
                <i data-lucide="alert-octagon" class="w-3.5 h-3.5 text-rose-400"></i>
                <span>LP Junction Pedestrian Queue Choke</span>
              </span>
              <span>12:02 PM &bull; CRITICAL</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-snug">
              Pedestrian surge crowd queue extending 120m onto Sion-Panvel Highway service slipway. Feeder shuttles delayed by 14 minutes.
            </p>
            <div class="text-[10px] font-mono text-cyan-300 pt-1 flex items-center space-x-1">
              <i data-lucide="corner-down-right" class="w-3 h-3"></i>
              <span>Mitigation Directive Alpha generated in side panel</span>
            </div>
          </div>

          <div class="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-1">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-amber-300">
              <span class="flex items-center space-x-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
                <span>Turnstile 4B Optical Sensor Latency</span>
              </span>
              <span>12:08 PM &bull; WARNING</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-snug">
              Scanner cycle latency reached 6.2s. Technicians dispatched for camera alignment; crowd pacing redirected to Gate C.
            </p>
          </div>

          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-1">
            <div class="flex items-center justify-between text-[11px] font-mono font-bold text-slate-400">
              <span class="flex items-center space-x-1.5">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i>
                <span>Concourse Hydration Station 2 Replenished</span>
              </span>
              <span>12:14 PM &bull; RESOLVED</span>
            </div>
            <p class="text-[11px] text-slate-400 leading-snug">
              Water replenishment tanker completed delivery. Electrolyte pod pressure normalized.
            </p>
          </div>

        </div>
      </div>

    </div>
  `;
}

// 3. POST-EVENT PANEL
function renderLifecyclePostPanel(event) {
  return `
    <div class="space-y-4">
      
      <!-- Box 1: Master Post-Mortem Analytics -->
      <div class="p-5 rounded-3xl bg-slate-900/90 border border-purple-500/40 space-y-4 shadow-xl">
        <div class="flex items-center justify-between border-b border-sky-950/80 pb-3">
          <div class="space-y-0.5">
            <span class="text-[10px] font-mono uppercase text-purple-400 font-bold tracking-wider">OFFICIAL POST-EVENT SUMMARY REPORT</span>
            <h4 class="text-base font-black text-white">Event Performance, Ingress/Egress &amp; Safety Audit</h4>
          </div>
          <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30">
            GRADE A+ // OPTIMAL
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Total Attendance</div>
            <div class="text-xl font-bold text-white">49,210</div>
            <div class="text-[10px] text-emerald-400">98.4% of Capacity</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Egress Clearance</div>
            <div class="text-xl font-bold text-emerald-400">41 Mins</div>
            <div class="text-[10px] text-slate-400">&lt; 45m Safety Bench</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Incident Resolution</div>
            <div class="text-xl font-bold text-sky-300">100% (14/14)</div>
            <div class="text-[10px] text-slate-400">Avg 4.2m Latency</div>
          </div>
          <div class="p-3 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Safety Rating</div>
            <div class="text-xl font-bold text-emerald-400">Zero Crush</div>
            <div class="text-[10px] text-slate-400">ISO-22301 Certified</div>
          </div>
        </div>

        <!-- Multi-Modal Transit Split Breakdown -->
        <div class="p-4 rounded-2xl bg-slate-950 border border-sky-900/30 space-y-2 text-xs font-mono">
          <div class="flex justify-between items-center">
            <span class="text-slate-300 font-bold">Transit Modal Split Audit</span>
            <span class="text-sky-400">Mass Rail Dominated</span>
          </div>
          <div class="w-full h-3 rounded-full bg-slate-900 overflow-hidden flex">
            <div class="h-full bg-sky-400" style="width: 58.4%" title="Harbour Rail (58.4%)"></div>
            <div class="h-full bg-emerald-400" style="width: 24.2%" title="NMMT Feeder Shuttles (24.2%)"></div>
            <div class="h-full bg-amber-400" style="width: 11.1%" title="Remote Park & Ride (11.1%)"></div>
            <div class="h-full bg-slate-500" style="width: 6.3%" title="Walk / Private (6.3%)"></div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-400 pt-1">
            <div>🚆 Rail: <strong class="text-white">58.4%</strong> (28,738 pax)</div>
            <div>🚌 Shuttles: <strong class="text-white">24.2%</strong> (11,908 pax)</div>
            <div>🅿️ Park &amp; Ride: <strong class="text-white">11.1%</strong> (5,462 pax)</div>
            <div>🚶 Walk/Cab: <strong class="text-white">6.3%</strong> (3,102 pax)</div>
          </div>
        </div>

        <!-- Vendor SLA Compliance -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Infra Manager: Srinivasan</div>
            <div class="text-sm font-bold text-white">Nerul Hub &amp; Gate 4 Perimeter</div>
            <div class="text-[11px] text-emerald-400 font-bold">100% Land &amp; Gate Availability (Zero Breaches)</div>
          </div>
          <div class="p-3.5 rounded-2xl bg-slate-950 border border-sky-950 space-y-1">
            <div class="text-[10px] text-slate-400 uppercase">Service Provider: Harry Vance</div>
            <div class="text-sm font-bold text-white">65 Feeder Buses &amp; Hydration</div>
            <div class="text-[11px] text-emerald-400 font-bold">99.1% On-Time Loop Pacing &bull; 35 Pods Filled</div>
          </div>
        </div>

        <div class="pt-2 flex justify-end">
          <button onclick="exportPostEventReport()" class="px-5 py-2.5 rounded-xl btn-glacier text-xs font-bold flex items-center space-x-2 transition shadow-lg shadow-sky-500/10">
            <i data-lucide="download" class="w-4 h-4"></i>
            <span>Export Official Post-Mortem Audit (JSON / PDF)</span>
          </button>
        </div>
      </div>

    </div>
  `;
}

// =========================================================================
// 10. SCI-FI ALTERNATIVE CONTINGENCY PLANS SIDE PANEL & REPEATED APPROVAL
// =========================================================================
function renderLifecyclePlans(phase) {
  const container = document.getElementById('lifecycle-plans-list');
  if (!container) return;

  const protocolStatus = document.getElementById('lc-protocol-status');
  const approvedCount = document.getElementById('lc-approved-count');

  const dispatched = lifecycleContingencyPlans.filter(p => p.status === 'DISPATCHED_ACTIVE').length;
  if (approvedCount) approvedCount.innerText = `${dispatched} of ${lifecycleContingencyPlans.length} Executing`;

  container.innerHTML = lifecycleContingencyPlans.map((plan, idx) => {
    const isDispatched = plan.status === 'DISPATCHED_ACTIVE';
    const stage = plan.currentStage || 0;
    const max = plan.maxStages || 3;

    // Build Stage Dots: e.g. ● ● ○
    let dots = '';
    for (let i = 1; i <= max; i++) {
      if (i <= stage) {
        dots += `<span class="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></span>`;
      } else {
        dots += `<span class="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700"></span>`;
      }
    }

    let statusText = '';
    let statusClass = '';
    if (stage === 0) {
      statusText = 'AWAITING APPROVAL';
      statusClass = 'text-amber-400 border-amber-400/30 bg-amber-500/10';
    } else if (stage === 1) {
      statusText = 'STAGE 1 APPROVED (1/3)';
      statusClass = 'text-sky-300 border-sky-400/30 bg-sky-500/10';
    } else if (stage === 2) {
      statusText = 'STAGE 2 RE-CONFIRMED (2/3)';
      statusClass = 'text-cyan-300 border-cyan-400/40 bg-cyan-500/15 shadow-sm';
    } else {
      statusText = 'FULLY AUTHORIZED // ACTIVE DISPATCH (3/3)';
      statusClass = 'text-emerald-400 border-emerald-500/40 bg-emerald-500/15';
    }

    const latestLog = plan.approvalLogs && plan.approvalLogs.length > 0
      ? plan.approvalLogs[plan.approvalLogs.length - 1]
      : null;

    return `
      <div class="p-4 rounded-2xl bg-slate-950/80 border ${isDispatched ? 'border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.12)]' : 'border-sky-900/40'} space-y-3 relative overflow-hidden transition group">
        
        <div class="flex items-start justify-between gap-2 border-b border-sky-950 pb-2.5">
          <div>
            <div class="text-[9px] font-mono text-cyan-400 font-bold uppercase tracking-wider">${plan.code}</div>
            <h4 class="text-xs font-black text-white group-hover:text-cyan-300 transition-colors mt-0.5">${plan.title}</h4>
            <div class="text-[10px] font-mono text-rose-400 mt-0.5">Target: ${plan.targetChoke}</div>
          </div>
          <span class="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${statusClass} whitespace-nowrap">
            ${statusText}
          </span>
        </div>

        <p class="text-[11px] text-slate-300 leading-relaxed">
          ${plan.strategy}
        </p>

        <!-- Multi-Stage Repeated Approval HUD Bar -->
        <div class="p-2.5 rounded-xl bg-slate-900/90 border border-sky-950 flex items-center justify-between text-[10px] font-mono">
          <div class="flex items-center space-x-2">
            <span class="text-slate-400 uppercase">Repeated Approval:</span>
            <div class="flex items-center space-x-1.5">${dots}</div>
          </div>
          <span class="font-bold text-white">Level ${stage} of ${max}</span>
        </div>

        ${latestLog ? `
          <div class="text-[10px] font-mono text-slate-400 bg-slate-900/50 p-2 rounded-lg border border-sky-950 flex items-center space-x-1.5">
            <i data-lucide="check" class="w-3 h-3 text-emerald-400 shrink-0"></i>
            <span class="truncate">${latestLog.timestamp} &bull; ${latestLog.note}</span>
          </div>
        ` : ''}

        <!-- Interactive Repeated Approval Controls -->
        <div class="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
          ${stage < max ? `
            <button 
              onclick="approveLifecyclePlan('${plan.id}')" 
              class="flex-1 py-1.5 px-3 rounded-xl btn-glacier text-[11px] font-black flex items-center justify-center space-x-1.5 shadow-md shadow-sky-500/10"
            >
              <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
              <span>${stage === 0 ? 'Approve Directive (Pass to Stage 1)' : stage === 1 ? 'Re-Approve (Confirm Stage 2)' : 'Final Authorize & Dispatch (Stage 3)'}</span>
            </button>
            <button 
              onclick="emergencyAuthorizePlan('${plan.id}')" 
              class="px-2.5 py-1.5 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-[10px] font-mono font-bold transition"
              title="Skip stages and immediately dispatch"
            >
              Emergency 1-Click
            </button>
          ` : `
            <div class="flex-1 flex items-center space-x-2">
              <button 
                onclick="approveLifecyclePlan('${plan.id}')" 
                class="flex-1 py-1.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold flex items-center justify-center space-x-1.5 transition"
              >
                <i data-lucide="repeat" class="w-3.5 h-3.5"></i>
                <span>Repeat Approval / Extend Cycle</span>
              </button>
              <button 
                onclick="revokeLifecyclePlan('${plan.id}')" 
                class="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-sky-900/30 text-[10px] font-mono transition"
                title="Revoke and reset to stage 0"
              >
                Stand Down
              </button>
            </div>
          `}
        </div>

      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function renderLifecycleAuditTrail() {
  const container = document.getElementById('lc-audit-trail-list');
  const countEl = document.getElementById('lc-audit-count');
  if (!container) return;

  if (countEl) countEl.innerText = `${lifecycleApprovalLogs.length} Actions Logged`;

  container.innerHTML = lifecycleApprovalLogs.slice(0, 8).map(log => `
    <div class="p-2 rounded-lg bg-slate-900/80 border border-sky-950 flex items-start space-x-2 text-[10px]">
      <span class="text-cyan-400 font-bold shrink-0">${log.time}</span>
      <div class="overflow-hidden">
        <div class="text-white font-bold truncate">${log.directive} &bull; <span class="text-emerald-400">${log.stage}</span></div>
        <div class="text-slate-400 truncate">${log.note} (${log.author})</div>
      </div>
    </div>
  `).join('');
}

// Multi-Stage Repeated Approval Handler
window.approveLifecyclePlan = function(planId) {
  const plan = lifecycleContingencyPlans.find(p => p.id === planId);
  if (!plan) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (plan.currentStage === 0) {
    plan.currentStage = 1;
    plan.status = "STAGE_1_APPROVED";
    const note = "Stage 1 Approved: Strategy validated against live sensor telemetry.";
    plan.approvalLogs.push({ timestamp: timeStr, author: "Alicia Stone (Event Master)", note });
    lifecycleApprovalLogs.unshift({ time: timeStr, directive: plan.code, stage: "Stage 1 Approved", author: "Alicia Stone", note });
  } else if (plan.currentStage === 1) {
    plan.currentStage = 2;
    plan.status = "STAGE_2_APPROVED";
    const note = "Stage 2 Re-Approved: Resource mobilization order confirmed with fleet marshals.";
    plan.approvalLogs.push({ timestamp: timeStr, author: "Alicia Stone (Event Master)", note });
    lifecycleApprovalLogs.unshift({ time: timeStr, directive: plan.code, stage: "Stage 2 Confirmed", author: "Alicia Stone", note });
  } else if (plan.currentStage === 2) {
    plan.currentStage = 3;
    plan.status = "DISPATCHED_ACTIVE";
    const note = "Stage 3 Final Execution: Directive dispatched live over Police & Transit radios.";
    plan.approvalLogs.push({ timestamp: timeStr, author: "Alicia Stone (Event Master)", note });
    lifecycleApprovalLogs.unshift({ time: timeStr, directive: plan.code, stage: "Stage 3 Dispatched", author: "Alicia Stone", note });
  } else {
    // Repeated approval beyond stage 3
    const note = "Repeated Approval: Directive extended for another 30-minute operational cycle.";
    plan.approvalLogs.push({ timestamp: timeStr, author: "Alicia Stone (Event Master)", note });
    lifecycleApprovalLogs.unshift({ time: timeStr, directive: plan.code, stage: "Cycle Extended", author: "Alicia Stone", note });
  }

  showToast(`Directive ${plan.code} (${plan.title.substring(0, 24)}...) approval stage updated by Alicia Stone!`);
  renderLifecyclePlans();
  renderLifecycleAuditTrail();
};

window.emergencyAuthorizePlan = function(planId) {
  const plan = lifecycleContingencyPlans.find(p => p.id === planId);
  if (!plan) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  plan.currentStage = 3;
  plan.status = "DISPATCHED_ACTIVE";
  const note = "EMERGENCY EXECUTIVE BYPASS: Immediate 1-click dispatch authorized by Alicia Stone.";
  plan.approvalLogs.push({ timestamp: timeStr, author: "Alicia Stone (Event Master)", note });
  lifecycleApprovalLogs.unshift({ time: timeStr, directive: plan.code, stage: "Emergency Override", author: "Alicia Stone", note });

  showToast(`EMERGENCY DISPATCH: ${plan.code} is now executing live across all field perimeters!`);
  renderLifecyclePlans();
  renderLifecycleAuditTrail();
};

window.revokeLifecyclePlan = function(planId) {
  const plan = lifecycleContingencyPlans.find(p => p.id === planId);
  if (!plan) return;

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  plan.currentStage = 0;
  plan.status = "AWAITING_APPROVAL";
  const note = "Directive stood down / reset to awaiting authorization.";
  plan.approvalLogs.push({ timestamp: timeStr, author: "Alicia Stone (Event Master)", note });
  lifecycleApprovalLogs.unshift({ time: timeStr, directive: plan.code, stage: "Stood Down", author: "Alicia Stone", note });

  showToast(`Directive ${plan.code} stood down.`);
  renderLifecyclePlans();
  renderLifecycleAuditTrail();
};

window.openNewPlanModal = function() {
  document.getElementById('new-directive-modal')?.classList.remove('hidden');
};
window.closeNewPlanModal = function() {
  document.getElementById('new-directive-modal')?.classList.add('hidden');
};

window.handleCreateCustomPlan = function(e) {
  e.preventDefault();
  const title = document.getElementById('dir-title').value;
  const target = document.getElementById('dir-target').value;
  const urgency = document.getElementById('dir-urgency').value;
  const strategy = document.getElementById('dir-strategy').value;

  const num = lifecycleContingencyPlans.length + 1;
  const newPlan = {
    id: "plan_" + Math.random().toString(36).substr(2, 6),
    code: `DIRECTIVE-ALT-0${num}`,
    title: title,
    priority: urgency,
    targetChoke: target,
    strategy: strategy,
    currentStage: 1,
    maxStages: 3,
    status: "STAGE_1_APPROVED",
    approvalLogs: [
      { timestamp: new Date().toLocaleTimeString(), author: "Alicia Stone (Event Master)", note: "Authored and Stage 1 verified by Alicia Stone." }
    ]
  };

  lifecycleContingencyPlans.unshift(newPlan);
  closeNewPlanModal();
  showToast(`Custom Directive ${newPlan.code} added to Mission Control!`);
  renderLifecyclePlans();
  renderLifecycleAuditTrail();
};

window.procureSuggestedServiceFromLifecycle = function(serviceType) {
  switchEMSection('em-sec-procure');
  const serviceDropdown = document.getElementById('order-service-type');
  if (serviceDropdown) {
    serviceDropdown.value = serviceType === 'transport' ? 'transport' : serviceType === 'security' ? 'security' : 'transport';
  }
  showToast(`Navigated to Procurement Workbench for ${serviceType.toUpperCase()} allocation.`);
};

window.exportPostEventReport = function() {
  const event = allExistingPlans.find(p => p.id === lifecycleActiveEventId) || VENUE_CATALOG[lifecycleActiveEventId] || VENUE_CATALOG.dypatil_nerul;
  const report = {
    event_id: event.id,
    event_title: event.title || event.venueName,
    city: event.city,
    venue: event.venueName,
    audit_date: "2026-09-26",
    safety_grade: "GRADE A+ // OPTIMAL",
    total_turnstile_scans: 49210,
    expected_capacity: event.expectedVisitors || 50000,
    attendance_ratio: "98.4%",
    egress_clearance_minutes: 41,
    safety_standard_benchmark_minutes: 45,
    incidents_logged: 14,
    incidents_resolved: 14,
    resolution_rate: "100%",
    modal_split: {
      suburban_rail_percent: 58.4,
      feeder_shuttles_percent: 24.2,
      remote_park_and_ride_percent: 11.1,
      walking_percent: 6.3
    },
    vendor_audits: {
      srinivasan_infra_sla: "100%",
      harry_services_sla: "99.1%"
    },
    approved_contingency_directives: lifecycleContingencyPlans
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `chronos_post_mortem_${event.id}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast(`Post-event master audit report exported for ${event.venueName}!`);
};

function showToast(msg) {
  const toast = document.getElementById('em-toast');
  const toastMsg = document.getElementById('em-toast-msg');
  if (toast && toastMsg) {
    toastMsg.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 4000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initPreplansPage();
});
