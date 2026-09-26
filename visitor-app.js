/**
 * ChronosFlow — Visitor Mobile Companion App Logic
 * Designed for Multi-User Handset Access with Real-Time GPS Tracking,
 * Location-Based Dynamic Timeline, Reverse Geocoding & Live Satellite Guidance.
 */

// =========================================================================
// 1. EVENT & VENUE DIRECTORY (MULTI-EVENT WITH MASTER MATCH SCHEDULES)
// =========================================================================
const EVENT_REGISTRY = {
  'dypatil_nerul': {
    id: 'dypatil_nerul',
    title: "IPL Semi-Final & Live Music Fest",
    venue: "Dr. D.Y. Patil Stadium, Nerul",
    shortVenue: "DY Patil Stadium • Nerul",
    lat: 19.0435,
    lng: 73.0253,
    defaultGate: "GATE 4",
    stand: "EAST STAND C",
    level: "Level 2",
    seat: "ROW 14, #82",
    defaultOrigin: { lat: 19.0178, lng: 72.8478, label: "Dadar East (Mumbai)" },
    shuttle: "NMMT Feeder Shuttle #14 • Staged at Nerul East",
    shuttleCoords: [19.0350, 73.0180],
    shuttleStationName: "Nerul East Station Terminal",
    originCity: "Mumbai",
    matchStartMinutes: 900,  // 03:00 PM
    durationMinutes: 270,    // 4.5 hrs (07:30 PM finish)
    gateLeadMinutes: 90,     // 1.5 hrs before match (01:30 PM)
    origins: [
      { name: "Nerul Sector 19", lat: 19.0310, lng: 73.0150 },
      { name: "Vashi Bridge", lat: 19.0700, lng: 72.9800 },
      { name: "Kurla Junction", lat: 19.0657, lng: 72.8794 },
      { name: "Dadar East", lat: 19.0178, lng: 72.8478 },
      { name: "Thane Station", lat: 19.1860, lng: 72.9750 }
    ],
    journeyWaypoints: [
      { lat: 19.0178, lng: 72.8478, name: "Dadar East Station" },
      { lat: 19.0450, lng: 72.8620, name: "Sion Transit Corridor" },
      { lat: 19.0657, lng: 72.8794, name: "Kurla Harbour Junction" },
      { lat: 19.0600, lng: 72.9050, name: "Chembur Monorail Flyover" },
      { lat: 19.0550, lng: 72.9300, name: "Vashi Creek Bridge" },
      { lat: 19.0700, lng: 72.9800, name: "Sanpada Highway Approach" },
      { lat: 19.0350, lng: 73.0180, name: "Nerul East Station Terminal" },
      { lat: 19.0435, lng: 73.0253, name: "DY Patil Stadium Gate 4" }
    ]
  },
  'wankhede_mumbai': {
    id: 'wankhede_mumbai',
    title: "T20 Mumbai Derby — Coastal Clash",
    venue: "Wankhede Stadium, Churchgate, Mumbai",
    shortVenue: "Wankhede Stadium • Churchgate",
    lat: 18.9389,
    lng: 72.8258,
    defaultGate: "GATE 2",
    stand: "SUNIL GAVASKAR PAVILION",
    level: "Level 3",
    seat: "ROW 08, #24",
    defaultOrigin: { lat: 19.0178, lng: 72.8478, label: "Dadar East (Mumbai)" },
    shuttle: "BEST Coastal Shuttle #108 • Staged at Churchgate",
    shuttleCoords: [18.9322, 72.8264],
    shuttleStationName: "Churchgate Terminus",
    originCity: "Mumbai",
    matchStartMinutes: 1050, // 05:30 PM
    durationMinutes: 255,    // 4 hrs 15 mins (09:45 PM finish)
    gateLeadMinutes: 90,     // 04:00 PM
    origins: [
      { name: "Churchgate Plaza", lat: 18.9322, lng: 72.8264 },
      { name: "Marine Lines", lat: 18.9430, lng: 72.8230 },
      { name: "Dadar West", lat: 19.0180, lng: 72.8420 },
      { name: "Bandra West", lat: 19.0550, lng: 72.8350 },
      { name: "Andheri Hub", lat: 19.1197, lng: 72.8464 }
    ],
    journeyWaypoints: [
      { lat: 19.0178, lng: 72.8478, name: "Dadar East Station" },
      { lat: 19.0010, lng: 72.8400, name: "Parel Junction Corridor" },
      { lat: 18.9750, lng: 72.8220, name: "Mumbai Central Express Hub" },
      { lat: 18.9500, lng: 72.8180, name: "Marine Lines Coastal Link" },
      { lat: 18.9322, lng: 72.8264, name: "Churchgate Terminus" },
      { lat: 18.9389, lng: 72.8258, name: "Wankhede Stadium Gate 2" }
    ]
  },
  'narendra_modi': {
    id: 'narendra_modi',
    title: "World Cup Super Sunday Grand Final",
    venue: "Narendra Modi Stadium, Motera, Ahmedabad",
    shortVenue: "Narendra Modi Stadium • Motera",
    lat: 23.0925,
    lng: 72.5975,
    defaultGate: "GATE 1",
    stand: "CLUB CONCOURSE WEST",
    level: "Level 1",
    seat: "ROW 05, #112",
    defaultOrigin: { lat: 23.0300, lng: 72.5800, label: "Ahmedabad Central" },
    shuttle: "AMTS Metro Feeder Shuttle #42 • Staged at Motera Metro",
    shuttleCoords: [23.0900, 72.5950],
    shuttleStationName: "Motera Stadium Metro Station",
    originCity: "Ahmedabad",
    matchStartMinutes: 840,  // 02:00 PM
    durationMinutes: 510,    // 8.5 hrs (10:30 PM finish)
    gateLeadMinutes: 120,    // 2 hrs before (12:00 PM)
    origins: [
      { name: "Motera Metro Plaza", lat: 23.0900, lng: 72.5950 },
      { name: "Sabarmati Riverfront", lat: 23.0550, lng: 72.5850 },
      { name: "Ahmedabad Central", lat: 23.0300, lng: 72.5800 },
      { name: "SG Highway Hub", lat: 23.0500, lng: 72.5100 }
    ],
    journeyWaypoints: [
      { lat: 23.0300, lng: 72.5800, name: "Ahmedabad Central Station" },
      { lat: 23.0550, lng: 72.5850, name: "Sabarmati Riverfront Corridor" },
      { lat: 23.0750, lng: 72.5900, name: "Visat Junction Metro Flyover" },
      { lat: 23.0900, lng: 72.5950, name: "Motera Stadium Metro Station" },
      { lat: 23.0925, lng: 72.5975, name: "Narendra Modi Stadium Gate 1" }
    ]
  }
};

