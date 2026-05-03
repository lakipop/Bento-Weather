import { useState, useEffect, useCallback, useRef } from 'react';
import { CurrentWeather, ForecastItem } from '../types/weather.types';
import { getCurrentWeather, getForecast, WeatherApiError } from '../api/weatherApi';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimeout = useRef<number | null>(null);

  const fetchWeather = async (city: string) => {
    if (!city.trim()) {
      setCurrentWeather(null);
      setForecast([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const [currentRes, forecastRes] = await Promise.allSettled([
      getCurrentWeather(city),
      getForecast(city)
    ]);

    let hasError = false;

    if (currentRes.status === 'fulfilled') {
      setCurrentWeather(currentRes.value);
    } else {
      hasError = true;
      const err = currentRes.reason;
      if (err instanceof WeatherApiError) {
        setError(err.message);
      } else {
        setError('Network error. Please check your connection.');
      }
      setCurrentWeather(null);
    }

    if (forecastRes.status === 'fulfilled') {
      setForecast(forecastRes.value);
    } else {
      if (!hasError) { // if currentWeather succeeded but forecast failed
         const err = forecastRes.reason;
         setError(err instanceof WeatherApiError ? err.message : 'Network error while fetching forecast.');
      }
      setForecast([]);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    debounceTimeout.current = window.setTimeout(() => {
      fetchWeather(query);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [query]);

  const handleSearch = useCallback((city: string) => {
    setQuery(city);
  }, []);

  const handleClear = useCallback(() => {
    setQuery('');
    setCurrentWeather(null);
    setForecast([]);
    setError(null);
  }, []);

  return {
    currentWeather,
    forecast,
    query,
    handleSearch,
    handleClear,
    isLoading,
    error
  };
};
