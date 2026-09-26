/**
 * ChronosFlow — Tactical GIS Command Cockpit (Visual-First, Map-Dominant)
 * Inspired by Tactical Cyber-Command & Earth Observation Systems
 */

// =========================================================================
// 1. STATE & GLOBAL CONFIGURATION
// =========================================================================
let currentLiveEventId = 'dypatil_nerul';
let liveSatMap = null;

// Heatmap Blobs & Tactical Layers
let visualHeatMarkers = [];
let laserPolylines = [];
let heatmapsVisible = true;
let lasersVisible = true;
let cctvPipVisible = true;

// Active CCTV State
let activeCamChannel = 1;
let cctvZoomLevel = 1.0;
let cctvAnimationFrame = null;

// Swarm Deliberation & Human-in-the-Loop State
let currentAnomalyType = 'surge';
let swarmApprovalStage = 0; // 0: Awaiting, 1: Stage 1, 2: Stage 2, 3: Fully Dispatched

// Live Telemetry
let liveAttendance = 43890;
let liveMaxCap = 55000;
let liveHeadwaySec = 5.8;
let currentPressurePct = 86;

// Tactical Perimeters & Coordinates (DY Patil Nerul center: 19.0435, 73.0253)
const VENUE_COORDINATES = {
  dypatil_nerul: {
    lat: 19.0435, lng: 73.0253,
    title: "Dr. D.Y. Patil Stadium — Nerul, Navi Mumbai",
    zoom: 16
  },
  wankhede_mumbai: {
    lat: 18.9389, lng: 72.8258,
    title: "Wankhede Stadium — Churchgate, Mumbai",
    zoom: 16
  },
  madison_sq_garden: {
    lat: 40.7505, lng: -73.9934,
    title: "Madison Square Garden — Manhattan, NY",
    zoom: 16
  }
};

// =========================================================================
// 2. INITIALIZATION
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('current-events');

  const urlParams = new URLSearchParams(window.location.search);
  const paramEvent = urlParams.get('event');
  if (paramEvent && VENUE_COORDINATES[paramEvent]) {
    currentLiveEventId = paramEvent;
  }

  const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
  const titleEl = document.getElementById('live-venue-title');
  if (titleEl) titleEl.innerText = venue.title;

  initTacticalSatelliteMap();
  initCCTVCanvas();
  runAgentDeliberation(currentAnomalyType);
  startTelemetryTicker();
  lucide.createIcons();
});

// =========================================================================
// 3. TACTICAL GIS SATELLITE MAP (ESRI ORTHOPHOTO + GLOWING HEAT BLOBS)
// =========================================================================
function initTacticalSatelliteMap() {
  const mapContainer = document.getElementById('live-satellite-map');
  if (!mapContainer) return;

  const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;

  if (liveSatMap) {
    liveSatMap.remove();
    liveSatMap = null;
  }

  // Dark Tactical Satellite Map
  liveSatMap = L.map('live-satellite-map', {
    zoomControl: false,
    attributionControl: false
  }).setView([venue.lat, venue.lng], venue.zoom);

  // ESRI World Imagery Satellite Layer with Dark Contrast
  const esriLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    className: 'tactical-sat-tiles'
  }).addTo(liveSatMap);

  // Render Venue Geofence Outline (Cyan/Electric Blue)
  const stadiumGeofence = [
    [venue.lat + 0.0035, venue.lng - 0.0038],
    [venue.lat + 0.0040, venue.lng + 0.0028],
    [venue.lat - 0.0032, venue.lng + 0.0042],
    [venue.lat - 0.0036, venue.lng - 0.0032]
  ];

  L.polygon(stadiumGeofence, {
    color: '#38bdf8',
    weight: 2,
    dashArray: '6, 6',
    fillColor: '#0284c7',
    fillOpacity: 0.1
  }).addTo(liveSatMap);

  // RENDER VIVID GLOWING HEATMAP BLOBS (MATCHING USER'S PHOTO!)
  renderVividHeatmapClusters(venue);

  // RENDER ELECTRIC CYAN LASER VECTORS (MATCHING THE BLUE LINE IN PHOTO!)
  renderElectricLaserVectors(venue);

  // RENDER TACTICAL NODE BEACONS
  renderTacticalPins(venue);

  setTimeout(() => {
    if (liveSatMap) liveSatMap.invalidateSize();
  }, 200);
}

