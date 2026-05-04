# Implementation Plan - Bento Weather Enhancements

Addressing search efficiency, forecast duration, and footer aesthetics to reach production-grade quality.

## User Review Required

> [!IMPORTANT]
> - **Search Suggestions**: I will implement city suggestions using the Geocoding API. This prevents "City not found" errors for partial typing and reduces unnecessary API load.
> - **7-Day Forecast**: Since OpenWeatherMap's free tier only provides 5 days, I will integrate **Open-Meteo** for the forecast data. This provides a full 7-day view for free and demonstrates "High Availability" architecture.
> - **Pill Footer**: I will port the animated pill-shaped footer from the Notes App, adapted for the "Forest & Sand" glass aesthetic.

## Proposed Changes

### [Component] API & Data Layer

#### [MODIFY] [weatherApi.ts](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/api/weatherApi.ts)
- Add `getCitySuggestions(query: string)` function using the OpenWeather Geocoding API.
- Add `get7DayForecast(lat: number, lon: number)` function using the **Open-Meteo API** to fulfill the 7-day requirement.
- Update `getForecast` to utilize the new 7-day logic.

### [Component] Hooks & Logic

#### [MODIFY] [useWeather.ts](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/hooks/useWeather.ts)
- Add `suggestions` state to store city results.
- Implement a 500ms debounce for suggestion fetching.
- Update `fetchWeather` to handle the 7-day data.

### [Component] UI & Styling

#### [MODIFY] [App.tsx](file:///d:/Projects/SyntecXhub%20Intern/Syntecxhub_Weather-App/src/App.tsx)
- **Search Suggestions**: Add a dropdown list below the search input that appears as the user types.
- **7-Day Forecast**: Update the forecast bento card to display 7 items instead of 5.
- **Premium Footer**: Replace the current footer with the animated pill-shaped buttons (Portfolio/GitHub) from the Notes App.

## Verification Plan

### Manual Verification
1.  **Suggestions**: Type "Col" and verify "Colombo" appears in a list. Select it to fetch weather.
2.  **7-Day View**: Verify the forecast grid now shows 7 days.
3.  **Footer**: Check the footer for pill shapes and spinning icons with glass effects.
