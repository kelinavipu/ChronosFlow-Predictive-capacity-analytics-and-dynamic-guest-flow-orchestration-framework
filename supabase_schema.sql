-- ==============================================================================
-- CHRONOSFLOW / ORCHESTRA: SUPABASE DATABASE SCHEMA
-- Project ID: rojjfjoquejjxuziriei
-- Run this in the Supabase SQL Editor: https://supabase.com/dashboard/project/rojjfjoquejjxuziriei/sql/new
-- ==============================================================================

-- 1. PROFILES & ROLE-BASED ACCESS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    email TEXT NOT NULL,
    full_name TEXT,
    role TEXT NOT NULL CHECK (role IN ('event_manager', 'visitor', 'service_provider', 'infra_provider')),
    organization TEXT,
    phone TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Allow public read/write for demo/anon
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert to profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to profiles" ON public.profiles FOR UPDATE USING (true);

-- 2. EVENTS (PRE-PLANS & ACTIVE FIXTURES)
CREATE TABLE IF NOT EXISTS public.events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    event_type TEXT NOT NULL,
    venue_name TEXT NOT NULL,
    venue_area TEXT NOT NULL,
    city TEXT NOT NULL,
    duration TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    expected_visitors INTEGER NOT NULL DEFAULT 50000,
    venue_capacity INTEGER NOT NULL DEFAULT 55000,
    highway TEXT,
    railway TEXT,
    description TEXT,
    is_locked BOOLEAN DEFAULT FALSE,
    locked_at TIMESTAMPTZ,
    status TEXT DEFAULT 'IN_PLANNING' CHECK (status IN ('IN_PLANNING', 'BASELINE_LOCKED', 'LIVE_ACTIVE', 'COMPLETED')),
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public insert to events" ON public.events FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to events" ON public.events FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to events" ON public.events FOR DELETE USING (true);

-- 3. SPATIAL ASSETS (DIGITAL TWIN NODES)
CREATE TABLE IF NOT EXISTS public.spatial_assets (
    id TEXT PRIMARY KEY,
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('stadium', 'rail', 'hotel', 'hospital', 'parking', 'choke', 'concession')),
    dist_km TEXT NOT NULL,
    transit_time TEXT,
    capacity_spec TEXT,
    x NUMERIC NOT NULL DEFAULT 50,
    y NUMERIC NOT NULL DEFAULT 50,
    details TEXT,
    icon TEXT DEFAULT 'map-pin',
    is_critical BOOLEAN DEFAULT FALSE,
    stage_link TEXT,
    impact TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.spatial_assets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to spatial_assets" ON public.spatial_assets FOR SELECT USING (true);
CREATE POLICY "Allow public insert to spatial_assets" ON public.spatial_assets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to spatial_assets" ON public.spatial_assets FOR UPDATE USING (true);
CREATE POLICY "Allow public delete to spatial_assets" ON public.spatial_assets FOR DELETE USING (true);

