import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [weather, setWeather] = useState({
    temp: '', desc: '', icon: ''
  });

  const city = "Pittsburgh";
  const unitOfMeasure = "imperial"; //("standard" | "imperial" | "metric")
  const apiKey = "YOUR_API_KEY_HERE";

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&units=${unitOfMeasure}&appid=${apiKey}`)
      .then(response => response.json())
      .then(result => {
        setWeather({
          temp: result.main.temp,
          desc: result.weather[0].main,
          icon: result.weather[0].icon
        })
        .catch(err => console.error(err))
      }, []);
  });

  if(weather.icon) {
    return (
      <>
        <p>Temperature: {weather.temp} °F</p>
        <p>Description: {weather.desc}</p>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather icon" />
      </>
    );
  }
  else{
    return <div>Loading...</div>
  }
}

export default App