// =========================================================================
// 4. VIVID GLOWING CROWD HEATMAP CLUSTERS (CONCENTRIC RED/ORANGE RINGS)
// =========================================================================
function renderVividHeatmapClusters(venue) {
  // Clear any existing heat markers
  visualHeatMarkers.forEach(m => liveSatMap.removeLayer(m));
  visualHeatMarkers = [];

  if (!heatmapsVisible) return;

  // Cluster 1: Gate 4 Main Ingress Choke (Intense Multi-Lobe Red Heatmap)
  const heatNodes = [
    { lat: venue.lat + 0.0016, lng: venue.lng - 0.0018, size: 110, id: 'heat-gate4-a' },
    { lat: venue.lat + 0.0020, lng: venue.lng - 0.0008, size: 90, id: 'heat-gate4-b' },
    { lat: venue.lat + 0.0008, lng: venue.lng - 0.0022, size: 80, id: 'heat-gate4-c' },
    { lat: venue.lat + 0.0025, lng: venue.lng + 0.0005, size: 95, id: 'heat-gate4-d' }
  ];

  heatNodes.forEach(node => {
    const isMitigated = (swarmApprovalStage >= 3);
    const heatIcon = L.divIcon({
      className: 'heat-contour-container',
      html: `
        <div class="heat-contour-blob ${isMitigated ? 'heat-blob-mitigated' : ''}" style="width:${node.size}px; height:${node.size}px;">
          <div class="heat-blob-core"></div>
          <div class="heat-blob-ring"></div>
          <div class="heat-blob-ring-2"></div>
        </div>
      `,
      iconSize: [node.size, node.size],
      iconAnchor: [node.size / 2, node.size / 2]
    });

    const marker = L.marker([node.lat, node.lng], { icon: heatIcon, interactive: false }).addTo(liveSatMap);
    visualHeatMarkers.push(marker);
  });

  // Cluster 2: LP Junction Highway Bottleneck (Amber/Coral Heat Lobe)
  const highwayHeat = L.divIcon({
    className: 'heat-contour-container',
    html: `
      <div class="heat-contour-blob" style="width:130px; height:130px; filter: drop-shadow(0 0 25px rgba(245, 158, 11, 0.85));">
        <div class="heat-blob-core" style="background: radial-gradient(circle, rgba(245, 158, 11, 0.95) 0%, rgba(239, 68, 68, 0.75) 50%, rgba(234, 179, 8, 0.4) 75%, transparent 100%);"></div>
        <div class="heat-blob-ring" style="border-color: rgba(245, 158, 11, 0.6);"></div>
      </div>
    `,
    iconSize: [130, 130],
    iconAnchor: [65, 65]
  });
  const mHwy = L.marker([venue.lat + 0.0085, venue.lng + 0.0042], { icon: highwayHeat, interactive: false }).addTo(liveSatMap);
  visualHeatMarkers.push(mHwy);
}

