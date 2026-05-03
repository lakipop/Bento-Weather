import { ForecastItem } from '../types/weather.types';

interface ForecastGridProps {
  forecast: ForecastItem[];
}

export const ForecastGrid = ({ forecast }: ForecastGridProps) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <h3 className="text-xl font-display font-semibold mb-6 text-[var(--color-text-primary)]">
        5-Day Forecast
      </h3>
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory hide-scrollbar">
        {forecast.map((item, idx) => {
          const date = new Date(item.dt * 1000);
          const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
          const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
          
          return (
            <div
              key={item.dt}
              className="flex-none w-32 snap-center bg-[var(--color-bg-surface)] backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-between border border-[var(--color-border-default)] hover:border-[var(--color-brand-primary)] hover:bg-[var(--color-bg-elevated)] transition-all duration-300 group shadow-lg"
              style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
            >
              <div className="text-[var(--color-text-secondary)] font-medium mb-2 group-hover:text-[var(--color-text-primary)] transition-colors">
                {dayName}
              </div>
              <div className="bg-[var(--color-bg-subtle)] rounded-full p-2 mb-4 group-hover:scale-110 transition-transform">
                <img src={iconUrl} alt={item.weather[0].description} className="w-12 h-12" />
              </div>
              <div className="font-mono text-xl font-bold tracking-tight">
                {Math.round(item.main.temp)}°
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-2 font-mono">
                {item.weather[0].main}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