-- 4. OPERATIONAL JOURNEY STAGES
CREATE TABLE IF NOT EXISTS public.event_stages (
    id TEXT PRIMARY KEY,
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    stage_id TEXT NOT NULL,
    name TEXT NOT NULL,
    time_range TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'optimal' CHECK (status IN ('optimal', 'attention', 'high_risk')),
    required_capacity INTEGER NOT NULL DEFAULT 10000,
    available_capacity INTEGER NOT NULL DEFAULT 10000,
    capacity_unit TEXT DEFAULT 'pax/hr',
    deficit INTEGER DEFAULT 0,
    formula TEXT,
    root_cause TEXT,
    consequence TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.event_stages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to event_stages" ON public.event_stages FOR SELECT USING (true);
CREATE POLICY "Allow public insert to event_stages" ON public.event_stages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to event_stages" ON public.event_stages FOR UPDATE USING (true);

-- 5. STAGE MITIGATIONS
CREATE TABLE IF NOT EXISTS public.stage_mitigations (
    id TEXT PRIMARY KEY,
    stage_id TEXT NOT NULL,
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('capacity', 'time', 'spatial', 'transportation', 'accommodation', 'safety')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    impact_label TEXT NOT NULL,
    is_applied BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.stage_mitigations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to stage_mitigations" ON public.stage_mitigations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to stage_mitigations" ON public.stage_mitigations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to stage_mitigations" ON public.stage_mitigations FOR UPDATE USING (true);

-- 6. SIMULATIONS & STRESS-TEST LOGS
CREATE TABLE IF NOT EXISTS public.simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    scenario_type TEXT NOT NULL,
    stress_factor NUMERIC NOT NULL DEFAULT 0,
    bottlenecks JSONB,
    evacuation_time_mins INTEGER,
    status TEXT DEFAULT 'COMPLETED',
    results JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to simulations" ON public.simulations FOR SELECT USING (true);
CREATE POLICY "Allow public insert to simulations" ON public.simulations FOR INSERT WITH CHECK (true);

-- 7. CURRENT EVENTS LIVE TELEMETRY & DECISIONS
CREATE TABLE IF NOT EXISTS public.live_telemetry (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    weather_temp NUMERIC,
    weather_condition TEXT,
    weather_rain_chance NUMERIC,
    crowd_in_venue INTEGER,
    crowd_ingress_rate INTEGER,
    traffic_index TEXT,
    parking_occupied_pct NUMERIC,
    incident_count INTEGER DEFAULT 0,
    recorded_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.live_telemetry ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to live_telemetry" ON public.live_telemetry FOR SELECT USING (true);
CREATE POLICY "Allow public insert to live_telemetry" ON public.live_telemetry FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.live_decisions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    decision_title TEXT NOT NULL,
    decision_text TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('WEATHER', 'CROWD', 'TRAFFIC', 'SAFETY', 'TRANSIT')),
    urgency TEXT DEFAULT 'HIGH' CHECK (urgency IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
    status TEXT DEFAULT 'PROPOSED' CHECK (status IN ('PROPOSED', 'DISPATCHED', 'RESOLVED')),
    dispatched_by TEXT,
    dispatched_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.live_decisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to live_decisions" ON public.live_decisions FOR SELECT USING (true);
CREATE POLICY "Allow public insert to live_decisions" ON public.live_decisions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update to live_decisions" ON public.live_decisions FOR UPDATE USING (true);

-- 8. INFRASTRUCTURE ASSET REQUESTS & PIPELINE
CREATE TABLE IF NOT EXISTS public.infra_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    asset_name TEXT NOT NULL,
    requested_by TEXT NOT NULL,
    request_type TEXT NOT NULL,
    details TEXT NOT NULL,
    allocated_capacity TEXT,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'NEGOTIATING', 'DECLINED')),
    response_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.infra_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all infra_requests" ON public.infra_requests FOR ALL USING (true);

-- 9. SERVICE PROVIDER REQUESTS & RFPS
CREATE TABLE IF NOT EXISTS public.service_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    service_domain TEXT NOT NULL,
    requested_by TEXT NOT NULL,
    service_title TEXT NOT NULL,
    requirements TEXT NOT NULL,
    units_requested INTEGER DEFAULT 1,
    status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'CONFIRMED', 'DECLINED')),
    response_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.service_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all service_requests" ON public.service_requests FOR ALL USING (true);

-- 10. VISITOR ITINERARIES & PERSONALIZED PRE-PLANS
CREATE TABLE IF NOT EXISTS public.visitor_itineraries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    visitor_email TEXT NOT NULL,
    event_id TEXT REFERENCES public.events(id) ON DELETE CASCADE,
    seat_details TEXT NOT NULL,
    gate_assignment TEXT NOT NULL,
    recommended_departure_time TEXT,
    recommended_transit TEXT,
    walking_corridor TEXT,
    hotel_booking TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.visitor_itineraries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all visitor_itineraries" ON public.visitor_itineraries FOR ALL USING (true);

-- 11. SEED BASELINE DATA (DY PATIL STADIUM, NERUL)
INSERT INTO public.events (id, title, event_type, venue_name, venue_area, city, duration, expected_visitors, venue_capacity, highway, railway, description, status, is_locked)
VALUES (
    'dypatil_nerul',
    'Championship Trophy: 4-Day Mega Cricket Fixture',
    'Cricket Championship',
    'Dr. D.Y. Patil Sports Stadium',
    'Sector 7, Nerul',
    'Navi Mumbai (MMR)',
    '4 Days (Sep 1 - Sep 4)',
    50000,
    55000,
    'Sion-Panvel Expressway & Palm Beach Corridor',
    'Harbour Line & Trans-Harbour Suburban Rail',
    'Conducting a 4-day cricket match at Dr. D.Y. Patil Stadium in Nerul from 1st September to 4th September with 50,000 spectators attending each day. Out-of-city spectators will arrive via Harbour Line trains and Sion-Panvel Highway, requiring local accommodation, shuttle connectivity, and staged egress management.',
    'BASELINE_LOCKED',
    TRUE
) ON CONFLICT (id) DO NOTHING;