// =========================================================================
// 2. STATE & GLOBAL CONFIGURATION
// =========================================================================
let currentTab = 'pass';
let mobileMap = null;
let userMarker = null;
let stadiumMarker = null;
let busMarker = null;
let routePolyline = null;
let isLiveGpsActive = false;
let watchId = null;

let activeEventKey = 'dypatil_nerul';
let activeEvent = EVENT_REGISTRY['dypatil_nerul'];

let activePass = {
  eventId: 'dypatil_nerul',
  user: 'George Miller',
  tier: 'OFFICIAL DIGITAL SMART PASS',
  gate: 'GATE 4',
  stand: 'EAST STAND C',
  level: 'Level 2',
  seat: 'ROW 14, #82',
  ticket: 'TKT-DYP-2026-94812'
};

let georgeLocation = {
  lat: 19.0178, // Default origin
  lng: 72.8478,
  label: "Dadar East (Mumbai)"
};

// =========================================================================
// 3. INITIALIZATION & URL PARAMETER PARSING
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  startMobileClock();
  parseUrlParamsAndInitialize();
  lucide.createIcons();

  // Try auto-checking geolocation permission state
  if (navigator.permissions && navigator.permissions.query) {
    navigator.permissions.query({ name: 'geolocation' }).then(result => {
      if (result.state === 'granted') {
        confirmLiveGPS();
      }
    }).catch(() => {});
  }
});

function parseUrlParamsAndInitialize() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramEvent = urlParams.get('event');
  const paramUser = urlParams.get('user');
  const paramTicket = urlParams.get('ticket');
  const paramGate = urlParams.get('gate');
  const paramSeat = urlParams.get('seat');
  const paramTier = urlParams.get('tier');

  // Match Event Key from param
  if (paramEvent) {
    const lower = paramEvent.toLowerCase();
    const matched = Object.keys(EVENT_REGISTRY).find(k => lower.includes(k) || k.includes(lower));
    if (matched) {
      activeEventKey = matched;
    } else if (lower.includes('wankhede') || lower.includes('mumbai') || lower.includes('derby')) {
      activeEventKey = 'wankhede_mumbai';
    } else if (lower.includes('modi') || lower.includes('ahmedabad') || lower.includes('final')) {
      activeEventKey = 'narendra_modi';
    } else {
      activeEventKey = 'dypatil_nerul';
    }
  }

  activeEvent = EVENT_REGISTRY[activeEventKey];
  activePass.eventId = activeEventKey;

  // Set User Name
  if (paramUser) {
    activePass.user = decodeURIComponent(paramUser);
  }

  // Set Ticket ID
  if (paramTicket) {
    activePass.ticket = decodeURIComponent(paramTicket);
  } else {
    activePass.ticket = (activeEventKey === 'wankhede_mumbai')
      ? 'TKT-WNK-2026-78411'
      : (activeEventKey === 'narendra_modi' ? 'TKT-NMS-2026-55920' : 'TKT-DYP-2026-94812');
  }

  // Set Gate & Seating
  activePass.gate = paramGate ? decodeURIComponent(paramGate) : activeEvent.defaultGate;
  activePass.seat = paramSeat ? decodeURIComponent(paramSeat) : activeEvent.seat;
  activePass.stand = activeEvent.stand;
  activePass.level = activeEvent.level;
  if (paramTier) activePass.tier = decodeURIComponent(paramTier);

  // Set default origin appropriate for venue city
  georgeLocation.lat = activeEvent.defaultOrigin.lat;
  georgeLocation.lng = activeEvent.defaultOrigin.lng;
  georgeLocation.label = activeEvent.defaultOrigin.label;

  applyPassToUI();
}

