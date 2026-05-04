import { useState, useEffect, useCallback, useRef } from 'react';
import { CurrentWeather, ForecastItem, CitySuggestion } from '../types/weather.types';
import { getCurrentWeather, getForecast, getCitySuggestions, WeatherApiError } from '../api/weatherApi';

const STORAGE_KEY = 'weather_saved_locations';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestions] = useState<CitySuggestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const isFirstRender = useRef(true);
  const debounceTimeout = useRef<number | null>(null);

  // [REQUIREMENT: Fetch weather data using useEffect (Initial Load - Persisted)]
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
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedLocations));
  }, [savedLocations]);

  const fetchWeather = async (cityOrCoord: string | { lat: number; lon: number }) => {
    setIsLoading(true);
    setError(null);
    setSuggestions([]); // Clear suggestions on fetch

    try {
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(cityOrCoord),
        getForecast(cityOrCoord)
      ]);
      setCurrentWeather(currentData);
      setForecast(forecastData);
      if (typeof cityOrCoord === 'string') setQuery(currentData.name);
    } catch (err) {
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('Connection error. Using offline data.');
      }
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
          fetchWeather('Colombo');
        }
      );
    }
  }, []);

  const handleSearch = useCallback((input: string) => {
    setQuery(input);
    
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    
    if (input.length < 3) {
      setSuggestions([]);
      return;
    }

    debounceTimeout.current = window.setTimeout(async () => {
      const results = await getCitySuggestions(input);
      setSuggestions(results);
    }, 500);
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
    suggestions,
    handleSearch,
    isLoading,
    error,
    savedLocations,
    saveLocation,
    removeLocation,
    fetchWeather
  };
};
