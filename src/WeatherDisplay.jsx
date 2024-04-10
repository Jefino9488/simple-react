import React, { useState } from 'react';

function WeatherDisplay() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const API_KEY = '5e1366161dd6b594223f8d59d1c65205'; // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key

    const fetchWeather = async (cityName) => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
            const data = await response.json();
            if (response.ok) {
                setWeather(data);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError('Error fetching weather data');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeather(city);
    };

    return (
        <div>
            <h2>Weather Display</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    required
                />
                <button type="submit">Get Weather</button>
            </form>
            {error && <p>{error}</p>}
            {weather && (
                <div>
                    <h3>Weather for {weather.name}, {weather.sys.country}</h3>
                    <p>Description: {weather.weather[0].description}</p>
                    <p>Temperature: {weather.main.temp} °C</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
}

export default WeatherDisplay;
