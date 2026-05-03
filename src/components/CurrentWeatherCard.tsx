import { Droplets, Wind, Thermometer } from 'lucide-react';
import { CurrentWeather } from '../types/weather.types';

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
}

export const CurrentWeatherCard = ({ weather }: CurrentWeatherCardProps) => {
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`;

  return (
    <div className="bg-[var(--color-bg-surface)] backdrop-blur-xl border border-[var(--color-border-default)] rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-up group hover:border-[var(--color-border-strong)] transition-all duration-300">
      {/* Decorative Blur blob */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-primary)] opacity-5 rounded-full blur-[64px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Main Temperature & City */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 flex-grow">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[var(--color-text-primary)] to-[var(--color-text-secondary)]">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-[var(--color-brand-primary)] font-medium text-lg uppercase tracking-widest flex items-center gap-2">
            {weather.weather[0].description}
          </p>
          <div className="mt-4 text-7xl md:text-8xl font-mono font-bold tracking-tighter drop-shadow-lg">
            {Math.round(weather.main.temp)}°
          </div>
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 animate-float bg-gradient-to-br from-[var(--color-bg-subtle)] to-transparent rounded-full p-4 border border-[var(--color-border-subtle)]">
            <img src={iconUrl} alt={weather.weather[0].description} className="w-40 h-40 object-contain drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]" />
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="grid grid-cols-3 gap-4 mt-12 bg-black/20 rounded-2xl p-6 border border-[var(--color-border-subtle)] backdrop-blur-sm relative z-10">
        <div className="flex flex-col items-center justify-center space-y-2 p-2 border-r border-[var(--color-border-subtle)]">
           <Thermometer className="text-[var(--color-warning)]" size={24} />
           <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Feels Like</span>
           <span className="font-semibold text-lg">{Math.round(weather.main.feels_like)}°C</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-2 border-r border-[var(--color-border-subtle)]">
           <Droplets className="text-[var(--color-info)]" size={24} />
           <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Humidity</span>
           <span className="font-semibold text-lg">{weather.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-2 p-2">
           <Wind className="text-[var(--color-text-secondary)]" size={24} />
           <span className="text-xs font-mono text-[var(--color-text-muted)] uppercase tracking-wider">Wind</span>
           <span className="font-semibold text-lg">{weather.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};