function applyPassToUI() {
  // 1. Mobile Header
  const avatarEl = document.getElementById('vis-user-avatar');
  const nameEl = document.getElementById('vis-user-name');
  const subEl = document.getElementById('vis-user-sub');

  if (avatarEl) {
    const initials = activePass.user.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    avatarEl.innerText = initials || 'GM';
  }
  if (nameEl) nameEl.innerText = activePass.user;
  if (subEl) subEl.innerText = `${georgeLocation.label} • Spectator`;

  // 2. Holographic Smart Pass Card
  const badgeEl = document.getElementById('pass-tier-badge');
  const titleEl = document.getElementById('pass-event-title');
  const venueEl = document.getElementById('pass-venue-name');
  const gateEl = document.getElementById('pass-gate-text');
  const standEl = document.getElementById('pass-stand-text');
  const levelEl = document.getElementById('pass-level-text');
  const seatEl = document.getElementById('pass-seat-text');
  const codeEl = document.getElementById('pass-code-text');
  const qrImg = document.getElementById('pass-qr-image');
  const scannerLabel = document.getElementById('pass-gate-scanner-label');

  if (badgeEl) badgeEl.innerText = activePass.tier.toUpperCase();
  if (titleEl) titleEl.innerText = activeEvent.title;
  if (venueEl) venueEl.innerText = activeEvent.venue;
  if (gateEl) gateEl.innerText = activePass.gate;
  if (standEl) standEl.innerText = activePass.stand;
  if (levelEl) levelEl.innerText = activePass.level;
  if (seatEl) seatEl.innerText = activePass.seat;
  if (codeEl) codeEl.innerText = activePass.ticket;
  if (scannerLabel) scannerLabel.innerText = `${activePass.gate} Optical Scanner:`;

  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(activePass.ticket)}`;
  }

  // 3. Desktop Companion Side Card (Dynamic Sync!)
  const compImg = document.getElementById('companion-qr-img');
  const compUrl = document.getElementById('companion-qr-url');
  const currentFullUrl = window.location.href;
  if (compImg) {
    compImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(currentFullUrl)}`;
  }
  if (compUrl) {
    compUrl.innerText = currentFullUrl;
  }

  // 4. Calculate Distance & Live ETA from Present Location
  const distKm = parseFloat(calculateDistance());
  const etaMins = getEtaMinutes(distKm);

  // 5. Update Navigation Guidance Card & Origin Buttons
  updateTransitGuidanceUI(distKm, etaMins);
  renderOriginChips();

  // 6. Render Dynamic Location-Based Timeline & Events
  renderMobileTimeline(distKm, etaMins);
  renderMobileEventsList();

  // 7. Refresh Icons
  lucide.createIcons();
}

// =========================================================================
// 4. TRANSIT GUIDANCE & DYNAMIC ORIGIN CHIPS
// =========================================================================
function updateTransitGuidanceUI(distKm, etaMins) {
  const stepsContainer = document.getElementById('transit-steps-container');
  if (!stepsContainer) return;

  const locLabel = georgeLocation.label || "Your Present Location";
  const dist = distKm !== undefined ? distKm : parseFloat(calculateDistance());
  const eta = etaMins !== undefined ? etaMins : getEtaMinutes(dist);

  let guidanceSteps = [];

  if (dist <= 2.0) {
    // Walking proximity
    guidanceSteps = [
      { step: "1", title: `Walk from ${locLabel}`, desc: `Follow shaded pedestrian wayfinding corridor directly towards ${activeEvent.shortVenue} (~${eta} mins walk, ${dist} km).` },
      { step: "2", title: `Enter via Misted Ingress Zone`, desc: `Hydration pods and rapid turnstile lanes operational.` },
      { step: "3", title: `Check-in at ${activePass.gate} Optical Scanner`, desc: `Hold handset pass near optical scanner for instant barrier release.` }
    ];
  } else if (activeEventKey === 'dypatil_nerul') {
    guidanceSteps = [
      { step: "1", title: `Depart from ${locLabel}`, desc: `Take suburban rail or highway corridor towards Nerul East Hub (${dist} km, ~${Math.round(eta * 0.65)} mins).` },
      { step: "2", title: `Board Dedicated NMMT Feeder Shuttle`, desc: `Nerul East Station Terminal Bay 2 • Feeder Shuttle #14 staged on 3-min loop.` },
      { step: "3", title: `Alight at ${activePass.gate} Shaded Walkway`, desc: `120m misted corridor straight to optical turnstiles.` }
    ];
  } else if (activeEventKey === 'wankhede_mumbai') {
    guidanceSteps = [
      { step: "1", title: `Depart from ${locLabel}`, desc: `Board Western Line Fast Train or coastal expressway towards Churchgate (${dist} km, ~${Math.round(eta * 0.65)} mins).` },
      { step: "2", title: `Board Dedicated BEST Coastal Shuttle`, desc: `Churchgate Station Bay 1 • Shuttle #108 running 2-min loops to stadium.` },
      { step: "3", title: `Alight at ${activePass.gate}`, desc: `Pedestrian boulevard directly to turnstile readers.` }
    ];
  } else if (activeEventKey === 'narendra_modi') {
    guidanceSteps = [
      { step: "1", title: `Depart from ${locLabel}`, desc: `Board Ahmedabad Metro Red Line towards Motera Stadium (${dist} km, ~${Math.round(eta * 0.65)} mins).` },
      { step: "2", title: `Elevated Skywalk Walkway`, desc: `Direct covered skywalk from metro concourse to Stadium Gate 1.` },
      { step: "3", title: `Biometric Optical Turnstiles`, desc: `Automated fast lanes with continuous crowd pacing.` }
    ];
  }

  stepsContainer.innerHTML = guidanceSteps.map(st => `
    <div class="flex items-start space-x-2">
      <span class="w-5 h-5 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center font-bold shrink-0 text-[10px]">${st.step}</span>
      <div>
        <strong class="text-white">${st.title}</strong>
        <p class="text-[11px] text-slate-400">${st.desc}</p>
      </div>
    </div>
  `).join('');

  const shuttleLabel = document.getElementById('shuttle-status-label');
  if (shuttleLabel) {
    shuttleLabel.innerText = activeEvent.shuttle.split('•')[0].trim();
  }
}

