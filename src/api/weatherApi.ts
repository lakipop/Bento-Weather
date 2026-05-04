import { CurrentWeather, ForecastResponse, ForecastItem } from '../types/weather.types';

export class WeatherApiError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = 'WeatherApiError';
  }
}

const API_KEY = import.meta.env.VITE_OW_API_KEY || '';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Mock Data for Fallback (Project-2 Requirement)
const MOCK_WEATHER: CurrentWeather = {
  id: 1248991,
  name: 'Colombo (Mock)',
  coord: { lon: 79.8612, lat: 6.9271 },
  base: 'stations',
  main: { temp: 28, temp_min: 24, temp_max: 31, humidity: 75, feels_like: 30, pressure: 1012 },
  weather: [{ id: 801, main: 'Clouds', description: 'scattered clouds', icon: '03d' }],
  wind: { speed: 12, deg: 240 },
  sys: { country: 'LK', sunrise: 1714800000, sunset: 1714840000 },
  visibility: 10000,
  dt: 1714820000,
  timezone: 19800,
  cod: 200,
  isMock: true
};

const MOCK_FORECAST: ForecastItem[] = Array.from({ length: 5 }, (_, i) => ({
  dt: Date.now() / 1000 + i * 86400,
  dt_txt: new Date(Date.now() + i * 86400000).toISOString().replace('T', ' ').split('.')[0],
  main: { 
    temp: 27 + i, 
    temp_min: 23 + i, 
    temp_max: 30 + i, 
    humidity: 70, 
    feels_like: 29 + i, 
    pressure: 1011,
    sea_level: 1011,
    grnd_level: 1011,
    temp_kf: 0
  },
  weather: [{ id: 800 + i, main: i % 2 === 0 ? 'Rain' : 'Clouds', description: i % 2 === 0 ? 'light rain' : 'cloudy', icon: '04d' }],
  wind: { speed: 10 + i, deg: 250 },
  visibility: 10000,
  pop: 0.1 * i,
  sys: { pod: 'd' }
}));

const handleResponse = async (res: Response, type: 'weather' | 'forecast'): Promise<any> => {
  if (!res.ok) {
    // Graceful Mock Fallback for Auth Errors
    if (res.status === 401 || res.status === 403) {
      console.warn(`[WeatherApp] API key error (${res.status}). Using mock ${type} data.`);
      return type === 'weather' ? { ...MOCK_WEATHER } : { list: MOCK_FORECAST };
    }

    let message = 'An unexpected error occurred while fetching weather data.';
    switch (res.status) {
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
    console.warn('[WeatherApp] Missing API Key. Using mock weather data.');
    return MOCK_WEATHER;
  }
  const query = typeof cityOrCoord === 'string' 
    ? `q=${encodeURIComponent(cityOrCoord)}`
    : `lat=${cityOrCoord.lat}&lon=${cityOrCoord.lon}`;
  
  try {
    const res = await fetch(`${BASE_URL}/weather?${query}&units=metric&appid=${API_KEY}`);
    return handleResponse(res, 'weather');
  } catch (err) {
    if (err instanceof WeatherApiError) throw err;
    return MOCK_WEATHER;
  }
};

export const getForecast = async (cityOrCoord: string | { lat: number; lon: number }): Promise<ForecastItem[]> => {
  if (!API_KEY) {
    return MOCK_FORECAST;
  }
  const query = typeof cityOrCoord === 'string' 
    ? `q=${encodeURIComponent(cityOrCoord)}`
    : `lat=${cityOrCoord.lat}&lon=${cityOrCoord.lon}`;

  try {
    const res = await fetch(`${BASE_URL}/forecast?${query}&units=metric&appid=${API_KEY}`);
    const data = await handleResponse(res, 'forecast');
    
    // Handle mock case where we already return ForecastItem[] vs real API ForecastResponse
    const list = Array.isArray(data) ? data : data.list;
    
    const dailyForecast: ForecastItem[] = [];
    const seenDays = new Set<string>();

    for (const item of list) {
      const dateStr = item.dt_txt.split(' ')[0];
      if (!seenDays.has(dateStr)) {
        seenDays.add(dateStr);
        dailyForecast.push(item);
      }
    }

    return dailyForecast.slice(0, 5);
  } catch (err) {
    if (err instanceof WeatherApiError) throw err;
    return MOCK_FORECAST;
  }
};
