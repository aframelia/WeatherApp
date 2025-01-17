# Weather App

This is a weather application built with React.js that fetches real-time weather data using an external API. It allows users to search for the current weather in any city and displays details like temperature, humidity, wind speed, and weather conditions.

## Features

- **Search Functionality:** Users can search for weather details by entering a city name.
- **Real-Time Weather Data:** Fetches accurate and up-to-date weather information from a weather API.
- **Responsive Design:** Optimized for use on desktops, tablets, and mobile devices.
- **Error Handling:** Displays error messages for invalid city names or API connection issues.
- **Clean UI:** Simple and intuitive user interface.

## Technologies Used

- **Frontend:** React.js, React Hooks (useState, useEffect)
- **Styling:** CSS Modules or TailwindCSS
- **API:** OpenWeatherMap API (or any other weather API)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Get your API key:
   - Sign up at [OpenWeatherMap](https://openweathermap.org/) or another weather API provider.
   - Generate an API key from the dashboard.

5. Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```

6. Start the development server:

   ```bash
   npm start
   ```

7. Open your browser and go to `http://localhost:3000` to use the app.

## Usage

1. Search for a city using the search bar.
2. View weather details including:
   - Current temperature
   - Weather condition (e.g., sunny, cloudy, rain)
   - Humidity percentage
   - Wind speed


## API Reference

- **Endpoint:** `https://api.openweathermap.org/data/2.5/weather`
- **Required Parameters:**
  - `q`: City name
  - `appid`: Your API key
- **Example Request:**

  ```bash
  https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key
  ```

## Contributing

Contributions are welcome! If you have suggestions for improvement or find a bug, please open an issue or submit a pull request.