function renderOriginChips() {
  const container = document.getElementById('origin-chips-container');
  if (!container) return;

  const currentEventOrigins = activeEvent.origins || [];
  
  let html = `
    <button onclick="confirmLiveGPS()" class="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 transition flex items-center space-x-1 font-bold">
      <i data-lucide="crosshair" class="w-3 h-3 text-cyan-400"></i>
      <span>Live Device GPS</span>
    </button>
    <button onclick="detectLocationViaIP()" class="px-2.5 py-1 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 transition flex items-center space-x-1">
      <i data-lucide="globe" class="w-3 h-3 text-cyan-400"></i>
      <span>Auto IP</span>
    </button>
  `;

  currentEventOrigins.forEach(orig => {
    const isSelected = (georgeLocation.label.includes(orig.name) || orig.name.includes(georgeLocation.label));
    const dist = getHaversineDistance(orig.lat, orig.lng, activeEvent.lat, activeEvent.lng).toFixed(0);
    html += `
      <button onclick="setVisitorOrigin('${orig.name}', ${orig.lat}, ${orig.lng})" class="px-2.5 py-1 rounded-lg ${isSelected ? 'bg-sky-500/30 text-white border-sky-400 font-bold' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-sky-900/40'} border transition">
        📍 ${orig.name} (${dist}km)
      </button>
    `;
  });

  container.innerHTML = html;
  lucide.createIcons();
}

// =========================================================================
// 5. LOCATION-BASED DYNAMIC DAY-OF-EVENT TIMELINE ENGINE
// =========================================================================
function renderMobileTimeline(distKm, etaMins) {
  const container = document.getElementById('mobile-timeline-container');
  if (!container) return;

  const locLabel = georgeLocation.label || "Your Present Location";
  const dist = distKm !== undefined ? distKm : parseFloat(calculateDistance());
  const eta = etaMins !== undefined ? etaMins : getEtaMinutes(dist);

  // Update header text & badge
  const headerDesc = document.getElementById('itinerary-header-desc');
  if (headerDesc) {
    headerDesc.innerText = `Personalized schedule computed from your current location at ${locLabel} (${dist} km, ETA: ${eta}m)`;
  }
  const originName = document.getElementById('itinerary-origin-name');
  if (originName) {
    originName.innerText = `${locLabel.toUpperCase()} SYNCED`;
  }

  // Master schedule calculation based on match start time
  const matchStartMin = activeEvent.matchStartMinutes || 900;
  const matchDurationMin = activeEvent.durationMinutes || 270;
  const gateLeadMin = activeEvent.gateLeadMinutes || 90;

  const gateArrivalMin = matchStartMin - gateLeadMin;
  const shuttleBoardMin = gateArrivalMin - 18;
  const departureMin = gateArrivalMin - eta;
  const prepMin = departureMin - 25;
  const seatingMin = matchStartMin - 45;
  const egressMin = matchStartMin + matchDurationMin;
  const returnMin = egressMin + eta + 20;

  const milestones = [
    {
      time: formatTimeHourMinute(prepMin),
      badge: "ORIGIN PREP",
      badgeColor: "bg-sky-500/20 text-sky-300 border border-sky-400/30",
      title: `Pre-Departure Prep at ${locLabel}`,
      desc: `Check pass (${activePass.ticket}) on handset. Distance to stadium: ${dist} km. Recommended departure in 25 mins.`
    },
    {
      time: formatTimeHourMinute(departureMin),
      badge: "DEPARTURE",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30",
      title: `Depart from ${locLabel}`,
      desc: `Commence travel via transit corridor towards ${activeEvent.shortVenue}. Live transit headway: ~${eta} mins.`
    },
    {
      time: formatTimeHourMinute(shuttleBoardMin),
      badge: "SHUTTLE HUB",
      badgeColor: "bg-amber-500/20 text-amber-300 border border-amber-400/30",
      title: `Board Feeder Shuttle at ${activeEvent.shuttleStationName}`,
      desc: `${activeEvent.shuttle}. Continuous 3-minute turnaround headway.`
    },
    {
      time: formatTimeHourMinute(gateArrivalMin),
      badge: "GATE INGRESS",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
      title: `Arrive at ${activePass.gate} Optical Scanner`,
      desc: `Walk through shaded corridor. Hold holographic QR pass against optical scanner for instant turnstile release.`
    },
    {
      time: formatTimeHourMinute(seatingMin),
      badge: "SEATING",
      badgeColor: "bg-purple-500/20 text-purple-300 border border-purple-400/30",
      title: `Proceed to ${activePass.stand} (${activePass.seat})`,
      desc: `Concourse Level ${activePass.level}. Access misting pods and pre-order refreshments before match commences.`
    },
    {
      time: formatTimeHourMinute(matchStartMin),
      badge: "MATCH LIVE",
      badgeColor: "bg-emerald-500 text-slate-950 font-black",
      title: `${activeEvent.title} Begins`,
      desc: `First ball bowled. All concourses switch to match pacing with live multi-agent crowd safety monitors.`
    },
    {
      time: formatTimeHourMinute(egressMin),
      badge: "RETURN EGRESS",
      badgeColor: "bg-rose-500/20 text-rose-300 border border-rose-400/30",
      title: `Match Conclusion & Return to ${locLabel}`,
      desc: `Staged egress via ${activePass.gate}. Dedicated shuttles return passengers to transit hubs connecting back to ${locLabel} (est. return arrival: ${formatTimeHourMinute(returnMin)}).`
    }
  ];

  container.innerHTML = milestones.map(m => `
    <div class="p-3 rounded-2xl bg-slate-900/80 border border-sky-900/40 flex items-start space-x-3 transition hover:border-sky-500/40">
      <div class="flex flex-col items-center shrink-0">
        <span class="px-2 py-1 rounded-lg ${m.badgeColor} font-bold text-[10px] whitespace-nowrap">${m.time}</span>
        <span class="text-[8px] font-mono text-slate-400 mt-1 uppercase">${m.badge}</span>
      </div>
      <div>
        <div class="font-bold text-white text-xs leading-snug">${m.title}</div>
        <div class="text-[11px] text-slate-400 mt-0.5 leading-relaxed">${m.desc}</div>
      </div>
    </div>
  `).join('');

  // Update progress bar times
  const progTimes = document.getElementById('timeline-progress-times');
  if (progTimes) {
    progTimes.innerHTML = `
      <span>${formatTimeHourMinute(departureMin).split(' ')[0]} Dep</span>
      <span>${formatTimeHourMinute(shuttleBoardMin).split(' ')[0]} Transit</span>
      <span>${formatTimeHourMinute(gateArrivalMin).split(' ')[0]} Gate</span>
      <span>${formatTimeHourMinute(matchStartMin).split(' ')[0]} Match</span>
      <span>${formatTimeHourMinute(egressMin).split(' ')[0]} Return</span>
    `;
  }
}

