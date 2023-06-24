import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { FaSearchLocation, FaWater, FaWind } from "react-icons/fa";
import { WiDayHail } from "react-icons/wi";

function App() {
  // const [count, setCount] = useState(0)
  const [weather, setWeather] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    data()
  }, [search])

  let data = async () => {
    const link = await axios.get(`https://api.weatherbit.io/v2.0/current?key=${import.meta.env.VITE_SECREAT_KEY}&city=${search}`)
    setWeather(link.data.data)
  }

  const handlesearch = (e) => {
    const store = e.target.value
    setSearch(store)
  }
  const handlesubmit = () => {
    if (search !== '') {
      data()
    }
  }
  console.log(weather);

  return (
    <>
      {/* <button onClick={() => { setCount(count + 1) }}>+</button>
      {count}
      <button disabled={count === 0 ? true : false} onClick={() => { setCount(count <= 0 ? 0 : count - 1) }}>-</button > */}
      <div className='container'>
        <div className='weather'>
          <h1 className='heading'>Location Informations</h1>
          <div className='search'>
            <input className='search-input' onChange={(e) => handlesearch(e)} type='text' placeholder='Enter the city name' />
            <button onSubmit={() => handlesubmit()} className='search-btn' type='submit'>
              <FaSearchLocation />
            </button>
          </div>
          <div className="weatherinfo">
            {
              weather.map((value, key) => {
                return (
                  <>
                    <div className='info'>
                      <h1>{value.clouds}°F</h1>
                      <h2>{value.city_name}</h2>
                      <div className='detail'>
                        <p> Sunrise={value.sunrise}</p>
                        <p>{value.wind_cdir_full}</p>
                        <p>Sunset={value.sunset}</p>
                      </div>
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default App
