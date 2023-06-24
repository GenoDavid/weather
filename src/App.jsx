import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { FaSyncAlt } from 'react-icons/fa';

function App() {
  const [weather, setWeather] = useState([]);
  const [search, setSearch] = useState('');

  const refresh = () => {
    window.dispatchEvent(new Event('refresh'));
  };

  useEffect(() => {
    data();
  }, [search]);

  useEffect(() => {
    const handleRefresh = () => {
      window.location.reload();
    };

    window.addEventListener('refresh', handleRefresh);

    return () => {
      window.removeEventListener('refresh', handleRefresh);
    };
  }, []);

  let data = async () => {
    const link = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${import.meta.env.VITE_SECREAT_KEY}&city=${search}`);
    setWeather(link.data.data);
  };

  const handleSearch = (e) => {
    const store = e.target.value;
    setSearch(store);
  };

  return (
    <div className="container">
      <div className="weather">
        <button className="spinner" onClick={refresh}>
          <FaSyncAlt />
        </button>
        <h1 className="heading">Location Informations</h1>
        <div className="search">
          <input
            className="search-input"
            onChange={(e) => handleSearch(e)}
            type="text"
            placeholder="Enter the city name"
          />
        </div>
        <div className="weatherinfo">
          {weather.map((value, key) => (
            <div className="info" key={key}>
              <h1>{value.clouds}°F</h1>
              <h2>{value.city_name}</h2>
              <div className="detail">
                <p>Sunrise={value.sunrise}</p>
                <p>{value.wind_cdir_full}</p>
                <p>Sunset={value.sunset}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
