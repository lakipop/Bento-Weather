# Implementation Plan - Bento Weather App

Transitioning from the Notes App to the **Bento Weather App** (Project 2). This plan addresses the persistent API key errors by implementing a robust mock data fallback and polishes the UI/UX to meet the "Forest & Sand" aesthetic requirements.

## User Review Required

> [!IMPORTANT]
> The "Invalid API Key" error occurs because the OpenWeatherMap key in `.env` is returning a 401 status. I will implement a **Mock Data Mode** that automatically activates when the API key is invalid or missing, allowing you to develop and test the UI seamlessly.

## Proposed Changes

### [Component] API & Data Layer

#### [MODIFY] [weatherApi.ts](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/api/weatherApi.ts)
- Implement a `MOCK_WEATHER_DATA` and `MOCK_FORECAST_DATA` constant.
- Update `getCurrentWeather` and `getForecast` to return mock data if the API returns a 401/403 status.
- Log a subtle warning in the console when mock data is being used.

### [Component] UI & Styling (Strictly No Layout Changes)

#### [MODIFY] [index.css](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/index.css)
- Update CSS variables using absolute hex codes from `weatherappcolors.jpg`:
  - `--color-forest: #19350C;`
  - `--color-olive: #687D31;`
  - `--color-sand: #D5D3CC;`
  - `--color-teal: #406768;`
  - `--color-sky: #6FA9BB;`
- Apply these tokens to the existing classes without altering the `bento-grid` logic.

#### [MODIFY] [App.tsx](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/App.tsx)
- Ensure the footer attribution remains strictly formatted.
- Add a subtle status indicator for "Offline Mode" (Mock Data) without breaking the existing Bento layout.

### [Component] Hooks & Logic

#### [MODIFY] [useWeather.ts](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/hooks/useWeather.ts)
- Improve error handling to distinguish between "Real API Failures" and "Graceful Mock Fallbacks".
- Ensure geolocation fallback is seamless.

## Verification Plan

### Automated Tests
- N/A (Manual verification via browser as per user rules).

### Manual Verification
1.  **Mock Fallback**: Disable the API key in `.env` and verify the app loads mock data instead of showing an error.
2.  **Search**: Enter a city and verify the UI updates (even with mock data, it should simulate a load state).
3.  **Responsive**: Check the bento grid on mobile vs desktop.
4.  **Aesthetics**: Verify the "Forest & Sand" colors are correctly applied.
