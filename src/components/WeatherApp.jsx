// WeatherApp.jsx
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState('');

    const fetchForecast = async () => {
        if (!city) return;
        const apiKey = '58070707a8bf62b46267ae19cd9cc039'; // Replace with your OpenWeather API key
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await axios.get(url); // Use Axios to make the GET request
            setForecastData(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'City not found');
            setForecastData(null);
        }
    };

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchForecast();
    };

    return (
        <div style={{ fontFamily: 'Arial', padding: '20px', textAlign: 'center' }}>
            <h1>5-Day Weather Forecast</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                    style={{ padding: '10px', fontSize: '16px', width: '300px' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px', marginLeft: '10px' }}>Search</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {forecastData && (
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
                    {forecastData.list.filter((_, index) => index % 8 === 0).map((forecast, index) => (
                        <div key={index} style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '15px', width: '200px', textAlign: 'center', background: '#f9f9f9' }}>
                            <h3>{new Date(forecast.dt_txt).toLocaleDateString()}</h3>
                            <img 
                                src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                                alt={forecast.weather[0].description} 
                                style={{ width: '50px', height: '50px' }} 
                            />
                            <p>Temp: {forecast.main.temp}°C</p>
                            <p>Weather: {forecast.weather[0].description}</p>
                            <p>Humidity: {forecast.main.humidity}%</p>
                            <p>Wind: {forecast.wind.speed} m/s</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