-- Seed Spatial Assets for DY Patil
INSERT INTO public.spatial_assets (id, event_id, name, category, dist_km, transit_time, capacity_spec, x, y, details, icon, is_critical, stage_link, impact)
VALUES
('stadium_dypatil', 'dypatil_nerul', 'Dr. D.Y. Patil Sports Stadium', 'stadium', '0.0 km', 'Venue Epicenter', '55,000 Seats', 50, 50, '14 Ingress Portals (A to N), 4 internal ramps, 2 broadcast towers.', 'activity', true, 'stage_06', 'Main event operational container.'),
('rail_nerul', 'dypatil_nerul', 'Nerul Railway Station', 'rail', '1.8 km', '20 min walk / 6 min bus', '24,000 pax/hr', 28, 48, 'Major suburban rail junction on Harbour Line & Trans-Harbour Line.', 'train', true, 'stage_03', 'Primary mass transit gateway (52% of crowd influx).'),
('rail_juinagar', 'dypatil_nerul', 'Juinagar Railway Station', 'rail', '2.4 km', '26 min walk / 8 min shuttle', '14,000 pax/hr', 24, 22, 'Trans-Harbour feeder connector from Thane & Vashi direction.', 'train', false, 'stage_03', 'Secondary rail drop-off.'),
('rail_seawoods', 'dypatil_nerul', 'Seawoods Grand Central Station', 'rail', '3.1 km', '10 min direct shuttle', '18,000 pax/hr', 32, 78, 'Integrated modern transit hub & Nexus Seawoods Mall concourse.', 'train', false, 'stage_09', 'Optimal southern egress collection point.'),
('hotel_the_park', 'dypatil_nerul', 'The Park Navi Mumbai (CBD Belapur)', 'hotel', '3.5 km', '7 min drive / shuttle', '80 Luxury Rooms', 74, 58, 'Boutique 5-star hotel for athletes, officials & VIPs.', 'hotel', false, 'stage_04', 'VIP delegation lodging.'),
('hotel_fortune_select', 'dypatil_nerul', 'Fortune Select Exotica', 'hotel', '6.2 km', '12 min highway drive', '85 Luxury Rooms', 18, 12, 'Vashi upscale commercial hotel with banquet suites.', 'hotel', false, 'stage_04', 'Secondary business cluster.'),
('hotel_nerul_cluster', 'dypatil_nerul', 'Nerul Sector 19/21 Hotel Cluster', 'hotel', '1.4 km', '16 min walk', '420 Budget Rooms', 42, 56, 'Budget and mid-tier guest properties within walking radius.', 'hotel', true, 'stage_04', 'Immediate local accommodation (100% booked).'),
('hospital_dypatil', 'dypatil_nerul', 'Dr. D.Y. Patil Hospital & Research Centre', 'hospital', '0.2 km', '2 min direct corridor', '1,200 Beds & Trauma Unit', 58, 44, 'On-campus tertiary hospital immediately adjacent to stadium.', 'heart-pulse', true, 'stage_06', 'Guarantees <3 min emergency triage readiness.'),
('park_stadium_bays', 'dypatil_nerul', 'DY Patil North/South Parking', 'parking', '0.1 km', 'Direct Foot Access', '2,200 Cars / 3,500 Bikes', 47, 56, 'Reserved for match VIP pass holders, team coaches & ambulances.', 'car', true, 'stage_03', 'Secured vehicle perimeter.'),
('park_wonders_park', 'dypatil_nerul', 'Wonders Park Public Overflow Parking', 'parking', '1.8 km', '5 min shuttle loop', '1,500 Cars', 38, 68, 'Municipal park-and-ride facility with continuous shuttle frequency.', 'car', false, 'stage_03', 'Municipal park-and-ride buffer.'),
('choke_lp_junction', 'dypatil_nerul', 'LP Junction (Sion-Panvel Hwy)', 'choke', '0.8 km', 'Pinch Point', 'Severe Bottleneck', 52, 32, 'Intersection of Sion-Panvel Highway and Nerul East bypass.', 'alert-triangle', true, 'stage_03', 'Severe traffic congestion during 10:30-12:00 and 21:45-23:15.')
ON CONFLICT (id) DO NOTHING;