// =========================================================================
// 5. ELECTRIC CYAN LASER VECTORS (MATCHING THE BLUE LINE IN PHOTO)
// =========================================================================
function renderElectricLaserVectors(venue) {
  laserPolylines.forEach(l => liveSatMap.removeLayer(l));
  laserPolylines = [];

  if (!lasersVisible) return;

  // 1. Primary Transit Laser: Nerul Railway Station -> Stadium Gate 4 (Long Cyan Beam)
  const laserTransitCoords = [
    [venue.lat - 0.0105, venue.lng - 0.0068], // Nerul East Station Hub
    [venue.lat - 0.0045, venue.lng - 0.0040], // Station Feeder Avenue
    [venue.lat + 0.0016, venue.lng - 0.0018]  // Gate 4 Main Ingress
  ];

  const laserLine1 = L.polyline(laserTransitCoords, {
    color: '#38bdf8',
    weight: 4,
    opacity: 0.95,
    className: 'laser-cyan-vector'
  }).addTo(liveSatMap);
  laserPolylines.push(laserLine1);

  // 2. Highway Arterial Laser: LP Junction -> North Parking
  const laserHwyCoords = [
    [venue.lat + 0.0085, venue.lng + 0.0042], // LP Junction Flyover
    [venue.lat + 0.0040, venue.lng + 0.0028]  // North Outer Perimeter
  ];

  const laserLine2 = L.polyline(laserHwyCoords, {
    color: '#f59e0b',
    weight: 3.5,
    opacity: 0.85,
    dashArray: '8, 10'
  }).addTo(liveSatMap);
  laserPolylines.push(laserLine2);

  // 3. Mitigated Emerald Bypass Laser (Activates when Stage 3 Dispatched)
  if (swarmApprovalStage >= 2) {
    const emeraldBypassCoords = [
      [venue.lat + 0.0016, venue.lng - 0.0018], // Gate 4 Choke
      [venue.lat + 0.0032, venue.lng + 0.0005], // Aux Gates C1-C8
      [venue.lat + 0.0015, venue.lng + 0.0017], // Trauma Green Corridor
      [venue.lat - 0.0020, venue.lng + 0.0010]  // South Pavilion
    ];

    const bypassLine = L.polyline(emeraldBypassCoords, {
      color: '#10b981',
      weight: 4.5,
      opacity: 0.95,
      className: 'laser-emerald-vector'
    }).addTo(liveSatMap);
    laserPolylines.push(bypassLine);
  }
}

// =========================================================================
// 6. TACTICAL NODE BEACONS & CAMERA HOTSPOTS
// =========================================================================
function renderTacticalPins(venue) {
  const nodes = [
    {
      lat: venue.lat + 0.0016, lng: venue.lng - 0.0018,
      camId: 1, title: "CAM 01 // Gate 4 Turnstiles",
      color: "#f43f5e", icon: "📹", pulse: true
    },
    {
      lat: venue.lat + 0.0085, lng: venue.lng + 0.0042,
      camId: 2, title: "CAM 02 // LP Junction Flyover",
      color: "#f59e0b", icon: "🚗", pulse: true
    },
    {
      lat: venue.lat - 0.0020, lng: venue.lng + 0.0010,
      camId: 3, title: "CAM 03 // South Concourse",
      color: "#06b6d4", icon: "💧", pulse: false
    },
    {
      lat: venue.lat - 0.0105, lng: venue.lng - 0.0068,
      camId: 4, title: "CAM 04 // Nerul Station Transit Hub",
      color: "#34d399", icon: "🚆", pulse: false
    }
  ];

  nodes.forEach(node => {
    const pin = L.divIcon({
      className: 'satellite-tactical-pin',
      html: `
        <div onclick="switchCCTVChannel(${node.camId})" style="display:flex; flex-direction:column; align-items:center; transform: translate(-50%, -50%); cursor:pointer;">
          <div style="width:32px; height:32px; border-radius:10px; background:rgba(6,9,17,0.92); border:2px solid ${node.color}; color:${node.color}; display:flex; align-items:center; justify-content:center; font-size:15px; box-shadow:0 0 20px ${node.color}; ${node.pulse ? 'animation: beaconPulse 1.8s infinite;' : ''}">
            ${node.icon}
          </div>
          <div style="margin-top:3px; font-size:9px; font-family:monospace; font-weight:bold; color:#fff; background:rgba(6,9,17,0.95); padding:2px 6px; border-radius:4px; border:1px solid ${node.color}cc; white-space:nowrap;">
            ${node.title.split('//')[0].trim()}
          </div>
        </div>
      `,
      iconSize: [110, 48],
      iconAnchor: [55, 24]
    });

    L.marker([node.lat, node.lng], { icon: pin }).addTo(liveSatMap);
  });
}

