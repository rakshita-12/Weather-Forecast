//import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";
import { useState } from 'react';
//import { useEffect} from 'react';
function App() {

  const[city,setCity]=useState("");
  const[weather,setWeather]=useState(null);
  const[forecast,setForecast]=useState([]);

  const API_KEY="9cca4280663ddbec69acb054c3484266";

  const searchWeather=async()=>{
    if(city==="") return;

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try{
      const response=await axios.get(url);
      setWeather(response.data);

      getForecast();
    }
    catch(error){
      alert("City not found");
    }
  };

  const getForecast=async()=>{
    const url= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    try{
      const response=await axios.get(url);

      const dailyData=response.data.list.filter(item=>item.dt_txt.includes("12:00:00"));
      setForecast(dailyData);
    }
    catch(error){
      console.timeLog(error);
    }
  };
  return (
    <div className="App">
      <div className='Weather-container'>
        <h1>Weather Forcast</h1>
        <p>Get the real-time weather updates</p>

        <div className='search-box'>
          <input type="text" placeholder="Enter City" value={city} onChange={(e)=>setCity(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              searchWeather();
            }
          }}/>
          <button onClick={searchWeather}>Search</button>
        </div>

        {weather && (

          <div className='weather-card'>
          <div>
            <h2>{weather.name}</h2>
            <h1>{Math.round(weather.main.temp)}°C</h1>
            <p>{weather.weather[0].description}</p>
          </div>
          <img
            src="https://cdn-icons-png.flaticon.com/512/1163/1163661.png"
            alt="weather"
          />
        </div>
        )}
        {weather &&(
          <div className='weather-details'>
             <div><b>Humidity</b><br></br>{weather.main.humidity}</div>
             <div><b>Wind Speed</b><br></br>{weather.wind.speed}</div>
             <div><b>Pressure</b><br></br>{weather.main.pressure}</div>
             <div>Feels Like {Math.round(weather.main.feels_like)}°C</div>
          </div>
        )}

        

        <h3>5-Day Forecast</h3>

        <div className="forecast">

          {forecast.map((day,index)=>{
            const date=new Date(day.dt_txt);
            const weekday=date.toLocaleDateString("en-US",{weekday:"short"});

            return(
              <div className='day' key={index}>
                <p>{weekday}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt="weather icon"
                />
                <p>{Math.round(day.main.temp)}°C</p>
              </div>
            );
          })}
          
        </div>
        
      </div>
    </div>
  );
  
}

export default App;
