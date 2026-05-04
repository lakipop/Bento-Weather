# Syntecxhub Weather App
# Syntecxhub Weather App

![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-6.0-purple?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)

An intuitive, beautifully designed weather forecasting application built for the **Syntecxhub Internship Program**. It features a premium "Bento Grid" layout with nature-inspired glass aesthetics.

## 🚀 Features

- **Live Weather Data**: Real-time integration with OpenWeatherMap API.
- **City Suggestions**: Smart geocoding search with a dropdown list to prevent search errors.
- **7-Day Forecast**: Extended forecasting using the high-availability Open-Meteo API.
- **High-Availability Architecture**: Automatic fallback to **Mock Data** if the API key fails (401/403) or rate limits are reached.
- **Persistence**: Saved locations are stored in `localStorage` with a robust `isFirstRender` protection logic.
- **Dynamic UI**: Animated SVG logo and signature LakiDev rotating footer branding.
- **Nature-Inspired Theme**: Custom "Forest & Sand" palette derived from high-end design references.

## 🛠️ Technologies Used

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism)
- **Icons**: Lucide React
- **APIs**: OpenWeatherMap (Current), Geocoding (Search), Open-Meteo (Forecast)

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

## 🌐 Deployment (Vercel)

1. **Push to GitHub**: Ensure your code is in a public or private GitHub repository.
2. **Import to Vercel**: Connect your GitHub account to [Vercel](https://vercel.com) and import the project.
3. **Set Environment Variables**: 
   - Go to Project Settings > Environment Variables.
   - Add a new variable: `VITE_OW_API_KEY`.
   - Paste your OpenWeatherMap key as the value.
4. **Deploy**: Click "Deploy". Vercel will automatically build and host your app.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Developer:** LSR Vidanaarachchi<br>
**Portfolio:** [lakidev.me](https://lakidev.me/)<br>
**GitHub:** [lakipop](https://github.com/lakipop)<br>

*Developed for the SyntecXhub Internship Program*
