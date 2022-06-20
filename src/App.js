import React, { useState } from 'react';

const api = {
  key: process.env.REACT_APP_WEATHER_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('{}');

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }

  const dateBuilder = () => {
    let date = String(new window.Date());
    date = date.slice(0,3) + ", " + date.slice(3,10) + ", " + date.slice(11,15);
    return date;
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp < 70) ? 'app cold' : 'app') : 'app'}>
      <main>
        <div className="search-container">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search Location..." 
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          ></input>
        </div>
        <div className="forecast-container">
          {(typeof weather.main != "undefined") ? (
            <div>
              <div className="location-container">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder()}</div>
              </div>
              <div className="weather-container">
                <div className="temp">{Math.round(weather.main.temp)}°F</div>
                <div className="weather-desc">
                  <strong>{weather.weather[0].main}</strong>
                  <br/>
                  <strong>Feels like:</strong> {Math.round(weather.main.feels_like)}°F
                  <br/>
                  <strong>High:</strong> {Math.round(weather.main.temp_max)}°F
                  / <strong>Low:</strong> {Math.round(weather.main.temp_min)}°F
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="location-container">
                <div className="location">No Location Selected</div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
