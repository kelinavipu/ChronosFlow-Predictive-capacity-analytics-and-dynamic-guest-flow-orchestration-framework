/**
 * Shared Navigation Component for ChronosFlow
 */

function renderNavbar(activePage = '') {
  const container = document.getElementById('global-navbar');
  if (!container) return;

  const user = window.ChronosSupabase ? window.ChronosSupabase.getCurrentUser() : null;

  const roleBadges = {
    event_manager: { label: "Event Manager", class: "badge-sand" },
    visitor: { label: "Visitor / Spectator", class: "badge-sage" },
    service_provider: { label: "Service Provider", class: "badge-amber" },
    infra_provider: { label: "Infra Provider", class: "badge-slate" }
  };

  const userRole = user?.role || 'event_manager';
  const roleInfo = roleBadges[userRole] || roleBadges.event_manager;

  const isHome = activePage === 'home';
  const isPreplans = activePage === 'preplans';
  const isSimulations = activePage === 'simulations';
  const isCurrentEvents = activePage === 'current-events';
  const isSignIn = activePage === 'signin';
  const isSignUp = activePage === 'signup';

  container.innerHTML = `
    <header class="sticky top-0 z-50 backdrop-blur-md bg-[#121316]/90 border-b border-[#2a2c35] px-4 sm:px-8 py-3.5">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        
        <!-- Brand / Logo -->
        <a href="index.html" class="flex items-center space-x-3 group">
          <div class="w-9 h-9 rounded-xl bg-[#22242b] border border-[#2a2c35] flex items-center justify-center text-[#d4a373] group-hover:border-[#d4a373] transition">
            <i data-lucide="compass" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-base font-extrabold tracking-tight text-[#ede8e1]">CHRONOSFLOW</span>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-mono font-bold bg-[#22242b] text-[#9e9b93] border border-[#2a2c35]">ORCHESTRA</span>
            </div>
            <p class="text-[10px] text-[#9e9b93] font-medium leading-none mt-0.5">Capacity Intelligence & Guest Flow</p>
          </div>
        </a>

        <!-- Center Nav Links -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-semibold">
          <a href="index.html" class="px-3 py-1.5 rounded-lg transition ${isHome ? 'bg-[#22242b] text-[#ede8e1] border border-[#2a2c35]' : 'text-[#9e9b93] hover:text-[#ede8e1]'}">
            Home
          </a>
          <a href="preplans.html" class="px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${isPreplans ? 'bg-[#22242b] text-[#ede8e1] border border-[#2a2c35]' : 'text-[#9e9b93] hover:text-[#ede8e1]'}">
            <i data-lucide="calendar-check" class="w-3.5 h-3.5 text-[#d4a373]"></i>
            <span>Pre-Plans</span>
          </a>
          <a href="simulations.html" class="px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${isSimulations ? 'bg-[#22242b] text-[#ede8e1] border border-[#2a2c35]' : 'text-[#9e9b93] hover:text-[#ede8e1]'}">
            <i data-lucide="sliders" class="w-3.5 h-3.5 text-[#709775]"></i>
            <span>Simulations</span>
          </a>
          <a href="current-events.html" class="px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${isCurrentEvents ? 'bg-[#22242b] text-[#ede8e1] border border-[#2a2c35]' : 'text-[#9e9b93] hover:text-[#ede8e1]'}">
            <span class="w-2 h-2 rounded-full bg-[#c96a54] animate-pulse"></span>
            <span>Current Events</span>
          </a>
        </nav>

        <!-- Right Side: Cloud Status & Auth -->
        <div class="flex items-center space-x-3">
          <!-- Supabase Connected Chip -->
          <div class="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-[#1a1b20] border border-[#2a2c35] text-[10px] font-mono text-[#9e9b93]" title="Supabase Project ID: rojjfjoquejjxuziriei">
            <span class="w-1.5 h-1.5 rounded-full bg-[#709775]"></span>
            <span>Cloud: rojjfjo...</span>
          </div>

          ${user ? `
            <div class="flex items-center space-x-2">
              <div class="hidden lg:block text-right">
                <div class="text-xs font-bold text-[#ede8e1] leading-tight">${user.fullName || 'User'}</div>
                <a href="${userRole === 'infra_provider' ? 'dashboard-infra.html' : userRole === 'service_provider' ? 'dashboard-service.html' : userRole === 'visitor' ? 'dashboard-visitor.html' : 'preplans.html'}" class="text-[10px] ${roleInfo.class} inline-block font-semibold mt-0.5 hover:underline" title="Go to My Dashboard">
                  ${roleInfo.label} &rarr;
                </a>
              </div>
              <button onclick="window.ChronosSupabase.signOut()" class="p-2 rounded-xl bg-[#22242b] hover:bg-[#2a2c35] text-[#9e9b93] hover:text-[#ede8e1] border border-[#2a2c35] transition" title="Sign Out">
                <i data-lucide="log-out" class="w-4 h-4"></i>
              </button>
            </div>
          ` : `
            <div class="flex items-center space-x-2 text-xs font-bold">
              <a href="signin.html" class="px-3 py-1.5 rounded-xl border border-[#2a2c35] bg-[#1a1b20] hover:bg-[#22242b] text-[#ede8e1] transition">
                Sign In
              </a>
              <a href="signup.html" class="px-3 py-1.5 rounded-xl btn-sand transition">
                Sign Up
              </a>
            </div>
          `}
        </div>

      </div>
    </header>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

window.renderNavbar = renderNavbar;