// =========================================================================
// 7. REAL-TIME PROCEDURAL CCTV CANVAS
// =========================================================================
let particles = [];
const NUM_PARTICLES = 45;

function initCCTVCanvas() {
  const canvas = document.getElementById('cctv-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.parentElement.clientWidth || 320;
    canvas.height = canvas.parentElement.clientHeight || 180;
  }
  resize();

  particles = [];
  for (let i = 0; i < NUM_PARTICLES; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.2) * 1.1,
      size: 2.2 + Math.random() * 2,
      opacity: 0.4 + Math.random() * 0.5
    });
  }

  function drawCCTV() {
    ctx.fillStyle = '#060a12';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Perspective Lines
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Geometry based on active camera
    if (activeCamChannel === 1) {
      // Gate 4 Turnstile Lines
      ctx.strokeStyle = swarmApprovalStage >= 3 ? 'rgba(16, 185, 129, 0.5)' : 'rgba(244, 63, 94, 0.5)';
      ctx.lineWidth = 2;
      ctx.strokeRect(canvas.width * 0.2, canvas.height * 0.35, canvas.width * 0.6, canvas.height * 0.45);
    } else if (activeCamChannel === 2) {
      // Highway Lanes
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * 0.3);
      ctx.lineTo(canvas.width, canvas.height * 0.85);
      ctx.stroke();
    }

    // Draw Spectator/Vehicle Particles
    particles.forEach(p => {
      // If mitigated, particles disperse away faster
      const speedMult = swarmApprovalStage >= 3 ? 1.6 : 1.0;
      p.x += p.vx * cctvZoomLevel * speedMult;
      p.y += p.vy * cctvZoomLevel * speedMult;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.fillStyle = activeCamChannel === 1 
        ? (swarmApprovalStage >= 3 ? `rgba(16, 185, 129, ${p.opacity})` : `rgba(244, 63, 94, ${p.opacity})`)
        : activeCamChannel === 2 ? `rgba(245, 158, 11, ${p.opacity})` : `rgba(56, 189, 248, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * cctvZoomLevel, 0, Math.PI * 2);
      ctx.fill();
    });

    updateCCTVReticle(canvas.width, canvas.height);

    // Millisecond Live Clock
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');
    const clockEl = document.getElementById('cctv-live-clock');
    const topClock = document.getElementById('top-timecode');
    if (clockEl) clockEl.innerText = timeStr;
    if (topClock) topClock.innerText = `2026-09-26 ${timeStr}`;

    cctvAnimationFrame = requestAnimationFrame(drawCCTV);
  }

  drawCCTV();
}

function updateCCTVReticle(w, h) {
  const container = document.getElementById('cctv-bounding-boxes');
  if (!container) return;

  if (activeCamChannel === 1) {
    const isMitigated = swarmApprovalStage >= 3;
    container.innerHTML = `
      <div class="cctv-reticle-box" style="top:${h * 0.22}px; left:${w * 0.18}px; width:${w * 0.42}px; height:${h * 0.52}px; border-color:${isMitigated ? '#10b981' : '#f43f5e'};">
        <div style="position:absolute; top:-16px; left:0; font-family:monospace; font-size:8px; font-weight:bold; color:${isMitigated ? '#10b981' : '#f43f5e'}; background:#05080e; padding:1px 4px; border-radius:2px;">
          ${isMitigated ? '[FLOW FLUID: 1.8 PAX/M² - MITIGATED]' : '[GATE 4 QUEUE: 4.2 PAX/M² - CHOKE]'}
        </div>
      </div>
    `;
  } else if (activeCamChannel === 2) {
    container.innerHTML = `
      <div class="cctv-reticle-box" style="top:${h * 0.3}px; left:${w * 0.15}px; width:${w * 0.6}px; height:${h * 0.45}px; border-color:#f59e0b;">
        <div style="position:absolute; top:-16px; left:0; font-family:monospace; font-size:8px; font-weight:bold; color:#f59e0b; background:#05080e; padding:1px 4px; border-radius:2px;">
          [LP FLYOVER: 14 KM/H - BACKPRESSURE]
        </div>
      </div>
    `;
  } else {
    container.innerHTML = `
      <div class="cctv-reticle-box" style="top:${h * 0.25}px; left:${w * 0.25}px; width:${w * 0.5}px; height:${h * 0.5}px; border-color:#38bdf8;">
        <div style="position:absolute; top:-16px; left:0; font-family:monospace; font-size:8px; font-weight:bold; color:#38bdf8; background:#05080e; padding:1px 4px; border-radius:2px;">
          [OPTICAL TRACKER: NORMAL HEADWAY]
        </div>
      </div>
    `;
  }
}

window.switchCCTVChannel = function(ch) {
  activeCamChannel = ch;
  for (let i = 1; i <= 4; i++) {
    const tab = document.getElementById(`cam-tab-${i}`);
    if (tab) {
      tab.className = (i === ch)
        ? "px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold border border-sky-400/40"
        : "px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 hover:text-white";
    }
  }

  const labelEl = document.getElementById('cctv-label');
  const statEl = document.getElementById('cctv-cluster-stat');
  if (ch === 1) {
    if (labelEl) labelEl.innerText = "CAM 01 // Gate 4 Turnstiles";
    if (statEl) statEl.innerText = "Density: 4.2 pax/m² (WARN)";
  } else if (ch === 2) {
    if (labelEl) labelEl.innerText = "CAM 02 // LP Junction Flyover";
    if (statEl) statEl.innerText = "Velocity: 14 km/h (+22m delay)";
  } else if (ch === 3) {
    if (labelEl) labelEl.innerText = "CAM 03 // South Concourse Misting";
    if (statEl) statEl.innerText = "Flow: 1.8 pax/m² (Optimal)";
  } else {
    if (labelEl) labelEl.innerText = "CAM 04 // Nerul Station Loop";
    if (statEl) statEl.innerText = "65 Shuttles Active &bull; Headway 3m";
  }
};

window.cycleCCTVZoom = function() {
  cctvZoomLevel = (cctvZoomLevel === 1.0) ? 1.5 : (cctvZoomLevel === 1.5) ? 2.0 : 1.0;
  showToast(`CCTV Optical Zoom: ${cctvZoomLevel.toFixed(1)}x`);
};

window.toggleCCTVPip = function() {
  const card = document.getElementById('floating-cctv-card');
  if (card) {
    cctvPipVisible = !cctvPipVisible;
    card.classList.toggle('hidden', !cctvPipVisible);
  }
};

window.toggleVisualHeatmap = function() {
  heatmapsVisible = !heatmapsVisible;
  const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
  renderVividHeatmapClusters(venue);
  showToast(`Crowd Heatmap Display: ${heatmapsVisible ? 'ENABLED' : 'DISABLED'}`);
};

window.toggleLaserVectors = function() {
  lasersVisible = !lasersVisible;
  const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
  renderElectricLaserVectors(venue);
  showToast(`Laser Transit Vectors: ${lasersVisible ? 'ENABLED' : 'DISABLED'}`);
};

window.recenterLiveMap = function() {
  const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
  if (liveSatMap) {
    liveSatMap.flyTo([venue.lat, venue.lng], venue.zoom, { duration: 0.8 });
  }
};

// =========================================================================
// 8. MULTI-AGENT SWARM DELIBERATION & HUMAN-IN-THE-LOOP ACTIONS
// =========================================================================
const SWARM_SCENARIOS = {
  surge: {
    code: "DIRECTIVE SWARM-01 • GATE 4 LOAD BALANCING",
    body: "Slide open Aux Gates C1–C8, divert 35% queue, hold 8 NMMT shuttles at Palm Beach, stage Medic Bravo.",
    pressureVal: 86,
    mitigatedVal: 28,
    label: "Gate 4 Ingress Choke Pressure",
    agents: [
      { avatar: "👁️", name: "Aegis-Vision", type: "ANOMALY", text: "CAM 01 optical recognition flagged crowd density 4.2 pax/m² at Gate 4. Ingress scan slowed to 5.8s." },
      { avatar: "🧠", name: "Chronos-Flow", type: "PREDICT", text: "Downstream choke: outer ring road spillover in 6.5 mins; 2,800 spectators stalled." },
      { avatar: "🚦", name: "Metro-Transit", type: "FLEET", text: "Instruct 8 arriving NMMT buses to hold for 4-minute metering at Palm Beach bay." },
      { avatar: "🛡️", name: "Guardian-Safety", type: "SAFETY", text: "Slide open Auxiliary Gates C1–C8. Divert 35% queue to shaded plaza to drop pressure to 1.8 pax/m²." },
      { avatar: "📦", name: "Logistics-Liaison", type: "DISPATCH", text: "Deploy Srinivasan's 10 marshals with flex-barricades. Stage Trauma Team Bravo at Misting Pod 04." }
    ]
  },
  traffic: {
    code: "DIRECTIVE SWARM-02 • HIGHWAY DIVERSION",
    body: "Divert cars to Wonders Park via Palm Beach, enforce Green Transit Corridor on Sion-Panvel Hwy.",
    pressureVal: 78,
    mitigatedVal: 24,
    label: "LP Junction Traffic Choke",
    agents: [
      { avatar: "👁️", name: "Aegis-Vision", type: "ANOMALY", text: "CAM 02 optical recognition registered traffic velocity drop to 14 km/h at LP Junction intersection." },
      { avatar: "🧠", name: "Chronos-Flow", type: "PREDICT", text: "Feeder bus cycle delayed 18 mins. Mass spectator wave stalled outside stadium perimeters." },
      { avatar: "🚦", name: "Metro-Transit", type: "TRANSIT", text: "Divert all private vehicles via Palm Beach Road to Wonders Park remote parking (1,400 slots free)." },
      { avatar: "🛡️", name: "Guardian-Safety", type: "SAFETY", text: "Coordinate with Navi Mumbai Police to enforce dedicated Green Corridor on inner service lane." },
      { avatar: "📦", name: "Logistics-Liaison", type: "DISPATCH", text: "Harry Vance to re-route 12 reserve shuttles via Seawoods flyover to bypass the LP choke." }
    ]
  },
  heat: {
    code: "DIRECTIVE SWARM-03 • EMERGENCY HYDRATION",
    body: "Deploy 8 misting units across South Concourse, open shaded pavilion corridor, dispatch 4 water tankers.",
    pressureVal: 72,
    mitigatedVal: 18,
    label: "WBGT Heat Stress Index",
    agents: [
      { avatar: "👁️", name: "Aegis-Vision", type: "ANOMALY", text: "Sensor telemetry recorded 31.4°C / 78% RH. Solar radiation at South Concourse crossed WBGT 28.4°C." },
      { avatar: "🧠", name: "Chronos-Flow", type: "PREDICT", text: "Unshaded queue dwell times over 8 mins will trigger hydration distress in 12–15 visitors." },
      { avatar: "🚦", name: "Metro-Transit", type: "TRANSIT", text: "Distribute chilled bottled water directly upon disembarkation at station shuttle bays." },
      { avatar: "🛡️", name: "Guardian-Safety", type: "SAFETY", text: "Activate 8 reserve high-pressure misting fans and open shaded breezeways through South Pavilion." },
      { avatar: "📦", name: "Logistics-Liaison", type: "DISPATCH", text: "Dispatch 4 auxiliary mobile water tankers from Harry Vance to refill pods immediately." }
    ]
  }
};

window.triggerPossibility = function(type) {
  if (SWARM_SCENARIOS[type]) {
    currentAnomalyType = type;
    runAgentDeliberation(type);
    showToast(`Simulated Anomaly Spike: ${SWARM_SCENARIOS[type].code.split('•')[0]}`);
  }
};

function runAgentDeliberation(scenarioKey) {
  const scenario = SWARM_SCENARIOS[scenarioKey] || SWARM_SCENARIOS.surge;
  const stream = document.getElementById('agent-deliberation-stream');
  if (!stream) return;

  swarmApprovalStage = 0;
  currentPressurePct = scenario.pressureVal;
  updatePressureGauge(currentPressurePct, false);

  const codeEl = document.getElementById('directive-code');
  const bodyEl = document.getElementById('directive-body');
  const labelEl = document.getElementById('pressure-label');
  if (codeEl) codeEl.innerText = scenario.code.split('•')[0].trim();
  if (bodyEl) bodyEl.innerText = scenario.body;
  if (labelEl) labelEl.innerText = scenario.label;

  stream.innerHTML = `
    <div class="p-2 rounded-xl bg-slate-950/60 border border-sky-950 text-cyan-300 font-mono text-[10px] animate-pulse flex items-center space-x-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
      <span>Autonomous Swarm analyzing live optical &amp; transit telemetry...</span>
    </div>
  `;

  updateSwarmUI();

  // Staggered animated agent thoughts
  let delay = 250;
  scenario.agents.forEach((item, idx) => {
    setTimeout(() => {
      if (idx === 0) stream.innerHTML = '';
      const bubble = document.createElement('div');
      bubble.className = "agent-bubble space-y-1";
      bubble.innerHTML = `
        <div class="flex items-center justify-between text-[10px] font-mono">
          <div class="flex items-center space-x-1.5">
            <span>${item.avatar}</span>
            <strong class="text-white">${item.name}</strong>
          </div>
          <span class="text-[8px] font-bold px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-400/20">${item.type}</span>
        </div>
        <p class="text-[10px] text-slate-300 leading-tight pl-5">${item.text}</p>
      `;
      stream.appendChild(bubble);
      stream.scrollTop = stream.scrollHeight;
    }, delay);
    delay += 350;
  });
}

// =========================================================================
// 9. HUMAN-IN-THE-LOOP SWARM EXECUTION
// =========================================================================
window.advanceSwarmApproval = function() {
  const scenario = SWARM_SCENARIOS[currentAnomalyType] || SWARM_SCENARIOS.surge;

  if (swarmApprovalStage === 0) {
    swarmApprovalStage = 1;
    showToast(`STAGE 1 VERIFIED: Alicia Stone verified ${scenario.code.split('•')[0]}!`);
  } else if (swarmApprovalStage === 1) {
    swarmApprovalStage = 2;
    showToast(`STAGE 2 MOBILIZED: Field marshals and buses dispatched to perimeter!`);
    // Render the emerald laser bypass vector on map
    const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
    renderElectricLaserVectors(venue);
  } else if (swarmApprovalStage === 2) {
    swarmApprovalStage = 3;
    currentPressurePct = scenario.mitigatedVal;
    updatePressureGauge(currentPressurePct, true);

    // Transform heatmap from red to cool emerald
    const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
    renderVividHeatmapClusters(venue);
    renderElectricLaserVectors(venue);

    showToast(`STAGE 3 DISPATCHED: Directive is executing live over police radio! Heatmap cooled.`);
  } else {
    showToast(`CYCLE EXTENDED: Operational authorization extended +30 minutes.`);
  }

  updateSwarmUI();
};

window.emergencyExecutiveBypass = function() {
  const scenario = SWARM_SCENARIOS[currentAnomalyType] || SWARM_SCENARIOS.surge;
  swarmApprovalStage = 3;
  currentPressurePct = scenario.mitigatedVal;
  updatePressureGauge(currentPressurePct, true);

  const venue = VENUE_COORDINATES[currentLiveEventId] || VENUE_COORDINATES.dypatil_nerul;
  renderVividHeatmapClusters(venue);
  renderElectricLaserVectors(venue);

  showToast(`EXECUTIVE RADIO BYPASS: Immediate 1-click radio dispatch authorized!`);
  updateSwarmUI();
};

function updatePressureGauge(pct, isMitigated) {
  const circle = document.getElementById('pressure-gauge-circle');
  const text = document.getElementById('pressure-gauge-text');
  const status = document.getElementById('pressure-status-tag');

  if (circle) {
    circle.setAttribute('stroke-dasharray', `${pct}, 100`);
    circle.setAttribute('class', isMitigated ? 'text-emerald-400 transition-all duration-700' : 'text-rose-500 transition-all duration-700');
  }
  if (text) {
    text.innerText = `${pct}%`;
    text.setAttribute('class', isMitigated ? 'absolute text-xs font-mono font-black text-emerald-400' : 'absolute text-xs font-mono font-black text-rose-400');
  }
  if (status) {
    status.innerText = isMitigated ? 'STATUS: CHOKE MITIGATED // OPTIMAL FLOW' : 'STATUS: RED SURGE ACTIVE';
    status.setAttribute('class', isMitigated ? 'text-[9px] font-mono font-bold text-emerald-400' : 'text-[9px] font-mono font-bold text-rose-400');
  }
}

function updateSwarmUI() {
  const badge = document.getElementById('solution-stage-badge');
  const btn = document.getElementById('btn-approve-swarm');
  const btnText = document.getElementById('btn-approve-text');
  const dots = document.getElementById('lifecycle-dots');

  if (!badge || !btn || !btnText) return;

  if (swarmApprovalStage === 0) {
    badge.className = "px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-mono font-bold";
    badge.innerText = "STAGE 0 // AWAITING";
    btnText.innerText = "⚡ EXECUTE SWARM MITIGATION (STAGE 1)";
    btn.className = "w-full py-3 rounded-2xl btn-glacier text-xs font-black flex items-center justify-center space-x-2 transition shadow-xl shadow-sky-500/20";
    if (dots) {
      dots.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></span>
        <span class="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></span>
        <span class="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></span>
      `;
    }
  } else if (swarmApprovalStage === 1) {
    badge.className = "px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/40 text-[9px] font-mono font-bold";
    badge.innerText = "STAGE 1 APPROVED (1/3)";
    btnText.innerText = "CONFIRM MOBILIZATION (STAGE 2)";
    btn.className = "w-full py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-black flex items-center justify-center space-x-2 transition shadow-xl shadow-cyan-500/30";
    if (dots) {
      dots.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></span>
        <span class="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></span>
      `;
    }
  } else if (swarmApprovalStage === 2) {
    badge.className = "px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-[9px] font-mono font-bold";
    badge.innerText = "STAGE 2 RE-CONFIRMED (2/3)";
    btnText.innerText = "RADIO BROADCAST DISPATCH (STAGE 3)";
    btn.className = "w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center justify-center space-x-2 transition shadow-xl shadow-emerald-500/30";
    if (dots) {
      dots.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"></span>
        <span class="w-2 h-2 rounded-full bg-slate-800 border border-slate-700"></span>
      `;
    }
  } else {
    badge.className = "px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-mono font-bold";
    badge.innerText = "FULLY AUTHORIZED // ACTIVE DISPATCH";
    btnText.innerText = "REPEAT APPROVAL / EXTEND CYCLE (+30m)";
    btn.className = "w-full py-3 rounded-2xl bg-slate-900 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-500/10 text-xs font-black flex items-center justify-center space-x-2 transition";
    if (dots) {
      dots.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
        <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
        <span class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
      `;
    }
  }
}

// =========================================================================
// 10. REAL-TIME TELEMETRY TICKER
// =========================================================================
function startTelemetryTicker() {
  setInterval(() => {
    liveAttendance += Math.floor(Math.random() * 6) + 2;
    if (liveAttendance > liveMaxCap) liveAttendance = liveMaxCap;

    const topScans = document.getElementById('top-scans');
    if (topScans) topScans.innerText = liveAttendance.toLocaleString();

    // Headway and Flux fluctuate realistically
    const topFlux = document.getElementById('top-flux');
    if (topFlux) {
      const delta = swarmApprovalStage >= 3 ? '+310 pax/min' : '+510 pax/min';
      topFlux.innerText = delta;
    }
  }, 2400);
}

function showToast(msg) {
  const toast = document.getElementById('live-toast');
  const msgEl = document.getElementById('live-toast-msg');
  if (toast && msgEl) {
    msgEl.innerText = msg;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 3500);
  }
}