function renderMobileEventsList() {
  const container = document.getElementById('mobile-events-container');
  if (!container) return;

  const allEvents = Object.values(EVENT_REGISTRY);
  container.innerHTML = allEvents.map(evt => {
    const isCurrent = evt.id === activeEventKey;
    return `
      <div class="p-4 rounded-2xl bg-slate-900/90 border ${isCurrent ? 'border-sky-400/50 shadow-lg shadow-sky-500/10' : 'border-sky-900/40'} space-y-2.5">
        <div class="flex justify-between items-start">
          <span class="text-[9px] px-2 py-0.5 rounded font-bold ${isCurrent ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-sky-500/10 text-sky-300 border border-sky-400/20'}">
            ${isCurrent ? 'ACTIVE // CONFIRMED PASS' : 'SCHEDULED FIXTURE'}
          </span>
          <span class="text-cyan-300 font-mono text-[10px] font-bold">${evt.originCity}</span>
        </div>
        <h3 class="text-sm font-bold text-white leading-snug">${evt.title}</h3>
        <p class="text-[11px] text-slate-400 font-mono">${evt.venue} &bull; ${evt.defaultGate}</p>
        
        <div class="flex items-center space-x-2 pt-1">
          ${isCurrent ? `
            <button onclick="switchMobileTab('pass')" class="flex-1 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-bold text-center text-xs transition">
              View Smart Ticket &rarr;
            </button>
            <button onclick="openPassQrModal()" class="py-2 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition flex items-center space-x-1">
              <i data-lucide="qr-code" class="w-3.5 h-3.5"></i>
              <span>QR</span>
            </button>
          ` : `
            <button onclick="enrollInMobileEvent('${evt.id}')" class="flex-1 py-2 rounded-xl btn-glacier font-bold text-center text-xs shadow-md shadow-sky-500/10">
              Switch Pass to This Event
            </button>
          `}
        </div>
      </div>
    `;
  }).join('');
  lucide.createIcons();
}

window.enrollInMobileEvent = function(eventKey) {
  if (EVENT_REGISTRY[eventKey]) {
    activeEventKey = eventKey;
    activeEvent = EVENT_REGISTRY[eventKey];
    activePass.eventId = eventKey;
    activePass.gate = activeEvent.defaultGate;
    activePass.stand = activeEvent.stand;
    activePass.level = activeEvent.level;
    activePass.seat = activeEvent.seat;
    activePass.ticket = 'TKT-' + eventKey.substring(0, 3).toUpperCase() + '-2026-' + Math.floor(10000 + Math.random() * 90000);
    georgeLocation.lat = activeEvent.defaultOrigin.lat;
    georgeLocation.lng = activeEvent.defaultOrigin.lng;
    georgeLocation.label = activeEvent.defaultOrigin.label;

    applyPassToUI();
    if (mobileMap) {
      mobileMap.remove();
      mobileMap = null;
      userMarker = null;
      stadiumMarker = null;
      busMarker = null;
      routePolyline = null;
    }

    showMobileToast(`✅ Pass generated for ${activeEvent.title}! Gate access ready.`);
    setTimeout(() => {
      switchMobileTab('pass');
    }, 400);
  }
};

// =========================================================================
// 6. OPTICAL TURNSTILE QR PRESENTATION MODAL
// =========================================================================
window.openPassQrModal = function() {
  const modal = document.getElementById('pass-qr-presentation-modal');
  if (!modal) return;

  const eventEl = document.getElementById('modal-qr-event');
  const gateEl = document.getElementById('modal-qr-gate');
  const qrImg = document.getElementById('modal-qr-img');
  const codeEl = document.getElementById('modal-qr-code');

  if (eventEl) eventEl.innerText = activeEvent.title;
  if (gateEl) gateEl.innerText = `${activePass.gate} • ${activePass.stand} • ${activePass.seat}`;
  if (codeEl) codeEl.innerText = activePass.ticket;
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(activePass.ticket)}`;
  }

  modal.classList.remove('hidden');
  lucide.createIcons();
};

window.closePassQrModal = function() {
  document.getElementById('pass-qr-presentation-modal')?.classList.add('hidden');
};

window.sharePassLink = function() {
  const shareData = {
    title: `${activeEvent.title} — Digital Pass`,
    text: `Verified Event Pass for ${activePass.user} (${activePass.gate}, ${activePass.ticket})`,
    url: window.location.href
  };

  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showMobileToast("📋 Pass link copied to clipboard!");
      const btnText = document.getElementById('btn-share-pass-text');
      if (btnText) {
        btnText.innerText = "Link Copied!";
        setTimeout(() => { btnText.innerText = "Share Pass Link / QR"; }, 2500);
      }
    });
  }
};

// =========================================================================
// 7. REAL-TIME GPS GEOLOCATION & REVERSE GEOCODING ENGINE
// =========================================================================
window.requestLiveGeolocation = function() {
  document.getElementById('geo-permission-modal')?.classList.remove('hidden');
};

window.dismissGPSModal = function() {
  document.getElementById('geo-permission-modal')?.classList.add('hidden');
  showMobileToast(`Using Origin: ${georgeLocation.label}`);
  initOrUpdateMobileMap();
};

async function resolveLocationName(lat, lng, defaultName) {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`, {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.address) {
        const addr = data.address;
        const name = addr.suburb || addr.neighbourhood || addr.city_district || addr.residential || addr.town || addr.village || addr.city || addr.county;
        if (name) return name;
      }
    }
  } catch (e) {
    console.warn("Reverse geocode lookup warning:", e);
  }
  return defaultName;
}

