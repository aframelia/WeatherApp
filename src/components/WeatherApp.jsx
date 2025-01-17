import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationArrow } from 'react-icons/fa'; // Location icon
import { Line } from 'react-chartjs-2'; // Import Line chart from react-chartjs-2
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState('');

    const apiKey = '58070707a8bf62b46267ae19cd9cc039'; // Replace with your OpenWeather API key

    const fetchForecast = async (query) => {
        try {
            const response = await axios.get(query);
            setForecastData(response.data);
            setError('');
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to fetch weather data');
            setForecastData(null);
        }
    };

    const fetchByCity = () => {
        if (!city) return;
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
        fetchForecast(url);
    };

    const fetchByLocation = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
                fetchForecast(url);
            },
            () => {
                setError('Unable to fetch your location');
            }
        );
    };

    useEffect(() => {
        // Automatically fetch weather for the user's location on app load
        fetchByLocation();
    }, []);

    const handleInputChange = (event) => {
        setCity(event.target.value);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        fetchByCity();
    };

    // Prepare data for the temperature trend chart
    const chartData = forecastData
        ? {
              labels: forecastData.list
                  .filter((_, index) => index % 8 === 0)
                  .map((forecast) => new Date(forecast.dt_txt).toLocaleDateString()),
              datasets: [
                  {
                      label: 'Temperature (°C)',
                      data: forecastData.list
                          .filter((_, index) => index % 8 === 0)
                          .map((forecast) => forecast.main.temp),
                      borderColor: 'rgba(75,192,192,1)',
                      backgroundColor: 'rgba(75,192,192,0.2)',
                      tension: 0.4,
                  },
              ],
          }
        : null;

    return (
        <div style={{ fontFamily: 'Arial', padding: '20px', textAlign: 'center' }}>
            <h1>5-Day Weather Forecast</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px', position: 'relative', display: 'inline-block' }}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={handleInputChange}
                    style={{
                        padding: '10px 40px 10px 10px',
                        fontSize: '16px',
                        width: '300px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
                <FaLocationArrow
                    onClick={fetchByLocation}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        color: '#555',
                    }}
                />
            </form>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

            {forecastData && (
                <>
                    {/* Weather Cards */}
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            gap: '20px',
                            marginTop: '20px',
                        }}
                    >
                        {forecastData.list.filter((_, index) => index % 8 === 0).map((forecast, index) => (
                            <div
                                key={index}
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    width: '200px',
                                    textAlign: 'center',
                                    background: '#f9f9f9',
                                }}
                            >
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

                    {/* Temperature Trend Chart */}
                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <h2>Temperature Trend (Next 5 Days)</h2>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <Line data={chartData} />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;
