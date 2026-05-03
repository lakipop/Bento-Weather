# Syntecxhub Weather App

![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)

An intuitive, beautifully designed weather forecasting application built for the **Syntecxhub Internship Program (Week 1)**. It features an "Ambient Glass UI" that dynamically changes its gradient background based on real-time weather conditions.

## 🚀 Features

- **Live Weather Data:** Integrates directly with the OpenWeatherMap API using asynchronous fetches inside `useEffect`.
- **Dynamic Backgrounds:** The application's theme reacts to the weather (e.g., Clear skies trigger a blue gradient, rain triggers deep stormy indigo).
- **5-Day Forecast:** Extracts and formats a customized 5-day horizon forecast into a sleek horizontal-scroll grid.
- **Robust Error Handling:** Custom `WeatherApiError` class safely catches 404s (City Not Found), 401s (Invalid Key), and network failures, displaying them beautifully via a dedicated `ErrorMessage` component.
- **Input Debouncing:** Utilizes React's `useRef` to debounce the search input, ensuring optimal API usage.

## 🛠️ Technologies Used

- **Framework:** React 19 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4 (Glassmorphism & Utilities)
- **Icons:** Lucide React
- **API:** OpenWeatherMap

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/lakipop/Syntecxhub_Weather-App.git
   cd Syntecxhub_Weather-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OW_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Developer:** LSR Vidanaarachchi<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*Developed for the SyntecXhub Internship Program*
