/**
 * ORCHESTRA - Phase 0: Intelligent Event Pre-Planning Engine (Dark Tactical Edition)
 * Universal & Generic Spatial Digital Twin Engine, Dynamic Place Suggestion System,
 * Live Venue Search Autocomplete, and Stage-Coupled Infrastructure Analytics.
 */

// 1. Comprehensive Venue & Area Knowledge Catalog
const VENUES_CATALOG = {
  dypatil_nerul: {
    id: "dypatil_nerul",
    name: "Dr. D.Y. Patil Sports Stadium",
    area: "Sector 7, Nerul, Navi Mumbai",
    city: "Mumbai / Navi Mumbai (MMR)",
    type: "Cricket / Multi-Sport Stadium",
    capacity: 55000,
    icon: "trophy",
    highway: "Sion-Panvel Expressway & Palm Beach Corridor",
    railway: "Harbour & Trans-Harbour Suburban Rail",
    description: "We are conducting a 4-day cricket championship at Dr. D.Y. Patil Stadium in Nerul from 1st September to 4th September with 50,000 spectators attending each day. Out-of-city spectators will arrive via Harbour Line trains and Sion-Panvel Highway, requiring local accommodation, shuttle connectivity, and staged egress management.",
    eventType: "Cricket Championship",
    duration: "4 days (Sep 1 - Sep 4)",
    expectedVisitors: 50000,
    nodes: [
      { id: "stadium_dypatil", name: "Dr. D.Y. Patil Sports Stadium", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Epicenter", capacity: "55,000 Seats", details: "14 Ingress Portals (A to N), 4 internal ramps, 2 broadcast towers.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main event operational container." },
      { id: "rail_nerul", name: "Nerul Railway Station", category: "rail", x: 28, y: 48, dist: "1.8 km", transitTime: "20 min walk / 6 min bus", capacity: "24,000 pax/hr", details: "Major suburban rail junction on Harbour Line & Trans-Harbour Line.", icon: "train", critical: true, stageLink: "stage_03", impact: "Primary mass transit gateway (52% of crowd influx)." },
      { id: "rail_juinagar", name: "Juinagar Railway Station", category: "rail", x: 24, y: 22, dist: "2.4 km", transitTime: "26 min walk / 8 min shuttle", capacity: "14,000 pax/hr", details: "Trans-Harbour feeder connector from Thane & Vashi direction.", icon: "train", critical: false, stageLink: "stage_03", impact: "Secondary rail drop-off." },
      { id: "rail_seawoods", name: "Seawoods Grand Central Station", category: "rail", x: 32, y: 78, dist: "3.1 km", transitTime: "10 min direct shuttle", capacity: "18,000 pax/hr", details: "Integrated modern transit hub & Nexus Seawoods Mall concourse.", icon: "train", critical: false, stageLink: "stage_09", impact: "Optimal southern egress collection point." },
      { id: "depot_nerul_bus", name: "NMMT Nerul Bus Depot", category: "rail", x: 36, y: 42, dist: "1.5 km", transitTime: "5 min shuttle origin", capacity: "65 Feeder Buses", details: "Base for dedicated continuous loop shuttles to Stadium Gate 4.", icon: "bus", critical: false, stageLink: "stage_03", impact: "Feeds Stage 3 Transportation shuttle capacity." },
      { id: "choke_lp_junction", name: "LP Junction (Sion-Panvel Hwy)", category: "choke", x: 52, y: 32, dist: "0.8 km", transitTime: "Pinch Point", capacity: "Severe Bottleneck", details: "Intersection of Sion-Panvel Highway and Nerul East bypass.", icon: "alert-triangle", critical: true, stageLink: "stage_03", impact: "Severe traffic congestion during 10:30-12:00 and 21:45-23:15." },
      { id: "choke_uran_phata", name: "Uran Phata Confluence", category: "choke", x: 68, y: 64, dist: "1.2 km", transitTime: "Arterial Merge", capacity: "Secondary Pinch", details: "Confluence point where freight trailers merge with Palm Beach lanes.", icon: "alert-triangle", critical: false, stageLink: "stage_08", impact: "Freight diversion needed during match egress." },
      { id: "hospital_dypatil", name: "Dr. D.Y. Patil Hospital & Research Centre", category: "hospital", x: 58, y: 44, dist: "0.2 km", transitTime: "2 min direct corridor", capacity: "1,200 Beds & Trauma Unit", details: "On-campus tertiary hospital immediately adjacent to stadium.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Guarantees <3 min emergency triage readiness." },
      { id: "hospital_apollo", name: "Apollo Hospitals Navi Mumbai", category: "hospital", x: 78, y: 72, dist: "3.8 km", transitTime: "8 min green corridor", capacity: "500 Beds", details: "JCI-accredited tertiary hospital in CBD Belapur.", icon: "heart-pulse", critical: false, stageLink: "stage_06", impact: "Secondary multi-specialty trauma backup." },
      { id: "hotel_the_park", name: "The Park Navi Mumbai (CBD Belapur)", category: "hotel", x: 74, y: 58, dist: "3.5 km", transitTime: "7 min drive / shuttle", capacity: "80 Luxury Rooms", details: "Boutique 5-star hotel for athletes, officials & VIPs.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "VIP delegation lodging." },
      { id: "hotel_fortune_select", name: "Fortune Select Exotica", category: "hotel", x: 18, y: 12, dist: "6.2 km", transitTime: "12 min highway drive", capacity: "85 Luxury Rooms", details: "Vashi upscale commercial hotel with banquet suites.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "Secondary business cluster." },
      { id: "hotel_royal_orchid", name: "Royal Orchid Central Grazia", category: "hotel", x: 22, y: 16, dist: "5.8 km", transitTime: "11 min highway drive", capacity: "67 Business Rooms", details: "Near Vashi station for corporate partners.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "Corporate lodging block." },
      { id: "hotel_nerul_cluster", name: "Nerul Sector 19/21 Hotel Cluster", category: "hotel", x: 42, y: 56, dist: "1.4 km", transitTime: "16 min walk", capacity: "420 Budget Rooms", details: "Budget and mid-tier guest properties within walking radius.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "Immediate local accommodation (100% booked)." },
      { id: "park_stadium_bays", name: "DY Patil North/South Parking", category: "parking", x: 47, y: 56, dist: "0.1 km", transitTime: "Direct Foot Access", capacity: "2,200 Cars / 3,500 Bikes", details: "Reserved for match VIP pass holders, team coaches & ambulances.", icon: "car", critical: true, stageLink: "stage_03", impact: "Secured vehicle perimeter." },
      { id: "park_wonders_park", name: "Wonders Park Public Overflow Parking", category: "parking", x: 38, y: 68, dist: "1.8 km", transitTime: "5 min shuttle loop", capacity: "1,500 Cars", details: "Municipal park-and-ride facility with continuous shuttle frequency.", icon: "car", critical: false, stageLink: "stage_03", impact: "Municipal park-and-ride buffer." },
      { id: "park_cidco_grounds", name: "CIDCO Exhibition Grounds Plaza", category: "parking", x: 15, y: 22, dist: "4.8 km", transitTime: "10 min express transit", capacity: "3,000 Cars & 80 Buses", details: "Paved massive overflow parking off Sion-Panvel expressway.", icon: "car", critical: false, stageLink: "stage_03", impact: "High-capacity remote vehicle reservoir." }
    ]
  },

  wankhede_mumbai: {
    id: "wankhede_mumbai",
    name: "Wankhede Stadium",
    area: "Churchgate & Marine Lines",
    city: "South Mumbai",
    type: "Cricket Stadium",
    capacity: 33100,
    icon: "landmark",
    highway: "Marine Drive Arterial & Maharshi Karve Road",
    railway: "Western Line (Churchgate & Marine Lines Stations)",
    description: "We are organizing a 3-day international cricket tournament at Wankhede Stadium in South Mumbai with 33,000 spectators daily. Attendees arrive via Churchgate and CST suburban trains, requiring coastal traffic diversions and hotel coordination across Nariman Point and Colaba.",
    eventType: "Cricket Championship",
    duration: "3 days (Nov 20 - 22)",
    expectedVisitors: 33000,
    nodes: [
      { id: "wankhede_core", name: "Wankhede Stadium Core", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "33,100 Seats", details: "Gates 1 to 7, Sachin Tendulkar Stand, Garware Pavilion.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main event arena." },
      { id: "rail_churchgate", name: "Churchgate Railway Terminus", category: "rail", x: 38, y: 44, dist: "0.4 km", transitTime: "5 min walk", capacity: "45,000 pax/hr", details: "Western Line terminus handling local fast and slow rakes.", icon: "train", critical: true, stageLink: "stage_03", impact: "Absorbs 60% of arriving crowd." },
      { id: "rail_marine_lines", name: "Marine Lines Railway Station", category: "rail", x: 42, y: 25, dist: "0.8 km", transitTime: "10 min walk", capacity: "28,000 pax/hr", details: "Western Line suburban station serving North Stands.", icon: "train", critical: false, stageLink: "stage_03", impact: "Secondary suburban rail access." },
      { id: "rail_csmt", name: "CSMT Central Terminus", category: "rail", x: 70, y: 35, dist: "2.1 km", transitTime: "15 min bus / cab", capacity: "60,000 pax/hr", details: "Central & Harbour line mega terminus connecting eastern suburbs.", icon: "train", critical: false, stageLink: "stage_03", impact: "Long-distance and Central line traveler feeder." },
      { id: "choke_marine_drive", name: "Marine Drive Coastal Confluence", category: "choke", x: 25, y: 50, dist: "0.3 km", transitTime: "Coastal Pinch", capacity: "Major Arterial", details: "High-density pedestrian crossing bottleneck between promenade and Gate 3.", icon: "alert-triangle", critical: true, stageLink: "stage_08", impact: "Severe post-match pedestrian backpressure." },
      { id: "hospital_gt", name: "GT Hospital & Bombay Hospital", category: "hospital", x: 62, y: 28, dist: "1.5 km", transitTime: "6 min emergency drive", capacity: "850 Beds", details: "Major multi-specialty trauma and emergency facilities.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Designated medical evacuation destination." },
      { id: "hotel_taj_mahal", name: "Taj Mahal Palace & Tower (Colaba)", category: "hotel", x: 55, y: 80, dist: "2.8 km", transitTime: "10 min drive", capacity: "285 Luxury Rooms", details: "5-Star heritage flagship hotel for international delegations.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "VIP athlete accommodation." },
      { id: "hotel_trident", name: "Trident & The Oberoi (Nariman Point)", category: "hotel", x: 30, y: 70, dist: "1.4 km", transitTime: "6 min drive", capacity: "550 Luxury Rooms", details: "Nariman Point luxury business property.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "Primary hotel cluster for match attendees." },
      { id: "park_cricket_club", name: "CCI Brabourne & Oval Ground Parking", category: "parking", x: 45, y: 60, dist: "0.5 km", transitTime: "8 min walk", capacity: "1,200 Vehicles", details: "Secured parking lot along Maharshi Karve road.", icon: "car", critical: true, stageLink: "stage_03", impact: "Strict pass-controlled parking." }
    ]
  },

  narendra_modi: {
    id: "narendra_modi",
    name: "Narendra Modi Stadium",
    area: "Motera & Sabarmati",
    city: "Ahmedabad",
    type: "Mega Stadium",
    capacity: 132000,
    icon: "activity",
    highway: "Sabarmati Riverfront Arterial & Gandhinagar Highway",
    railway: "Ahmedabad Metro Line 1 & Sabarmati Junction",
    description: "A single-day world championship cricket match with 100,000 spectators arriving between 11 AM and 2 PM. High demand for metro transit, parking plazas, security screening, and post-match stadium egress at 10 PM.",
    eventType: "Sports Championship",
    duration: "1 day (Oct 24)",
    expectedVisitors: 100000,
    nodes: [
      { id: "motera_core", name: "Narendra Modi Stadium Core", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "132,000 Capacity", details: "World's largest stadium. 4 Entry Gates, 68 VIP Corporate Boxes.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Mega spectator bowl." },
      { id: "metro_motera", name: "Motera Stadium Metro Station", category: "rail", x: 40, y: 46, dist: "0.3 km", transitTime: "4 min direct foot ramp", capacity: "35,000 pax/hr", details: "Ahmedabad Metro North-South corridor terminus station.", icon: "train", critical: true, stageLink: "stage_03", impact: "Carries 55% of spectator ingress & egress." },
      { id: "rail_sabarmati", name: "Sabarmati BG Railway Junction", category: "rail", x: 30, y: 65, dist: "2.8 km", transitTime: "12 min shuttle", capacity: "22,000 pax/hr", details: "High-speed and broad-gauge train station connecting Mumbai-Delhi rail.", icon: "train", critical: false, stageLink: "stage_03", impact: "Inter-city visitor transit gateway." },
      { id: "choke_koteshwar", name: "Koteshwar Ring Road Intersection", category: "choke", x: 65, y: 30, dist: "1.5 km", transitTime: "Heavy Arterial Pinch", capacity: "High Gridlock Risk", details: "Intersection of Gandhinagar link and SP Ring Road.", icon: "alert-triangle", critical: true, stageLink: "stage_08", impact: "Vehicle dispersal bottleneck." },
      { id: "hospital_civil", name: "Ahmedabad Civil Hospital (Asarwa)", category: "hospital", x: 35, y: 80, dist: "5.5 km", transitTime: "12 min green corridor", capacity: "2,800 Beds", details: "One of Asia's largest tertiary medical centers.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Multi-casualty disaster response readiness." },
      { id: "hotel_hyatt_ahmedabad", name: "Hyatt Regency & Fortune Landmark", category: "hotel", x: 35, y: 68, dist: "4.8 km", transitTime: "14 min drive", capacity: "310 Luxury Rooms", details: "Riverfront upscale hotels.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "VIP hospitality base." },
      { id: "park_motera_ground", name: "Sabarmati Riverfront Remote Parking", category: "parking", x: 42, y: 72, dist: "3.2 km", transitTime: "8 min shuttle bus", capacity: "6,500 Vehicles", details: "Mega riverfront parking plaza with 80 feeder shuttles.", icon: "car", critical: true, stageLink: "stage_03", impact: "Essential vehicle buffer for 100k+ crowds." }
    ]
  },

  eden_gardens: {
    id: "eden_gardens",
    name: "Eden Gardens Stadium",
    area: "B.B.D. Bagh & Maidan",
    city: "Kolkata",
    type: "Cricket Stadium",
    capacity: 68000,
    icon: "shield",
    highway: "Red Road & Strand Road along Hooghly River",
    railway: "Kolkata Metro Blue Line (Esplanade Station) & Circular Railway",
    description: "We are holding a 4-day premier cricket tournament at Eden Gardens in Kolkata expecting 60,000 spectators daily. Strong reliance on Kolkata Metro, Howrah Bridge traffic flow, and Maidan concourse walking corridors.",
    eventType: "Cricket Championship",
    duration: "4 days (Dec 4 - 7)",
    expectedVisitors: 60000,
    nodes: [
      { id: "eden_core", name: "Eden Gardens Stadium", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Epicenter", capacity: "68,000 Capacity", details: "Historic stadium with 17 entrance gates.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main event bowl." },
      { id: "metro_esplanade", name: "Esplanade Metro Interchange", category: "rail", x: 62, y: 45, dist: "1.2 km", transitTime: "12 min walk across Maidan", capacity: "40,000 pax/hr", details: "Blue & Green line metro mega intersection.", icon: "train", critical: true, stageLink: "stage_03", impact: "Primary mass transit dispersal node." },
      { id: "rail_howrah", name: "Howrah Railway Station", category: "rail", x: 25, y: 35, dist: "2.9 km (Across Hooghly)", transitTime: "18 min transit", capacity: "85,000 pax/hr", details: "Busiest railway station in India connecting East India.", icon: "train", critical: false, stageLink: "stage_03", impact: "Inter-state spectator transit." },
      { id: "choke_strand_road", name: "Strand Road & Babughat Confluence", category: "choke", x: 38, y: 48, dist: "0.5 km", transitTime: "Riverfront Pinch", capacity: "Pedestrian Concourse Bottleneck", details: "High-density pedestrian conflict with bus routes.", icon: "alert-triangle", critical: true, stageLink: "stage_08", impact: "Post-match exit hazard." },
      { id: "hospital_sskm", name: "SSKM Medical College & Hospital", category: "hospital", x: 55, y: 78, dist: "3.1 km", transitTime: "9 min green corridor", capacity: "1,900 Beds", details: "Apex government tertiary hospital in Kolkata.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Trauma readiness." },
      { id: "hotel_oberoi_grand", name: "The Oberoi Grand (Chowringhee)", category: "hotel", x: 68, y: 52, dist: "1.5 km", transitTime: "8 min drive / walk", capacity: "209 Luxury Rooms", details: "Heritage 5-star hotel for athletes & VIPs.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "Primary hospitality base." },
      { id: "park_maidan", name: "Maidan Brigade Parade Ground Parking", category: "parking", x: 45, y: 68, dist: "1.4 km", transitTime: "10 min walk", capacity: "4,000 Vehicles", details: "Expansive green ground auxiliary parking.", icon: "car", critical: false, stageLink: "stage_03", impact: "Park-and-walk reservoir." }
    ]
  },

  bharat_mandapam: {
    id: "bharat_mandapam",
    name: "Bharat Mandapam (ITPO)",
    area: "Pragati Maidan",
    city: "New Delhi",
    type: "International Convention & Expo Centre",
    capacity: 25000,
    icon: "building",
    highway: "Mathura Road, Bhairon Marg & Ring Road Tunnel",
    railway: "Delhi Metro Blue Line (Supreme Court / Pragati Maidan Station)",
    description: "A four-day international global technology expo and summit at Bharat Mandapam in New Delhi with 25,000 delegates daily. Features high-level diplomatic VIP security, plenary halls, and underground multi-modal tunnel links.",
    eventType: "Global Tech Expo & Summit",
    duration: "4 days (Jan 18 - 21)",
    expectedVisitors: 25000,
    nodes: [
      { id: "mandapam_core", name: "Bharat Mandapam Plenary Complex", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Center", capacity: "25,000 Delegates", details: "World-class G20 summit venue with 24 multi-purpose halls.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main conference & plenary halls." },
      { id: "metro_pragati", name: "Supreme Court Metro Station", category: "rail", x: 38, y: 40, dist: "0.4 km", transitTime: "5 min direct skywalk", capacity: "26,000 pax/hr", details: "Blue Line metro station connected directly to Gate 10.", icon: "train", critical: true, stageLink: "stage_03", impact: "Primary delegate mass transit link." },
      { id: "choke_bhairon", name: "Bhairon Marg & Mathura Road Underpass", category: "choke", x: 55, y: 35, dist: "0.6 km", transitTime: "Security Screening Confluence", capacity: "VIP Motorcade Pinch", details: "Key vehicular intersection subject to diplomatic movement stoppages.", icon: "alert-triangle", critical: true, stageLink: "stage_03", impact: "Security protocol bottleneck." },
      { id: "hospital_aiims", name: "AIIMS & Safdarjung Hospital", category: "hospital", x: 42, y: 82, dist: "5.8 km", transitTime: "11 min direct corridor", capacity: "2,500 Beds", details: "Premier national tertiary hospital and trauma center.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "VVIP medical protocol backup." },
      { id: "hotel_taj_mansingh", name: "Taj Mahal Hotel (Man Singh Road) & Claridges", category: "hotel", x: 45, y: 65, dist: "3.2 km", transitTime: "8 min drive", capacity: "292 Luxury Rooms", details: "Central Delhi luxury diplomatic hotel.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "International head-of-state lodging." },
      { id: "park_underground", name: "Pragati Maidan Integrated Multi-Level Basement Parking", category: "parking", x: 48, y: 55, dist: "0.1 km", transitTime: "Direct Elevator", capacity: "4,800 Cars", details: "State-of-the-art underground automated parking.", icon: "car", critical: true, stageLink: "stage_03", impact: "Direct on-site parking envelope." }
    ]
  },

  wembley_london: {
    id: "wembley_london",
    name: "Wembley Stadium",
    area: "Wembley Park",
    city: "London, UK",
    type: "National Football & Concert Stadium",
    capacity: 90000,
    icon: "globe",
    highway: "North Circular Road (A406) & Olympic Way",
    railway: "London Underground (Wembley Park & Wembley Central)",
    description: "A two-day major international music stadium tour at Wembley Stadium in London expecting 85,000 fans each evening. Mass transit clearance relies on Olympic Way pedestrian boulevard and London Underground Jubilee/Metropolitan lines.",
    eventType: "Mega Stadium Concert",
    duration: "2 days (Jul 12 - 13)",
    expectedVisitors: 85000,
    nodes: [
      { id: "wembley_core", name: "Wembley Stadium Core", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Venue Core", capacity: "90,000 Capacity", details: "Iconic arch stadium with 34 turnstile zones.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main concert arena." },
      { id: "tube_wembley_park", name: "Wembley Park Underground Station", category: "rail", x: 50, y: 22, dist: "0.8 km", transitTime: "8 min walk via Olympic Way", capacity: "42,000 pax/hr", details: "Jubilee & Metropolitan lines high-capacity step-free station.", icon: "train", critical: true, stageLink: "stage_03", impact: "Clears 65% of attendee transit." },
      { id: "rail_wembley_central", name: "Wembley Central Station", category: "rail", x: 28, y: 65, dist: "1.4 km", transitTime: "15 min walk", capacity: "18,000 pax/hr", details: "Bakerloo line and London Overground train access.", icon: "train", critical: false, stageLink: "stage_09", impact: "Secondary egress transit." },
      { id: "choke_olympic_way", name: "Olympic Way Pedestrian Choke", category: "choke", x: 50, y: 35, dist: "0.4 km", transitTime: "Crowd Filter Zone", capacity: "Managed Flow Barrier", details: "Managed pedestrian boulevard with dynamic stop-and-go crowd safety barriers.", icon: "alert-triangle", critical: true, stageLink: "stage_08", impact: "Post-concert crush prevention zone." },
      { id: "hospital_northwick", name: "Northwick Park Hospital", category: "hospital", x: 30, y: 20, dist: "3.2 km", transitTime: "9 min ambulance run", capacity: "600 Beds", details: "Major NHS emergency trauma department.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Acute emergency medical backup." },
      { id: "hotel_hilton_wembley", name: "Hilton London Wembley", category: "hotel", x: 56, y: 44, dist: "0.2 km", transitTime: "2 min walk", capacity: "361 Luxury Rooms", details: "Adjacent to stadium and London Designer Outlet.", icon: "hotel", critical: true, stageLink: "stage_04", impact: "Production & VIP stay." },
      { id: "park_red_car_park", name: "Wembley Official Red & Green Car Parks", category: "parking", x: 44, y: 58, dist: "0.3 km", transitTime: "5 min walk", capacity: "2,900 Pre-booked Vehicles", details: "Strict advance-booking parking with ANPR cameras.", icon: "car", critical: true, stageLink: "stage_03", impact: "Dedicated coach & car bays." }
    ]
  },

  madison_sq_garden: {
    id: "madison_sq_garden",
    name: "Madison Square Garden",
    area: "Midtown Manhattan (Penn Station)",
    city: "New York City, USA",
    type: "Indoor Arena",
    capacity: 20000,
    icon: "sparkles",
    highway: "7th & 8th Avenues, West 31st to 33rd Streets",
    railway: "Penn Station & MTA Subway (1, 2, 3, A, C, E Lines)",
    description: "A 3-day premier entertainment and sports event at Madison Square Garden in Manhattan with 20,000 attendees per night. Direct underground integration with Penn Station, Amtrak, LIRR, and NJ Transit.",
    eventType: "Arena Championship / Entertainment",
    duration: "3 days (Oct 10 - 12)",
    expectedVisitors: 20000,
    nodes: [
      { id: "msg_core", name: "Madison Square Garden Arena", category: "stadium", x: 50, y: 50, dist: "0.0 km", transitTime: "Arena Core", capacity: "20,000 Seats", details: "World-famous Midtown arena situated directly atop Penn Station.", icon: "activity", critical: true, stageLink: "stage_06", impact: "Main indoor arena." },
      { id: "rail_penn_station", name: "New York Penn Station", category: "rail", x: 50, y: 52, dist: "0.0 km (Underground)", transitTime: "Direct elevator / concourse", capacity: "65,000 pax/hr", details: "Busiest transit hub in North America (Amtrak, LIRR, NJ Transit, Subway).", icon: "train", critical: true, stageLink: "stage_03", impact: "Absorbs 85% of spectator traffic." },
      { id: "choke_7th_avenue", name: "7th Avenue & 32nd St Pedestrian Concourse", category: "choke", x: 58, y: 46, dist: "0.1 km", transitTime: "Street Pinch", capacity: "Dense Midtown Sidewalk", details: "Extreme pedestrian density conflating with Manhattan surface traffic.", icon: "alert-triangle", critical: true, stageLink: "stage_08", impact: "Sidewalk congestion at egress." },
      { id: "hospital_nyu_langone", name: "NYU Langone Health & Bellevue", category: "hospital", x: 75, y: 65, dist: "2.1 km", transitTime: "8 min emergency route", capacity: "1,100 Beds", details: "Leading Level-1 adult and pediatric trauma center.", icon: "heart-pulse", critical: true, stageLink: "stage_06", impact: "Primary emergency hospital." },
      { id: "hotel_hotel_penn", name: "Midtown Manhattan Hotel Cluster (Penn / Hudson Yards)", category: "hotel", x: 42, y: 40, dist: "0.4 km", transitTime: "5 min walk", capacity: "3,200 Hotel Rooms", details: "Dense Midtown hotel district with luxury and business flags.", icon: "hotel", critical: false, stageLink: "stage_04", impact: "High-capacity accommodation envelope." },
      { id: "park_manhattan_garage", name: "Midtown Commercial Parking Garages", category: "parking", x: 38, y: 62, dist: "0.3 km", transitTime: "4 min walk", capacity: "1,100 Cars", details: "Stacker commercial garages with premium pricing.", icon: "car", critical: false, stageLink: "stage_03", impact: "Limited vehicle space; public transit advised." }
    ]
  }
};

// 2. Procedural Spatial Twin Generator for ANY Custom / Arbitrary Venue
function generateCustomSpatialTwin(venueName, areaName, visitorCount, eventType) {
  const v = visitorCount || 50000;
  const vK = Math.round(v / 1000);
  const cleanVenue = venueName || "Primary Venue";
  const cleanArea = areaName || "Metropolitan Zone";

  return {
    id: "custom_" + Date.now(),
    name: cleanVenue,
    area: cleanArea,
    city: cleanArea,
    type: eventType || "Public Event Venue",
    capacity: Math.round(v * 1.1),
    icon: "map-pin",
    highway: "Main Arterial Expressway Corridor",
    railway: "Regional Transit & Rapid Metro Line",
    description: `We are organizing an event at ${cleanVenue} in ${cleanArea} expecting approximately ${v.toLocaleString()} visitors daily. The operational plan includes local transit synchronization, hotel room envelopes, and staged crowd dispersal.`,
    eventType: eventType || "Public Gathering",
    duration: "3 days",
    expectedVisitors: v,
    nodes: [
      {
        id: "node_custom_venue",
        name: `${cleanVenue} (Venue Core)`,
        category: "stadium",
        x: 50,
        y: 50,
        dist: "0.0 km",
        transitTime: "Epicenter",
        capacity: `${Math.round(v * 1.1).toLocaleString()} Capacity`,
        details: `Core event precinct. Configured for ${v.toLocaleString()} daily attendees with automated entry portals.`,
        icon: "activity",
        critical: true,
        stageLink: "stage_06",
        impact: "Core operational container for main event activities."
      },
      {
        id: "node_custom_transit_1",
        name: `${cleanArea} Central Metro / Railway Station`,
        category: "rail",
        x: 30,
        y: 45,
        dist: "1.4 km (West)",
        transitTime: "15 min walk / 5 min shuttle",
        capacity: `${Math.round(v * 0.45).toLocaleString()} pax/hr`,
        details: "Primary rapid transit rail gateway connected by wide pedestrian walkway.",
        icon: "train",
        critical: true,
        stageLink: "stage_03",
        impact: `Absorbs ~50% of arriving crowd (${Math.round(v * 0.50).toLocaleString()} visitors).`
      },
      {
        id: "node_custom_transit_2",
        name: `${cleanArea} Feeder Bus Depot & Shuttle Bay`,
        category: "rail",
        x: 36,
        y: 28,
        dist: "2.1 km (North-West)",
        transitTime: "7 min shuttle frequency",
        capacity: "45 Dedicated Shuttles",
        details: "Municipal transit staging bay running continuous loops to Venue Gate 2.",
        icon: "bus",
        critical: false,
        stageLink: "stage_03",
        impact: "Feeds Stage 3 Transportation shuttle capacity."
      },
      {
        id: "node_custom_choke_1",
        name: `Arterial Junction & Expressway Flyover Merge`,
        category: "choke",
        x: 54,
        y: 32,
        dist: "0.9 km (North)",
        transitTime: "Vehicle Pinch Point",
        capacity: "High Congestion Hazard",
        details: "Main highway exit ramp meeting local access road; critical vehicular choke point.",
        icon: "alert-triangle",
        critical: true,
        stageLink: "stage_03",
        impact: "Risk of 35-minute vehicular gridlock during peak ingress and post-event egress."
      },
      {
        id: "node_custom_hospital_1",
        name: `${cleanArea} Apex Trauma & Emergency Hospital`,
        category: "hospital",
        x: 60,
        y: 42,
        dist: "0.6 km (Immediate Vicinity)",
        transitTime: "3 min green-corridor ambulance run",
        capacity: "850 Beds & Dedicated Trauma Bay",
        details: "Immediate tertiary medical facility on standby with emergency triage protocols.",
        icon: "heart-pulse",
        critical: true,
        stageLink: "stage_06",
        impact: "Ensures rapid emergency medical transfer from venue floor."
      },
      {
        id: "node_custom_hotel_1",
        name: `Grand Luxury Partner Hotel & Suites`,
        category: "hotel",
        x: 72,
        y: 60,
        dist: "3.2 km (Commercial District)",
        transitTime: "8 min private shuttle",
        capacity: "120 Luxury Suites",
        details: "5-Star hotel property reserved for VIPs, artists, delegates, and officials.",
        icon: "hotel",
        critical: false,
        stageLink: "stage_04",
        impact: "VIP and production delegation lodging."
      },
      {
        id: "node_custom_hotel_2",
        name: `${cleanArea} Business & Budget Hotel Cluster`,
        category: "hotel",
        x: 44,
        y: 62,
        dist: "1.8 km (Walking Perimeter)",
        transitTime: "18 min walk / 4 min cab",
        capacity: `${Math.round(v * 0.08).toLocaleString()} Verified Beds`,
        details: "Hotels and serviced apartments catering to out-of-town attendees.",
        icon: "hotel",
        critical: true,
        stageLink: "stage_04",
        impact: `Projected demand (${Math.round(v * 0.30).toLocaleString()} rooms) exceeds local cluster capacity.`
      },
      {
        id: "node_custom_parking_1",
        name: `Venue On-Site North & South Parking Bays`,
        category: "parking",
        x: 46,
        y: 56,
        dist: "0.2 km (Venue Perimeter)",
        transitTime: "Direct Foot Access",
        capacity: `${Math.round(v * 0.05).toLocaleString()} Cars & VIP Shuttles`,
        details: "Secured credentialed parking lot with RFID access barriers.",
        icon: "car",
        critical: true,
        stageLink: "stage_03",
        impact: "VIP, emergency and staff vehicle parking."
      },
      {
        id: "node_custom_parking_2",
        name: `Remote Park-and-Ride Shuttle Ground`,
        category: "parking",
        x: 20,
        y: 25,
        dist: "4.2 km (Expressway Exit)",
        transitTime: "10 min direct express shuttle",
        capacity: `${Math.round(v * 0.08).toLocaleString()} Vehicles`,
        details: "High-capacity overflow vehicle parking with dedicated shuttle lanes.",
        icon: "car",
        critical: false,
        stageLink: "stage_03",
        impact: "Prevents perimeter road gridlock by absorbing general public vehicles."
      }
    ]
  };
}

// 3. Main Planning Engine
class EventPrePlanningEngine {
  constructor() {
    this.activeVenueKey = "dypatil_nerul";
    this.activeSpatialTwin = JSON.parse(JSON.stringify(VENUES_CATALOG.dypatil_nerul));
    this.currentEvent = {
      title: this.activeSpatialTwin.name + " Event",
      icon: this.activeSpatialTwin.icon,
      venueName: this.activeSpatialTwin.name,
      microArea: this.activeSpatialTwin.area,
      description: this.activeSpatialTwin.description,
      eventType: this.activeSpatialTwin.eventType,
      location: `${this.activeSpatialTwin.area} (${this.activeSpatialTwin.name})`,
      duration: this.activeSpatialTwin.duration,
      expectedVisitors: this.activeSpatialTwin.expectedVisitors,
      visitorCategories: ["General Ticket Holders (75%)", "Out-of-Town Attendees (45%)", "VIPs & Special Guests (5%)", "Operations, Security & Vendors (8%)"],
      constraints: ["High peak transit load on local railway & arterial corridors", "Local hotel occupancy projected at >85%", "Perimeter access choke points requiring staggered flow"]
    };

    this.stages = [];
    this.selectedStageId = null;
    this.demandVarianceFactor = 1.0;
    this.activeTwinFilter = "all";
    this.selectedTwinNodeId = this.activeSpatialTwin.nodes[0].id;
    this.initStagesForEvent(this.currentEvent);
  }

  setDemandVariance(factor) {
    this.demandVarianceFactor = factor;
    this.initStagesForEvent(this.currentEvent);
  }

  setVenue(venueKeyOrObject) {
    if (typeof venueKeyOrObject === 'string' && VENUES_CATALOG[venueKeyOrObject]) {
      this.activeVenueKey = venueKeyOrObject;
      this.activeSpatialTwin = JSON.parse(JSON.stringify(VENUES_CATALOG[venueKeyOrObject]));
    } else if (typeof venueKeyOrObject === 'object') {
      this.activeVenueKey = venueKeyOrObject.id || "custom";
      this.activeSpatialTwin = venueKeyOrObject;
    }

    this.currentEvent = {
      title: this.activeSpatialTwin.name,
      icon: this.activeSpatialTwin.icon || "map-pin",
      venueName: this.activeSpatialTwin.name,
      microArea: this.activeSpatialTwin.area,
      description: this.activeSpatialTwin.description,
      eventType: this.activeSpatialTwin.eventType || "Public Gathering",
      location: `${this.activeSpatialTwin.area} (${this.activeSpatialTwin.name})`,
      duration: this.activeSpatialTwin.duration || "3 days",
      expectedVisitors: this.activeSpatialTwin.expectedVisitors || 50000,
      visitorCategories: ["General Attendees (75%)", "Out-of-Town Travelers (45%)", "VIPs & Guests (5%)", "Operations & Crew (8%)"],
      constraints: [`Arterial highway congestion near ${this.activeSpatialTwin.area}`, "Hotel room deficit in immediate 4km radius", "Suburban transit evening peak surge"]
    };

    this.selectedTwinNodeId = this.activeSpatialTwin.nodes[0].id;
    this.initStagesForEvent(this.currentEvent);
  }

  initStagesForEvent(event) {
    const baseV = event.expectedVisitors;
    const v = Math.round(baseV * this.demandVarianceFactor);
    const venue = event.venueName || "Venue";

    this.stages = [
      {
        stage_id: "stage_01",
        name: "Spectator Registration & Badging",
        short_name: "Registration",
        icon: "badge-check",
        start_time: "08:00",
        end_time: "10:30",
        window_duration_hours: 2.5,
        expected_visitors: Math.round(v * 0.36),
        required_services: [
          { id: "reg_counters", name: "Accreditation Kiosks", required: Math.ceil(v / 750), available: Math.ceil(v / 950), unit: "counters", category: "Registration" },
          { id: "reg_staff", name: "Badging Staff", required: Math.ceil(v / 380), available: Math.ceil(v / 500), unit: "personnel", category: "Personnel" },
          { id: "qr_scanners", name: "Fast-Track Digital Kiosks", required: 24, available: 20, unit: "kiosks", category: "Technology" }
        ],
        capacity_requirements: {
          throughput: { name: "Peak Throughput", required: Math.round(v * 0.16), available: Math.round(v * 0.12), unit: "visitors/hr" },
          waiting: { name: "Holding Concourse Area", required: Math.round(v * 0.05), available: Math.round(v * 0.06), unit: "m² capacity" }
        },
        risk_level: "medium",
        operational_insight: {
          why_risk: "Morning peak arrival causes counter congestion if credential retrieval takes >45 seconds per attendee.",
          formula: `Peak Influx (${Math.round(v * 0.36).toLocaleString()}) ÷ 2.5h = ${Math.round(v * 0.16).toLocaleString()}/hr needed vs ${Math.round(v * 0.12).toLocaleString()}/hr available capacity.`,
          impact_if_unaddressed: "Expected queue wait times exceed 38 minutes at the main concourse."
        },
        recommendations: [
          { id: "rec_reg_1", category: "Capacity", icon: "tablet", text: "Deploy 16 wireless mobile registration terminals to process attendees in the holding queue.", impact: "+2,200 visitors/hr registration throughput", resolvedField: "throughput", resolvedValue: Math.round(v * 0.17), applied: false },
          { id: "rec_reg_2", category: "Time", icon: "clock", text: "Pre-dispatch digital QR wallet passes 48h prior to eliminate physical counter collection.", impact: "Flattens peak wave by 35% and cuts badge pickup time", applied: false }
        ]
      },
      {
        stage_id: "stage_02",
        name: "Security Screening & Perimeter",
        short_name: "Screening",
        icon: "shield-alert",
        start_time: "09:30",
        end_time: "11:30",
        window_duration_hours: 2.0,
        expected_visitors: Math.round(v * 0.45),
        required_services: [
          { id: "scr_gates", name: "DFMD Metal Detector Arches", required: Math.ceil(v / 1200), available: Math.ceil(v / 1400), unit: "arches", category: "Security" },
          { id: "scr_baggage", name: "X-Ray Baggage Scanners", required: 16, available: 12, unit: "units", category: "Security" },
          { id: "scr_guards", name: "Trained Security Personnel", required: Math.ceil(v / 250), available: Math.ceil(v / 300), unit: "guards", category: "Safety" }
        ],
        capacity_requirements: {
          screening: { name: "Screening Rate", required: Math.round(v * 0.22), available: Math.round(v * 0.17), unit: "people/hr" },
          baggage: { name: "Baggage Inspection Rate", required: Math.round(v * 0.15), available: Math.round(v * 0.11), unit: "bags/hr" }
        },
        risk_level: "high",
        operational_insight: {
          why_risk: `Simultaneous bag search protocols threaten severe choke points outside ${venue} gates.`,
          formula: `Screening rate of ${Math.round(v * 0.17).toLocaleString()}/hr cannot absorb peak influx of ${Math.round(v * 0.22).toLocaleString()}/hr.`,
          impact_if_unaddressed: "Pedestrian spillover onto adjacent vehicle roadways within 45 minutes."
        },
        recommendations: [
          { id: "rec_scr_1", category: "Safety & Support", icon: "user-check", text: "Create dedicated 'No Bag / Express' security lanes with wand screening.", impact: "Diverts 42% of crowd from heavy x-ray queues", resolvedField: "screening", resolvedValue: Math.round(v * 0.24), applied: false },
          { id: "rec_scr_2", category: "Capacity", icon: "truck", text: "Rent 4 mobile trailer x-ray baggage scanners for perimeter gates.", impact: "+3,200 bags/hr scanning capacity", resolvedField: "baggage", resolvedValue: Math.round(v * 0.16), applied: false }
        ]
      },
      {
        stage_id: "stage_03",
        name: "Transportation & Shuttles",
        short_name: "Transport",
        icon: "bus",
        start_time: "10:00",
        end_time: "12:30",
        window_duration_hours: 2.5,
        expected_visitors: Math.round(v * 0.40),
        required_services: [
          { id: "tr_buses", name: "Feeder Shuttle Buses", required: 58, available: 42, unit: "buses", category: "Transportation" },
          { id: "tr_pickup", name: "Designated Transit Pickup Zones", required: 5, available: 3, unit: "zones", category: "Spatial" },
          { id: "tr_traffic", name: "Traffic Marshals & Flow Control", required: 45, available: 38, unit: "marshals", category: "Safety" }
        ],
        capacity_requirements: {
          transport: { name: "Fleet Transport Capacity", required: Math.round(v * 0.40), available: Math.round(v * 0.29), unit: "seats/window" },
          waiting: { name: "Bus Stand Queue Reservoir", required: 3500, available: 2200, unit: "persons" }
        },
        risk_level: "high",
        operational_insight: {
          why_risk: "Mass rail and highway arrivals overwhelm feeder buses during morning peak.",
          formula: `${Math.round(v * 0.40).toLocaleString()} transit-dependent attendees vs ${Math.round(v * 0.29).toLocaleString()} fleet seating capacity.`,
          impact_if_unaddressed: "Backpressure at local stations and arterial intersection gridlock."
        },
        recommendations: [
          { id: "rec_tr_1", category: "Transportation", icon: "bus-front", text: "Commission 20 supplemental coaches and establish dedicated transit corridor lane.", impact: "+6,500 passenger throughput / window", resolvedField: "transport", resolvedValue: Math.round(v * 0.42), applied: false },
          { id: "rec_tr_2", category: "Time", icon: "clock", text: "Stagger arrival time windows across 3 tiered entry slots (10:00, 10:45, 11:30).", impact: "Reduces peak concentration by 30%", applied: false },
          { id: "rec_tr_3", category: "Spatial", icon: "map-pin", text: "Activate secondary pickup/drop-off plaza at nearest secondary station.", impact: "Relieves 40% pressure on main terminal", applied: false }
        ]
      },
      {
        stage_id: "stage_04",
        name: "Accommodation & Lodging",
        short_name: "Accommodation",
        icon: "hotel",
        start_time: "11:00",
        end_time: "14:00",
        window_duration_hours: 3.0,
        expected_visitors: Math.round(v * 0.32),
        required_services: [
          { id: "acc_hotel_rooms", name: "Partner Hotel Beds (4km radius)", required: Math.round(v * 0.25), available: Math.round(v * 0.15), unit: "rooms", category: "Accommodation" },
          { id: "acc_luggage", name: "Cloakroom & Luggage Pods", required: 4500, available: 3200, unit: "lockers", category: "Hospitality" },
          { id: "acc_concierge", name: "Guest Support Desks", required: 18, available: 18, unit: "counters", category: "Hospitality" }
        ],
        capacity_requirements: {
          rooms: { name: "Nearby Hotel Capacity", required: Math.round(v * 0.25), available: Math.round(v * 0.15), unit: "rooms" },
          luggage: { name: "Luggage Deposit Capacity", required: 4500, available: 3200, unit: "units" }
        },
        risk_level: "high",
        operational_insight: {
          why_risk: "Nearby accommodation cannot absorb projected overnight demand without expanding to secondary regional zones.",
          formula: `Demand for ${Math.round(v * 0.25).toLocaleString()} hotel rooms vs ${Math.round(v * 0.15).toLocaleString()} available local beds. Severe deficit.`,
          impact_if_unaddressed: "Forced long-distance commutes and lodging inflation for out-of-town guests."
        },
        recommendations: [
          { id: "rec_acc_1", category: "Accommodation", icon: "building-2", text: "Partner with secondary hotel clusters in adjacent districts with scheduled express morning shuttles.", impact: "Opens 4,500 additional verified hotel rooms", resolvedField: "rooms", resolvedValue: Math.round(v * 0.26), applied: false },
          { id: "rec_acc_2", category: "Capacity", icon: "box", text: "Erect 2 climate-controlled modular cloakroom containers near Terminal B.", impact: "+1,500 secure luggage lockers", resolvedField: "luggage", resolvedValue: 4700, applied: false }
        ]
      },
      {
        stage_id: "stage_05",
        name: "Venue Ingress & Access Gates",
        short_name: "Venue Entry",
        icon: "log-in",
        start_time: "13:00",
        end_time: "16:00",
        window_duration_hours: 3.0,
        expected_visitors: Math.round(v * 0.75),
        required_services: [
          { id: "ven_turnstiles", name: "Automated RFID Turnstiles", required: 36, available: 30, unit: "gates", category: "Venue" },
          { id: "ven_ushers", name: "Guest Directing Ushers", required: 80, available: 75, unit: "ushers", category: "Personnel" },
          { id: "ven_disabled", name: "Accessible / ADA Priority Ramps", required: 6, available: 6, unit: "ramps", category: "Accessibility" }
        ],
        capacity_requirements: {
          turnstiles: { name: "Gate Ingress Flow Rate", required: Math.round(v * 0.35), available: Math.round(v * 0.28), unit: "attendees/hr" }
        },
        risk_level: "medium",
        operational_insight: {
          why_risk: "Turnstiles approach 94% utilization if pre-event activities begin early.",
          formula: `Required ingress flow: ${Math.round(v * 0.35).toLocaleString()}/hr vs turnstile physical limit of ${Math.round(v * 0.28).toLocaleString()}/hr.`,
          impact_if_unaddressed: "Forecourt crowd compression leading to delay."
        },
        recommendations: [
          { id: "rec_ven_1", category: "Time", icon: "alarm-clock", text: "Open arena gates 60 minutes earlier with ambient lounge entertainment.", impact: "Distributes 8,000 visitors away from main rush", applied: false },
          { id: "rec_ven_2", category: "Capacity", icon: "maximize-2", text: "Convert 6 auxiliary administrative turnstiles into public spectator lanes.", impact: "+2,400 visitors/hr entry capacity", resolvedField: "turnstiles", resolvedValue: Math.round(v * 0.36), applied: false }
        ]
      },
      {
        stage_id: "stage_06",
        name: "Main Event & Concourse Management",
        short_name: "Main Event",
        icon: "activity",
        start_time: "16:00",
        end_time: "21:30",
        window_duration_hours: 5.5,
        expected_visitors: v,
        required_services: [
          { id: "main_arena", name: `${venue} Main Bowl & Stands`, required: v, available: Math.round(v * 1.05), unit: "capacity", category: "Venue" },
          { id: "main_medical", name: "Emergency Medical Triage Hubs", required: 8, available: 6, unit: "stations", category: "Safety & Support" },
          { id: "main_sound", name: "PA & Emergency Sound Command", required: 2, available: 2, unit: "towers", category: "Production" },
          { id: "main_hydration", name: "Free Drinking Water Kiosks", required: 35, available: 25, unit: "points", category: "Hospitality" }
        ],
        capacity_requirements: {
          crowd_density: { name: "Concourse Crowd Density", required: 2.2, available: 2.2, unit: "persons/m² (safe < 2.5)" },
          medical_coverage: { name: "Paramedic Response Readiness", required: 8, available: 6, unit: "ambulances" }
        },
        risk_level: "low",
        operational_insight: {
          why_risk: "Crowd density peaks near stage/infield. Hydration and paramedic hubs require direct emergency access.",
          formula: `Venue designed for ${v.toLocaleString()} attendees at safe density standard (2.2 persons/m²).`,
          impact_if_unaddressed: "Dehydration incidents and fainting along unshaded areas."
        },
        recommendations: [
          { id: "rec_main_1", category: "Safety & Support", icon: "heart-pulse", text: "Position 2 dedicated standby ALS ambulances and 4 roving medical backpack teams in the infield.", impact: "Ensures <3 minute emergency response anywhere in the bowl", resolvedField: "medical_coverage", resolvedValue: 8, applied: false },
          { id: "rec_main_2", category: "Capacity", icon: "droplet", text: "Install 10 high-speed refillable chilled water refilling stations in Upper Tier concourses.", impact: "Eliminates queue times at refreshment zones", applied: false }
        ]
      },
      {
        stage_id: "stage_07",
        name: "Food, Rest & Concessions",
        short_name: "Food / Rest",
        icon: "coffee",
        start_time: "17:30",
        end_time: "22:00",
        window_duration_hours: 4.5,
        expected_visitors: Math.round(v * 0.65),
        required_services: [
          { id: "fd_trucks", name: "Curated F&B Stalls / Kiosks", required: 65, available: 50, unit: "vendors", category: "Food" },
          { id: "fd_waste", name: "Custodial Waste Crews", required: 90, available: 75, unit: "crew", category: "Sanitation" },
          { id: "fd_shaded", name: "Shaded Dining & Rest Pods", required: 4000, available: 3200, unit: "seats", category: "Hospitality" }
        ],
        capacity_requirements: {
          meal_throughput: { name: "Meal Serving Capacity", required: Math.round(v * 0.40), available: Math.round(v * 0.31), unit: "meals/hr" }
        },
        risk_level: "medium",
        operational_insight: {
          why_risk: "Intermission dinner surge causes simultaneous meal rush and queue spillover.",
          formula: `${Math.round(v * 0.40).toLocaleString()} meal requests/hr vs ${Math.round(v * 0.31).toLocaleString()} vendor prep rate.`,
          impact_if_unaddressed: "Concession queuing bottlenecks bleeding into stairwells."
        },
        recommendations: [
          { id: "rec_fd_1", category: "Spatial", icon: "utensils", text: "Disperse 15 satellite grab-and-go snack & beverage carts along perimeter concourse.", impact: "+4,500 meals/hr distributed capacity", resolvedField: "meal_throughput", resolvedValue: Math.round(v * 0.42), applied: false },
          { id: "rec_fd_2", category: "Safety & Support", icon: "trash-2", text: "Schedule roving sanitation rounds every 20 minutes with automated compactors.", impact: "Prevents litter accumulation and perimeter congestion", applied: false }
        ]
      },
      {
        stage_id: "stage_08",
        name: "Staged Crowd Dispersal / Exit",
        short_name: "Exit",
        icon: "log-out",
        start_time: "21:30",
        end_time: "23:00",
        window_duration_hours: 1.5,
        expected_visitors: Math.round(v * 0.90),
        required_services: [
          { id: "ex_gates", name: "Wide Egress Exit Portals", required: 14, available: 11, unit: "portals", category: "Venue" },
          { id: "ex_lighting", name: "Perimeter High-Mast Lighting", required: 12, available: 12, unit: "towers", category: "Safety" },
          { id: "ex_marshals", name: "Exit Flow Direction Marshals", required: 60, available: 45, unit: "marshals", category: "Personnel" }
        ],
        capacity_requirements: {
          egress_rate: { name: "Safe Evacuation Discharge Rate", required: Math.round(v * 0.60), available: Math.round(v * 0.44), unit: "attendees/hr" }
        },
        risk_level: "high",
        operational_insight: {
          why_risk: `Event conclusion triggers simultaneous 90% crowd surge toward transit hubs and perimeter choke points.`,
          formula: `${Math.round(v * 0.90).toLocaleString()} exiting attendees in 1.5 hrs = ${Math.round(v * 0.60).toLocaleString()}/hr egress demand vs ${Math.round(v * 0.44).toLocaleString()}/hr safe gate flow.`,
          impact_if_unaddressed: "Severe crush hazard at gates and pedestrian crossings."
        },
        recommendations: [
          { id: "rec_ex_1", category: "Time", icon: "split", text: "Implement progressive zone-by-zone egress announcements.", impact: "Reduces peak exit gate pressure by 38%", applied: false },
          { id: "rec_ex_2", category: "Spatial", icon: "door-open", text: "Swing open all auxiliary campus emergency gates to double dispersal pathway width.", impact: "+11,000 attendees/hr safe exit discharge", resolvedField: "egress_rate", resolvedValue: Math.round(v * 0.62), applied: false }
        ]
      },
      {
        stage_id: "stage_09",
        name: "Return Transit & Night Evacuation",
        short_name: "Return Transit",
        icon: "train",
        start_time: "22:00",
        end_time: "00:30",
        window_duration_hours: 2.5,
        expected_visitors: Math.round(v * 0.70),
        required_services: [
          { id: "ret_trains", name: "Late-Night Metro / Train Runs", required: 8, available: 5, unit: "special trains", category: "Transportation" },
          { id: "ret_cabs", name: "App-Cab Geo-Fenced Staging Hubs", required: 4, available: 2, unit: "staging hubs", category: "Transportation" },
          { id: "ret_shuttles", name: "Return Park-and-Ride Shuttles", required: 45, available: 32, unit: "buses", category: "Transportation" }
        ],
        capacity_requirements: {
          transit_evacuation: { name: "Night Transit Clearance Rate", required: Math.round(v * 0.50), available: Math.round(v * 0.35), unit: "passengers/hr" }
        },
        risk_level: "high",
        operational_insight: {
          why_risk: "Regular public transit frequency drops sharply after 23:00; risk of stranded passengers without special services.",
          formula: `${Math.round(v * 0.70).toLocaleString()} return travelers ÷ 2.5h = ${Math.round(v * 0.50).toLocaleString()}/hr needed vs ${Math.round(v * 0.35).toLocaleString()}/hr supply.`,
          impact_if_unaddressed: "Stranded commuters crowding station concourses after midnight."
        },
        recommendations: [
          { id: "rec_ret_1", category: "Transportation", icon: "train-front", text: "Charter 3 additional midnight special local trains/metro services with transit authorities.", impact: "Adds 9,000 passenger clearance capacity", resolvedField: "transit_evacuation", resolvedValue: Math.round(v * 0.52), applied: false },
          { id: "rec_ret_2", category: "Spatial", icon: "car", text: "Establish dedicated ride-hail pickup zone at remote parking lots to avoid arterial gridlock.", impact: "Removes 2,500 idling vehicles from main street", applied: false }
        ]
      }
    ];

    if (!this.selectedStageId || !this.stages.find(s => s.stage_id === this.selectedStageId)) {
      this.selectedStageId = this.stages[2].stage_id;
    }
  }

  // Generic natural language parsing for ANY venue, scale, and duration
  parseNaturalLanguage(text) {
    const lower = text.toLowerCase();

    // 1. Detect visitor count
    let visitors = 50000;
    const kMatch = lower.match(/(\d+[\d,.]*)\s*(?:k|thousand|lakh|visitors|people|attendees|spectators|fans)/i);
    const numMatch = lower.match(/(\d{1,3}(?:,\d{3})+|\d{4,7})/);
    
    if (lower.includes("100,000") || lower.includes("100k") || lower.includes("1 lakh")) {
      visitors = 100000;
    } else if (lower.includes("85,000") || lower.includes("85k")) {
      visitors = 85000;
    } else if (lower.includes("50,000") || lower.includes("50k")) {
      visitors = 50000;
    } else if (lower.includes("30,000") || lower.includes("30k")) {
      visitors = 30000;
    } else if (lower.includes("20,000") || lower.includes("20k")) {
      visitors = 20000;
    } else if (kMatch) {
      let num = parseFloat(kMatch[1].replace(/,/g, ''));
      if (lower.includes("k") || lower.includes("thousand")) num *= 1000;
      if (lower.includes("lakh")) num *= 100000;
      if (num > 1000) visitors = Math.round(num);
    } else if (numMatch) {
      let num = parseInt(numMatch[1].replace(/,/g, ''), 10);
      if (num > 1000) visitors = num;
    }

    // 2. Detect duration / dates
    let duration = "3 days";
    if (lower.includes("1st september to 4th") || lower.includes("1st to 4th september") || lower.includes("september 1 to 4") || lower.includes("sep 1 to 4") || lower.includes("four-day") || lower.includes("4 day") || lower.includes("4-day")) {
      duration = "4 days (Sep 1 - Sep 4)";
    } else if (lower.includes("single-day") || lower.includes("1 day") || lower.includes("one day") || lower.includes("1-day")) {
      duration = "1 day";
    } else if (lower.includes("two-day") || lower.includes("2 day") || lower.includes("2-day")) {
      duration = "2 days";
    } else if (lower.includes("three-day") || lower.includes("3 day") || lower.includes("3-day")) {
      duration = "3 days";
    } else if (lower.includes("five-day") || lower.includes("5 day") || lower.includes("5-day")) {
      duration = "5 days";
    }

    // 3. Match against known venue catalog or synthesize procedurally
    let matchedCatalogKey = null;
    for (let key in VENUES_CATALOG) {
      const v = VENUES_CATALOG[key];
      if (lower.includes(key) || lower.includes(v.name.toLowerCase()) || lower.includes(v.area.toLowerCase().split(',')[0])) {
        matchedCatalogKey = key;
        break;
      }
    }

    // Custom venue extraction if not matched in catalog
    if (!matchedCatalogKey) {
      // Look for patterns like "at [Venue] in [Area]"
      let customVenue = "Selected Event Arena";
      let customArea = "Urban Concourse";

      const atMatch = text.match(/(?:at|in|near)\s+([A-Z][a-zA-Z0-9\s&'-]+?)(?:\s+(?:in|from|for|with|expecting|,|\.))/);
      if (atMatch && atMatch[1].trim().length > 2) {
        customVenue = atMatch[1].trim();
      }

      const inMatch = text.match(/(?:in|at)\s+([A-Z][a-zA-Z0-9\s&'-]+?)(?:\s+(?:from|for|with|expecting|,|\.))/);
      if (inMatch && inMatch[1].trim().length > 2 && inMatch[1].trim() !== customVenue) {
        customArea = inMatch[1].trim();
      }

      // Procedurally generate complete spatial digital twin for this custom venue!
      const generatedTwin = generateCustomSpatialTwin(customVenue, customArea, visitors, "Public Gathering");
      this.setVenue(generatedTwin);
      return this.currentEvent;
    } else {
      // Use cataloged venue
      this.setVenue(matchedCatalogKey);
      this.currentEvent.expectedVisitors = visitors;
      this.currentEvent.duration = duration;
      this.initStagesForEvent(this.currentEvent);
      return this.currentEvent;
    }
  }

  generatePlanFromText(text) {
    const extracted = this.parseNaturalLanguage(text);
    return extracted;
  }

  getStage(id) {
    return this.stages.find(s => s.stage_id === id) || this.stages[0];
  }

  applyRecommendation(stageId, recId) {
    const stage = this.getStage(stageId);
    if (!stage) return false;
    const rec = stage.recommendations.find(r => r.id === recId);
    if (!rec) return false;

    rec.applied = !rec.applied;

    if (rec.resolvedField && stage.capacity_requirements[rec.resolvedField]) {
      const field = stage.capacity_requirements[rec.resolvedField];
      if (rec.applied) {
        field._original = field.available;
        field.available = rec.resolvedValue;
      } else if (field._original !== undefined) {
        field.available = field._original;
      }
    }

    this.reevaluateStageRisk(stage);
    return true;
  }

  reevaluateStageRisk(stage) {
    let hasSevereGap = false;
    let hasModerateGap = false;

    for (let key in stage.capacity_requirements) {
      const cr = stage.capacity_requirements[key];
      if (key !== 'crowd_density') {
        const gap = cr.required - cr.available;
        if (gap > cr.required * 0.2) hasSevereGap = true;
        else if (gap > 0) hasModerateGap = true;
      }
    }

    stage.required_services.forEach(s => {
      if (s.required > s.available) {
        const gapRatio = (s.required - s.available) / s.required;
        if (gapRatio > 0.25) hasSevereGap = true;
        else if (gapRatio > 0) hasModerateGap = true;
      }
    });

    if (hasSevereGap) stage.risk_level = "high";
    else if (hasModerateGap) stage.risk_level = "medium";
    else stage.risk_level = "low";
  }

  updateStage(stageId, updatedData) {
    const idx = this.stages.findIndex(s => s.stage_id === stageId);
    if (idx !== -1) {
      this.stages[idx] = { ...this.stages[idx], ...updatedData };
      this.reevaluateStageRisk(this.stages[idx]);
      return true;
    }
    return false;
  }

  addStage(newStageData) {
    const id = `stage_${String(this.stages.length + 1).padStart(2, '0')}`;
    const newStage = {
      stage_id: id,
      name: newStageData.name || "Custom Stage",
      short_name: newStageData.short_name || newStageData.name || "Custom",
      icon: "flag",
      start_time: newStageData.start_time || "12:00",
      end_time: newStageData.end_time || "14:00",
      window_duration_hours: 2.0,
      expected_visitors: parseInt(newStageData.expected_visitors, 10) || Math.round(this.currentEvent.expectedVisitors * 0.25),
      required_services: [
        { id: `${id}_srv1`, name: "Staff & Management", required: 20, available: 15, unit: "personnel", category: "Operations" },
        { id: `${id}_srv2`, name: "Screening / Control Area", required: 5, available: 5, unit: "checkpoints", category: "Venue" }
      ],
      capacity_requirements: {
        throughput: { name: "Throughput Capacity", required: 3000, available: 2500, unit: "visitors/hr" }
      },
      risk_level: "medium",
      operational_insight: {
        why_risk: "Newly configured stage requires physical capacity validation against access gates.",
        formula: "Manual allocation baseline.",
        impact_if_unaddressed: "Minor local delay."
      },
      recommendations: [
        {
          id: `rec_${id}_1`,
          category: "Capacity",
          icon: "user-plus",
          text: "Align additional operational staff during active window.",
          impact: "+500 visitors/hr capacity",
          resolvedField: "throughput",
          resolvedValue: 3200,
          applied: false
        }
      ]
    };
    this.stages.push(newStage);
    this.selectedStageId = id;
    return newStage;
  }

  deleteStage(stageId) {
    if (this.stages.length <= 1) return false;
    this.stages = this.stages.filter(s => s.stage_id !== stageId);
    if (this.selectedStageId === stageId) {
      this.selectedStageId = this.stages[0].stage_id;
    }
    return true;
  }

  addCustomAssetToTwin(assetData) {
    const id = "custom_asset_" + Date.now();
    // Default position slightly offset from center
    const count = this.activeSpatialTwin.nodes.length;
    const angle = (count * 45) * (Math.PI / 180);
    const radius = 28 + (count % 3) * 8; // percentage radius
    const x = Math.round(50 + radius * Math.cos(angle));
    const y = Math.round(50 + radius * Math.sin(angle));

    let icon = "map-pin";
    if (assetData.category === "hotel") icon = "hotel";
    else if (assetData.category === "rail") icon = "train";
    else if (assetData.category === "hospital") icon = "heart-pulse";
    else if (assetData.category === "parking") icon = "car";
    else if (assetData.category === "choke") icon = "alert-triangle";

    const newNode = {
      id,
      name: assetData.name || "Custom Infrastructure Asset",
      category: assetData.category || "hotel",
      x: Math.max(12, Math.min(88, x)),
      y: Math.max(12, Math.min(88, y)),
      dist: assetData.dist || "2.5 km",
      transitTime: `${assetData.dist || "2.5 km"} transit`,
      capacity: assetData.capacity || "500 Units",
      details: assetData.details || "Custom added operational asset.",
      icon,
      critical: false,
      stageLink: assetData.category === 'hotel' ? 'stage_04' : assetData.category === 'rail' ? 'stage_03' : 'stage_06',
      impact: "User-defined custom spatial asset incorporated into baseline."
    };

    this.activeSpatialTwin.nodes.push(newNode);
    this.selectedTwinNodeId = id;
    return newNode;
  }

  getSummaryStats() {
    let totalServices = 0;
    let totalCapacityGaps = 0;
    let totalConsiderations = 0;

    this.stages.forEach(st => {
      totalServices += st.required_services.length;
      totalConsiderations += st.recommendations.length;
      
      st.required_services.forEach(srv => {
        if (srv.required > srv.available) totalCapacityGaps++;
      });
      for (let k in st.capacity_requirements) {
        if (k !== 'crowd_density' && st.capacity_requirements[k].required > st.capacity_requirements[k].available) {
          totalCapacityGaps++;
        }
      }
    });

    return {
      stageCount: this.stages.length,
      expectedVisitors: Math.round(this.currentEvent.expectedVisitors * this.demandVarianceFactor),
      totalServices,
      totalConsiderations,
      capacityGaps: totalCapacityGaps,
      demandVariance: Math.round((this.demandVarianceFactor - 1.0) * 100)
    };
  }

  getAllGroupedRecommendations() {
    const groups = {
      "Capacity": [],
      "Time": [],
      "Spatial": [],
      "Transportation": [],
      "Accommodation": [],
      "Safety & Support": []
    };

    this.stages.forEach(stage => {
      stage.recommendations.forEach(rec => {
        const cat = rec.category || "Capacity";
        if (!groups[cat]) groups[cat] = [];
        groups[cat].push({
          ...rec,
          stageId: stage.stage_id,
          stageName: stage.name
        });
      });
    });

    return groups;
  }
}

// Global Engine Instance
window.orchestraEngine = new EventPrePlanningEngine();

// UI Render & Event Bindings
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderAll();
  lucide.createIcons();

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('venue-suggestions-dropdown');
    const input = document.getElementById('venue-search-input');
    if (dropdown && !dropdown.contains(e.target) && e.target !== input) {
      dropdown.classList.add('hidden');
    }
  });
});

// Theme Switcher Logic (§5 of UI Design Reference: Light default, Night control-room)
function initTheme() {
  const savedTheme = localStorage.getItem('pravaah:theme') || localStorage.getItem('orchestra_theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.dataset.theme = 'dark';
    updateThemeToggleUI(true);
  } else {
    document.documentElement.dataset.theme = 'light';
    updateThemeToggleUI(false);
  }
}

window.toggleDarkMode = function() {
  const isDark = document.documentElement.dataset.theme === 'dark';
  const newTheme = isDark ? 'light' : 'dark';
  document.documentElement.dataset.theme = newTheme;
  localStorage.setItem('pravaah:theme', newTheme);
  updateThemeToggleUI(newTheme === 'dark');
  lucide.createIcons();
};

function updateThemeToggleUI(isDark) {
  const btn = document.getElementById('theme-toggle-btn');
  if (!btn) return;
  if (isDark) {
    btn.innerHTML = `<i data-lucide="sun" class="w-4 h-4 text-[var(--color-brass)]"></i><span class="hidden sm:inline text-xs font-semibold">Light Theme</span>`;
  } else {
    btn.innerHTML = `<i data-lucide="moon" class="w-4 h-4 text-[var(--color-dim)]"></i><span class="hidden sm:inline text-xs font-semibold">Night Theme</span>`;
  }
}

function renderAll() {
  renderEventSnapshot();
  renderVisitorJourney();
  renderTimeline();
  renderDigitalTwin();
  renderSelectedStageDetails();
  renderSummaryApprovalCard();
  renderGroupedRecommendations();
  renderOperationalDynamics();
  lucide.createIcons();
}

// 1. Render Event Snapshot Cards
function renderEventSnapshot() {
  const ev = window.orchestraEngine.currentEvent;
  const container = document.getElementById('event-snapshot-container');
  if (!container) return;

  const kFormat = (num) => {
    if (num >= 100000) return `${(num / 100000).toFixed(1)} Lakh`;
    if (num >= 1000) return `${Math.round(num / 1000)}K`;
    return num;
  };

  const adjustedDemand = Math.round(ev.expectedVisitors * window.orchestraEngine.demandVarianceFactor);

  container.innerHTML = `
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="dark-panel p-4 rounded-xl flex items-center space-x-3.5 transition hover:border-teal-500/50">
        <div class="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
          <i data-lucide="calendar" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Duration</span>
          <div class="text-sm sm:text-base font-extrabold text-white">${ev.duration}</div>
        </div>
      </div>

      <div class="dark-panel p-4 rounded-xl flex items-center space-x-3.5 transition hover:border-teal-500/50">
        <div class="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
          <i data-lucide="users" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Daily Demand</span>
          <div class="text-sm sm:text-base font-extrabold text-white">
            ${kFormat(adjustedDemand)} <span class="text-xs font-normal text-slate-400">/day</span>
          </div>
        </div>
      </div>

      <div class="dark-panel p-4 rounded-xl flex items-center space-x-3.5 transition hover:border-teal-500/50">
        <div class="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
          <i data-lucide="map-pin" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Active Venue & Area</span>
          <div class="text-sm sm:text-base font-extrabold text-white truncate max-w-[150px]" title="${ev.location}">${ev.venueName || ev.location}</div>
        </div>
      </div>

      <div class="dark-panel p-4 rounded-xl flex items-center space-x-3.5 transition hover:border-teal-500/50">
        <div class="w-10 h-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 border border-teal-500/20">
          <i data-lucide="${ev.icon || 'sparkles'}" class="w-5 h-5"></i>
        </div>
        <div>
          <span class="text-[11px] uppercase tracking-wider font-bold text-slate-400">Event Class</span>
          <div class="text-sm sm:text-base font-extrabold text-white truncate max-w-[150px]">${ev.eventType}</div>
        </div>
      </div>
    </div>
  `;
}

// 2. Render Visitor Journey Flowchart
function renderVisitorJourney() {
  const container = document.getElementById('visitor-journey-pipeline');
  if (!container) return;

  const journeySteps = [
    { label: "Home Origin", icon: "home" },
    { label: "Transit Network", icon: "train" },
    { label: "Feeder Shuttles", icon: "bus" },
    { label: "Accreditation", icon: "badge-check" },
    { label: "Hotel Check-in", icon: "hotel" },
    { label: "Gate Ingress", icon: "log-in" },
    { label: "Main Event", icon: "activity" },
    { label: "F&B Concourse", icon: "coffee" },
    { label: "Staged Egress", icon: "log-out" },
    { label: "Night Transit", icon: "navigation" },
    { label: "Safe Departure", icon: "check-circle" }
  ];

  container.innerHTML = journeySteps.map((step, idx) => `
    <div class="flex items-center">
      <div class="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg dark-subpanel text-xs font-semibold text-slate-200 transition hover:border-teal-500/50">
        <i data-lucide="${step.icon}" class="w-3.5 h-3.5 text-teal-400"></i>
        <span>${step.label}</span>
      </div>
      ${idx < journeySteps.length - 1 ? '<i data-lucide="chevron-right" class="w-3.5 h-3.5 text-slate-600 mx-1 shrink-0"></i>' : ''}
    </div>
  `).join('');
}

// 3. Render Timeline with Alternating Nodes (Matches User's Sketch)
function renderTimeline() {
  const container = document.getElementById('timeline-nodes-container');
  if (!container) return;

  const stages = window.orchestraEngine.stages;
  const selectedId = window.orchestraEngine.selectedStageId;

  container.innerHTML = stages.map((st, index) => {
    const isEven = index % 2 === 0;
    const posClass = isEven ? 'node-top' : 'node-bottom';
    const isActive = st.stage_id === selectedId;

    let riskPill = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold badge-neon-emerald"><i data-lucide="shield-check" class="w-2.5 h-2.5"></i> Optimal</span>`;
    let pulseClass = "";
    if (st.risk_level === 'high') {
      riskPill = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold badge-neon-rose"><i data-lucide="alert-triangle" class="w-2.5 h-2.5"></i> High Risk</span>`;
      pulseClass = "risk-high-indicator";
    } else if (st.risk_level === 'medium') {
      riskPill = `<span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold badge-neon-amber"><i data-lucide="alert-circle" class="w-2.5 h-2.5"></i> Attention</span>`;
    }

    const gapCount = st.required_services.filter(s => s.required > s.available).length;
    const gapBadge = gapCount > 0 ? `<span class="w-2 h-2 rounded-full bg-rose-500 ml-1 inline-block shadow-xs" title="${gapCount} Capacity Deficit"></span>` : '';

    return `
      <div 
        class="timeline-node-item ${posClass} ${isActive ? 'active' : ''}" 
        onclick="selectStage('${st.stage_id}')"
        data-stage-id="${st.stage_id}"
      >
        <div class="node-anchor-dot ${pulseClass}"></div>
        <div class="node-card">
          <div class="flex items-center justify-between mb-1">
            <span class="text-[10px] font-mono font-bold text-slate-400">Stage ${index + 1}</span>
            <div class="flex items-center">
              ${riskPill}
              ${gapBadge}
            </div>
          </div>
          <div class="text-xs font-bold text-white truncate flex items-center justify-center gap-1" title="${st.name}">
            <i data-lucide="${st.icon || 'circle'}" class="w-3.5 h-3.5 text-teal-400 shrink-0"></i>
            <span class="truncate">${st.short_name || st.name}</span>
          </div>
          <div class="text-[10px] text-slate-400 font-mono mt-0.5">${st.start_time} - ${st.end_time}</div>
          <div class="text-[10px] font-semibold mt-1 badge-neon-teal rounded py-0.5">
            ${(st.expected_visitors / 1000).toFixed(1)}k attendees
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 4. Select Stage & Synchronize with Digital Twin
window.selectStage = function(stageId) {
  window.orchestraEngine.selectedStageId = stageId;
  renderTimeline();
  renderSelectedStageDetails();
  syncDigitalTwinWithStage(stageId);
  lucide.createIcons();
};

// 5. Digital Twin Rendering & Interactivity for ANY Venue
function renderDigitalTwin() {
  const container = document.getElementById('digital-twin-pins-layer');
  if (!container) return;

  const twin = window.orchestraEngine.activeSpatialTwin;
  const filter = window.orchestraEngine.activeTwinFilter;
  const selectedNodeId = window.orchestraEngine.selectedTwinNodeId;
  const currentStageId = window.orchestraEngine.selectedStageId;

  // Update Digital Twin Titles & Indicators
  const titleEl = document.getElementById('digital-twin-title');
  const subEl = document.getElementById('digital-twin-subtitle');
  const selector = document.getElementById('twin-venue-selector');
  if (titleEl) titleEl.innerHTML = `<i data-lucide="radar" class="w-6 h-6 text-teal-400"></i><span>${twin.area || twin.name} Spatial Twin</span>`;
  if (subEl) subEl.innerText = `Geospatial infrastructure envelope for ${twin.name} (${twin.area}): railway hubs, hotels, hospitals & highways.`;
  if (selector && selector.value !== window.orchestraEngine.activeVenueKey) {
    selector.value = window.orchestraEngine.activeVenueKey;
  }

  const filteredNodes = twin.nodes.filter(node => {
    if (filter === 'all') return true;
    if (filter === 'rail') return node.category === 'rail';
    if (filter === 'hotel') return node.category === 'hotel';
    if (filter === 'hospital') return node.category === 'hospital';
    if (filter === 'parking') return node.category === 'parking';
    if (filter === 'choke') return node.category === 'choke';
    return true;
  });

  container.innerHTML = filteredNodes.map(node => {
    const isSelected = node.id === selectedNodeId;
    const isLinkedToCurrentStage = node.stageLink === currentStageId;
    let pinClass = `pin-${node.category}`;
    if (isSelected) pinClass += ' active-pin';

    return `
      <div 
        class="twin-pin ${pinClass}" 
        style="top: ${node.y}%; left: ${node.x}%;"
        onclick="selectTwinNode('${node.id}')"
        title="${node.name} (${node.dist})"
      >
        <div class="twin-pin-inner ${isLinkedToCurrentStage ? 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-900' : ''}">
          <i data-lucide="${node.icon || 'map-pin'}" class="w-4 h-4"></i>
        </div>
        <div class="twin-pin-label">
          ${node.name.length > 20 ? node.name.substring(0, 18) + '...' : node.name}
        </div>
      </div>
    `;
  }).join('');

  renderTwinNodeTelemetry();
  renderAreaSpatialEnvelopes();
}

window.selectTwinNode = function(nodeId) {
  window.orchestraEngine.selectedTwinNodeId = nodeId;
  renderDigitalTwin();
  lucide.createIcons();
};

window.filterDigitalTwin = function(category) {
  window.orchestraEngine.activeTwinFilter = category;
  document.querySelectorAll('.twin-filter-btn').forEach(btn => {
    if (btn.getAttribute('data-filter') === category) {
      btn.className = "twin-filter-btn active-filter px-2.5 py-1 rounded-lg bg-teal-500 text-slate-950 font-bold transition";
    } else {
      btn.className = "twin-filter-btn px-2.5 py-1 rounded-lg dark-subpanel text-slate-300 hover:text-white transition";
    }
  });
  renderDigitalTwin();
  lucide.createIcons();
};

function syncDigitalTwinWithStage(stageId) {
  const twin = window.orchestraEngine.activeSpatialTwin;
  const matchingNode = twin.nodes.find(n => n.stageLink === stageId);
  if (matchingNode) {
    window.orchestraEngine.selectedTwinNodeId = matchingNode.id;
  }
  renderDigitalTwin();
}

function renderTwinNodeTelemetry() {
  const container = document.getElementById('twin-node-telemetry');
  if (!container) return;

  const twin = window.orchestraEngine.activeSpatialTwin;
  const nodeId = window.orchestraEngine.selectedTwinNodeId || twin.nodes[0].id;
  const node = twin.nodes.find(n => n.id === nodeId) || twin.nodes[0];

  let catBadge = "badge-neon-teal";
  if (node.category === 'choke') catBadge = "badge-neon-rose";
  else if (node.category === 'hotel') catBadge = "badge-neon-cyan";
  else if (node.category === 'hospital') catBadge = "badge-neon-rose";
  else if (node.category === 'parking') catBadge = "badge-neon-amber";

  container.innerHTML = `
    <div class="flex items-center justify-between pb-2 border-b border-slate-700/80 mb-3">
      <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded ${catBadge}">
        ${node.category.toUpperCase()} ASSET
      </span>
      <span class="text-xs font-mono text-teal-400 font-bold">${node.dist}</span>
    </div>

    <div class="flex items-start gap-2.5">
      <div class="w-9 h-9 rounded-lg bg-slate-800 text-teal-400 flex items-center justify-center shrink-0 border border-slate-700">
        <i data-lucide="${node.icon || 'map-pin'}" class="w-5 h-5"></i>
      </div>
      <div>
        <h4 class="text-sm font-extrabold text-white leading-tight">${node.name}</h4>
        <div class="text-[11px] text-slate-400 mt-0.5 font-medium">${node.transitTime}</div>
      </div>
    </div>

    <div class="mt-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 space-y-1.5 text-xs">
      <div class="flex items-center justify-between">
        <span class="text-slate-400">Asset Capacity:</span>
        <span class="font-mono font-bold text-white">${node.capacity}</span>
      </div>
      <p class="text-[11px] text-slate-300 leading-snug pt-1 border-t border-slate-800/80">${node.details}</p>
    </div>

    <div class="mt-3 pt-2.5 border-t border-slate-800 text-[11px]">
      <div class="text-slate-400 font-semibold mb-1 flex items-center gap-1">
        <i data-lucide="git-commit" class="w-3 h-3 text-teal-400"></i>
        <span>Operational Linkage:</span>
      </div>
      <p class="text-teal-300 font-medium leading-tight">${node.impact || "Directly influences venue catchment capacity."}</p>
    </div>
  `;
}

// Render dynamic infrastructure envelopes for ANY venue
function renderAreaSpatialEnvelopes() {
  const container = document.querySelector('#digital-twin-section .space-y-2');
  if (!container) return;

  const twin = window.orchestraEngine.activeSpatialTwin;
  const v = window.orchestraEngine.currentEvent.expectedVisitors;

  // Calculate hotel capacity
  let hotelBeds = 0;
  twin.nodes.filter(n => n.category === 'hotel').forEach(n => {
    const match = n.capacity.match(/(\d+[\d,]*)/);
    if (match) hotelBeds += parseInt(match[1].replace(/,/g, ''), 10);
  });
  if (hotelBeds === 0) hotelBeds = Math.round(v * 0.12);
  const neededBeds = Math.round(v * 0.25);
  const bedDeficit = neededBeds - hotelBeds;

  // Calculate rail capacity
  let railThroughput = 0;
  twin.nodes.filter(n => n.category === 'rail').forEach(n => {
    const match = n.capacity.match(/(\d+[\d,]*)/);
    if (match) railThroughput += parseInt(match[1].replace(/,/g, ''), 10);
  });
  if (railThroughput === 0) railThroughput = Math.round(v * 0.85);

  container.innerHTML = `
    <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
      <span class="text-slate-300 flex items-center gap-1.5">
        <i data-lucide="hotel" class="w-3.5 h-3.5 text-purple-400"></i>
        Nearby Beds (4km)
      </span>
      <span class="font-mono font-bold ${bedDeficit > 0 ? 'text-amber-400' : 'text-emerald-400'}">
        ${hotelBeds.toLocaleString()} Rooms 
        ${bedDeficit > 0 ? `<span class="text-[10px] text-rose-400 font-normal">(-${bedDeficit.toLocaleString()} gap)</span>` : '<span class="text-[10px] text-emerald-400">✔</span>'}
      </span>
    </div>

    <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
      <span class="text-slate-300 flex items-center gap-1.5">
        <i data-lucide="train" class="w-3.5 h-3.5 text-cyan-400"></i>
        Rail Clearance
      </span>
      <span class="font-mono font-bold text-emerald-400">${railThroughput.toLocaleString()} pax/hr</span>
    </div>

    <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
      <span class="text-slate-300 flex items-center gap-1.5">
        <i data-lucide="car" class="w-3.5 h-3.5 text-amber-400"></i>
        Parking Capacity
      </span>
      <span class="font-mono font-bold text-amber-400">4,800 bays <span class="text-[10px] text-slate-400 font-normal">(park & ride)</span></span>
    </div>

    <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/60 border border-slate-700/60">
      <span class="text-slate-300 flex items-center gap-1.5">
        <i data-lucide="heart-pulse" class="w-3.5 h-3.5 text-rose-400"></i>
        Trauma Proximity
      </span>
      <span class="font-mono font-bold text-emerald-400">&lt; 3 min green corridor</span>
    </div>
  `;
}

// 6. Universal Venue Search & Autocomplete
window.handleVenueSearch = function(query) {
  const dropdown = document.getElementById('venue-suggestions-dropdown');
  if (!dropdown) return;

  const q = (query || "").trim().toLowerCase();
  dropdown.classList.remove('hidden');

  const matches = [];
  for (let key in VENUES_CATALOG) {
    const v = VENUES_CATALOG[key];
    if (!q || v.name.toLowerCase().includes(q) || v.area.toLowerCase().includes(q) || v.city.toLowerCase().includes(q)) {
      matches.push(v);
    }
  }

  let html = '';
  if (matches.length > 0) {
    html += matches.slice(0, 5).map(v => `
      <div class="venue-suggestion-item" onclick="selectVenue('${v.id}')">
        <div>
          <div class="text-xs font-bold text-white flex items-center gap-1.5">
            <i data-lucide="${v.icon || 'map-pin'}" class="w-3.5 h-3.5 text-teal-400"></i>
            <span>${v.name}</span>
          </div>
          <div class="text-[11px] text-slate-400 mt-0.5">${v.area} • <span class="text-teal-400 font-mono">${v.capacity.toLocaleString()} cap</span></div>
        </div>
        <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded badge-neon-teal">Ready</span>
      </div>
    `).join('');
  }

  // If user types custom text not matched or wants arbitrary venue
  if (q.length > 2) {
    html += `
      <div class="venue-suggestion-item" onclick="selectCustomVenueInput('${query.replace(/'/g, "\\'")}')">
        <div>
          <div class="text-xs font-bold text-teal-300 flex items-center gap-1.5">
            <i data-lucide="sparkles" class="w-3.5 h-3.5 text-teal-400"></i>
            <span>Synthesize Digital Twin for "${query}"</span>
          </div>
          <div class="text-[11px] text-slate-400 mt-0.5">Procedurally generate spatial radar, transit hubs & hotel envelopes</div>
        </div>
        <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded badge-neon-cyan">Synthesize</span>
      </div>
    `;
  }

  dropdown.innerHTML = html;
  lucide.createIcons();
};

window.selectVenue = function(venueId) {
  const dropdown = document.getElementById('venue-suggestions-dropdown');
  if (dropdown) dropdown.classList.add('hidden');

  window.orchestraEngine.setVenue(venueId);
  const textarea = document.getElementById('nl-prompt-input');
  if (textarea) textarea.value = window.orchestraEngine.currentEvent.description;

  const searchInput = document.getElementById('venue-search-input');
  if (searchInput) searchInput.value = window.orchestraEngine.currentEvent.venueName;

  renderAll();
};

window.selectCustomVenueInput = function(customName) {
  const dropdown = document.getElementById('venue-suggestions-dropdown');
  if (dropdown) dropdown.classList.add('hidden');

  const generated = generateCustomSpatialTwin(customName, `${customName} Area`, 50000, "Major Public Gathering");
  window.orchestraEngine.setVenue(generated);

  const textarea = document.getElementById('nl-prompt-input');
  if (textarea) textarea.value = window.orchestraEngine.currentEvent.description;

  const searchInput = document.getElementById('venue-search-input');
  if (searchInput) searchInput.value = customName;

  renderAll();
};

// 7. Modal: Add Custom Asset to Digital Twin
window.openAddAssetModal = function() {
  document.getElementById('asset-modal').classList.remove('hidden');
  lucide.createIcons();
};

window.closeAddAssetModal = function() {
  document.getElementById('asset-modal').classList.add('hidden');
};

window.saveCustomAssetForm = function() {
  const name = document.getElementById('asset-form-name').value.trim();
  const category = document.getElementById('asset-form-category').value;
  const dist = document.getElementById('asset-form-dist').value.trim();
  const capacity = document.getElementById('asset-form-capacity').value.trim();
  const details = document.getElementById('asset-form-details').value.trim();

  if (!name) return alert("Please enter an asset name");

  window.orchestraEngine.addCustomAssetToTwin({ name, category, dist, capacity, details });
  closeAddAssetModal();
  renderDigitalTwin();
  lucide.createIcons();
};

// 8. Render Selected Stage Details
function renderSelectedStageDetails() {
  const container = document.getElementById('selected-stage-inspector');
  if (!container) return;

  const stage = window.orchestraEngine.getStage(window.orchestraEngine.selectedStageId);
  if (!stage) return;

  const serviceGaps = stage.required_services.map(s => {
    const gap = s.required - s.available;
    const pct = Math.min(Math.round((s.available / s.required) * 100), 150);
    const isDeficit = gap > 0;
    return { ...s, gap, pct, isDeficit };
  });

  const hasHighRisk = stage.risk_level === 'high';
  const hasGaps = serviceGaps.some(s => s.isDeficit);
  const insight = stage.operational_insight || {
    why_risk: "Stage requires operational coordination.",
    formula: "Standard capacity estimation.",
    impact_if_unaddressed: "Sub-optimal attendee flow."
  };

  container.innerHTML = `
    <!-- Header of Selected Stage -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 gap-3">
      <div>
        <div class="flex items-center space-x-2">
          <span class="px-2.5 py-0.5 text-xs font-bold rounded-md bg-teal-500/10 text-teal-300 border border-teal-500/30 uppercase tracking-wide flex items-center gap-1.5">
            <i data-lucide="${stage.icon || 'layers'}" class="w-3.5 h-3.5"></i>
            ${stage.stage_id.replace('_', ' ').toUpperCase()}
          </span>
          <span class="text-xs text-slate-400 font-mono">• ${stage.start_time} – ${stage.end_time} (${stage.window_duration_hours || 2}h window)</span>
          ${hasHighRisk ? `
            <span class="px-2 py-0.5 text-xs font-bold rounded-md badge-neon-rose flex items-center gap-1">
              <i data-lucide="alert-triangle" class="w-3 h-3"></i> High Peak Bottleneck
            </span>` : `
            <span class="px-2 py-0.5 text-xs font-semibold rounded-md badge-neon-emerald flex items-center gap-1">
              <i data-lucide="check" class="w-3 h-3"></i> Operational In-Limit
            </span>`}
        </div>
        <h3 class="text-xl sm:text-2xl font-black text-white mt-1.5">${stage.name}</h3>
        <p class="text-xs text-slate-400 mt-0.5">
          Projected load during this window: <strong class="text-white font-bold">${stage.expected_visitors.toLocaleString()} attendees</strong>
        </p>
      </div>

      <div class="flex items-center space-x-2 shrink-0">
        <button onclick="openEditStageModal('${stage.stage_id}')" class="px-3 py-1.5 rounded-lg dark-subpanel text-slate-300 text-xs font-semibold hover:border-teal-500/50 flex items-center space-x-1.5 transition">
          <i data-lucide="edit-3" class="w-3.5 h-3.5 text-teal-400"></i>
          <span>Edit Stage</span>
        </button>
        <button onclick="confirmDeleteStage('${stage.stage_id}')" class="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold hover:bg-rose-500/20 flex items-center space-x-1.5 transition">
          <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          <span>Remove</span>
        </button>
      </div>
    </div>

    <!-- Educational Deep-Dive for Event Manager -->
    <div class="mt-5 p-4 rounded-xl bg-slate-900/90 border border-teal-500/30">
      <div class="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-teal-400 mb-2">
        <span class="flex items-center gap-1.5">
          <i data-lucide="compass" class="w-4 h-4 text-teal-400"></i>
          Event Manager Operational Intelligence & Diagnosis
        </span>
        <span class="text-[11px] font-normal text-slate-400">Why this stage behaves this way</span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-3">
        <div class="dark-subpanel p-3 rounded-lg">
          <div class="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-[11px]">
            <i data-lucide="help-circle" class="w-3.5 h-3.5 text-amber-400"></i>
            Root Cause of Bottleneck
          </div>
          <p class="text-slate-400 leading-relaxed">${insight.why_risk}</p>
        </div>

        <div class="dark-subpanel p-3 rounded-lg">
          <div class="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-[11px]">
            <i data-lucide="calculator" class="w-3.5 h-3.5 text-cyan-400"></i>
            Operational Capacity Formula
          </div>
          <p class="text-slate-400 font-mono text-[11px] leading-relaxed">${insight.formula}</p>
        </div>

        <div class="dark-subpanel p-3 rounded-lg">
          <div class="font-bold text-slate-300 flex items-center gap-1.5 mb-1 text-[11px]">
            <i data-lucide="zap" class="w-3.5 h-3.5 text-rose-400"></i>
            Risk If Unmitigated
          </div>
          <p class="text-slate-400 leading-relaxed">${insight.impact_if_unaddressed}</p>
        </div>
      </div>
    </div>

    <!-- Dual Columns: Capacity vs Recommendations -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
      <div class="lg:col-span-7 space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-white flex items-center gap-2">
            <i data-lucide="layers" class="w-4 h-4 text-teal-400"></i>
            Service & Capacity Matching
          </h4>
          <span class="text-xs text-slate-400">Required vs. Available Capacity</span>
        </div>

        <div class="space-y-3">
          ${serviceGaps.map(srv => `
            <div class="p-3.5 rounded-xl border ${srv.isDeficit ? 'border-amber-500/30 bg-amber-500/5' : 'dark-subpanel'} transition">
              <div class="flex items-center justify-between text-xs mb-1.5">
                <span class="font-bold text-white flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full ${srv.isDeficit ? 'bg-amber-400 shadow-xs' : 'bg-emerald-400'}"></span>
                  ${srv.name}
                </span>
                <div class="space-x-2 font-mono text-[11px]">
                  <span class="text-slate-400">Required: <strong class="text-white">${srv.required}</strong></span>
                  <span class="text-slate-400">Available: <strong class="${srv.isDeficit ? 'text-amber-400 font-bold' : 'text-emerald-400'}">${srv.available}</strong> ${srv.unit}</span>
                </div>
              </div>
              <div class="w-full bg-slate-800 rounded-full h-2 overflow-hidden flex">
                <div class="progress-fill h-2 rounded-full ${srv.isDeficit ? 'bg-amber-400' : 'bg-teal-500'}" style="width: ${srv.pct}%"></div>
              </div>
              ${srv.isDeficit ? `
                <div class="mt-2 text-[11px] text-amber-300 flex items-center justify-between">
                  <span class="flex items-center gap-1"><i data-lucide="alert-circle" class="w-3.5 h-3.5 text-amber-400"></i> Capacity Gap: <strong>-${srv.gap} ${srv.unit}</strong></span>
                  <span class="font-semibold text-amber-400">${srv.pct}% covered</span>
                </div>
              ` : `
                <div class="mt-1.5 text-[11px] text-emerald-400 flex items-center gap-1">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i> Adequate Capacity Envelope
                </div>
              `}
            </div>
          `).join('')}
        </div>

        <div class="pt-2">
          <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Flow & Saturation Limits</span>
          <div class="grid grid-cols-2 gap-3 mt-2">
            ${Object.keys(stage.capacity_requirements).map(k => {
              const req = stage.capacity_requirements[k];
              const isDensity = k === 'crowd_density';
              const gap = req.required - req.available;
              const hasDeficit = !isDensity && gap > 0;
              return `
                <div class="p-3 dark-subpanel rounded-xl">
                  <div class="text-[11px] font-bold text-slate-400">${req.name}</div>
                  <div class="text-sm font-extrabold text-white mt-0.5">
                    ${req.available.toLocaleString()} <span class="text-xs font-normal text-slate-400">/ ${req.required.toLocaleString()} ${req.unit}</span>
                  </div>
                  <div class="text-[10px] mt-1 font-semibold ${hasDeficit ? 'text-rose-400' : 'text-emerald-400'}">
                    ${hasDeficit ? `Deficit: -${gap.toLocaleString()}` : '✔ Safe Operation Threshold'}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="lg:col-span-5 space-y-4">
        <div class="p-4 rounded-xl ${hasGaps ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200' : 'dark-subpanel text-slate-300'}">
          <div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider ${hasGaps ? 'text-amber-400' : 'text-teal-400'} mb-1">
            <i data-lucide="${hasGaps ? 'alert-triangle' : 'info'}" class="w-4 h-4"></i>
            Operational Planning Alert
          </div>
          <p class="text-xs leading-relaxed mt-1 text-slate-300">
            ${stage.risk_note || insight.why_risk}
          </p>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-teal-400"></i>
              Proactive Corrective Measures
            </h4>
            <span class="text-[11px] text-teal-400 font-bold">${stage.recommendations.filter(r => r.applied).length}/${stage.recommendations.length} Active</span>
          </div>

          <div class="space-y-2.5">
            ${stage.recommendations.map(rec => `
              <div class="p-3.5 rounded-xl border ${rec.applied ? 'border-teal-500/50 bg-teal-500/10' : 'dark-subpanel hover:border-slate-700'} transition shadow-xs">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded ${getCategoryBadge(rec.category)}">
                    ${rec.category}
                  </span>
                  <button 
                    onclick="toggleRecommendation('${stage.stage_id}', '${rec.id}')"
                    class="text-xs font-bold px-3 py-1 rounded-lg transition flex items-center space-x-1.5 ${rec.applied ? 'bg-teal-500 text-slate-950 font-extrabold shadow-sm' : 'bg-slate-800 text-slate-200 hover:bg-teal-500 hover:text-slate-950'}"
                  >
                    <i data-lucide="${rec.applied ? 'check-circle-2' : 'plus'}" class="w-3.5 h-3.5"></i>
                    <span>${rec.applied ? 'Applied' : 'Apply Measure'}</span>
                  </button>
                </div>
                <p class="text-xs text-white font-medium leading-snug mt-1">${rec.text}</p>
                <div class="text-[11px] text-teal-300 font-semibold mt-2 flex items-center gap-1.5">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5 text-teal-400"></i>
                  <span>${rec.impact}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function getCategoryBadge(cat) {
  switch (cat) {
    case 'Capacity': return 'badge-neon-teal';
    case 'Time': return 'badge-neon-amber';
    case 'Spatial': return 'badge-neon-cyan';
    case 'Transportation': return 'badge-neon-teal';
    case 'Accommodation': return 'badge-neon-cyan';
    case 'Safety & Support': return 'badge-neon-rose';
    default: return 'badge-neon-teal';
  }
}

// 9. Toggle Recommendation
window.toggleRecommendation = function(stageId, recId) {
  window.orchestraEngine.applyRecommendation(stageId, recId);
  renderTimeline();
  renderSelectedStageDetails();
  renderSummaryApprovalCard();
  renderGroupedRecommendations();
  lucide.createIcons();
};

// 10. Render Approval Card
function renderSummaryApprovalCard() {
  const container = document.getElementById('approval-summary-card');
  if (!container) return;

  const stats = window.orchestraEngine.getSummaryStats();

  container.innerHTML = `
    <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-700">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div class="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <i data-lucide="shield-check" class="w-4 h-4"></i>
            <span>Stage Model Verified & Co-Designed</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-black mt-1">Generated Pre-Planning Event Plan</h2>
          <p class="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
            The operational timeline, service capacity envelopes, and safety recommendations are synthesized for <strong>${window.orchestraEngine.currentEvent.venueName}</strong>.
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-5 pt-4 border-t border-slate-700/80">
            <div>
              <div class="text-[11px] text-slate-400 uppercase font-semibold">Total Stages</div>
              <div class="text-lg font-bold text-white">${stats.stageCount} Stages</div>
            </div>
            <div>
              <div class="text-[11px] text-slate-400 uppercase font-semibold">Daily Demand</div>
              <div class="text-lg font-bold text-white">${stats.expectedVisitors.toLocaleString()} <span class="text-xs text-slate-400">/day</span></div>
            </div>
            <div>
              <div class="text-[11px] text-slate-400 uppercase font-semibold">Service Mappings</div>
              <div class="text-lg font-bold text-white">${stats.totalServices} Services</div>
            </div>
            <div>
              <div class="text-[11px] text-slate-400 uppercase font-semibold">AI Measures</div>
              <div class="text-lg font-bold text-teal-400">${stats.totalConsiderations} Mitigations</div>
            </div>
            <div>
              <div class="text-[11px] text-slate-400 uppercase font-semibold">Active Deficits</div>
              <div class="text-lg font-bold ${stats.capacityGaps > 0 ? 'text-amber-400' : 'text-emerald-400'}">
                ${stats.capacityGaps > 0 ? `${stats.capacityGaps} Unresolved` : '0 (Optimal)'}
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 justify-center">
          <button onclick="confirmAndHandoverLive()" class="px-5 py-3 rounded-xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-black text-sm shadow-lg shadow-teal-500/20 transition flex items-center justify-center space-x-2">
            <i data-lucide="check-circle-2" class="w-4 h-4"></i>
            <span>Confirm & Lock Baseline</span>
          </button>
          <button onclick="exportPlanJSON()" class="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 transition flex items-center justify-center space-x-2">
            <i data-lucide="download" class="w-3.5 h-3.5 text-teal-400"></i>
            <span>Export Event Plan JSON</span>
          </button>
        </div>
      </div>
    </div>
  `;
}

// 11. Render Grouped Recommendations
function renderGroupedRecommendations() {
  const container = document.getElementById('grouped-recommendations-container');
  if (!container) return;

  const groups = window.orchestraEngine.getAllGroupedRecommendations();
  const categories = Object.keys(groups);

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${categories.map(cat => {
        const items = groups[cat];
        return `
          <div class="dark-panel rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs uppercase font-bold px-2 py-0.5 rounded ${getCategoryBadge(cat)}">
                  ${cat} (${items.length})
                </span>
              </div>
              <div class="space-y-2 mt-2">
                ${items.map(rec => `
                  <div class="p-2.5 rounded-lg border ${rec.applied ? 'border-teal-500/40 bg-teal-500/10' : 'border-slate-800 bg-slate-900/60'} text-xs">
                    <div class="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                      <span>${rec.stageName}</span>
                      <button onclick="toggleRecommendation('${rec.stageId}', '${rec.id}')" class="text-teal-400 hover:underline font-bold flex items-center gap-1">
                        <i data-lucide="${rec.applied ? 'check' : 'plus'}" class="w-3 h-3"></i>
                        <span>${rec.applied ? 'Active' : 'Apply'}</span>
                      </button>
                    </div>
                    <p class="text-slate-200 leading-snug">${rec.text}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// 12. Render Operational Dynamics
function renderOperationalDynamics() {
  const container = document.getElementById('operational-dynamics-container');
  if (!container) return;

  const currentVariance = Math.round((window.orchestraEngine.demandVarianceFactor - 1.0) * 100);

  container.innerHTML = `
    <div class="dark-panel p-6 rounded-2xl">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div class="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <i data-lucide="sliders" class="w-4 h-4"></i>
            Crowd Stress-Testing & Capacity Tolerance
          </div>
          <h3 class="text-lg font-bold text-white mt-1">Simulate Real-World Demand Surges</h3>
          <p class="text-xs text-slate-400 mt-0.5">
            Test how resilient your stages are if crowd attendance surges beyond initial estimates.
          </p>
        </div>

        <div class="dark-subpanel p-3 rounded-xl border border-slate-700/80 flex items-center gap-4 shrink-0">
          <div class="text-xs font-bold text-slate-300">
            Stress Test: 
            <span class="font-mono text-teal-400 text-sm ${currentVariance > 0 ? 'text-amber-400' : ''}">
              ${currentVariance >= 0 ? `+${currentVariance}%` : `${currentVariance}%`}
            </span>
          </div>
          <input 
            type="range" 
            min="-20" 
            max="50" 
            step="5" 
            value="${currentVariance}"
            oninput="handleDemandVarianceChange(this.value)"
            class="w-32 accent-teal-500 cursor-pointer"
          >
          <button onclick="handleDemandVarianceChange(0)" class="text-[11px] px-2 py-1 rounded bg-slate-800 text-slate-300 hover:text-white transition">
            Reset (0%)
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5">
        <div class="p-3.5 rounded-xl dark-subpanel border border-slate-800">
          <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
            <span>08:00 – 11:30</span>
            <span class="text-teal-400 font-mono">Wave 1</span>
          </div>
          <div class="text-sm font-extrabold text-white">Morning Ingress & Transit Peak</div>
          <div class="text-xs text-slate-400 mt-1">45% of daily crowd enters. Shuttles & baggage check under highest load.</div>
        </div>

        <div class="p-3.5 rounded-xl dark-subpanel border border-slate-800">
          <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
            <span>11:30 – 16:00</span>
            <span class="text-cyan-400 font-mono">Wave 2</span>
          </div>
          <div class="text-sm font-extrabold text-white">Hotel Check-In & Gate Access</div>
          <div class="text-xs text-slate-400 mt-1">Turnstiles experience steady flow. Cloakrooms and concourse fill up.</div>
        </div>

        <div class="p-3.5 rounded-xl dark-subpanel border border-slate-800">
          <div class="flex items-center justify-between text-xs text-slate-400 font-bold mb-1">
            <span>16:00 – 21:30</span>
            <span class="text-indigo-400 font-mono">Wave 3</span>
          </div>
          <div class="text-sm font-extrabold text-white">Main Event Concourse Peak</div>
          <div class="text-xs text-slate-400 mt-1">100% capacity in venue. Hydration & medical hubs on active standby.</div>
        </div>

        <div class="p-3.5 rounded-xl dark-subpanel border border-rose-500/30 bg-rose-500/5">
          <div class="flex items-center justify-between text-xs text-rose-300 font-bold mb-1">
            <span>21:30 – 00:30</span>
            <span class="text-rose-400 font-mono">Surge!</span>
          </div>
          <div class="text-sm font-extrabold text-white">Synchronous Exit & Dispersal</div>
          <div class="text-xs text-slate-400 mt-1">90% crowd exits in 90 mins. Public transit requires priority clearance.</div>
        </div>
      </div>
    </div>
  `;
}

window.handleDemandVarianceChange = function(val) {
  const variancePct = parseInt(val, 10);
  const factor = 1.0 + (variancePct / 100);
  window.orchestraEngine.setDemandVariance(factor);
  renderAll();
  lucide.createIcons();
};

// 13. Natural Language Input Submit Handler
window.handlePlanGeneration = function() {
  const textarea = document.getElementById('nl-prompt-input');
  const btn = document.getElementById('generate-plan-btn');
  if (!textarea || !textarea.value.trim()) return;

  const text = textarea.value.trim();

  const originalBtnHTML = btn.innerHTML;
  btn.disabled = true;
  btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin text-teal-300"></i><span>Synthesizing Operational Plan...</span>`;
  lucide.createIcons();

  setTimeout(() => {
    window.orchestraEngine.generatePlanFromText(text);
    renderAll();
    btn.disabled = false;
    btn.innerHTML = originalBtnHTML;
    lucide.createIcons();

    document.getElementById('digital-twin-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 350);
};

// 14. Modal Controls for Add / Edit Stage
window.openAddStageModal = function() {
  document.getElementById('modal-title').innerText = "Add New Event Stage";
  document.getElementById('stage-form-id').value = "";
  document.getElementById('stage-form-name').value = "VIP & Media Reception";
  document.getElementById('stage-form-short').value = "VIP Reception";
  document.getElementById('stage-form-start').value = "15:00";
  document.getElementById('stage-form-end').value = "17:00";
  document.getElementById('stage-form-visitors').value = "3500";
  document.getElementById('stage-modal').classList.remove('hidden');
  lucide.createIcons();
};

window.openEditStageModal = function(stageId) {
  const stage = window.orchestraEngine.getStage(stageId);
  if (!stage) return;
  document.getElementById('modal-title').innerText = `Edit ${stage.name}`;
  document.getElementById('stage-form-id').value = stage.stage_id;
  document.getElementById('stage-form-name').value = stage.name;
  document.getElementById('stage-form-short').value = stage.short_name || stage.name;
  document.getElementById('stage-form-start').value = stage.start_time;
  document.getElementById('stage-form-end').value = stage.end_time;
  document.getElementById('stage-form-visitors').value = stage.expected_visitors;
  document.getElementById('stage-modal').classList.remove('hidden');
  lucide.createIcons();
};

window.closeStageModal = function() {
  document.getElementById('stage-modal').classList.add('hidden');
};

window.saveStageForm = function() {
  const id = document.getElementById('stage-form-id').value;
  const name = document.getElementById('stage-form-name').value.trim();
  const short_name = document.getElementById('stage-form-short').value.trim();
  const start_time = document.getElementById('stage-form-start').value;
  const end_time = document.getElementById('stage-form-end').value;
  const expected_visitors = parseInt(document.getElementById('stage-form-visitors').value, 10);

  if (!name) return alert("Please enter a stage name");

  if (id) {
    window.orchestraEngine.updateStage(id, { name, short_name, start_time, end_time, expected_visitors });
  } else {
    window.orchestraEngine.addStage({ name, short_name, start_time, end_time, expected_visitors });
  }

  closeStageModal();
  renderTimeline();
  renderSelectedStageDetails();
  renderSummaryApprovalCard();
  lucide.createIcons();
};

window.confirmDeleteStage = function(stageId) {
  if (confirm("Are you sure you want to remove this stage from the operational timeline?")) {
    window.orchestraEngine.deleteStage(stageId);
    renderTimeline();
    renderSelectedStageDetails();
    renderSummaryApprovalCard();
    renderGroupedRecommendations();
    lucide.createIcons();
  }
};

// 15. Export Plan JSON (Pre-Planning Baseline)
window.exportPlanJSON = function() {
  const data = {
    platform: "ORCHESTRA — Mega-Event Hospitality & Crowd Orchestration System",
    phase: "Phase 0: Intelligent Pre-Planning Baseline",
    event_metadata: window.orchestraEngine.currentEvent,
    venue_digital_twin: window.orchestraEngine.activeSpatialTwin,
    summary_statistics: window.orchestraEngine.getSummaryStats(),
    operational_stages: window.orchestraEngine.stages,
    proactive_recommendations: window.orchestraEngine.getAllGroupedRecommendations(),
    generated_at: new Date().toISOString(),
    status: "CONFIRMED_PREPLAN_BASELINE"
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `orchestra_plan_${window.orchestraEngine.currentEvent.eventType.toLowerCase().replace(/\s+/g, '_')}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// 16. Confirm & Handover to Live Ops
window.confirmAndHandoverLive = function() {
  document.getElementById('live-ops-modal')?.classList.remove('hidden');
  lucide.createIcons();
};

window.closeLiveOpsModal = function() {
  document.getElementById('live-ops-modal')?.classList.add('hidden');
};


