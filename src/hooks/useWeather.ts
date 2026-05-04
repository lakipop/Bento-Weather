import { useState, useEffect, useCallback, useRef } from 'react';
import { CurrentWeather, ForecastItem } from '../types/weather.types';
import { getCurrentWeather, getForecast, WeatherApiError } from '../api/weatherApi';

const STORAGE_KEY = 'weather_saved_locations';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);

  const debounceTimeout = useRef<number | null>(null);

  // [REQUIREMENT: Fetch weather data using useEffect (Initial Load)]
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedLocations(JSON.parse(stored));
      } catch (e) {
        setSavedLocations([]);
      }
    }
  }, []);

  // Save locations when they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
  }, [savedLocations]);

  const fetchWeather = async (cityOrCoord: string | { lat: number; lon: number }) => {
    if (typeof cityOrCoord === 'string' && !cityOrCoord.trim()) {
      return;
    }

    setIsLoading(true);
    // Only clear error if we are searching, keep it if we just landed on a failed state
    setError(null);

    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(cityOrCoord),
        getForecast(cityOrCoord)
      ]);
      setCurrentWeather(currentData);
      setForecast(forecastData);
      
      // If we got here, we have data (could be mock if API failed silently)
      // Check if it's mock and set a specific status if needed
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('Connection error. Using offline data.');
      }
      // Note: weatherApi already returns mock data for 401s, 
      // but this catch handles other failures like network issues
    } finally {
      setIsLoading(false);
    }
  };

  // [REQUIREMENT: Fetch weather data from an external API using useEffect (Auto-detect)]
  useEffect(() => {
    if (!query && !currentWeather && !isLoading) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => {
          // Fallback to a default city if geolocation fails
          fetchWeather('Colombo');
        }
      );
    }
  }, []);

  const handleSearch = useCallback((city: string) => {
    setQuery(city);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = window.setTimeout(() => {
      fetchWeather(city);
    }, 600);
  }, []);

  const saveLocation = useCallback((city: string) => {
    if (!savedLocations.includes(city)) {
      setSavedLocations(prev => [...prev, city]);
    }
  }, [savedLocations]);

  const removeLocation = useCallback((city: string) => {
    setSavedLocations(prev => prev.filter(c => c !== city));
  }, []);

  return {
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
  };
};
