# System Architecture: Weather App

## 1. High-Level Overview
The SyntecXhub Weather App is a dynamic, data-driven application connecting to the OpenWeatherMap API. The architecture centers around an "Ambient Glass UI" concept where application state (weather conditions) directly drives the CSS environment via injected class styles.

## 2. Technology Stack
- **Core:** React 19, TypeScript 5.7
- **Bundler:** Vite 6.0
- **Styling:** Tailwind CSS v4 (Glassmorphism & Backdrops)
- **External Services:** OpenWeatherMap REST API

## 3. Data Flow & Integration

```mermaid
graph TD
    A[Search Input] -->|OnChange Event| B[Debounce Ref Timer]
    B -->|Timer Expires| C(useWeather Hook)
    C -->|Triggers HTTP GET| D(weatherApi.ts)
    
    D -->|Fetch Request| E((OpenWeatherMap API))
    E -->|JSON Response| D
    
    D -->|Validates Status| F{Response OK?}
    F -- Yes --> G[Normalize Data]
    F -- No --> H[Throw WeatherApiError]
    
    G --> C
    H --> C
    
    C -->|Updates UI State| I[CurrentWeather / Forecast / ErrorMessage]
```

## 4. Component Hierarchy
```mermaid
graph TD
    App --> Background[Dynamic Background Gradient]
    App --> Search[SearchBar]
    App --> WeatherCard[CurrentWeatherCard]
    App --> Forecast[ForecastGrid]
    
    Search --> Loader[Loader/Clear Config]
    Forecast --> GridSlider[Horizontal Scroll Container]
```

## 5. File Structure
```text
/src
 ├── /api
 │   └── weatherApi.ts        # Direct integrations mapped to API params
 ├── /components              # Aesthetic UI renderings
 │   ├── CurrentWeatherCard.tsx    
 │   ├── ErrorMessage.tsx
 │   ├── ForecastGrid.tsx 
 │   ├── SearchBar.tsx
 │   └── WeatherSkeleton.tsx  # Async load placeholders
 ├── /hooks
 │   └── useWeather.ts        # Handles delays, Promise.allSettled
 ├── /types
 │   └── weather.types.ts     # OpenWeatherMap strict shapes
 ├── App.tsx                  # Layout and thematic wrapper
 ├── index.css                # Base visual theme tokens
 └── main.tsx                 # Bootstrapper
```

---
**Developer:** LSR Vidanaarachchi<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*Developed for the SyntecXhub Internship Program*