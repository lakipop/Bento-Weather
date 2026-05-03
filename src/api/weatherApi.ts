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

export const getCurrentWeather = async (cityOrCoord: string | { lat: number; lon: number }): Promise<CurrentWeather> => {
  if (!API_KEY) {
    throw new WeatherApiError('Missing OpenWeatherMap API Key in Environment Variables.', 401);
  }
  const query = typeof cityOrCoord === 'string' 
    ? `q=${encodeURIComponent(cityOrCoord)}`
    : `lat=${cityOrCoord.lat}&lon=${cityOrCoord.lon}`;
  
  const res = await fetch(`${BASE_URL}/weather?${query}&units=metric&appid=${API_KEY}`);
  return handleResponse(res);
};

export const getForecast = async (cityOrCoord: string | { lat: number; lon: number }): Promise<ForecastItem[]> => {
  if (!API_KEY) {
    throw new WeatherApiError('Missing OpenWeatherMap API Key in Environment Variables.', 401);
  }
  const query = typeof cityOrCoord === 'string' 
    ? `q=${encodeURIComponent(cityOrCoord)}`
    : `lat=${cityOrCoord.lat}&lon=${cityOrCoord.lon}`;

  const res = await fetch(`${BASE_URL}/forecast?${query}&units=metric&appid=${API_KEY}`);
  const data: ForecastResponse = await handleResponse(res);
  
  const dailyForecast: ForecastItem[] = [];
  const seenDays = new Set<string>();

  for (const item of data.list) {
    const dateStr = item.dt_txt.split(' ')[0];
    if (!seenDays.has(dateStr)) {
      seenDays.add(dateStr);
      dailyForecast.push(item);
    }
  }

  return dailyForecast.slice(0, 5);
};