window.confirmLiveGPS = function() {
  document.getElementById('geo-permission-modal')?.classList.add('hidden');

  if (!navigator.geolocation) {
    detectLocationViaIP();
    return;
  }

  showMobileToast("Requesting device GPS sensor...");

  navigator.geolocation.getCurrentPosition(
    position => {
      isLiveGpsActive = true;
      georgeLocation.lat = position.coords.latitude;
      georgeLocation.lng = position.coords.longitude;
      georgeLocation.label = "Detecting locality...";

      updateLocationUI("Live GPS Active", `±${Math.round(position.coords.accuracy)}m`);
      showMobileToast(`📍 Hardware GPS Locked: (${position.coords.latitude.toFixed(3)}, ${position.coords.longitude.toFixed(3)})`);

      // Reverse geocode to get real neighborhood name
      resolveLocationName(position.coords.latitude, position.coords.longitude, "Your Location").then(locName => {
        georgeLocation.label = locName;
        updateLocationUI("Live GPS Active", `±${Math.round(position.coords.accuracy)}m`);
        renderOriginChips();
        showMobileToast(`📍 Present Location: ${locName}`);
      });

      // Keep continuous watch if user is in motion
      if (!watchId) {
        watchId = navigator.geolocation.watchPosition(
          pos => {
            georgeLocation.lat = pos.coords.latitude;
            georgeLocation.lng = pos.coords.longitude;
            updateLocationUI("Live GPS Tracking", `±${Math.round(pos.coords.accuracy)}m`);
          },
          err => console.warn("Watch position err:", err),
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
      }
    },
    error => {
      console.warn("Hardware GPS unavailable over HTTP, falling back to IP Geolocation:", error);
      detectLocationViaIP();
    },
    { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
  );
};

// Automatic IP-based Geolocation (Works over HTTP on any smartphone!)
async function detectLocationViaIP() {
  showMobileToast("Connecting to Network IP Geolocation...");

  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      if (data.latitude && data.longitude) {
        georgeLocation.lat = data.latitude;
        georgeLocation.lng = data.longitude;
        georgeLocation.label = data.city || data.region || 'Local Area';

        updateLocationUI(`IP: ${georgeLocation.label}`, "Approx");
        renderOriginChips();
        showMobileToast(`📍 Geolocation Synced: ${georgeLocation.label} (${data.latitude.toFixed(2)}, ${data.longitude.toFixed(2)})`);
        return;
      }
    }
  } catch (e) {
    console.warn("IP Geolocation fetch error:", e);
  }

  // Graceful fallback to event's default origin
  georgeLocation.lat = activeEvent.defaultOrigin.lat;
  georgeLocation.lng = activeEvent.defaultOrigin.lng;
  georgeLocation.label = activeEvent.defaultOrigin.label;
  updateLocationUI(activeEvent.originCity, "Stored Origin");
  showMobileToast(`📍 Synced to Stored Transit Origin: ${activeEvent.defaultOrigin.label}`);
}

function updateLocationUI(statusText, accuracyText) {
  const badge = document.getElementById('badge-gps-status');
  if (badge) badge.innerText = `${statusText} (${accuracyText})`;

  const coordsEl = document.getElementById('map-live-coords');
  if (coordsEl) {
    coordsEl.innerText = `${georgeLocation.lat.toFixed(4)}° N, ${georgeLocation.lng.toFixed(4)}° E`;
  }

  const distKm = parseFloat(calculateDistance());
  const etaMins = getEtaMinutes(distKm);

  // Update Nav header with dynamic ETA & route description
  const etaBadge = document.getElementById('nav-eta-badge');
  if (etaBadge) etaBadge.innerText = `ETA: ${etaMins} Mins (${distKm} km)`;

  const routeSub = document.getElementById('nav-route-sub');
  if (routeSub) {
    routeSub.innerText = `Live tracking from ${georgeLocation.label} → ${activeEvent.shortVenue}`;
  }

  // Update holographic pass distance alert
  const passDistOrigin = document.getElementById('live-distance-origin');
  if (passDistOrigin) passDistOrigin.innerText = `${activeEvent.shortVenue} (from ${georgeLocation.label})`;

  // Update header subtext
  const subEl = document.getElementById('vis-user-sub');
  if (subEl) subEl.innerText = `${georgeLocation.label} • Spectator`;

  // Update timeline dynamically based on location & ETA
  renderMobileTimeline(distKm, etaMins);

  // Update transit guidance steps based on location & ETA
  updateTransitGuidanceUI(distKm, etaMins);

  // Update satellite map
  initOrUpdateMobileMap();
}

