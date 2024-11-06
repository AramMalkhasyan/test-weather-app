import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './state/apiSlice/apiSlice';
import { fetchFiveDayData } from './state/apiSlice/fiveDaysApiSlice';



function App() {
  const [city, setCity] = useState("Yerevan");
  const dispatch = useDispatch();
  const data = useSelector(state => state.apiCall); 
  const fiveDayData = useSelector(state => state.fiveDayApiCall);
  const filteredFiveDayData = fiveDayData?.data?.list?.slice(0, 8);
  
  const hendleClick = () => {
    dispatch(fetchData(city))
    dispatch(fetchFiveDayData(city))
    setCity("")
  } 
  const hendleChange = (e) => {
    setCity(e.target.value);
  }
  const kelvinToCelsius = (kelvin) => {
    return Math.floor(kelvin - 273.15);
  }  
  useEffect(()=> {
    dispatch(fetchData(city))
    dispatch(fetchFiveDayData(city))
  }, [])

const fiveDay = [];

fiveDayData?.data?.list?.map((eachDate) => {
  if (eachDate.dt_txt.split(" ")[1] == "12:00:00") {
    fiveDay.push(eachDate);
  }
})
  
console.log(fiveDay);

  return (
    <>
      <div className='header'>
        <div>
          <input type="text" onChange={hendleChange}/>
          <button onClick={hendleClick}>Search City</button>
        </div>
      </div>
      <div className='weather-conteiner'>
        <div className='weather-information-block'>
          <p className='city-name'>{data?.data?.name}</p>
          <p className='temp'>{kelvinToCelsius(data?.data?.main?.temp)}°C</p>
          <img src={`https://openweathermap.org/img/wn/${data?.data?.weather?.map(weder => weder?.icon)}.png`} alt="" className='weather-icon'/>
          <p className='weather-description'>{data?.data?.weather?.map(weder => weder.main)}</p>
        </div>
        <div className='weather-by-time'>
          {filteredFiveDayData?.map((date) => {
            return (
              <div className='every-time-weather'>
                <p>{date.dt_txt.split(" ")[1]}</p>
                <p>{kelvinToCelsius(date.main.temp)}°C</p>
                <img src={`https://openweathermap.org/img/wn/${date?.weather?.map(weder => weder?.icon)}.png`} alt="" className='time-by-time-icons' />
              </div>
            )
          })}
        </div>
      </div>
      <div className='every-day-temp-conteiner'>
        {fiveDay?.map((everyDay) => {
          return (
            <div className='every-day-temp'>
              <span>{everyDay?.dt_txt?.split(" ")[0]}</span>
              <p>{kelvinToCelsius(everyDay?.main?.temp)}°C</p>
            </div>
          )
        })}
      </div>
      <img src="https://openweathermap.org/img/wn/10d.png" alt="" />
    </>
  )
}

export default App
