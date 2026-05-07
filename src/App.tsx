// No React imports needed here

import { 
  Search, MapPin, Wind, Sun, 
  Cloud, CloudRain, CloudLightning, Navigation, Plus, Trash2,
  Calendar, Sunrise
} from 'lucide-react';
import { useWeather } from './hooks/useWeather';

// [REQUIREMENT: Develop a weather forecasting application using React]
export default function App() {
  const { 
    currentWeather, 
    forecast, 
    query, 
    suggestions,
    handleSearch, 
    isLoading, 
    error,
    savedLocations,
    saveLocation,
    removeLocation,
    fetchWeather
  } = useWeather();

  const getWeatherIcon = (description: string, size = 24) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return <Sun size={size} className="text-yellow-400" />;
    if (desc.includes('rain')) return <CloudRain size={size} className="text-blue-400" />;
    if (desc.includes('storm') || desc.includes('bolt')) return <CloudLightning size={size} className="text-yellow-200" />;
    if (desc.includes('cloud')) return <Cloud size={size} className="text-gray-300" />;
    return <Sun size={size} className="text-yellow-400" />;
  };

  const getDayName = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 min-h-screen relative z-10">
      {/* App Header & Logo */}
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12">
          <img src="/favicon.svg" alt="Bento Weather Logo" className="w-full h-full" />
        </div>
        <div>
          <h1 className="text-2xl font-black uppercase tracking-[0.3em] text-[var(--color-text-primary)]">Bento Weather</h1>
        </div>
      </div>

      {/* Search & Location Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-[var(--color-brand-primary)] transition-colors" size={20} />
          <input 
            type="text" 
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-4 py-4 glass-card bg-white/5 border-white/10 outline-none focus:border-[var(--color-brand-primary)]/50 transition-all text-lg"
          />

          {/* Search Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 glass-card bg-[#19350C]/90 backdrop-blur-2xl border-white/10 overflow-hidden z-50 shadow-2xl">
              {suggestions.map((city, idx) => (
                <button
                  key={`${city.lat}-${city.lon}-${idx}`}
                  onClick={() => fetchWeather({ lat: city.lat, lon: city.lon })}
                  className="w-full px-6 py-4 text-left hover:bg-white/10 flex items-center justify-between group transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-white/90">{city.name}</span>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-black">{city.state ? `${city.state}, ` : ''}{city.country}</span>
                  </div>
                  <Navigation size={14} className="text-white/20 group-hover:text-[var(--color-brand-primary)] transition-colors" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {currentWeather && !savedLocations.includes(currentWeather.name) && (
            <button 
              onClick={() => saveLocation(currentWeather.name)}
              className="p-4 glass-card flex items-center gap-2 hover:bg-white/10 text-[var(--color-brand-primary)]"
            >
              <Plus size={20} />
              <span className="hidden md:inline font-medium">Save</span>
            </button>
          )}
        </div>
      </div>

      {/* Error Message & Mock Indicator */}
      <div className="flex flex-col gap-3 mb-8">
        {error && (
          <div className="p-4 glass-card bg-red-500/10 border-red-500/20 text-red-400 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
            {error}
          </div>
        )}
        
        {currentWeather?.isMock && (
          <div className="px-4 py-2 glass-card bg-orange-500/10 border-orange-500/20 text-orange-400/80 text-[10px] font-black uppercase tracking-[0.2em] w-fit flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
            Offline Mode Active
          </div>
        )}
      </div>

      {/* Main Bento Grid */}
      {isLoading ? (
        <div className="bento-grid animate-pulse">
          <div className="col-span-2 row-span-2 glass-card h-[400px]"></div>
          <div className="glass-card"></div>
          <div className="glass-card"></div>
          <div className="col-span-2 glass-card"></div>
        </div>
      ) : currentWeather ? (
        <div className="bento-grid">
          {/* Hero Weather Card */}
          <div className="col-span-1 md:col-span-2 row-span-1 md:row-span-2 glass-card p-8 flex flex-col justify-between group">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <MapPin size={16} />
                  <span className="text-lg font-medium tracking-wide uppercase">{currentWeather.name}, {currentWeather.sys.country}</span>
                </div>
                <h2 className="text-8xl font-bold tracking-tighter mb-4">{Math.round(currentWeather.main.temp)}°</h2>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-medium">{currentWeather.weather[0].main}</span>
                  <span className="text-white/40">L:{Math.round(currentWeather.main.temp_min)}° H:{Math.round(currentWeather.main.temp_max)}°</span>
                </div>
              </div>
              <div className="p-4 bg-white/5 rounded-3xl group-hover:scale-110 transition-transform duration-500">
                {/* [REQUIREMENT: Display current weather conditions] */}
                {getWeatherIcon(currentWeather.weather[0].description, 80)}
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/5">
              <div className="text-center">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Humidity</p>
                <p className="text-xl font-bold">{currentWeather.main.humidity}%</p>
              </div>
              <div className="text-center border-x border-white/5">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Wind</p>
                <p className="text-xl font-bold">{Math.round(currentWeather.wind.speed)} km/h</p>
              </div>
              <div className="text-center">
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Feels Like</p>
                <p className="text-xl font-bold">{Math.round(currentWeather.main.feels_like)}°</p>
              </div>
            </div>
          </div>

          {/* Saved Locations Bento Card */}
          <div className="col-span-1 md:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Saved Locations</h3>
              <Navigation size={16} className="text-[var(--color-brand-primary)]" />
            </div>
            <div className="flex flex-wrap gap-3">
              {savedLocations.length > 0 ? savedLocations.map(city => (
                <div key={city} className="flex items-center gap-2 pl-4 pr-2 py-2 glass-card bg-white/5 hover:bg-white/10 cursor-pointer" onClick={() => fetchWeather(city)}>
                  <span className="text-sm font-medium">{city}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeLocation(city); }}
                    className="p-1 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )) : (
                <p className="text-sm text-white/20 italic">No saved locations yet</p>
              )}
            </div>
          </div>

          {/* Details Bento Cards */}
          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Wind size={18} />
              <span className="text-xs uppercase tracking-widest font-bold">Visibility</span>
            </div>
            <div>
              <p className="text-3xl font-bold">{((currentWeather.visibility || 0) / 1000).toFixed(1)} km</p>
              <p className="text-xs text-white/30 mt-2">Clear sky visibility</p>
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col justify-between">
            <div className="flex items-center gap-3 text-white/40 mb-4">
              <Sunrise size={18} />
              <span className="text-xs uppercase tracking-widest font-bold">Sun</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">Rise</span>
                <span className="text-sm font-bold">{new Date(currentWeather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/40">Set</span>
                <span className="text-sm font-bold">{new Date(currentWeather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
            </div>
          </div>

          {/* [REQUIREMENT: Display forecasts (7-Day)] */}
          <div className="col-span-1 md:col-span-4 glass-card p-8 mt-4">
            <div className="flex items-center gap-3 text-white/40 mb-8">
              <Calendar size={18} />
              <h3 className="text-sm uppercase tracking-widest font-bold">7-Day Forecast</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {forecast.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-all group border border-white/5">
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">{idx === 0 ? 'Today' : getDayName(item.dt_txt)}</span>
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                    {getWeatherIcon(item.weather[0].main, 32)}
                  </div>
                  <span className="text-xl font-black text-[var(--color-text-primary)]">{Math.round(item.main.temp)}°</span>
                  <span className="text-[9px] text-white/20 uppercase tracking-widest mt-1 font-black">{item.weather[0].main}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <div className="w-24 h-24 bg-[var(--color-brand-primary)]/10 rounded-full flex items-center justify-center mb-6">
            <Navigation className="text-[var(--color-brand-primary)]" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-2">No Weather Data</h2>
          <p className="text-white/40 max-w-xs">Search for a city or allow location access to see the forecast.</p>
        </div>
      )}

      {/* Premium Glass Pill Footer */}
      <footer className="mt-24 pb-12 flex flex-col items-center gap-8">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-4" />
        
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white/20">© 2026 LSR Vidanaarachchi</p>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://lakidev.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-6 py-3 rounded-full glass-card bg-white/5 hover:bg-white/10 border-white/10 hover:border-[var(--color-brand-primary)]/50 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* LakiDev Branding: Double Rotating SVGs */}
              <div className="flex items-center gap-2">
                <svg 
                  className="h-3.5 w-3.5 animate-[spin_8s_linear_infinite] opacity-80" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--color-brand-primary)' }}
                >
                  <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1 0-2H10V3a1 1 0 0 1 1-1zm1 18a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5.5a1 1 0 0 1 1-1h6.5a1 1 0 0 1 0 2H14V19a1 1 0 0 1-1 1z" />
                </svg>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">Portfolio</span>
                <svg 
                  className="h-3.5 w-3.5 animate-[spin_8s_linear_infinite_reverse] opacity-60" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24"
                  style={{ color: 'var(--color-brand-primary)' }}
                >
                  <path fill="currentColor" d="M12 2a1 1 0 0 1 1 1v5.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1 0-2H10V3a1 1 0 0 1 1-1zm1 18a1 1 0 0 1-1 1 1 1 0 0 1-1-1v-5.5a1 1 0 0 1 1-1h6.5a1 1 0 0 1 0 2H14V19a1 1 0 0 1-1 1z" />
                </svg>
              </div>
            </a>

            <a 
              href="https://github.com/lakipop" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative flex items-center gap-2 px-6 py-3 rounded-full glass-card bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <svg className="w-3.5 h-3.5 text-white/60 group-hover:text-white group-hover:rotate-[360deg] transition-transform duration-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}