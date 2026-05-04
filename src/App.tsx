// No React imports needed here

import { 
  Search, MapPin, Wind, Sun, 
  Cloud, CloudRain, CloudLightning, Navigation, Plus, Trash2,
  Calendar, Sunrise
} from 'lucide-react';
import { useWeather } from './hooks/useWeather';

export default function App() {
  const { 
    currentWeather, 
    forecast, 
    query, 
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
        
        {currentWeather?.name.includes('Mock') && (
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

          {/* 5-Day Forecast Bento Card */}
          <div className="col-span-1 md:col-span-4 glass-card p-8 mt-4">
            <div className="flex items-center gap-3 text-white/40 mb-8">
              <Calendar size={18} />
              <h3 className="text-sm uppercase tracking-widest font-bold">5-Day Forecast</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {forecast.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-4 rounded-3xl bg-white/5 hover:bg-white/10 transition-all group">
                  <span className="text-sm font-bold text-white/60 mb-3">{idx === 0 ? 'Today' : getDayName(item.dt_txt)}</span>
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                    {getWeatherIcon(item.weather[0].description, 32)}
                  </div>
                  <span className="text-xl font-bold">{Math.round(item.main.temp)}°</span>
                  <span className="text-[10px] text-white/20 uppercase tracking-widest mt-1 font-bold">{item.weather[0].main}</span>
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

      {/* Professional Footer */}
      <footer className="mt-20 py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-white/20">
        <p className="text-sm font-medium">© 2026 LSR Vidanaarachchi</p>
        <div className="flex gap-6">
          <a href="https://lakidev.me" className="text-xs hover:text-[var(--color-brand-primary)] transition-colors uppercase tracking-widest font-bold">Portfolio</a>
          <a href="https://github.com/lakipop" className="text-xs hover:text-[var(--color-brand-primary)] transition-colors uppercase tracking-widest font-bold">GitHub</a>
        </div>
      </footer>
    </div>
  );
}