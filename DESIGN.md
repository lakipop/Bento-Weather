# DESIGN.md — Bento Weather
# Location: /Bento-Weather/DESIGN.md
# Purpose: Project-specific design tokens and nature-inspired aesthetic rules.

---

## Project Identity
- **Project name:** Bento Weather
- **Type:** Information Dashboard
- **Stack:** React 19, TypeScript 5.7, Vite 6.0
- **UI framework:** Tailwind CSS v4 (Custom Bento Layout)
- **Icon library:** Lucide React
- **API:** OpenWeatherMap REST API

---

## Color Tokens (Nature & Sand)
Derived from `weatherappcolors.jpg` and `weatherappdesign.jpg`.

### Core Palette
```css
--color-forest:      #19350C;   /* Deep Evergreen Base */
--color-olive:       #687D31;   /* Muted Green Accent */
--color-sand:        #D5D3CC;   /* Warm Neutral Text */
--color-teal-muted:  #406768;   /* Stormy Sky Secondary */
```

### Brand Accents
```css
--color-accent:      #FF8A65;   /* Peach/Orange highlight */
--color-bg-page:     var(--color-forest);
--color-text:       var(--color-sand);
```

---

## UI Components (Bento System)
- **Glass Cards**: `backdrop-blur-xl` with `linear-gradient` overlays.
- **Grid Layout**: 4-column responsive grid transitioning to single-column on mobile.
- **Typography**: 'Outfit' font family for a modern, geometric feel.

---

## Motion & Animation
- **Animated Brand Logo**: Custom SVG with a rotating sun and floating cloud, matching the "Forest & Sand" palette.
- **LakiDev Signature Footer**: Double rotating SVGs on the Portfolio button (8s linear spin and reverse spin) for professional branding.
- **Scale**: Subtle hover lifting on bento cards.
- **Gradients**: Dynamic weather-based background transitions.

---

## Folder Structure
```
/src
  /api              # weatherApi.ts integrations
  /components       # Bento widgets (Forecast, Current, Skeleton)
  /hooks            # useWeather logic (Debounce & Geolocation)
  /types            # Weather API strict interfaces
```

---
**Developer:** LakiDev (LSR Vidanaarachchi)<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*A Personal Portfolio Project*