// Preset Origin Switcher
window.setVisitorOrigin = function(name, lat, lng) {
  georgeLocation.lat = lat;
  georgeLocation.lng = lng;
  georgeLocation.label = name;
  updateLocationUI(name, "Manual Origin");
  renderOriginChips();
  showMobileToast(`Origin set to ${name} (${calculateDistance()} km to ${activePass.gate})`);
};

// Calculate Haversine Distance
function calculateDistance() {
  const d = getHaversineDistance(
    georgeLocation.lat, georgeLocation.lng,
    activeEvent.lat, activeEvent.lng
  );

  const distEl = document.getElementById('live-distance-km');
  if (distEl) distEl.innerText = d.toFixed(1);
  return d.toFixed(1);
}

function getHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Calculate realistic Multi-Modal Transit ETA (minutes)
function getEtaMinutes(distKm) {
  if (distKm <= 1.5) return Math.max(8, Math.round(distKm * 12));
  if (distKm <= 10) return Math.max(12, Math.round(distKm * 2.2) + 6);
  return Math.max(18, Math.round(distKm * 1.3) + 12);
}

// Convert minute-of-day integer to 12-hour formatted time string (e.g. 810 -> "01:30 PM")
function formatTimeHourMinute(totalMinutes) {
  let m = (Math.round(totalMinutes) + 1440) % 1440;
  let hours = Math.floor(m / 60);
  let mins = m % 60;
  let ampm = hours >= 12 ? 'PM' : 'AM';
  let h12 = hours % 12;
  if (h12 === 0) h12 = 12;
  return `${String(h12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;
}

// =========================================================================
// 8. HANDSET SATELLITE NAVIGATION MAP (LEAFLET + ESRI TILES)
// =========================================================================
function initOrUpdateMobileMap() {
  const mapContainer = document.getElementById('mobile-gps-map');
  if (!mapContainer) return;

  if (!mobileMap) {
    mobileMap = L.map('mobile-gps-map', {
      zoomControl: false,
      attributionControl: false
    }).setView([georgeLocation.lat, georgeLocation.lng], 12);

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19
    }).addTo(mobileMap);
  }

  // Update Stadium Destination Pin
  if (stadiumMarker) {
    mobileMap.removeLayer(stadiumMarker);
  }
  const stadiumIcon = L.divIcon({
    className: 'mobile-map-pin',
    html: `
      <div style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -50%); cursor:pointer;">
        <div style="width:28px; height:28px; border-radius:8px; background:#080c14; border:2px solid #34d399; color:#34d399; display:flex; align-items:center; justify-content:center; font-size:13px; box-shadow:0 0 12px #34d399;">
          🏟️
        </div>
        <div style="font-size:8px; font-family:monospace; font-weight:bold; color:#fff; background:#080c14; padding:1px 4px; border-radius:3px; margin-top:2px; white-space:nowrap; border:1px solid #34d399;">
          ${activePass.gate}
        </div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 20]
  });
  stadiumMarker = L.marker([activeEvent.lat, activeEvent.lng], { icon: stadiumIcon }).addTo(mobileMap);

  // Dynamic Transit Route Polyline (Cyan Electric Vector)
  if (routePolyline) {
    mobileMap.removeLayer(routePolyline);
  }

  const routePoints = [];
  routePoints.push([georgeLocation.lat, georgeLocation.lng]);

  const dist = getHaversineDistance(georgeLocation.lat, georgeLocation.lng, activeEvent.lat, activeEvent.lng);
  
  if (activeEventKey === 'dypatil_nerul') {
    if (georgeLocation.lng < 72.95) {
      if (georgeLocation.lat < 19.05) {
        routePoints.push([19.0657, 72.8794]); // Kurla Junction
      }
      routePoints.push([19.0550, 72.9300]); // Vashi Creek Bridge
    }
    if (dist > 3) {
      routePoints.push([19.0350, 73.0180]); // Nerul East Terminal
    }
  } else if (activeEventKey === 'wankhede_mumbai') {
    if (georgeLocation.lat > 19.00) {
      routePoints.push([18.9750, 72.8220]); // Mumbai Central
    }
    if (dist > 1.5) {
      routePoints.push([18.9322, 72.8264]); // Churchgate
    }
  } else if (activeEventKey === 'narendra_modi') {
    if (georgeLocation.lat < 23.06) {
      routePoints.push([23.0550, 72.5850]); // Sabarmati
    }
    if (dist > 1.5) {
      routePoints.push([23.0900, 72.5950]); // Motera Metro
    }
  }

  routePoints.push([activeEvent.lat, activeEvent.lng]);

  routePolyline = L.polyline(routePoints, {
    color: '#38bdf8',
    weight: 3.5,
    opacity: 0.9,
    dashArray: '6, 6'
  }).addTo(mobileMap);

  // Staged Feeder Bus Marker
  if (busMarker) {
    mobileMap.removeLayer(busMarker);
  }
  const busIcon = L.divIcon({
    className: 'mobile-map-bus',
    html: `
      <div style="width:24px; height:24px; border-radius:50%; background:#10b981; color:#05080e; display:flex; align-items:center; justify-content:center; font-size:11px; box-shadow:0 0 10px #10b981; transform:translate(-50%,-50%);">
        🚌
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
  busMarker = L.marker(activeEvent.shuttleCoords, { icon: busIcon }).addTo(mobileMap).bindPopup(activeEvent.shuttle);

  // Update Handset GPS Dot
  if (userMarker) {
    userMarker.setLatLng([georgeLocation.lat, georgeLocation.lng]);
  } else {
    const userGpsIcon = L.divIcon({
      className: 'mobile-user-gps',
      html: `
        <div style="position:relative; width:22px; height:22px; transform:translate(-50%,-50%);">
          <div style="position:absolute; inset:-4px; border-radius:50%; background:rgba(56,189,248,0.4); animation:ping 1.5s infinite;"></div>
          <div style="position:absolute; inset:0; border-radius:50%; background:#38bdf8; border:2px solid #ffffff; box-shadow:0 0 10px #38bdf8;"></div>
        </div>
      `,
      iconSize: [22, 22],
      iconAnchor: [11, 11]
    });
    userMarker = L.marker([georgeLocation.lat, georgeLocation.lng], { icon: userGpsIcon }).addTo(mobileMap);
  }

  // Smooth fitBounds to frame origin & destination
  if (mobileMap && routePoints.length > 0) {
    mobileMap.fitBounds(L.latLngBounds(routePoints).pad(0.2));
  }
}

// =========================================================================
// 9. MOBILE BOTTOM TAB NAVIGATION
// =========================================================================
window.switchMobileTab = function(tabName) {
  currentTab = tabName;

  document.querySelectorAll('.tab-content').forEach(sec => sec.classList.add('hidden'));

  const tabs = ['pass', 'nav', 'itinerary', 'events', 'sos'];
  tabs.forEach(t => {
    const btn = document.getElementById(`btn-tab-${t}`);
    if (btn) {
      if (t === tabName) {
        btn.className = (t === 'sos')
          ? "flex flex-col items-center space-y-1 text-rose-400 font-bold font-mono text-[9px] transition scale-105"
          : "flex flex-col items-center space-y-1 text-sky-400 font-bold font-mono text-[9px] transition scale-105";
      } else {
        btn.className = "flex flex-col items-center space-y-1 text-slate-400 hover:text-white font-mono text-[9px] transition";
      }
    }
  });

  const target = document.getElementById(`tab-sec-${tabName}`);
  if (target) target.classList.remove('hidden');

  if (tabName === 'nav') {
    initOrUpdateMobileMap();
    setTimeout(() => {
      if (mobileMap) mobileMap.invalidateSize();
    }, 200);
  }

  lucide.createIcons();
};

// =========================================================================
// 10. FIELD SOS & INCIDENT DISPATCH
// =========================================================================
window.sendMobileSOS = function(reason) {
  showMobileToast(`🚨 SOS RELAYED: "${reason}" dispatched with GPS coordinates!`);

  if (window.ChronosSupabase && window.ChronosSupabase.logLiveDecision) {
    window.ChronosSupabase.logLiveDecision({
      eventId: activeEventKey,
      title: `GUEST SOS: ${reason}`,
      text: `Sent by ${activePass.user} at GPS (${georgeLocation.lat.toFixed(4)}, ${georgeLocation.lng.toFixed(4)} - ${georgeLocation.label}). Requires field response.`,
      category: 'GUEST_SOS',
      urgency: 'URGENT'
    }).catch(err => console.log('Notice:', err));
  }
};

window.submitCustomSOS = function() {
  const msg = document.getElementById('sos-message')?.value;
  if (!msg || !msg.trim()) {
    showMobileToast("Please enter a brief description before submitting.");
    return;
  }
  sendMobileSOS(msg.trim());
  document.getElementById('sos-message').value = '';
};

// =========================================================================
// 11. CLOCK & TOAST UTILITIES
// =========================================================================
function startMobileClock() {
  setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const clockEl = document.getElementById('mobile-clock');
    if (clockEl) clockEl.innerText = `${hours}:${minutes}`;
  }, 1000);
}

function showMobileToast(msg) {
  const toast = document.getElementById('mobile-toast');
  const msgEl = document.getElementById('mobile-toast-msg');
  if (toast && msgEl) {
    msgEl.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 3800);
  }
}

// =========================================================================
// 12. LIVE TRANSIT JOURNEY SIMULATION
// =========================================================================
let journeyIntervalState = null;
let waypointIdx = 0;

window.toggleJourneySimulation = function() {
  const btn = document.getElementById('btn-journey-sim');
  const waypoints = activeEvent.journeyWaypoints || [];

  if (journeyIntervalState) {
    clearInterval(journeyIntervalState);
    journeyIntervalState = null;
    if (btn) btn.innerHTML = '<i data-lucide="play" class="w-3 h-3"></i><span>Simulate Journey</span>';
    showMobileToast("Transit journey simulation paused.");
    lucide.createIcons();
    return;
  }

  showMobileToast(`▶️ Live Transit Journey to ${activeEvent.shortVenue} Active!`);
  if (btn) btn.innerHTML = '<i data-lucide="pause" class="w-3 h-3 text-amber-400"></i><span>Pause Journey</span>';
  lucide.createIcons();

  journeyIntervalState = setInterval(() => {
    waypointIdx = (waypointIdx + 1) % waypoints.length;
    const pt = waypoints[waypointIdx];
    georgeLocation.lat = pt.lat;
    georgeLocation.lng = pt.lng;
    georgeLocation.label = pt.name;

    updateLocationUI("In Transit", pt.name);
    
    if (waypointIdx === waypoints.length - 1) {
      showMobileToast(`🎉 Arrived at ${activePass.gate}! Optical Pass Ready for Turnstile Scan.`);
      clearInterval(journeyIntervalState);
      journeyIntervalState = null;
      if (btn) btn.innerHTML = '<i data-lucide="rotate-ccw" class="w-3 h-3"></i><span>Restart Journey</span>';
      lucide.createIcons();
    }
  }, 2200);
};
