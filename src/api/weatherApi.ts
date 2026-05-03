import { CurrentWeather, ForecastResponse, ForecastItem } from '../types/weather.types';

export class WeatherApiError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

const API_KEY = import.meta.env.VITE_OW_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    let message = 'An unexpected error occurred while fetching weather data.';
    switch (res.status) {
      case 401:
        message = 'Invalid API Key. Please verify your OpenWeatherMap credentials.';
        break;
      case 404:
        message = 'City not found. Please check your spelling and try again.';
        break;
      case 429:
        message = 'API limit exceeded. Please try again later.';
        break;
      case 500:
        message = 'OpenWeatherMap server error. Please try again later.';
        break;
    }
    throw new WeatherApiError(message, res.status);
  }
  return res.json();
};

export const getCurrentWeather = async (city: string): Promise<CurrentWeather> => {
  if (!API_KEY) {
    throw new WeatherApiError('Missing OpenWeatherMap API Key in Environment Variables.', 401);
  }
  const res = await fetch(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
  return handleResponse(res);
};

export const getForecast = async (city: string): Promise<ForecastItem[]> => {
  if (!API_KEY) {
    throw new WeatherApiError('Missing OpenWeatherMap API Key in Environment Variables.', 401);
  }
  // Forecast endpoint returns 3-hour increments for 5 days (40 entries)
  const res = await fetch(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`);
  const data: ForecastResponse = await handleResponse(res);
  
  // Reduce to 1 entry per day (typically around noon, or first instance per day)
  const dailyForecast: ForecastItem[] = [];
  const seenDays = new Set<string>();

  for (const item of data.list) {
    // extract date "YYYY-MM-DD"
    const dateStr = item.dt_txt.split(' ')[0];
    
    // Attempt to grab the ~12:00:00 entry, or just the first seen for that day if not mapped yet
    if (!seenDays.has(dateStr)) {
      seenDays.add(dateStr);
      dailyForecast.push(item);
    }
  }

  // usually limits to 5 days
  return dailyForecast.slice(0, 5);
};
