import { useWeather } from './hooks/useWeather';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { ForecastGrid } from './components/ForecastGrid';
import { ErrorMessage } from './components/ErrorMessage';
import { WeatherSkeleton } from './components/WeatherSkeleton';

export default function App() {
  const { currentWeather, forecast, query, handleSearch, handleClear, isLoading, error } = useWeather();

  const getDynamicBackgroundClass = () => {
    if (!currentWeather) return 'bg-[var(--color-bg-page)]';
    const main = currentWeather.weather[0].main.toLowerCase();

    if (main.includes('clear')) {
      return 'bg-gradient-to-br from-[#0c4a6e] via-[#0ea5e9] to-[#0284c7] before:bg-blue-400/20';
    }
    if (main.includes('clouds')) {
      return 'bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#475569] before:bg-gray-400/20';
    }
    if (main.includes('rain') || main.includes('drizzle')) {
      return 'bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#1e1b4b] before:bg-indigo-400/20';
    }
    if (main.includes('thunderstorm')) {
      return 'bg-gradient-to-br from-[#2f2f3e] via-[#1a1a24] to-[#0f0f15] before:bg-purple-900/40';
    }
    if (main.includes('snow')) {
      return 'bg-gradient-to-br from-[#94a3b8] via-[#cbd5e1] to-[#e2e8f0] before:bg-white/40 text-[var(--color-bg-page)]';
    }
    return '';
  };

  return (
    <div className={`min-h-screen font-body p-4 sm:p-8 md:p-12 transition-colors duration-1000 ease-in-out relative ${getDynamicBackgroundClass()}`}>
       <div className="absolute inset-0 bg-[var(--color-bg-page)] -z-20 transition-opacity duration-1000" style={{ opacity: currentWeather ? 0.3 : 1 }}></div>

       <main className="max-w-4xl mx-auto relative z-10 space-y-8 pb-12">
         
         {!currentWeather && !isLoading && !error && (
           <div className="text-center mt-24 mb-16 animate-fade-up">
              <h1 className="text-5xl font-display font-bold tracking-tight mb-4 bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent drop-shadow-sm">
                Atmosphere Check
              </h1>
             <p className="text-lg text-[var(--color-text-secondary)] tracking-wide">
               Enter a city to explore intelligent weather forecasts.
             </p>
           </div>
         )}
         
         <div className={currentWeather ? "mt-4" : ""}>
           <SearchBar 
             query={query}
             onChange={handleSearch}
             onClear={handleClear}
             isLoading={isLoading}
           />
         </div>

         {isLoading && <WeatherSkeleton />}

         {error && !isLoading && <ErrorMessage message={error} />}

         {currentWeather && !isLoading && !error && (
           <div className="space-y-12">
             <CurrentWeatherCard weather={currentWeather} />
             {forecast.length > 0 && <ForecastGrid forecast={forecast} />}
           </div>
         )}

       </main>
    </div>
  );
}